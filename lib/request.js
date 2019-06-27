'use strict';

const https = require('https');
const querystring = require('querystring');
const write = require('./util/write');

/**
 * Make a request
 * @arg {string} method Request method
 * @arg {string} path Path to make a request to
 * @arg {string} [token] Token used for authorizing the request (if needed)
 * @arg {object} [body] Data to send to Discord
 * @arg {string} [reason] Reason to appear in the audit log
 * @returns {Promise<object>}
 */
const request = (method, path, token, body, reason) => {
  let url = `/api/v7/${path}`;
  if (method === 'GET' && body != null) {
    url += `?${querystring.encode(body)}`;
  }
  write(`Making a ${method} request to https://discordapp.com${url}`, 0);
  const req = https.request({
    headers: {
      Authorization: token === undefined ? null : token,
      'Content-Type': 'application/json',
      'User-Agent': 'DiscordBot (https://github.com/Apacheli/Harmony, 1.0.0)',
      'X-Audit-Log-Reason': reason === undefined ? null : reason
    },
    host: 'discordapp.com',
    method,
    path: url
  });
  if (method !== 'GET' && method !== 'DELETE' && body != null) {
    req.write(JSON.stringify(body));
  }
  req.end();
  let response = '';
  return new Promise((resolve, reject) => {
    req.on('response', (res) => {
      res.on('data', (chunk) => {
        response += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 204) {
          resolve();
        } else if (res.statusCode < 300) {
          resolve(JSON.parse(response));
        } else if (res.statusCode === 429) {
          const x = res.headers['retry-after'];
          write(`Rate limited. Retrying in ${x / 1000} seconds`, 3);
          setTimeout(() => {
            request(method, path, token, body).then(resolve).catch(reject);
          }, x);
        } else {
          response = JSON.parse(response);
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
