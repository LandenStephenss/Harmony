'use strict';

/**
 * Interface of a role
 * @arg {object} data Raw data from the API
 * @returns {Role}
 */
const create = (data) => {
  const role = {
    color: data.color,
    hoist: data.hoist,
    id: data.id,
    managed: data.managed,
    name: data.name,
    mentionable: data.mentionable,
    permissions: data.permissions,
    position: data.position
  };
  update(role, data);
  return role;
};

const update = (role, data) => {
  role.color = data.color;
  role.hoist = data.hoist;
  role.managed = data.managed;
  role.name = data.name;
  role.mentionable = data.mentionable;
  role.permissions = data.permissions;
  role.position = data.position;
};

module.exports = {
  create,
  update
};

/**
 * @typedef {object} Role
 * @prop {number} color The role's color
 * @prop {boolean} hoist If the role is hoisted or not
 * @prop {string} id The guild's id
 * @prop {boolean} managed if the role is managed or not
 * @prop {string} name The role's name
 * @prop {boolean} mentionable If the role is mentionable or not
 * @prop {number} permissions The role's permissions
 * @prop {number} position The role's position
 */
