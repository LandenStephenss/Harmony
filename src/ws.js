'use strict';

const WebSocket = require('ws');

const gateway = require('./rest/gateway');


const clients = [];

const sendWS = (ws, op, d) => ws.send(JSON.stringify({ op, d }));

const connect = (token, gatewayURL, options, id, shardCount, z) => {
  const ws = new WebSocket(gatewayURL, options);

  ws.on('message', (msg) => {
    let data = JSON.parse(msg);

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

    switch (data.t) {
        case 'READY': 
            data.d.guilds = {};
            clients[z] = data.d;
        break; 
      
        case 'GUILD_CREATE':
            clients[z].guilds[data.d.id] = data.d;
            clients[z].guilds[data.d.id].shard = id;
        break;
      
        case 'GUILD_UPDATE':
            const keys = Object.keys(data.d);
            for (let i = 0; i < keys.length; ++i) {
              clients[z].guilds[data.d.id][keys[i]] = data.d[keys[i]];
            }
        break;
    
        case 'GUILD_DELETE':
            delete clients[z].guilds[data.d.id];
        break;
    }

    ws.emit(data.t, data.d);
    ws.emit('debug', data);
  });
  return ws;
};

let x = -1;

/**
 * Initialize shards
 * @arg {String} token Token sent to create a connection
 * @arg {Number} [shardCount] Number of shards to connect
 * @arg {Object} [options] WebSocket options
 * @returns {Promise<Object[]>}
 */
const initializeShards = async (token, shardCount, options) => {
    let gw;
    ++x;

    let count = (shardCount === undefined) ? 1 : shardCount;

    if (token.slice(0, -4) === 'Bot ') {
        gw = await gateway.getBotGateway(token);
        if (shardCount === undefined) {
            count = gw.shards;
        }
    } else
        gw = await gateway.getGateway();
  
    const shards = new Array(count);

    for (let i = 0; i < count; ++i)
        shards[i] = connect(token, gw.url, options, i, count, x);

    return shards;
};

module.exports = {
  clients,
  connect,
  initializeShards
};
