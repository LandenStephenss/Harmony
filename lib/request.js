'use strict';

const https = require('https');
const querystring = require('querystring');
const write = require('./util/write');

/**
 * Make a request
 * @arg {string} method Request method
 * @arg {string} endpoint Endpoint to make a request to
 * @arg {string} [token] Token used for authorizing the request
 * @arg {object} [body] Request body
 * @arg {string} [reason] Reason to appear in the audit-logs
 * @arg {File[]} [files] Files to upload
 * @returns {Promise<object>}
 */
const request = (method, endpoint, token, body, reason, files) => {
  let path = `/api/v7/${endpoint}`;
  const headers = {
    Authorization: token === undefined ? null : token,
    'User-Agent': 'DiscordBot (https://github.com/Apacheli/discript, 1.0.0)',
    'X-Audit-Log-Reason': reason === undefined ? null : reason
  };
  let data;
  if (files != null) {
    data = '';
    headers['Content-Type'] = 'multipart/form-data; boundary=--Harmony';
    let file;
    for (let i = 0; i < files.length; i++) {
      file = files[i];
      data += `----Harmony\n${addFormField(file.name, file.data, file.name)}`;
    }
    if (body != null) {
      data += `----Harmony\n${addFormField('payload_json', body)}`;
    }
    data += '\n--Harmony--';
  } else if (body != null) {
    if (method === 'GET' || method === 'PUT') {
      data = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    } else {
      path += `?${querystring.encode(body)}`;
    }
  }
  write(`Making a ${method} request to https://discordapp.com${path}`, 0);
  const req = https.request({
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

module.exports = request;

const addFormField = (name, data, filename) => {
  const value = data instanceof Buffer ? data : JSON.stringify(data);
  let str = `Content-Disposition: form-data; name=${name}`;
  if (filename) {
    str += `; filename=${filename}`;
  }
  return `${str}\nContent-Type: application/json\n\n${value}`;
};

/**
 * @typedef {object} File
 * @prop {string} name File name
 * @prop {Buffer} data File data
 */
