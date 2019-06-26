'use strict';

/**
 * Transform a timestamp to an id
 * @arg {number} timestamp A timestamp
 * @returns {number}
 */
const toSnowflake = (timestamp) => (timestamp - 1420070400000) * 4194304;

/**
 * Transform an id to a timestamp
 * @arg {number} id An id
 * @returns {number}
 */
const toTimestamp = (id) => Math.floor(id / 4194304 + 1420070400000);

module.exports = {
  toSnowflake,
  toTimestamp
};
