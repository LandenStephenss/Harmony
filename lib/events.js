'use strict';

const Channel = require('./interfaces/Channel');
const Emoji = require('./interfaces/Emoji');
const Guild = require('./interfaces/Guild');
const Message = require('./interfaces/Message');
const Presence = require('./interfaces/Presence');

const channelCreate = (client, data) => {
  const channel = Channel.create(data);
  if (data.guild_id !== undefined) {
    client.guilds.get(data.guild_id).channels.set(data.id, channel);
  } else {
    client.privateChannels.set(data.id, channel);
  }
  return [channel];
};

const channelUpdate = (client, data) => {
  let channel;
  if (data.guild_id !== undefined) {
    channel = client.guilds.get(data.guild_id).channels.get(data.id);
  } else {
    channel = client.privateChannels.get(data.id);
  }
  const oldChannel = { ...channel };
  Channel.update(channel, data);
  return [channel, oldChannel];
};

const guildCreate = (client, data, shard) => {
  const guild = Guild.create(data, shard.id);
  client.guilds.set(data.id, guild);
  return [guild];
};

const guildEmojisUpdate = (client, data) => {
  const guild = client.guilds.get(data.guild_id);
  const oldEmojis = guild.emojis;
  guild.emojis = new Map();
  for (const emoji of data.emojis) {
    guild.emojis.set(emoji.id, Emoji.create(emoji));
  }
  return [guild.emojis, oldEmojis];
};

const guildUpdate = (client, data) => {
  const guild = client.guilds.get(data.id);
  const oldGuild = { ...guild };
  Guild.update(guild, data);
  return [guild, oldGuild];
};

const messageCreate = (client, data) => [Message.create(data, client)];

// Messages are not cached at the moment
// For now, it will just construct a new message
const messageUpdate = (client, data) => [Message.create(data, client)];

const presenceUpdate = (client, data) => {
  const member = client.guilds.get(data.guild_id).members.get(data.user.id);
  let oldPresence = null;
  if (member.presence === null) {
    member.presence = Presence.create(data);
  } else {
    oldPresence = { ...member.presence };
    Presence.update(member.presence, data);
  }
  return [member.presence, oldPresence];
};

module.exports = {
  channelCreate,
  channelUpdate,
  guildCreate,
  guildEmojisUpdate,
  guildUpdate,
  messageCreate,
  messageUpdate,
  presenceUpdate
};
