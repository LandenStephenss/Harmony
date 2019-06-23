'use strict';

/**
 * Interface of a member
 * @param {object} data Raw data from the API
 * @returns {Member}
 */
const create = (data) => ({
  deaf: data.deaf,
  joinedAt: Date.parse(data.joined_at),
  mute: data.mute,
  nick: data.nick || null,
  premiumSince: data.premium_since || null,
  presence: null,
  roles: data.roles,
  user: data.user,
  voiceState: null
});

// eslint-disable-next-line no-unused-vars
const update = (member, data) => {
};

module.exports = {
  create,
  update
};

/**
 * @typedef {object} Member
 * @prop {boolean} deaf
 * @prop {number} joinedAt
 * @prop {boolean} mute
 * @prop {string} nick
 * @prop {string} premiumSince
 * @prop {Presence} presence
 * @prop {string[]} roles
 * @prop {User} user
 * @prop {object} voiceState
 */
