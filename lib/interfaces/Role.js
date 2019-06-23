'use strict';

/**
 * Interface of a role
 * @arg {object} data Raw data from the API
 * @returns {Role}
 */
const create = (data) => ({
  color: data.color,
  hoist: data.hoist,
  id: data.id,
  managed: data.managed,
  name: data.name,
  mentionable: data.mentionable,
  permissions: data.permissions,
  position: data.position
});

// eslint-disable-next-line no-unused-vars
const update = (role, data) => {
};

module.exports = {
  create,
  update
};

/**
 * @typedef {object} Role
 * @prop {number} color
 * @prop {boolean} hoist
 * @prop {string} id
 * @prop {boolean} managed
 * @prop {string} name
 * @prop {boolean} mentionable
 * @prop {number} permissions
 * @prop {number} position
 */
