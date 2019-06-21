'use strict';

const EventEmitter = require('events');
const events = require('./events');
const rest = require('./rest');
const WebSocket = require('ws');
const write = require('./write');

/**
 * Connect to Discord
 * @arg {string} token Token used for authorizing stuff
 * @arg {number} [shardCount] Number of shards to connect
 * @arg {object} [client] Client to use
 * @returns {Promise<object>}
 */
const connect = async (token, shardCount, client) => {
  const g = await rest.getBotGateway(token);
  const count = shardCount === undefined ? g.shards : shardCount;
  const bot = client === undefined ? createClient(token, count, false) : client;
  write(`Spawning ${count} shards`, 0);
  bot.shards[0] = spawnShard(token, bot, g.url, 0);
  return bot;
};

/**
 * Create a client
 * @arg {string} token Token namespace
 * @arg {number} [count] Number of shards to connect
 * @arg {boolean} [addMethods] Bind all the rest methods to the client
 * @returns {object}
 */
const createClient = (token, count, addMethods = true) => {
  const client = {
    emitter: new EventEmitter(),
    guilds: new Map(),
    privateChannels: new Map(),
    shards: new Array(count === undefined ? 0 : count),
    user: null
  };
  if (addMethods) {
    client.connect = () => connect(token, count, client);
    for (const key of Object.keys(rest)) {
      client[key] = (...args) => rest[key](token, ...args);
    }
  }
  return client;
};

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
    client.emitter.emit('SHARD_READY', shard);
    const x = shard.id + 1;
    if (x === client.shards.length) {
      client.emitter.emit('READY', client);
    } else {
      setTimeout(spawnShard, 5000, token, client, shard.ws.url, x);
    }
    return;
  }
  if (events[data.t]) {
    events[data.t](client, data.d, shard);
  }
};

const sendWS = (ws, op, d) => ws.send(JSON.stringify({ op, d }));

const spawnShard = (token, client, url, id) => {
  const ws = new WebSocket(url);
  const shard = { id, interval: null, seq: null, sessionID: null, ws };
  ws.on('message', (msg) => onmessage(token, client, shard, msg));
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
