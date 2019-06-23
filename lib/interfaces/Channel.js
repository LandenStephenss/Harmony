'use strict';

const categoryChannel = (data) => ({
  id: data.id,
  guildID: data.guild_id,
  name: data.name,
  type: data.type,
  permissionOverwrites: mapPermissionOverwrites(data.permission_overwrites),
  position: data.position
});

const create = (data) => [textChannel, privateChannel, voiceChannel,
  groupChannel, categoryChannel, newsChannel, storeChannel][data.type](data);

const groupChannel = (data) => ({
  applicationID: data.application_id,
  icon: data.icon,
  id: data.id,
  lastMessageID: data.last_message_id || null,
  ownerID: data.owner_id,
  recipients: data.recipients,
  type: data.type
});

const mapPermissionOverwrites = (permissionOverwrites) => {
  const map = new Map();
  for (const permissionOverwrite of permissionOverwrites) {
    map.set(permissionOverwrite.id, {
      allow: permissionOverwrite.allow,
      deny: permissionOverwrite.deny,
      id: permissionOverwrite.id,
      type: permissionOverwrite.type
    });
  }
  return map;
};

const newsChannel = (data) => ({
  id: data.id,
  guildID: data.guild_id,
  lastMessageID: data.last_message_id,
  lastPinTimestamp: data.last_pin_timestamp,
  name: data.name,
  nsfw: !!data.nsfw,
  parentID: data.parent_id,
  position: data.position,
  permissionOverwrites: mapPermissionOverwrites(data.permission_overwrites),
  topic: data.topic || null,
  type: data.type
});

const privateChannel = (data) => ({
  id: data.id,
  lastMessageID: data.last_message_id || null,
  recipient: data.recipients[0],
  type: data.type
});

const storeChannel = (data) => ({
  id: data.id,
  guildID: data.guild_id,
  parentID: data.parent_id,
  permissionOverwrites: mapPermissionOverwrites(data.permission_overwrites),
  position: data.position,
  type: data.type
});

const textChannel = (data) => ({
  id: data.id,
  guildID: data.guild_id,
  lastMessageID: data.last_message_id,
  lastPinTimestamp: data.last_pin_timestamp || null,
  name: data.name,
  nsfw: !!data.nsfw,
  parentID: data.parent_id,
  position: data.position,
  permissionOverwrites: mapPermissionOverwrites(data.permission_overwrites),
  rateLimitPerUser: data.rate_limit_per_user,
  topic: data.topic || null,
  type: data.type
});

const update = (channel, data) => {
  for (const key of Object.keys(create(data))) {
    channel[key] = data[key];
  }
};

const voiceChannel = (data) => ({
  bitrate: data.bitrate,
  guildID: data.guild_id,
  id: data.id,
  name: data.name,
  position: data.position,
  permissionOverwrites: mapPermissionOverwrites(data.permission_overwrites),
  type: data.type,
  userLimit: data.user_limit
});

module.exports = {
  categoryChannel,
  create,
  groupChannel,
  mapPermissionOverwrites,
  newsChannel,
  privateChannel,
  textChannel,
  update,
  voiceChannel
};
