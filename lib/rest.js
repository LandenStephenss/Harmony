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

const userReaction = (channelID, messageID, emoji, user = '@me') =>
  `channels/${channelID}/messages/${messageID}/reactions/${emoji}/${user}`;

const bulkDeleteMessages = (token, channelID, messages) =>
  request('POST', bulkDelete(channelID), token, { messages });

const createMessage = (token, channelID, options) =>
  request('POST', messages(channelID), token, options);

const createReaction = (token, channelID, messageID, emoji) =>
  request('PUT', userReaction(channelID, messageID, emoji), token);

const deleteAllReactions = (token, channelID, messageID) =>
  request('DELETE', reactions(channelID, messageID), token);

const deleteMessage = (token, channelID, messageID) =>
  request('DELETE', message(channelID, messageID), token);

const deleteReaction = (token, channelID, messageID, emoji, user) =>
  request('DELETE', userReaction(channelID, messageID, emoji, user), token);

const editMessage = (token, channelID, messageID, options) =>
  request('PATCH', message(channelID, messageID), token, options);

const getBotGateway = (token) => request('GET', 'gateway/bot', token);

const getGateway = () => request('GET', 'gateway');

const getMessage = (token, channelID, messageID) =>
  request('GET', message(channelID, messageID), token);

const getMessages = (token, channelID, options) =>
  request('GET', messages(channelID), token, options);

const getPinnedMessages = (token, channelID) =>
  request('GET', pins(channelID), token);

const getReactionUsers = (token, channelID, messageID, emoji, options) =>
  request('GET', reaction(channelID, messageID, emoji), token, options);

const pinMessage = (token, channelID, messageID) =>
  request('PUT', pin(channelID, messageID), token);

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
