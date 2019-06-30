'use strict';

/**
 * Interface of a member
 * @param {object} data Raw data from the API
 * @returns {Member}
 */
const create = (data, client) => {
  const member = {
    deaf: data.deaf,
    joinedAt: Date.parse(data.joined_at),
    mute: data.mute,
    nick: null,
    premiumSince: data.premium_since || null,
    presence: null,
    roles: data.roles,
    user: client.users.get(data.user.id),
    voiceState: null
  };
  update(member, data);
  return member;
};

const update = (member, data) => {
  member.nick = data.nick || null;
  member.roles = data.roles;
  member.user = data.user;
};

module.exports = {
  create,
  update
};

/**
 * @typedef {object} Member
 * @prop {boolean} deaf If the member is deaf
 * @prop {number} joinedAt The time when the member joined
 * @prop {boolean} mute If the member is muted
 * @prop {string} nick The member's nick
 * @prop {string} premiumSince Time member was premium
 * @prop {Presence} presence The member's presence
 * @prop {string[]} roles The member's role
 * @prop {User} user The member user
 * @prop {object} voiceState The member's voice state
 */
