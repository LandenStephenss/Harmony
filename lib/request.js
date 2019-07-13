'use strict';

const https = require('https');
const querystring = require('querystring');
const write = require('./util/write');

/**
 * Make a request
 * @arg {string} method Request method
 * @arg {string} path Path to make a request to
 * @arg {string} [token] Token used for authorizing the request
 * @arg {object} [body] Data to send or query
 * @arg {object} [file] File data
 * @arg {string} [reason] Reason to appear in the audit-logs
 * @returns {Promise<any>}
 */
const request = (method, path, token, body, file, reason) => {
  let url = `/api/v7/${path}`;
  const headers = {
    // 'Accept-Encoding': 'gzip, deflate',
    Authorization: token === undefined ? null : token,
    'X-Audit-Log-Reason': reason === undefined ? null : reason
  };
  const data = [];
  // file?: { name: string, data: Buffer }
  if (file != null) {
    headers['Content-Type'] = 'multipart/form-data; boundary=----Harmony';
    const n = JSON.stringify(file.name); // Adds " around name
    data.push(`------Harmony\n${addFormField(n, file.data, n)}\n`);
    if (body != null) {
      data.push(`------Harmony\n${addFormField('payload_json', body)}\n`);
    }
    data.push('------Harmony--');
  } else if (body != null) {
    if (method === 'POST' || method === 'PUT') {
      data.push(JSON.stringify(body));
      headers['Content-Type'] = 'application/json';
    } else {
      url += `?${querystring.encode(body)}`;
    }
  }
  write(`Making a ${method} request to https://discordapp.com${url}`, 0);
  const req = https.request({
    headers,
    host: 'discordapp.com',
    method,
    path: url
  });
  for (let i = 0; i < data.length; i++) {
    req.write(Buffer.from(data[i]));
  }
  req.end();
  return new Promise((resolve, reject) => {
    req.on('response', (res) => {
      let chunks = '';
      res.on('data', (chunk) => {
        chunks += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 204) {
          resolve();
        } else if (res.statusCode < 300) {
          resolve(JSON.parse(chunks));
        } else if (res.statusCode === 429) {
          const x = res.headers['retry-after'];
          write(`Rate limited. Retrying in ${x / 1000} seconds`, 3);
          setTimeout(() => {
            request(method, path, token, body).then(resolve).catch(reject);
          }, x);
        } else {
          const response = JSON.parse(chunks);
          const err = new Error(response.message);
          err.code = response.code;
          err.statusCode = res.statusCode;
          write(`[${err.statusCode}] Request failed with code ${err.code}`, 1);
          reject(err);
        }
      });
    });
  });
};

const addFormField = (name, data, filename) => {
  const isBuffer = data instanceof Buffer;
  const ct = `application/${isBuffer ? 'octet-stream' : 'json'}`;
  const value = isBuffer ? data : JSON.stringify(data);
  let str = `Content-Disposition: form-data; name=${name}`;
  if (filename) {
    str += `; filename=${filename}`;
  }
  return `${str}\nContent-Type: ${ct}\n\n${value}`;
};

module.exports = request;
