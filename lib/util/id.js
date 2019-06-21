'use strict';

const toTimestamp = (id) => Math.floor(id / 4194304 + 1420070400000);

const toSnowflake = (timestamp) => (timestamp - 1420070400000) * 4194304;

module.exports = {
  toTimestamp,
  toSnowflake
};
