'use strict';

const request = require('./request');

const guild = (guildID) => `guilds/${guildID}`;

const ban = (guildID, userID) => `guilds/${guildID}/bans/${userID}`;

const bans = (guildID) => `guilds/${guildID}/bans`;

const emoji = (guildID, emojiID) => `guilds/${guildID}/emojis/${emojiID}`;

const emojis = (guildID) => `guilds/${guildID}/emojis`;

/**
 * Get a guild
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @returns {Promise<Object>}
 */
const getGuild = (token, guildID) => request('GET', guild(guildID), token);

/**
 * Edit a guild
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {Object} options Options for the request
 * @arg {String} [options.name] Set the name
 * @arg {String} [options.region] Set the region
 * @arg {Number} [options.verification_level] Set the verification level
 * @arg {Number} [options.default_message_notifications] Message notifications
 * @arg {Number} [options.explicit_content_filter] Content filter
 * @arg {String} [options.afk_channel_id] Set the afk channel
 * @arg {Number} [options.afk_timeout] Set the afk timeout
 * @arg {String} [options.icon] Set the icon
 * @arg {string} [options.owner_id] Set the owner(why is this a thing lol)
 * @arg {String} [options.splash] Set the splash (VIP only)
 * @arg {String} [options.system_channel_id] Set the system channel
 * @returns {Promise<Object>}
 */
const editGuild = (token, guildID, options) =>
  request('PATCH', guild(guildID), token, options);

/**
 * Delete a guild
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @returns {Promise<void>}
 */
const deleteGuild = (token, guildID) =>
  request('DELETE', guild(guildID), token);

/**
 * Get a ban object
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {String} userID The user's id
 * @returns {Promise<Object>}
 */
const getGuildBan = (token, guildID, userID) =>
  request('GET', ban(guildID, userID), token);

/**
 * Get an array of ban objects from a guild
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @returns {Promise<Object[]>}
 */
const getGuildBans = (token, guildID) => request('GET', bans(guildID), token);

/**
 * Get an emoji
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {String} emojiID The emoji's id
 * @returns {Promise<Object>}
 */
const getGuildEmoji = (token, guildID, emojiID) =>
  request('GET', emoji(guildID, emojiID), token);

/**
 * Get a guild's emojis
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @returns {Promise<Object[]>}
 */
const getGuildEmojis = (token, guildID) =>
  request('GET', emojis(guildID), token);

/**
 * Create an emoji
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {Object} options Options for the edit
 * @arg {Object} options.name The emoji's name
 * @arg {String} options.image Base64 image data
 * @arg {String[]} [options.roles] Roles to be whitelisted
 * @returns {Promise<Object>}
 */
const createEmoji = (token, guildID, options) =>
  request('POST', emojis(guildID), token, options);

/**
 * Edit an emoji
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {String} emojiID The emoji's id
 * @arg {Object} options Options for the edit
 * @arg {String} [options.name] Set the name
 * @arg {String[]} [options.roles] Set the roles to be whitelisted
 * @returns {Promise<Object>}
 */
const editEmoji = (token, guildID, emojiID, options) =>
  request('PATCH', emoji(guildID, emojiID), token, options);

/**
 * Delete an emoji
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {String} emojiID The emoji's id
 * @returns {Promise<void>}
 */
const deleteEmoji = (token, guildID, emojiID) =>
  request('DELETE', emoji(guildID, emojiID), token);

module.exports = {
  paths: {
    emoji,
    emojis
  },
  getGuild,
  deleteGuild,
  editGuild,
  getGuildBan,
  getGuildBans,
  getGuildEmoji,
  getGuildEmojis,
  createEmoji,
  deleteEmoji,
  editEmoji
};
