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
 * @prop {boolean} animated If the emoji is animated or not
 * @prop {string} id The emoji's id
 * @prop {boolean} managed If the emoji is managed or not
 * @prop {string} name The emoji's name
 * @prop {boolean} requireColons If the emoji requires colons or not
 * @prop {string[]} roles The roles of the emoji
 * @prop {User} user The user that create the emoji
 */
