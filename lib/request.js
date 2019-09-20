'use strict';

const https = require('https');
const querystring = require('querystring');
const write = require('./util/write');
const zlib = require('zlib');

/**
 * Make a request
 * @arg {string} method Request method
 * @arg {string} endpoint Endpoint to make the request to
 * @arg {string} [token] Token to use for authorizing the request
 * @arg {object} [body] Request body
 * @arg {string} [reason] Reason to appear in the audit log
 * @arg {object[]} [files] Files to upload
 * @arg {https.Agent} [agent] Agent to use for the request
 * @returns {Promise<object>}
 */
const request = (method, endpoint, token, body, reason, files, agent) => {
  let path = `/api/v7/${endpoint}`;
  const headers = {
    'Accept-Encoding': 'deflate, gzip',
    Authorization: token === undefined ? null : token,
    'User-Agent': 'DiscordBot (https://github.com/Apacheli/Harmony, 1.0.0)',
    'X-Audit-Log-Reason': reason === undefined ? null : reason
  };
  let data;
  if (files != null) {
    data = '';
    headers['Content-Type'] = 'multipart/form-data; boundary=--Harmony';
    let file;
    for (let i = 0; i < files.length; i++) {
      file = files[i];
      data += `----Harmony\n${addFormField(file.name, file.data, file.name)}\n`;
    }
    if (body != null) {
      data += `----Harmony\n${addFormField('payload_json', body)}\n`;
    }
    data += '----Harmony--';
  } else if (body != null) {
    if (method === 'POST' || method === 'PUT') {
      data = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    } else {
      path += `?${querystring.encode(body)}`;
    }
  }
  write(`Making a ${method} request to https://discordapp.com${path}`, 0);
  const req = https.request({
    agent,
    headers,
    host: 'discordapp.com',
    method,
    path
  });
  if (data !== undefined) {
    req.write(Buffer.from(data));
  }
  req.end();
  let chunks = '';
  return new Promise((resolve, reject) => {
    req.on('response', (res) => {
      let stream = res;
      switch (res.headers['content-encoding']) {
        case 'deflate': {
          stream = res.pipe(zlib.createInflate());
          break;
        }
        case 'gzip': {
          stream = res.pipe(zlib.createGunzip());
          break;
        }
      }
      stream.on('data', (chunk) => {
        chunks += chunk;
      });
      stream.on('end', () => {
        if (res.statusCode === 204) {
          resolve();
        } else if (res.statusCode < 300) {
          resolve(JSON.parse(chunks));
        } else if (res.statusCode === 429) {
          const x = res.headers['retry-after'];
          write(`Rate limited. Retrying in ${x / 1000} seconds`, 3);
          setTimeout(() =>
            request(method, endpoint, token, body, reason, files, agent)
              .then(resolve).catch(reject), x);
        } else {
          chunks = JSON.parse(chunks);
          const err = new Error(chunks.message);
          err.code = chunks.code;
          err.statusCode = res.statusCode;
          write(`[${err.statusCode}] Request failed with code ${err.code}`, 1);
          reject(err);
        }
      });
    });
  });
};

module.exports = request;

const addFormField = (name, data, filename) => {
  let str = `Content-Disposition: form-data; name="${name}"`;
  if (filename !== undefined) {
    str += `; filename="${filename}"`;
  }
  const buf = data instaneof Buffer;
  const value = buf ? data :
    typeof data === 'object' ? JSON.stringify(data) : data;
  const ct = buf ? 'octet-stream' : 'json';
  return `${str}\nContent-Type: application/${ct}\n\n${value}`;
};
