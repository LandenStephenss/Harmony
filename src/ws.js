'use strict';

const WebSocket = require('ws');
const gateway = require('./rest/gateway');

const sendWS = (ws, op, d) => ws.send(JSON.stringify({ op, d }));

const connect = (token, gatewayURL, options, id, shardCount) => {
  const ws = new WebSocket(gatewayURL, options);
  ws.on('message', (msg) => {
    const data = JSON.parse(msg);
    if (data.op === 10) {
      sendWS(ws, 2, {
        token,
        properties: {
          $os: process.platform,
          $browser: 'Harmony',
          $device: 'Harmony'
        },
        shards: [id, shardCount]
      });
      setInterval(sendWS, data.d.heartbeat_interval, ws, 1, null);
    }
    if (data.t === 'READY') {
      ws.client = data.d;
    } else {
      ws.emit(data.t, data.d);
      ws.emit('debug', data);
    }
  });
  return ws;
};

/**
 * Initialize shards
 * @arg {String} token Token sent to create a connection
 * @arg {Number} [shardCount] Number of shards to connect
 * @arg {Object} [options] WebSocket options
 * @returns {Promise<Object[]>}
 */
const initializeShards = async (token, shardCount, options) => {
  let gw;
  let count = shardCount === undefined ? 1 : shardCount;
  if (token.slice(0, -4) === 'Bot ') {
    gw = await gateway.getBotGateway(token);
    if (shardCount === undefined) {
      count = gw.shards;
    }
  } else {
    gw = await gateway.getGateway();
  }
  const shards = new Array(count);
  for (let i = 0; i < count; ++i) {
    shards[i] = connect(token, gw.url, options, i, count);
  }
  return shards;
};

module.exports = {
  connect,
  initializeShards
};
