'use strict';

const request = require('./request');

const bulkDelete = (channelID) =>
  `channels/${channelID}/messages/bulk-delete`;

const message = (channelID, messageID) =>
  `channels/${channelID}/messages/${messageID}`;

const messages = (channelID) => `channels/${channelID}/messages`;

const pin = (channelID, messageID) =>
  `channels/${channelID}/pins/${messageID}`;

const pins = (channelID) => `channels/${channelID}/pins`;

const reaction = (channelID, messageID, emoji) =>
  `channels/${channelID}/messages/${messageID}/reactions/${emoji}`;

const reactions = (channelID, messageID) =>
  `channels/${channelID}/messages/${messageID}/reactions`;

const userReaction = (channelID, messageID, emoji, user) =>
  `channels/${channelID}/messages/${messageID}/reactions/${emoji}/${user}`;

/**
 * Bulk delete a channel's messages
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @arg {string[]} messages An array of message snowflakes
 */
const bulkDeleteMessages = (token, channelID, messages) =>
  request('POST', bulkDelete(channelID), token, { messages });

/**
 * Create a message
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @arg {object} options Message options
 * @arg {string} [options.content] Message content
 * @arg {object} [options.embed] Embed object
 * @arg {string} [options.nonce] Message nonce
 * @arg {boolean} [options.tts] Send the message as tts if true
 * @returns {Promise<object>}
 */
const createMessage = (token, channelID, options) =>
  request('POST', messages(channelID), token, options);

/**
 * React to a message
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @arg {string} messageID The message's id
 * @arg {string} emoji The emoji to react (must be encoded)
 * @returns {Promise<void>}
 */
const createReaction = (token, channelID, messageID, emoji) =>
  request('PUT', userReaction(channelID, messageID, emoji), token);

/**
 * Delete all reactions from a message
 * @arg {string} token Token used for authorzing the request
 * @arg {string} channelID The channel's id
 * @arg {string} messageID The message's id
 * @arg {string} emoji The emoji
 * @returns {Promise<void>}
 */
const deleteAllReactions = (token, channelID, messageID) =>
  request('DELETE', reactions(channelID, messageID), token);

/**
 * Delete a message
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @arg {string} messageID The message'is id
 * @returns {Promise<void>}
 */
const deleteMessage = (token, channelID, messageID) =>
  request('DELETE', message(channelID, messageID), token);

/**
 * Delete a user's reaction
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @arg {string} messageID The message's id
 * @arg {string} emoji The emoji
 * @arg {string} [user] The user
 * @returns {Promise<void>}
 */
const deleteReaction = (token, channelID, messageID, emoji, user = '@me') =>
  request('DELETE', userReaction(channelID, messageID, emoji, user), token);

/**
 * Edit a message
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @arg {string} messageID The message's id
 * @arg {object} options Message options
 * @arg {string} [options.content] Message content
 * @arg {object} [options.embed] Message emed
 * @returns {Promise<object>}
 */
const editMessage = (token, channelID, messageID, options) =>
  request('PATCH', message(channelID, messageID), token, options);

/**
 * Get a bot's gateway object
 * @arg {string} token Token used for authorizing the request
 * @returns {Promise<object>}
 */
const getBotGateway = (token) => request('GET', 'gateway/bot', token);

/**
 * Get the gateway object
 * @returns {Promise<object>}
 */
const getGateway = () => request('GET', 'gateway');

/**
 * Get a message
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @arg {string} messageID The message's id
 * @returns {Promise<object>}
 */
const getMessage = (token, channelID, messageID) =>
  request('GET', message(channelID, messageID), token);

/**
 * Get a channel's messages
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @arg {object} [options] Options for the request
 * @arg {string} [options.after] Get the messages after this id
 * @arg {string} [options.before] Get the messages before this id
 * @arg {string} [options.around] Get the messages around this id
 * @arg {number} [options.limit] The amount of messages to get
 * @returns {Promise<object[]>}
 */
const getMessages = (token, channelID, options) =>
  request('GET', messages(channelID), token, options);

/**
 * Get a channel's pinned messages
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @returns {Promise<object[]>}
 */
const getPinnedMessages = (token, channelID) =>
  request('GET', pins(channelID), token);

/**
 * Get a reaction's users
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @arg {string} messageID The message's id
 * @arg {string} emoji The emoji
 * @arg {object} [options] Options for the request
 * @arg {string} [options.after] Get the users after this id
 * @arg {string} [options.before] Get the users before this id
 * @arg {number} [options.limit] The amount of users to get
 * @returns {Promise<object[]>}
 */
const getReactionUsers = (token, channelID, messageID, emoji, options) =>
  request('GET', reaction(channelID, messageID, emoji), token, options);

/**
 * Pin a message
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @arg {string} messageID The message's id
 * @returns {Promise<void>}
 */
const pinMessage = (token, channelID, messageID) =>
  request('PUT', pin(channelID, messageID), token);

/**
 * Unpin a message
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @arg {string} messageID The message's id
 * @returns {Promise<void>}
 */
const unpinMessage = (token, channelID, messageID) =>
  request('DELETE', pin(channelID, messageID), token);

module.exports = {
  bulkDeleteMessages,
  createMessage,
  createReaction,
  deleteAllReactions,
  deleteMessage,
  deleteReaction,
  editMessage,
  getBotGateway,
  getGateway,
  getMessage,
  getMessages,
  getPinnedMessages,
  getReactionUsers,
  pinMessage,
  unpinMessage
};
