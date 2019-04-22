'use strict';

const https = require('https');
const zlib = require('zlib');

const userAgent = 'DiscordBot (https://github.com/Apacheli/Harmony, 0.1.0)';

const query = (obj) => Object.keys(obj).map((key) =>
  `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`).join('&');

const request = (method, path, token, body, reason) => {
  return new Promise((resolve, reject) => {
    let url = `/api/v7/${path}`;
    if (method === 'GET' && body !== undefined) {
      url += `?${query(body)}`;
    }
    const req = https.request({
      headers: {
        'Accept-Encoding': 'gzip,deflate',
        Authorization: token === undefined ? null : token,
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        'X-Audit-Log-Reason': reason === undefined ? null : token
      },
      host: 'discordapp.com',
      method,
      path: url
    }, (res) => {
      let stream = res;
      if (res.headers['content-encoding'] === 'gzip') {
        stream = res.pipe(zlib.createGunzip());
      } else if (res.headers['content-encoding'] === 'deflate') {
        stream = res.pipe(zlib.createInflate());
      }
      let response = '';
      stream.on('data', (chunk) => {
        response += chunk;
      });
      stream.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve(JSON.parse(response));
        } else if (res.statusCode === 204) {
          resolve(null);
        } else if (res.statusCode === 429) {
          setTimeout(() => request(method, path, token, body, reason)
            .then(resolve).catch(reject), res.headers['retry-after']);
        } else {
          response = JSON.parse(response);
          const err = new Error(response.message);
          err.code = response.code;
          err.statusCode = res.statusCode;
          reject(err);
        }
      });
    });
    if (method !== 'GET' && body !== undefined) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

request.query = query;
module.exports = request;
