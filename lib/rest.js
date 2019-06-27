'use strict';

const request = require('./request');

const channel = (channelID) => `channels/${channelID}`;
const channelInvites = (channelID) => `${channel(channelID)}/invites`;
const guildChannels = (guildID) => `guilds/${guildID}/channels`;
const guildInvites = (guildID) => `guilds/${guildID}/invites`;
const invite = (inviteCode) => `/invites/${inviteCode}`;
const bulkDelete = (channelID) => `${messages(channelID)}/bulk-delete`;
const message = (channelID, messageID) => `${messages(channelID)}/${messageID}`;
const messages = (channelID) => `${channel(channelID)}/messages`;
const permission = (channelID, overwriteID) =>
  `${channel(channelID)}/permissions/${overwriteID}`;
const pin = (channelID, messageID) => `${pins(channelID)}/${messageID}`;
const pins = (channelID) => `${channel(channelID)}/pins`;
const reaction = (channelID, messageID, emoji) =>
  `${reactions(channelID, messageID)}/${emoji}`;
const reactions = (channelID, messageID) =>
  `${messages(channelID)}/${messageID}/reactions`;
const typing = (channelID) => `${channel(channelID)}/typing`;
const userReaction = (channelID, messageID, emoji, user) =>
  `${reaction(channelID, messageID, emoji)}/${user}`;

/**
 * Bulk delete a channel's messages
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @arg {string[]} messages Array of message snowflakes
 * @returns {Promise<void>}
 */
const bulkDeleteMessages = (token, channelID, messages) =>
  request('POST', bulkDelete(channelID), token, { messages });

/**
 * Create a channel
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {object} options Channel options
 */
const createChannel = (token, guildID, options) =>
  request('POST', guildChannels(guildID), token, options);

/**
 * Create a channel invite
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @arg {object} [options] Invite options
 * @arg {number} [options.max_age] Time before expiring
 * @arg {number} [options.max_uses] Max amount of uses
 * @arg {boolean} [options.temporary] Temporary membership
 * @arg {boolean} [options.unique] If the invite should be unique
 * @returns {Promise<object>}
 */
const createInvite = (token, channelID, options) =>
  request('POST', channelInvites(channelID), token, options);

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
 * Create a private channel with a user
 * @arg {string} token Token used for authorizing the request
 * @arg {string} userID The user's id
 * @returns {Promise<object>}
 */
const createPrivateChannel = (token, userID) =>
  request('POST', 'users/@me/channels', token, { recipient_id: userID });

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
 * Delete a channel
 * @arg {string} token Token used for authorzing the request
 * @arg {string} channelID The channel's id
 * @returns {Promise<void>}
 */
const deleteChannel = (token, channelID) =>
  request('DELETE', channel(channelID), token);

/**
 * Delete an invite
 * @arg {string} token Token used for authorizing the request
 * @arg {string} inviteCode The invite code
 * @returns {Promise<void>}
 */
const deleteInvite = (token, inviteCode) =>
  request('DELETE', invite(inviteCode), token);

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
 * Delete an overwrite
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @arg {string} overwriteID The overwrite's id
 * @returns {Promise<void>}
 */
const deleteOverwrite = (token, channelID, overwriteID) =>
  request('DELETE', permission(channelID, overwriteID), token);

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
 * Edit a channel
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @arg {object} options Channel options
 * @returns {Promise<object>}
 */
const editChannel = (token, channelID, options) =>
  request('PATCH', channel(channelID), token, options);

/**
 * Edit channel positions
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {object[]} channels Array of channel positions
 * @returns {Promise<void>}
 */
const editChannelPositions = (token, guildID, channels) =>
  request('PATCH', guildChannels(guildID), token, channels);

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
 * Edit an overwrite
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @arg {string} overwriteID The overwrite's id
 * @arg {object} options Overwrite options
 * @arg {number} options.allow Bitwise for allowed permissions
 * @arg {number} options.deny Bitwise for denied permissions
 * @arg {string} options.type The type of edit, member or role
 * @returns {Promise<void>}
 */
const editOverwrite = (token, channelID, overwriteID, options) =>
  request('PUT', permission(channelID, overwriteID), token, options);

/**
 * Get a bot's gateway object
 * @arg {string} token Token used for authorizing the request
 * @returns {Promise<object>}
 */
const getBotGateway = (token) => request('GET', 'gateway/bot', token);

/**
 * Get a channel
 * @arg {sring} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @returns {Promise<object>}
 */
const getChannel = (token, channelID) =>
  request('GET', channel(channelID), token);

/**
 * Get a channel's invites
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @returns {Promise<object[]>}
 */
const getChannelInvites = (token, channelID) =>
  request('GET', channelInvites(channelID), token);

/**
 * Get a guild's channels
 * @arg {sring} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @returns {Promise<object[]>}
 */
const getChannels = (token, guildID) =>
  request('GET', guildChannels(guildID), token);

/**
 * Get the gateway object
 * @returns {Promise<object>}
 */
const getGateway = () => request('GET', 'gateway');

/**
 * Get a guild's invites
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @returns {Promise<object[]>}
 */
const getGuildInvites = (token, guildID) =>
  request('GET', guildInvites(guildID), token);

/**
 * Get an invite
 * @arg {string} token Token used for authorizing the request
 * @arg {string} inviteCode The invite code
 * @arg {object} [options] Options
 * @arg {boolean} [options.with_count] With count
 * @returns {Promise<object>}
 */
const getInvite = (token, inviteCode, options) =>
  request('GET', invite(inviteCode), token, options);

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
 * Type in a channel
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @returns {Promise<void>}
 */
const typeIn = (token, channelID) => request('POST', typing(channelID), token);

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
  createChannel,
  createInvite,
  createMessage,
  createPrivateChannel,
  createReaction,
  deleteAllReactions,
  deleteChannel,
  deleteInvite,
  deleteMessage,
  deleteOverwrite,
  deleteReaction,
  editChannel,
  editChannelPositions,
  editMessage,
  editOverwrite,
  getBotGateway,
  getChannel,
  getChannelInvites,
  getChannels,
  getGateway,
  getGuildInvites,
  getInvite,
  getMessage,
  getMessages,
  getPinnedMessages,
  getReactionUsers,
  pinMessage,
  typeIn,
  unpinMessage
};
