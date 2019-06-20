'use strict';

const request = require('./request');

module.exports = {

  /**
   * Create a message
   * @arg {string} token Token used for authorizing the request
   * @arg {string} channelID The channel id
   * @arg {object} data Message data
   */
  createMessage: (token, channelID, data) =>
    request('POST', `channels/${channelID}/messages`, token, data),

  /**
   * Get a gateway object for a bot
   * @arg {string} token Token used for authorizing the request
   * @returns {Promise<object>}
   */
  getBotGateway: (token) => request('GET', 'gateway/bot', token),

  /**
   * Get the gateway object
   * @returns {Promise<object>}
   */
  getGateway: () => request('GET', 'gateway')
};
