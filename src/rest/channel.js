'use strict';

const request = require('./request');

const channel = (channelID) => `channels/${channelID}`;

const guildChannels = (guildID) => `guilds/${guildID}/channels`;

const permission = (channelID, overwriteID) =>
  `channels/${channelID}/permissions/${overwriteID}`;

const typing = (channelID) => `channels/${channelID}/typing`;

/**
 * Get a channel
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @returns {Promise<Object>}
 */
const getChannel = (token, channelID) =>
  request('GET', channel(channelID), token);

/**
 * Get a guild's channels
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @returns {Promise<Object[]>}
 */
const getChannels = (token, guildID) =>
  request('GET', guildChannels(guildID), token);

/**
 * Create a guild channel
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {Object} options Options for thh request
 * @arg {String} options.name The name for the channel
 * @arg {Number} [options.type] The type of channel
 * @arg {String} [options.topic] The topic of the channel
 * @arg {Number} [options.bitrate] The bitrate
 * @arg {Number} [options.user_limit] The user limit
 * @arg {Number} [options.rate_limit_per_user] The rate limit
 * @arg {Number} [options.position] Set the channel position
 * @arg {Object[]} [options.permission_overwrites] Array of overwrites
 * @arg {String} [options.parent_id] Set the parent of the channel
 * @arg {Boolean} [options.nsfw] Set the channel to nsfw
 * @returns {Promise<Object>}
 */
const createChannel = (token, guildID, options) =>
  request('POST', guildChannels(guildID), token, options);

/**
 * Edit a channel
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @arg {Object} options Options for the edit
 * @arg {String} [options.name] Set the name
 * @arg {Number} [options.position] Set thes position
 * @arg {String} [options.topic] Set the topic (Text only)
 * @arg {Boolean} [options.nsfw] Make the channel nsfw or not (Text only)
 * @arg {Number} [options.rate_limit_per_user] Set the rate limit (Text only)
 * @arg {Number} [options.bitrate] Set the bitrate (Voice only)
 * @arg {Number} [options.user_limit] Set the user limit (Voice only)
 * @arg {Object[]} [options.permission_overwrites] Edit the overwrites
 * @arg {String} [options.parent_id] Set the category (Text and Voice only)
 * @returns {Promise<Object>}
 */
const editChannel = (token, channelID, options) =>
  request('PATCH', channel(channelID), token, options);

/**
 * Edit guild channel positions
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {Object[]} channel An array of { id, position }
 * @returns {Promise<void>}
 */
const editChannelPositions = (token, guildID, channels) =>
  request('PATCH', guildChannels(guildID), token, channels);

/**
 * Delete a channel
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @returns {Promise<Object>}
 */
const deleteChannel = (token, channelID) =>
  request('DELETE', channel(channelID), token);

/**
 * Edit a channel overwrite
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @arg {String} overwriteID The overwrite's id
 * @arg {Object} options Options for the edit
 * @arg {Number} options.allow Bitwise for allowed permissions
 * @arg {Number} options.deny Bitwise for denied permissions
 * @arg {String} options.type The type of edit, member or role
 * @returns {Promise<void>}
 */
const editOverwrite = (token, channelID, overwriteID, options) =>
  request('PUT', permission(channelID, overwriteID), token, options);

/**
 * Delete a channel overwrite
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @arg {String} overwriteID The overwrite's id
 * @returns {Promise<void>}
 */
const deleteOverwrite = (token, channelID, overwriteID) =>
  request('DELETE', permission(channelID, overwriteID), token);

/**
 * Trigger a typing indicator for a channel
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @returns {Promise<void>}
 */
const triggerTypingIndicator = (token, channelID) =>
  request('POST', typing(channelID), token);

module.exports = {
  paths: {
    channel,
    guildChannels,
    permission,
    typing
  },
  getChannel,
  getChannels,
  createChannel,
  deleteChannel,
  editChannel,
  editChannelPositions,
  deleteOverwrite,
  editOverwrite,
  triggerTypingIndicator
};
