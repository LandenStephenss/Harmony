'use strict';

const request = require('./request');

/**
 * Get a gateway object from a bot
 * @arg {String} token Token used for authorizing the request
 * @returns {Promise<void>}
 */
const getBotGateway = (token) => request('GET', 'gateway/bot', token);

/**
 * Get the gateway object
 * @returns {Promise<Object>}
 */
const getGateway = () => request('GET', 'gateway');

module.exports = {
  getBotGateway,
  getGateway
};
