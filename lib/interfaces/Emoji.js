'use strict';

/**
 * Interface of an emoji
 * @arg {object} data Raw data from the API
 * @returns {Emoji}
 */
const create = (data) => ({
  animated: !!data.animated,
  id: data.id,
  managed: data.managed,
  name: data.name,
  requireColons: data.require_colons,
  roles: data.roles,
  user: data.user
});

// eslint-disable-next-line no-unused-vars
const update = (emoji, data) => {
};

module.exports = {
  create,
  update
};

/**
 * @typedef {object} Emoji
 * @prop {boolean} animated
 * @prop {string} id
 * @prop {boolean} managed
 * @prop {string} name
 * @prop {boolean} requireColons
 * @prop {string[]} roles
 * @prop {User} user
 */
