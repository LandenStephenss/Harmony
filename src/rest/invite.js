'use strict';

const request = require('./request');

const invite = (inviteCode) => `/invites/${inviteCode}`;

const channelInvites = (channelID) => `channels/${channelID}/invites`;

const guildInvites = (guildID) => `guilds/${guildID}/invites`;

/**
 * Get an invite
 * @arg {String} token Token used for authorizing the request
 * @arg {String} inviteCode The invite code
 * @arg {Object} [options] Options for the request
 * @arg {Boolean} [options.with_count] Get it with the member count
 * @returns {Promise<Object>}
 */
const getInvite = (token, inviteCode, options) =>
  request('GET', invite(inviteCode), token, options);

/**
 * Get a channel's invites
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @returns {Promise<Object[]>}
 */
const getChannelInvites = (token, channelID) =>
  request('GET', channelInvites(channelID), token);

/**
 * Get a guild's invites
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @returns {Promise<Object[]>}
 */
const getGuildInvites = (token, guildID) =>
  request('GET', guildInvites(guildID), token);

/**
 * Create a channel invite
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @arg {Object} [options] Options for the request
 * @arg {Number} [options.max_age] The invite's time before expiring
 * @arg {Number} [options.max_uses] Max amount of uses
 * @arg {Boolean} [options.temporary] Temporary membership
 * @arg {Boolean} [options.unique] If the invite should be unique
 */
const createInvite = (token, channelID, options) =>
  request('POST', channelInvites(channelID), token, options);

/**
 * Delete an invite
 * @arg {String} token Token used for authorizing the request
 * @arg {String} inviteCode The invite code
 * @returns {Promise<void>}
 */
const deleteInvite = (token, inviteCode) =>
  request('DELETE', invite(inviteCode), token);

module.exports = {
  paths: {
    invite,
    channelInvites,
    guildInvites,
  },
  getInvite,
  getChannelInvites,
  getGuildInvites,
  createInvite,
  deleteInvite
};
