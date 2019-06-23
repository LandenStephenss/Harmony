'use strict';

/**
 * Interface of a category channel
 * @arg {object} data Raw data from the API
 * @returns {CategoryChannel}
 */
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

/**
 * Interface of a group channel
 * @arg {object} data Raw data from the API
 * @returns {GroupChannel}
 */
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

/**
 * Interface of a news channel
 * @arg {object} data Raw data from the API
 * @returns {NewsChannel}
 */
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

/**
 * Interface of a private channel
 * @arg {object} data Raw data from the API
 * @returns {PrivateChannel}
 */
const privateChannel = (data) => ({
  id: data.id,
  lastMessageID: data.last_message_id || null,
  recipient: data.recipients[0],
  type: data.type
});

/**
 * Interface of a store channel
 * @arg {object} data Raw data from the API
 * @returns {StoreChannel}
 */
const storeChannel = (data) => ({
  id: data.id,
  guildID: data.guild_id,
  name: data.name,
  parentID: data.parent_id,
  permissionOverwrites: mapPermissionOverwrites(data.permission_overwrites),
  position: data.position,
  type: data.type
});

/**
 * Interface of a text channel
 * @arg {object} data Raw data from the API
 * @returns {TextChannel}
 */
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

// Lazy updating will get fixed soon:tm:
const update = (channel, data) => {
  for (const key of Object.keys(create(data))) {
    channel[key] = data[key];
  }
};

/**
 * Interface of a voice channel
 * @arg {object} data Raw data from the API
 * @returns {VoiceChannel}
 */
const voiceChannel = (data) => ({
  bitrate: data.bitrate,
  guildID: data.guild_id,
  id: data.id,
  name: data.name,
  parentID: data.parent_id,
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

/**
 * @typedef {object} CategoryChannel
 * @prop {string} id
 * @prop {string} guildID
 * @prop {string} name
 * @prop {number} type
 * @prop {Map<string, PermissionOverwrite>} permissionOverwrites
 * @prop {number} position
 */

/**
 * @typedef {object} GroupChannel
 * @prop {string} applicationID
 * @prop {string} icon
 * @prop {string} id
 * @prop {string} lastMessageID
 * @prop {string} ownerID
 * @prop {User[]} recipients
 * @prop {number} type
 */

/**
 * @typedef {object} NewsChannel
 * @prop {string} id
 * @prop {string} guildID
 * @prop {string} lastMessageID
 * @prop {string} name
 * @prop {boolean} nsfw
 * @prop {string} parentID
 * @prop {number} position
 * @prop {Map<string, PermissionOverwrite>} permissionOverwrites
 * @prop {string} topic
 * @prop {number} type
 */

/**
 * @typedef {object} PermissionOverwrite
 * @prop {number} allow
 * @prop {number} deny
 * @prop {string} id
 * @prop {string} type
 */

/**
 * @typedef {object} PrivateChannel
 * @prop {string} id
 * @prop {string} lastMessageID
 * @prop {User} recipient
 * @prop {number} type
 */

/**
 * @typedef {object} StoreChannel
 * @prop {string} id
 * @prop {string} guildID
 * @prop {string} name
 * @prop {string} parentID
 * @prop {number} position
 * @prop {Map<string, PermissionOverwrite>} permissionOverwrites
 * @prop {number} type
 */

/**
 * @typedef {object} TextChannel
 * @prop {string} id
 * @prop {string} guildID
 * @prop {string} lastMessageID
 * @prop {string} name
 * @prop {boolean} nsfw
 * @prop {string} parentID
 * @prop {number} position
 * @prop {Map<string, PermissionOverwrite>} permissionOverwrites
 * @prop {number} rateLimitPerUser
 * @prop {string} topic
 * @prop {number} type
 */

/**
 * @typedef {object} VoiceChannel
 * @prop {number} bitrate
 * @prop {string} id
 * @prop {string} guildID
 * @prop {string} name
 * @prop {string} parentID
 * @prop {number} position
 * @prop {Map<string, PermissionOverwrite>} permissionOverwrites
 * @prop {number} type
 * @prop {number} userLimit
 */
