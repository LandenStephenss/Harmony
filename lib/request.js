'use strict';

const https = require('https');
const pkg = require('../package');

const addFormField = (form, contentType, file) => {
  let str = `Content-Disposition: form-data; name="${form.name}"`;
  if (file) {
    str += `; filename="${form.name}"`;
  }
  return `${str}\nContent-Type: application/${contentType}\n\n${form.data}`;
};

const query = (fields) => {
  let str = '?';
  for (const key in fields) {
    str += `${encodeURIComponent(key)}=${encodeURIComponent(fields[key])}&`;
  }
  return str.slice(0, -1);
};

const getRoute = (str) => {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '/') {
      return str.slice(0, i);
    }
  }
  return str;
};

const request = (endpoint, options = {}, buckets = {}) => {
  let path = `/api/v6/${endpoint}`;
  if ('query' in options) {
    path += query(options.query);
  }
  const route = getRoute(endpoint);
  let bucket;
  if (route in buckets) {
    bucket = buckets[route];
    if (bucket.remaining === 0) {
      return new Promise((resolve, reject) => {
        bucket.queue.push(() => request(endpoint, options, buckets)
          .then(resolve)
          .catch(reject));
      });
    }
  }
  const headers = {
    Authorization: 'token' in options ? options.token : null,
    'User-Agent': `DiscordBot (${pkg.homepage}, ${pkg.version})`,
    'X-Audit-Log-Reason': 'reason' in options ? options.reason : null
  };
  let data = '';
  if ('files' in options) {
    headers['Content-Type'] = 'multipart/form-data; boundary=--Harmony';
    for (const file of options.files) {
      data += `----Harmony\n${addFormField(file, 'octet-stream', true)}\n`;
    }
    if ('body' in options) {
      const form = {
        name: 'payload_json',
        data: JSON.stringify(options.body)
      };
      data += `----Harmony\n${addFormField(form, 'json')}\n`;
    }
    data += '----Harmony--';
  } else if ('body' in options) {
    headers['Content-Type'] = 'application/json';
    data = JSON.stringify(options.body);
  }
  const req = https.request({
    agent: options.agent,
    headers,
    host: 'discordapp.com',
    method: options.method,
    path
  });
  if (data) {
    req.write(Buffer.from(data));
    data = '';
  }
  req.end();
  return new Promise((resolve, reject) => {
    req.on('response', (res) => {
      if (bucket) {
        const headers = res.headers;
        bucket.limit = Number(headers['x-ratelimit-limit']);
        bucket.remaining = Number(headers['x-ratelimit-remaining']);
        if (!bucket.resetTimeout) {
          bucket.resetTimeout = setTimeout(async () => {
            bucket.remaining = bucket.limit;
            bucket.resetTimeout = null;
            const queue = bucket.queue;
            const min = Math.min(bucket.limit, queue.length);
            for (let i = 0; i < min; i++) {
              await queue.shift()();
            }
          }, headers['x-ratelimit-reset-after'] * 1000);
        }
      }
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode < 400) {
          resolve(data ? JSON.parse(data) : null);
        } else if (res.statusCode === 429) {
          setTimeout(() => request(endpoint, options, buckets)
            .then(resolve)
            .catch(reject), res.headers['retry-after']);
        } else {
          data = JSON.parse(data);
          const err = new Error(data.message);
          err.code = data.code;
          reject(err);
        }
      });
    });
  });
};

module.exports = request;
