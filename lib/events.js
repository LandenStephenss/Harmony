'use strict';

const Emoji = require('./interfaces/Emoji');
const Guild = require('./interfaces/Guild');
const Message = require('./interfaces/Message');
const Presence = require('./interfaces/Presence');

const GUILD_CREATE = (client, data, shard) => {
  const guild = Guild.create(data, shard.id);
  client.guilds.set(data.id, guild);
  client.emitter.emit('guildCreate', guild, shard);
};

const GUILD_EMOJIS_UPDATE = (client, data, shard) => {
  const guild = client.guilds.get(data.guild_id);
  const oldEmojis = guild.emojis;
  guild.emojis = new Map();
  for (const emoji of data.emojis) {
    guild.emojis.set(emoji.id, Emoji.create(emoji));
  }
  client.emitter.emit('guildEmojisUpdate', guild.emojis, oldEmojis, shard);
};

const GUILD_UPDATE = (client, data, shard) => {
  const guild = client.guilds.get(data.id);
  const oldGuild = { ...guild };
  Guild.update(guild, data);
  client.emitter.emit('guildUpdate', guild, oldGuild, shard);
};

const MESSAGE_CREATE = (client, data, shard) => {
  const message = Message.create(data, client);
  client.emitter.emit('messageCreate', message, shard);
};

// Messages are not cached at the moment
// For now, it will just construct a new message
const MESSAGE_UPDATE = (client, data, shard) => {
  const message = Message.create(data, client);
  client.emitter.emit('messageUpdate', message, shard);
};

const PRESENCE_UPDATE = (client, data, shard) => {
  const member = client.guilds.get(data.guild_id).members.get(data.user.id);
  let oldPresence = null;
  if (member.presence === null) {
    member.presence = Presence.create(data);
  } else {
    oldPresence = { ...member.presence };
    Presence.update(member.presence, data);
  }
  client.emitter.emit('presenceUpdate', member.presence, oldPresence, shard);
};

module.exports = {
  GUILD_CREATE,
  GUILD_EMOJIS_UPDATE,
  GUILD_UPDATE,
  MESSAGE_CREATE,
  MESSAGE_UPDATE,
  PRESENCE_UPDATE
};
