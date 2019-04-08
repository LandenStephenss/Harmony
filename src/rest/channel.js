'use strict';

const request = require('./request');

const channel = (channelID) => `channels/${channelID}`;

const permission = (channelID, overwriteID) =>
  `channels/${channelID}/permissions/${overwriteID}`;

const typing = (channelID) => `channels/${channelID}/typing`;

const invites = (channelID) => `channels/${channelID}/invites`;

/**
 * Get a channel
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @returns {Promise<Object>}
 */
const getChannel = (token, channelID) =>
  request('GET', channel(channelID), token);

/**
 * Edit a channel
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @arg {Object} options Options for the edit
 * @arg {String} [options.name] Set the name
 * @arg {Number} [options.position] Set thes position
 * @arg {String} [options.topic] Set the topic (Text only)
 * @arg {Boolean} [options.nsfw] Make the channel nsfw or not (Text only)
 * @arg {Number} [options.rate_limit_per_user] Set the ratelimit(Text only)
 * @arg {Number} [options.bitrate] Set the bitrate (Voice only)
 * @arg {Number} [options.user_limit] Set the user limit (Voice only)
 * @arg {Object[]} [options.permission_overwrites] Edit the overwrites
 * @arg {String} [options.parent_id] Set the category (Text and Voice only)
 * @returns {Promise<Object>}
 */
const editChannel = (token, channelID, options) =>
  request('PATCH', channel(channelID), token, options);

/**
 * Delete a channel
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @returns {Promise<Object>}
 */
const deleteChannel = (token, channelID) =>
  request('DELETE', channel(channelID), token);

/**
 * Edit a channel's permissions
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @arg {String} overwriteID The overwrite's id
 * @arg {Object} options Options for the edit
 * @arg {Number} options.allow Bitwise for allowed permissions
 * @arg {Number} options.deny Bitwise for denied permissions
 * @arg {String} options.type The type of edit, member or role
 * @returns {Promise<void>}
 */
const editChannelPermissions = (token, channelID, overwriteID, options) =>
  request('PUT', permission(channelID, overwriteID), token, options);

/**
 * Delete a channel permission
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @arg {String} overwriteID The overwrite's id
 * @returns {Promise<void>}
 */
const deleteChannelPermission = (token, channelID, overwriteID) =>
  request('DELETE', permission(channelID, overwriteID), token);

/**
 * Trigger a typing indicator for a channel
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @returns {Promise<void>}
 */
const triggerTypingIndicator = (token, channelID) =>
  request('POST', typing(channelID), token);

/**
 * Get a channel's invites
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @returns {Promise<Object[]>}
 */
const getChannelInvites = (token, channelID) =>
  request('GET', invites(channelID), token);

/**
 * Create a channel invite
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @arg {Object} options Options for the request
 * @arg {Number} [options.max_age] The invite's time before expiring
 * @arg {Number} [options.max_uses] Max amount of uses
 * @arg {Boolean} [options.temporary] Temporary membership
 * @arg {Boolean} [options.unique] If the invite should be unique
 */
const createChannelInvite = (token, channelID, options) =>
  request('POST', invites(channelID), token, options);

module.exports = {
  paths: {
    channel,
    permission,
    typing,
    invites
  },
  getChannel,
  deleteChannel,
  editChannel,
  deleteChannelPermission,
  editChannelPermissions,
  triggerTypingIndicator,
  getChannelInvites,
  createChannelInvite
};
