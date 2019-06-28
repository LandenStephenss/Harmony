'use strict';

const Channel = require('./interfaces/Channel');
const Emoji = require('./interfaces/Emoji');
const Guild = require('./interfaces/Guild');
const Member = require('./interfaces/Member');
const Message = require('./interfaces/Message');
const Presence = require('./interfaces/Presence');
const Role = require('./interfaces/Role');

const channelCreate = (client, data) => {
  const channel = Channel.create(data);
  if (data.guild_id !== undefined) {
    client.guilds.get(data.guild_id).channels.set(data.id, channel);
  } else {
    client.privateChannels.set(data.id, channel);
  }
  if (channel.messages !== undefined) {
    channel.messages = new Map();
  }
  return [channel];
};

const channelDelete = (client, data) => {
  let channel;
  if (data.guild_id !== undefined) {
    const guild = client.guilds.get(data.guild_id);
    channel = guild.channels.get(data.id);
    guild.channels.delete(data.id);
  } else {
    channel = client.privateChannels.get(data.id);
    client.privateChannels.delete(data.id);
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

const guildDelete = (client, data) => {
  const guild = client.guilds.get(data.id);
  client.guilds.delete(data.id);
  return [guild];
};

const guildEmojisUpdate = (client, data) => {
  const guild = client.guilds.get(data.guild_id);
  const oldEmojis = guild.emojis;
  guild.emojis = new Map();
  for (const emoji of data.emojis) {
    guild.emojis.set(emoji.id, Emoji.create(emoji));
  }
  return [guild.emojis, oldEmojis, guild];
};

const guildMemberAdd = (client, data) => {
  const member = Member.create(data);
  const guild = client.guilds.get(data.guild_id);
  guild.members.set(data.id, member);
  return [member, guild];
};

const guildMemberRemove = (client, data) => {
  const guild = client.guilds.get(data.guild_id);
  const member = guild.members.get(data.id);
  guild.members.delete(data.id);
  return [member, guild];
};

const guildMemberUpdate = (client, data) => {
  const guild = client.guilds.get(data.guild_id);
  const member = guild.members.get(data.id);
  const oldMember = { ...member };
  Member.update(member, data);
  return [member, oldMember, guild];
};

const guildRoleCreate = (client, data) => {
  const role = Role.create(data);
  const guild = client.guilds.get(data.guild_id);
  guild.roles.set(data.id, role);
  return [role, guild];
};

const guildRoleDelete = (client, data) => {
  const guild = client.guilds.get(data.guild_id);
  const role = guild.roles.get(data.id);
  guild.roles.delete(data.id);
  return [role, guild];
};

const guildRoleUpdate = (client, data) => {
  const guild = client.guilds.get(data.guild_id);
  const role = guild.roles.get(data.id);
  const oldRole = { ...role };
  Role.update(role, data);
  return [role, oldRole, guild];
};

const guildUpdate = (client, data) => {
  const guild = client.guilds.get(data.id);
  const oldGuild = { ...guild };
  Guild.update(guild, data);
  return [guild, oldGuild];
};

const messageCreate = (client, data) => {
  const message = Message.create(data, client);
  let channel;
  if (data.guild_id !== undefined) {
    channel = client.guilds.get(data.guild_id).channels.get(data.channel_id);
  } else {
    channel = client.privateChannels.get(data.channel_id);
  }
  channel.lastMessageID = data.id;
  if (client.messageLimit > 0) {
    if (channel.messages.size === client.messageLimit) {
      channel.messages.delete(channel.messages.keys().next().value);
    }
    channel.messages.set(data.id, message);
  }
  return [message];
};

const messageDelete = (client, data) => {
  let channel;
  if (data.guild_id !== undefined) {
    channel = client.guilds.get(data.guild_id).channels.get(data.channel_id);
  } else {
    channel = client.privateChannels.get(data.channel_id);
  }
  const message = channel.messages.get(data.id);
  channel.messages.delete(data.id);
  return [message];
};

const messageUpdate = (client, data) => {
  let channel;
  if (data.guild_id !== undefined) {
    channel = client.guilds.get(data.guild_id).channels.get(data.channel_id);
  } else {
    channel = client.privateChannels.get(data.channel_id);
  }
  let message = channel.messages.get(data.id);
  let oldMessage = null;
  if (message !== undefined) {
    oldMessage = { ...message };
    Message.update(message, data);
  } else {
    message = data;
  }
  return [message, oldMessage];
};

const presenceUpdate = (client, data) => {
  const guild = client.guilds.get(data.guild_id);
  const member = guild.members.get(data.user.id);
  let oldPresence = null;
  if (member.presence === null) {
    member.presence = Presence.create(data);
  } else {
    oldPresence = { ...member.presence };
    Presence.update(member.presence, data);
  }
  return [member.presence, oldPresence, guild];
};

const voiceStateUpdate = (client, data) => {
  client.guilds.get(data.guild_id).members.get(data.user_id).voiceState = data;
  return [data];
};

module.exports = {
  channelCreate,
  channelDelete,
  channelUpdate,
  guildCreate,
  guildDelete,
  guildEmojisUpdate,
  guildMemberAdd,
  guildMemberRemove,
  guildMemberUpdate,
  guildRoleCreate,
  guildRoleDelete,
  guildRoleUpdate,
  guildUpdate,
  messageCreate,
  messageDelete,
  messageUpdate,
  presenceUpdate,
  voiceStateUpdate
};
