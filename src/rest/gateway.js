'use strict';

const request = require('./request');

/**
 * Get the gateway object
 * @returns {Promise<Object>}
 */
const getGateway = () => request('GET', 'gateway');

/**
 * Get a gateway object from a bot
 * @arg {String} token Token used for authorizing the request
 * @returns {Promise<Object>}
 */
const getBotGateway = (token) => request('GET', 'gateway/bot', token);

module.exports = {
  getGateway,
  getBotGateway
};
