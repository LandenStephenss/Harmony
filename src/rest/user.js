'use strict';

const request = require('./request');

const user = (userID) => `users/${userID}`;

/**
 * Get a user
 * @arg {String} token Token used for authorizing the request
 * @arg {Object} userID The user's id
 * @returns {Promise<Object>}
 */
const getUser = (token, userID) => request('GET', user(userID), token);

/**
 * Edit the client user
 * @arg {String} token Token used for authorizing the request
 * @arg {Object} options Options for the edit
 * @arg {String} [options.username] Set the username
 * @arg {String} [options.avatar] Set the avatar
 * @returns {Promise<Object>}
 */
const editSelf = (token, options) =>
  request('PATCH', user('@me'), token, options);

module.exports = {
  paths: {
    user
  },
  getUser,
  editSelf
};
