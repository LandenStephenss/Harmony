'use strict';

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
