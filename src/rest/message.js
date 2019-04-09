'use strict';

const request = require('./request');

const message = (channelID, messageID) =>
  `channels/${channelID}/messages/${messageID}`;

const messages = (channelID) => `channels/${channelID}/messages`;

const bulkDelete = (channelID) =>
  `channels/${channelID}/messages/bulk-delete`;

const pin = (channelID, messageID) =>
  `channels/${channelID}/pins/${messageID}`;

const pins = (channelID) => `channels/${channelID}/pins`;

const reaction = (channelID, messageID, emoji) =>
  `channels/${channelID}/messages/${messageID}/reactions/${emoji}`;

const reactions = (channelID, messageID) =>
  `channels/${channelID}/messages/${messageID}/reactions`;

const userReaction = (channelID, messageID, emoji, user = '@me') =>
  `channels/${channelID}/messages/${messageID}/reactions/${emoji}/${user}`;

/**
 * Get a message
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @arg {String} messageID The message's id
 * @returns {Promise<Object>}
 */
const getMessage = (token, channelID, messageID) =>
  request('GET', message(channelID, messageID), token);

/**
 * Get a channel's messages
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @arg {Object} [options] Options for the request
 * @arg {String} [options.after] Get the messages after this id
 * @arg {String} [options.before] Get the messages before this id
 * @arg {String} [options.around] Get the messages around this id
 * @arg {Number} [options.limit] The amount of messages to get
 * @returns {Promise<Object[]>}
 */
const getMessages = (token, channelID, options) =>
  request('GET', messages(channelID), token, options);

/**
 * Create a message
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @arg {Object} options Options for the message
 * @arg {String} [options.content] Content for the message
 * @arg {Object} [options.embed] Embed for the message
 * @arg {String} [options.nonce] Message nonce
 * @arg {Boolean} [options.tts] Send the message with tts if true
 * @returns {Promise<Object>}
 */
const createMessage = (token, channelID, options) =>
  request('POST', messages(channelID), token, options);

/**
 * Edit a message
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @arg {String} messageID The message's id
 * @arg {Object} options Options for the edit
 * @arg {String} [options.content] Content for the edit
 * @arg {Object} [options.embed] Embed for the edit
 * @returns {Promise<Object>}
 */
const editMessage = (token, channelID, messageID, options) =>
  request('PATCH', message(channelID, messageID), token, options);

/**
 * Delete a message
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @arg {String} messageID The message'is id
 * @returns {Promise<void>}
 */
const deleteMessage = (token, channelID, messageID) =>
  request('DELETE', message(channelID, messageID), token);

/**
 * Bulk delete a channel's messages
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @arg {String[]} messageIDs An array of message ids
 * @returns {Promise<void>}
 */
const bulkDeleteMessages = (token, channelID, messageIDs) =>
  request('POST', bulkDelete(channelID), token, { messageIDs });

/**
 * Pin a message
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @arg {String} messageID The message's id
 * @returns {Promise<void>}
 */
const pinMessage = (token, channelID, messageID) =>
  request('PUT', pin(channelID, messageID), token);

/**
 * Unpin a message
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @arg {String} messageID The message's id
 * @returns {Promise<void>}
 */
const unpinMessage = (token, channelID, messageID) =>
  request('DELETE', pin(channelID, messageID), token);

/**
 * Get a channel's pinned messages
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @returns {Promise<Object[]>}
 */
const getPinnedMessages = (token, channelID) =>
  request('GET', pins(channelID), token);

/**
 * Get a reaction's users
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @arg {String} messageID The message's id
 * @arg {String} emoji The emoji
 * @arg {Object} [options] Options for the request
 * @arg {String} [options.after] Get the users after this id
 * @arg {String} [options.before] Get the users before this id
 * @arg {Number} [options.limit] The amount of users to get
 * @returns {Promise<Object[]>}
 */
const getReactionUsers = (token, channelID, messageID, emoji, options) =>
  request('GET', reaction(channelID, messageID, emoji), token, options);

/**
 * Create a reaction
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @arg {String} messageID The message's id
 * @arg {String} emoji The emoji to react with
 * @returns {Promise<void>}
 */
const createReaction = (token, channelID, messageID, emoji) =>
  request('PUT', userReaction(channelID, messageID, emoji), token);

/**
 * Delete a user's reaction
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @arg {String} messageID The message's id
 * @arg {String} emoji The emoji
 * @arg {String} [user] The user
 * @returns {Promise<void>}
 */
const deleteReaction = (token, channelID, messageID, emoji, user) =>
  request('DELETE', userReaction(channelID, messageID, emoji, user), token);

/**
 * Delete all reactions from a message
 * @arg {String} token Token used for authorzing the request
 * @arg {String} channelID The channel's id
 * @arg {String} messageID The message's id
 * @arg {String} emoji The emoji
 * @returns {Promise<void>}
 */
const deleteAllReactions = (token, channelID, messageID) =>
  request('DELETE', reactions(channelID, messageID), token);

module.exports = {
  paths: {
    message,
    messages,
    bulkDelete,
    pin,
    pins,
    reaction,
    reactions,
    userReaction
  },
  getMessage,
  getMessages,
  createMessage,
  deleteMessage,
  editMessage,
  bulkDeleteMessages,
  pinMessage,
  unpinMessage,
  getPinnedMessages,
  getReactionUsers,
  createReaction,
  deleteReaction,
  deleteAllReactions
};
