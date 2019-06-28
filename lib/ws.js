'use strict';

const EventEmitter = require('events');
const events = require('./events');
const rest = require('./rest');
const WebSocket = require('ws');
const write = require('./util/write');

/**
 * Connect to Discord
 * @arg {string} token Token used for authorizing stuff
 * @arg {number} [shardCount] Number of shards to connect
 * @arg {object} [client] Client to use
 * @returns {Promise<object>}
 */
const connect = async (token, shardCount, client) => {
  const g = await rest.getBotGateway(token);
  const count = shardCount == null ? g.shards : shardCount;
  const x = client === undefined ? createClient() : client;
  x.shards = new Array(count);
  write(`Spawning ${count} shards`, 0);
  spawnShard(token, x, g.url, 0);
  return x;
};

/**
 * Create a client
 * @returns {object}
 */
const createClient = () => ({
  emitter: new EventEmitter(),
  guilds: new Map(),
  messageLimit: 100,
  privateChannels: new Map(),
  shards: null,
  user: null
});

const createShard = (id, ws) => ({
  id,
  interval: null,
  seq: null,
  sessionID: null,
  ws
});

const identifyShard = (token, client, shard) => sendWS(shard.ws, 2, {
  properties: {
    $browser: 'Harmony',
    $device: 'Harmony',
    $os: process.platform
  },
  shard: [shard.id, client.shards.length],
  token
});

const onmessage = (token, client, shard, msg) => {
  const data = JSON.parse(msg);
  shard.seq = data.s;
  if (data.op === 10) {
    identifyShard(token, client, shard);
    shard.interval = setInterval(() => {
      sendWS(shard.ws, 1, shard.seq);
    }, data.d.heartbeat_interval);
    return;
  }
  if (data.t === 'READY') {
    shard.sessionID = data.d.session_id;
    if (client.user === null) {
      client.user = data.d.user;
    }
    write(`Shard ${shard.id} is ready`, 2);
    client.emitter.emit('shardReady', shard);
    const x = shard.id + 1;
    if (x === client.shards.length) {
      client.emitter.emit('ready', client);
    } else {
      setTimeout(spawnShard, 5000, token, client, shard.ws.url, x);
    }
    return;
  }
  if (data.t !== null) {
    const eventName = data.t.toLowerCase().replace(/_./g,
      (str) => str.slice(1).toUpperCase());
    if (events[eventName] !== undefined) {
      const arr = events[eventName](client, data.d, shard);
      client.emitter.emit(eventName, ...arr, shard);
    }
  }
};

const sendWS = (ws, op, d) => ws.send(JSON.stringify({ d, op }));

const spawnShard = (token, client, url, id) => {
  const ws = new WebSocket(url);
  const shard = createShard(id, ws);
  ws.on('message', (msg) => onmessage(token, client, shard, msg));
  client.shards[id] = shard;
  return shard;
};

/**
 * Update shard status
 * @arg {object} shard Shard to update status for
 * @arg {object} data Status data
 * @arg {object} [data.game] Game data
 * @arg {string} data.game.name Name of the game
 * @arg {number} data.game.type Game type
 * @arg {string} [data.game.url] Twitch url (only if streaming)
 * @arg {string} [data.status] Status type
 * @returns {void}
 */
const updateStatus = (shard, data) => sendWS(shard.ws, 3, {
  afk: false,
  game: null,
  since: null,
  status: null,
  ...data
});

module.exports = {
  connect,
  createClient,
  createShard,
  identifyShard,
  sendWS,
  spawnShard,
  updateStatus
};
