'use strict';

const create = (data) => ({
  deaf: data.deaf,
  joinedAt: data.joined_at,
  mute: data.mute,
  nick: data.nick,
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
