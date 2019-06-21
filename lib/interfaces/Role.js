'use strict';

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
