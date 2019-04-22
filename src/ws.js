'use strict';

const WebSocket = require('ws');
const gateway = require('./rest/gateway');
const request = require('./rest/request');

const clients = [];

const sendWS = (ws, op, d) => ws.send(JSON.stringify({ op, d }));

const connect = (token, gatewayURL, options, id, shardCount, z) => {
  const ws = new WebSocket(gatewayURL, options);

  ws.on('message', (msg) => {
    const data = JSON.parse(msg);
    const y = data.d;

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

      setInterval(sendWS, y.heartbeat_interval, ws, 1, null);
    }

    switch (data.t) {
      case 'READY': {
        y.guilds = {};
        y.private_channels = {};
        clients[z] = y;
        break;
      }

      case 'CHANNEL_CREATE': {
        if (x.guild_id !== undefined) {
          clients[z].guilds[y.guild_id].channels[y.id] = y;
        } else {
          clients[z].private_channels[y.id] = y;
        }
        break;
      }

      case 'CHANNEL_UPDATE': {
        const channel = y.guild_id === undefined ?
          clients[z].private_channels[y.id] :
          clients[z].guilds[y.guild_id].channels[y.id];
        const keys = Object.keys(y);
        for (let i = 0; i < keys.length; ++i) {
          channel[keys[i]] = y[keys[i]];
        }
        break;
      }

      case 'CHANNEL_DELETE': {
        if (y.guild_id === undefined) {
          delete clients[z].private_channels[y.id];
        } else {
          delete clients[z].guilds[y.guild_id].channels[y.id];
        }
        break;
      }

      case 'GUILD_CREATE': {
        const channels = {};
        for (let i = 0; i < y.channels.length; ++i) {
          channels[y.channels[i].id] = y.channels[i];
        }
        const roles = {};
        for (let i = 0; i < y.roles.length; ++i) {
          roles[y.roles[i].id] = y.roles[i];
        }
        const members = {};
        for (let i = 0; i < y.members.length; ++i) {
          y.members[i].presence = {};
          members[y.members[i].user.id] = y.members[i];
        }
        for (let i = 0; i < y.presences.length; ++i) {
          members[y.presences[i].user.id].presence = y.presences[i];
          delete y.presences[i].user;
        }
        y.channels = channels;
        y.roles = roles;
        y.members = members;
        delete y.presences;
        clients[z].guilds[y.id] = y;
        break;
      }

      case 'GUILD_UPDATE': {
        const keys = Object.keys(y);
        const guild = clients[z].guilds[y.id];
        for (let i = 0; i < keys.length; ++i) {
          guild[keys[i]] = y[keys[i]];
        }
        break;
      }

      case 'GUILD_DELETE': {
        delete clients[z].guilds[y.id];
        break;
      }

      case 'GUILD_MEMBER_ADD': {
        y.presence = {};
        clients[z].guilds[y.guild_id].members[y.user.id] = y;
        break;
      }

      case 'GUILD_MEMBER_UPDATE': {
        const keys = Object.keys(y);
        const member = clients[z].guilds[y.guild_id].members[y.user.id];
        for (let i = 0; i < keys.length; ++i) {
          member[keys[i]] = y[keys[i]];
        }
        break;
      }

      case 'GUILD_MEMBER_REMOVE': {
        delete clients[z].guilds[y.guild_id].members[y.id];
        break;
      }

      case 'GUILD_ROLE_CREATE': {
        clients[z].guilds[y.guild_id].roles[y.role.id] = y;
        break;
      }

      case 'GUILD_ROLE_UPDATE': {
        const keys = Object.keys(y.role);
        const role = clients[z].guilds[y.guild_id].roles[y.role.id];
        for (let i = 0; i < keys.length; ++i) {
          role[keys[i]] = y.role[keys[i]];
        }
        break;
      }

      case 'GUILD_ROLE_DELETE': {
        delete clients[z].guilds[y.guild_id].roles[y.role.id];
        break;
      }

      case 'PRESENCE_UPDATE': {
        const member = clients[z].guilds[y.guild_id].members[y.user.id];
        if (member !== undefined) {
          const p = member.presence;
          p.status = y.status;
          p.game = y.game;
          p.client_status = y.client_status;
          p.activities = y.activities;
        }
        break;
      }

      case 'MESSAGE_CREATE': {
        if (y.type === 6) {
          y.content = `<@${y.author.id}> pinned a message to this channel. `
            + '**See all the pins.**';
        }
      }
    }

    ws.emit('debug', y);
    ws.emit(data.t, y);
  });
  return ws;
};

let x = -1;

/**
 * Initialize shards
 * @arg {String} token Token sent to create a connection
 * @arg {Number} [shardCount] Number of shards to connect
 * @arg {Object} [options] WebSocket options
 * @arg {Object} [urlOptions] Options for the url
 * @arg {String} [urlOptions.v] The version
 * @arg {String} [urlOptions.encoding] Type of encoding, json or etf
 * @arg {String} [urlOptions.compress] Compress with zlib-stream
 * @returns {Promise<Object[]>}
 */
const initializeShards = async (token, shardCount, options, urlOptions) => {
  let gw;
  ++x;

  const count = shardCount === undefined ? 1 : shardCount;

  if (token.slice(0, -4) === 'Bot ') {
    gw = await gateway.getBotGateway(token);
    if (shardCount === undefined) {
      count = gw.shards;
    }
  } else {
    gw = await gateway.getGateway();
  }
  const shards = new Array(count);
  if (urlOptions !== undefined) {
    gw.url += `?${request.query(urlOptions)}`;
  }

  for (let i = 0; i < count; ++i) {
    shards[i] = connect(token, gw.url, options, i, count, x);
  }
  return shards;
};

/**
 * Edit status
 * @arg {WebSocket} shard The shard to edit status for
 * @arg {Object} [options] Options for the edit
 * @arg {Number} [options.since] Time since the client goes idle
 * @arg {Object} [options.game] The game
 * @arg {String} options.game.name The name for the game
 * @arg {Number} options.game.type The type of game
 * @arg {String} [options.game.url] The url of the game (only streamers)
 * @arg {String} [options.status] Set the status
 * @arg {Boolean} [options.afk] If the client is afk or not
 * @returns {void}
 */
const editStatus = (shard, options) => sendWS(shard, 3, {
  since: 0,
  game: null,
  status: 'online',
  afk: false,
  ...options
});

module.exports = {
  sendWS,
  clients,
  connect,
  initializeShards,
  editStatus
};
