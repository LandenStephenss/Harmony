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
const connect = async (token, client) => {
  const g = await rest.getBotGateway(token);
  const bot = client === undefined ? createClient(g.shards) : client;
  write(`Spawning ${bot.shards.length} shards`, 0);
  spawnShard(token, bot, g.url, 0);
  return bot;
};

/**
 * Create a client
 * @arg {number} count Shard count
 * @returns {object}
 */
const createClient = (count) => ({
  emitter: new EventEmitter(),
  guilds: new Map(),
  messageLimit: 100,
  privateChannels: new Map(),
  shards: new Array(count),
  user: null
});

const identifyShard = (token, client, shard) => sendWS(shard.ws, 2, {
  token,
  properties: {
    $os: process.platform,
    $browser: 'Harmony',
    $device: 'Harmony'
  },
  shard: [shard.id, client.shards.length]
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
    const fn = (str) => str.slice(1).toUpperCase();
    const eventName = data.t.toLowerCase().replace(/_./g, fn);
    if (events[eventName] !== undefined) {
      const arr = events[eventName](client, data.d, shard);
      client.emitter.emit(eventName, ...arr, shard);
    }
  }
};

const sendWS = (ws, op, d) => ws.send(JSON.stringify({ op, d }));

const spawnShard = (token, client, url, id) => {
  const ws = new WebSocket(url);
  const shard = { id, interval: null, seq: null, sessionID: null, ws };
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
  identifyShard,
  sendWS,
  spawnShard,
  updateStatus
};
