'use strict';

/**
 * Interface of a category channel
 * @arg {object} data Raw data from the API
 * @returns {CategoryChannel}
 */
const categoryChannel = (data) => ({
  guildID: data.guild_id,
  id: data.id,
  name: data.name,
  permissionOverwrites: mapPermissionOverwrites(data.permission_overwrites),
  position: data.position,
  type: data.type
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
  messages: null,
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
  guildID: data.guild_id,
  id: data.id,
  lastMessageID: data.last_message_id,
  lastPinTimestamp: data.last_pin_timestamp,
  messages: null,
  name: data.name,
  nsfw: !!data.nsfw,
  parentID: data.parent_id,
  permissionOverwrites: mapPermissionOverwrites(data.permission_overwrites),
  position: data.position,
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
  messages: null,
  recipient: data.recipients[0],
  type: data.type
});

/**
 * Interface of a store channel
 * @arg {object} data Raw data from the API
 * @returns {StoreChannel}
 */
const storeChannel = (data) => ({
  guildID: data.guild_id,
  id: data.id,
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
  guildID: data.guild_id,
  id: data.id,
  lastMessageID: data.last_message_id,
  lastPinTimestamp: data.last_pin_timestamp || null,
  messages: null,
  name: data.name,
  nsfw: !!data.nsfw,
  parentID: data.parent_id,
  permissionOverwrites: mapPermissionOverwrites(data.permission_overwrites),
  position: data.position,
  rateLimitPerUser: data.rate_limit_per_user,
  topic: data.topic || null,
  type: data.type
});

const update = (channel, data) => {
  const x = create(data);
  if (x.messages !== undefined) {
    delete x.messages;
  }
  for (const key of Object.keys(x)) {
    channel[key] = x[key];
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
  permissionOverwrites: mapPermissionOverwrites(data.permission_overwrites),
  position: data.position,
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
 * @prop {string} guildID The channel's guild's id
 * @prop {string} id The channel's id
 * @prop {string} name The channel's name
 * @prop {Map<string, PermissionOverwrite>} permissionOverwrites Overwrites
 * @prop {number} position The channel's position
 * @prop {number} type The channels type (always 4)
 */

/**
 * @typedef {object} GroupChannel
 * @prop {string} applicationID The application that created this's id
 * @prop {string} icon The channel's icon
 * @prop {string} id The channel's id
 * @prop {string} lastMessageID The last message that was sent's id
 * @prop {Map<string, Message>} messages The channel's messages
 * @prop {string} ownerID The owner of the channel
 * @prop {User[]} recipients The recipients of the channel
 * @prop {number} type The channel's type (always 3)
 */

/**
 * @typedef {object} NewsChannel
 * @prop {string} guildID The channel's guild's id
 * @prop {string} id The channel'is id
 * @prop {string} lastMessageID The last message that was sent's id
 * @prop {Map<string, Message>} messages The channel's messages
 * @prop {string} name The channel's name
 * @prop {boolean} nsfw If the channel is nsfw or not
 * @prop {string} parentID The channel's parent id
 * @prop {Map<string, PermissionOverwrite>} permissionOverwrites Overwrites
 * @prop {number} position The channel's position
 * @prop {string} topic The channel's topic
 * @prop {number} type The channel's type (always 5)
 */

/**
 * @typedef {object} PermissionOverwrite
 * @prop {number} allow Bitfield of allowed permissions
 * @prop {number} deny Bitfield of denied permissions
 * @prop {string} id The id of the permission overwrite
 * @prop {string} type The type of overwrite, 'member' or 'role'
 */

/**
 * @typedef {object} PrivateChannel
 * @prop {string} id The channel's id
 * @prop {string} lastMessageID The last message that was sent's id
 * @prop {Map<string, Message>} messages The channel's messages
 * @prop {User} recipient The recipient of the channel
 * @prop {number} type The channel's type (always 1)
 */

/**
 * @typedef {object} StoreChannel
 * @prop {string} guildID The channel's guild's id
 * @prop {string} id The channel's id
 * @prop {string} name The channel's name
 * @prop {string} parentID The channel's parent's id
 * @prop {Map<string, PermissionOverwrite>} permissionOverwrites Overwrites
 * @prop {number} position The channel's position
 * @prop {number} type The channel's type (always 6)
 */

/**
 * @typedef {object} TextChannel
 * @prop {string} guildID The channel's guild's id
 * @prop {string} id The channel's id
 * @prop {string} lastMessageID The last message that was sent's id
 * @prop {Map<string, Message>} messages The channel's messages
 * @prop {string} name The channel's name
 * @prop {boolean} nsfw If the channel is nsfw or not
 * @prop {string} parentID The channel's parent's id
 * @prop {Map<string, PermissionOverwrite>} permissionOverwrites Overwrites
 * @prop {number} position The channel's position
 * @prop {number} rateLimitPerUser The rate limit per user (in seconds)
 * @prop {string} topic The channel's topic
 * @prop {number} type The channel's type (always 0)
 */

/**
 * @typedef {object} VoiceChannel
 * @prop {number} bitrate The channel's bitrate
 * @prop {string} guildID The channel's guild's id
 * @prop {string} id The channel's id
 * @prop {string} name The channel's name
 * @prop {string} parentID The channel's parent's id
 * @prop {Map<string, PermissionOverwrite>} permissionOverwrites Overwrites
 * @prop {number} position The channel's position
 * @prop {number} type The channel's type (always 2)
 * @prop {number} userLimit The total number of users the channel can hold
 */
