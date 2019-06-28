'use strict';

const request = require('./request');

const auditLogs = (guildID) => `${guild(guildID)}/audit-logs`;
const ban = (guildID, userID) => `${bans(guildID)}/${userID}`;
const bans = (guildID) => `guilds/${guildID}/bans`;
const bulkDelete = (channelID) => `${messages(channelID)}/bulk-delete`;
const channel = (channelID) => `channels/${channelID}`;
const channelInvites = (channelID) => `${channel(channelID)}/invites`;
const embed = (guildID) => `${guild(guildID)}/embed`;
const emoji = (guildID, emojiID) => `${emojis(guildID)}/${emojiID}`;
const emojis = (guildID) => `${guild(guildID)}/emojis`;
const guild = (guildID) => `guilds/${guildID}`;
const guildChannels = (guildID) => `${guild(guildID)}/channels`;
const guildInvites = (guildID) => `${guild(guildID)}/invites`;
const integration = (guildID, integrationID) =>
  `${integrations(guildID)}/${integrationID}`;
const integrations = (guildID) => `${guild(guildID)}/integrations`;
const invite = (inviteCode) => `/invites/${inviteCode}`;
const meGuild = (guildID) => `users/@me/guilds/${guildID}`;
const member = (guildID, userID) => `${members(guildID)}/${userID}`;
const memberRole = (guildID, userID, roleID) =>
  `${member(guildID, userID)}/roles/${roleID} `;
const members = (guildID) => `${guild(guildID)} /members`;
const message = (channelID, messageID) => `${messages(channelID)}/${messageID}`;
const messages = (channelID) => `${channel(channelID)}/messages`;
const permission = (channelID, overwriteID) =>
  `${channel(channelID)}/permissions/${overwriteID}`;
const pin = (channelID, messageID) => `${pins(channelID)}/${messageID}`;
const pins = (channelID) => `${channel(channelID)}/pins`;
const prune = (guildID) => `${guild(guildID)}/prune`;
const reaction = (channelID, messageID, emoji) =>
  `${reactions(channelID, messageID)}/${emoji}`;
const reactions = (channelID, messageID) =>
  `${messages(channelID)}/${messageID}/reactions`;
const regions = (guildID) => `${guild(guildID)}/regions`;
const role = (guildID, roleID) => `${role(guildID)}/${roleID}`;
const roles = (guildID) => `${guild(guildID)}/roles`;
const sync = (guildID) => `${integrations(guildID)}/sync`;
const typing = (channelID) => `${channel(channelID)}/typing`;
const userReaction = (channelID, messageID, emoji, user) =>
  `${reaction(channelID, messageID, emoji)}/${user}`;
const vanity = (guildID) => `${guild(guildID)}/vanity-url`;

module.exports = {

  /**
   * Add a role to a member
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {string} userID The user's id
   * @arg {string} roleID The role's id
   * @returns {Promise<void>}
   */
  addMemberRole: (token, guildID, userID, roleID) =>
    request('PUT', memberRole(guildID, userID, roleID), token),

  /**
   * Ban a member
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {string} userID The user's id
   * @arg {number} [days] Delete message days
   * @returns {Promise<void>}
   */
  banMember: (token, guildID, userID, days = null) =>
    request('PUT', ban(guildID, userID), token, {
      'delete-message-days': days
    }),

  /**
   * Bulk delete a channel's messages
   * @arg {string} token Token used for authorizing the request
   * @arg {string} channelID The channel's id
   * @arg {string[]} messages Array of message snowflakes
   * @returns {Promise<void>}
   */
  bulkDeleteMessages: (token, channelID, messages) =>
    request('POST', bulkDelete(channelID), token, { messages }),

  /**
   * Create a channel
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {object} options Channel options
   * @returns {Promise<object>}
   */
  createChannel: (token, guildID, options) =>
    request('POST', guildChannels(guildID), token, options),

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
  createChannelInvite: (token, channelID, options) =>
    request('POST', channelInvites(channelID), token, options),

  /**
   * Create a guild
   * @arg {string} token Token used for authorizing the request
   * @arg {object} options Options for the request
   * @returns {Promise<object>}
   */
  createGuild: (token, options) =>
    request('POST', 'guilds', token, options),

  /**
   * Create a guild emoji
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {object} options Emoji options
   * @arg {string} options.image Base64 image data
   * @arg {object} options.name The emoji's name
   * @arg {string[]} [options.roles] Roles to be whitelisted
   * @returns {Promise<object>}
   */
  createGuildEmoji: (token, guildID, options) =>
    request('POST', emojis(guildID), token, options),

  /**
   * Create a guild integration
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {object} options Guild integration options
   * @arg {string} options.type The type of integration
   * @arg {string} options.id The integration id
   * @returns {Promise<void>}
   */
  createGuildIntegration: (token, guildID, options) =>
    request('POST', integrations(guildID), token, options),

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
  createMessage: (token, channelID, options) =>
    request('POST', messages(channelID), token, options),

  /**
   * React to a message
   * @arg {string} token Token used for authorizing the request
   * @arg {string} channelID The channel's id
   * @arg {string} messageID The message's id
   * @arg {string} emoji The emoji to react (must be encoded)
   * @returns {Promise<void>}
   */
  createMessageReaction: (token, channelID, messageID, emoji) =>
    request('PUT', userReaction(channelID, messageID, emoji), token),

  /**
   * Create a private channel with a user
   * @arg {string} token Token used for authorizing the request
   * @arg {string} userID The user's id
   * @returns {Promise<object>}
   */
  createPrivateChannel: (token, userID) =>
    request('POST', 'users/@me/channels', token, { recipient_id: userID }),

  /**
   * Create a role
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {object} [options] Options for the request
   * @arg {number} [options.color] The role's color
   * @arg {boolean} [options.hoist] Make the role hoisted if true
   * @arg {boolean} [options.mentionable] Make the role mentionable if true
   * @arg {string} [options.name] The role's name
   * @arg {number} [options.permissions] The role's permissions
   * @returns {Promise<object>}
   */
  createRole: (token, guildID, options) =>
    request('POST', roles(guildID), token, options),

  /**
   * Delete all reactions from a message
   * @arg {string} token Token used for authorzing the request
   * @arg {string} channelID The channel's id
   * @arg {string} messageID The message's id
   * @arg {string} emoji The emoji
   * @returns {Promise<void>}
   */
  deleteAllReactions: (token, channelID, messageID) =>
    request('DELETE', reactions(channelID, messageID), token),

  /**
   * Delete a channel
   * @arg {string} token Token used for authorzing the request
   * @arg {string} channelID The channel's id
   * @returns {Promise<void>}
   */
  deleteChannel: (token, channelID) =>
    request('DELETE', channel(channelID), token),

  /**
   * Delete a guild
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @returns {Promise<void>}
   */
  deleteGuild: (token, guildID) =>
    request('DELETE', guild(guildID), token),

  /**
   * Delete a guild emoji
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {string} emojiID The emoji's id
   * @returns {Promise<void>}
   */
  deleteGuildEmoji: (token, guildID, emojiID) =>
    request('DELETE', emoji(guildID, emojiID), token),

  /**
   * Delete a guild integration
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {string} integrationID The integration's id
   * @returns {Promise<void>}
   */
  deleteGuildIntegration: (token, guildID, integrationID) =>
    request('DELETE', integration(guildID, integrationID), token),

  /**
   * Delete an invite
   * @arg {string} token Token used for authorizing the request
   * @arg {string} inviteCode The invite code
   * @returns {Promise<void>}
   */
  deleteInvite: (token, inviteCode) =>
    request('DELETE', invite(inviteCode), token),

  /**
   * Delete a message
   * @arg {string} token Token used for authorizing the request
   * @arg {string} channelID The channel's id
   * @arg {string} messageID The message'is id
   * @returns {Promise<void>}
   */
  deleteMessage: (token, channelID, messageID) =>
    request('DELETE', message(channelID, messageID), token),

  /**
   * Delete a user's reaction
   * @arg {string} token Token used for authorizing the request
   * @arg {string} channelID The channel's id
   * @arg {string} messageID The message's id
   * @arg {string} emoji The emoji
   * @arg {string} user The user
   * @returns {Promise<void>}
   */
  deleteMessageReaction: (token, channelID, messageID, emoji, user) =>
    request('DELETE', userReaction(channelID, messageID, emoji, user), token),

  /**
   * Delete an overwrite
   * @arg {string} token Token used for authorizing the request
   * @arg {string} channelID The channel's id
   * @arg {string} overwriteID The overwrite's id
   * @returns {Promise<void>}
   */
  deleteOverwrite: (token, channelID, overwriteID) =>
    request('DELETE', permission(channelID, overwriteID), token),

  /**
   * Delete a role
   * @arg {String} token Token used for authorizing the request
   * @arg {String} guildID The guild's id
   * @arg {String} roleID The role's id
   * @returns {Promise<void>}
   */
  deleteRole: (token, guildID, roleID) =>
    request('DELETE', role(guildID, roleID), token),

  /**
   * Edit a channel
   * @arg {string} token Token used for authorizing the request
   * @arg {string} channelID The channel's id
   * @arg {object} options Channel options
   * @returns {Promise<object>}
   */
  editChannel: (token, channelID, options) =>
    request('PATCH', channel(channelID), token, options),

  /**
   * Edit channel positions
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {object[]} channels Array of channel positions
   * @returns {Promise<void>}
   */
  editChannelPositions: (token, guildID, channels) =>
    request('PATCH', guildChannels(guildID), token, channels),

  /**
   * Edit a guild
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {object} options Options for the request
   * @returns {Promise<object>}
   */
  editGuild: (token, guildID, options) =>
    request('PATCH', guild(guildID), token, options),

  /**
   * Edit the embed of a guild
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {object} options Options for the edit
   * @returns {Promise<object>}
   */
  editGuildEmbed: (token, guildID, options) =>
    request('PATCH', embed(guildID), token, options),

  /**
   * Edit an emoji
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {string} emojiID The emoji's id
   * @arg {object} options Options for the edit
   * @arg {string} [options.name] Set the name
   * @arg {string[]} [options.roles] Set the roles to be whitelisted
   * @returns {Promise<object>}
   */
  editGuildEmoji: (token, guildID, emojiID, options) =>
    request('PATCH', emoji(guildID, emojiID), token, options),

  /**
   * Edit a guild integration
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {string} integrationID The integration's id
   * @arg {object} options Options for the request
   * @arg {boolean} [options.enable_emoticons] Enable emoticons
   * @arg {number} [options.expire_behavior] The behavior when it expires
   * @arg {number} [options.expire_grace_period] Expire grace period
   * @returns {Promise<void>}
   */
  editGuildIntegration: (token, guildID, integrationID, options) =>
    request('PATCH', integration(guildID, integrationID), token, options),

  /**
   * Edit a guild member
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {string} userID The user's id
   * @arg {object} options Member edit options
   * @returns {Promise<void>}
   */
  editMember: (token, guildID, userID, options) =>
    request('PATCH', member(guildID, userID), token, options),

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
  editMessage: (token, channelID, messageID, options) =>
    request('PATCH', message(channelID, messageID), token, options),

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
  editOverwrite: (token, channelID, overwriteID, options) =>
    request('PUT', permission(channelID, overwriteID), token, options),

  /**
   * Edit a role
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {string} roleID The role's id
   * @arg {object} options Options for the request
   * @arg {number} [options.color] The role's color
   * @arg {boolean} [options.hoist] Make the role hoisted if true
   * @arg {boolean} [options.mentionable] Make the role mentionable if true
   * @arg {string} [options.name] The role's name
   * @arg {number} [options.permissions] The role's permissions
   * @returns {Promise<Object>}
   */
  editRole: (token, guildID, roleID, options) =>
    request('PATCH', role(guildID, roleID), token, options),

  /**
   * Edit role positions
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {object[]} roles An array of role positions
   * @returns {Promise<object[]>}
   */
  editRolePositions: (token, guildID, roles) =>
    request('PATCH', roles(guildID), token, roles),

  /**
   * Get a ban object
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {string} userID The user's id
   * @returns {Promise<object>}
   */
  getBan: (token, guildID, userID) =>
    request('GET', ban(guildID, userID), token),

  /**
   * Get the banned users of a guild
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @returns {Promise<Object[]>}
   */
  getBans: (token, guildID) => request('GET', bans(guildID), token),

  /**
   * Get a bot's gateway object
   * @arg {string} token Token used for authorizing the request
   * @returns {Promise<object>}
   */
  getBotGateway: (token) => request('GET', 'gateway/bot', token),

  /**
   * Get a channel
   * @arg {sring} token Token used for authorizing the request
   * @arg {string} channelID The channel's id
   * @returns {Promise<object>}
   */
  getChannel: (token, channelID) =>
    request('GET', channel(channelID), token),

  /**
   * Get a channel's invites
   * @arg {string} token Token used for authorizing the request
   * @arg {string} channelID The channel's id
   * @returns {Promise<object[]>}
   */
  getChannelInvites: (token, channelID) =>
    request('GET', channelInvites(channelID), token),

  /**
   * Get the gateway object
   * @returns {Promise<object>}
   */
  getGateway: () => request('GET', 'gateway'),

  /**
   * Get a guild
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @returns {Promise<object>}
   */
  getGuild: (token, guildID) => request('GET', guild(guildID), token),

  /**
   * Get guild audit logs
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {object} [options] Query string parameters
   * @arg {string} [options.user_id] Filter for this user
   * @arg {number} [options.action] The type of event action
   * @arg {string} [options.before] Get the logs before this entry id
   * @arg {number} [options.limit] The number of logs to get
   * @returns {Promise<object>}
   */
  getGuildAuditLogs: (token, guildID, options) =>
    request('GET', auditLogs(guildID), token, options),

  /**
   * Get a guild's channels
   * @arg {sring} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @returns {Promise<object[]>}
   */
  getGuildChannels: (token, guildID) =>
    request('GET', guildChannels(guildID), token),

  /**
   * Get the embed of a guild
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @returns {Promise<object>}
   */
  getGuildEmbed: (token, guildID) => request('GET', embed(guildID), token),

  /**
   * Get an emoji
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {string} emojiID The emoji's id
   * @returns {Promise<object>}
   */
  getGuildEmoji: (token, guildID, emojiID) =>
    request('GET', emoji(guildID, emojiID), token),

  /**
   * Get a guild's emojis
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @returns {Promise<Object[]>}
   */
  getGuildEmojis: (token, guildID) =>
    request('GET', emojis(guildID), token),

  /**
   * Get a guild's integrations
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @returns {Promise<object[]>}
   */
  getGuildIntegrations: (token, guildID) =>
    request('GET', integrations(guildID), token),

  /**
   * Get a guild's invites
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @returns {Promise<object[]>}
   */
  getGuildInvites: (token, guildID) =>
    request('GET', guildInvites(guildID), token),

  /**
   * Get the prune count of a guild
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {object} [options] Options for the request
   * @arg {number} [options.days] Number of days
   * @returns {Promise<object>}
   */
  getGuildPruneCount: (token, guildID, options) =>
    request('GET', prune(guildID), token, options),

  /**
   * Get a guild's roles
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @returns {Promise<object[]>}
   */
  getGuildRoles: (token, guildID) => request('GET', roles(guildID), token),

  /**
   * Get the guilds the bot is in
   * @arg {string} token Token used for authorizing the request
   * @returns {Promise<object[]>}
   */
  getGuilds: (token) => request('GET', 'users/@me/guilds', token),

  /**
   * Get a guild vanity code
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @returns {Promise<Object>}
   */
  getGuildVanityCode: (token, guildID) =>
    request('GET', vanity(guildID), token),

  /**
   * Get a guild's voice regions
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @returns {Promise<string[]>}
   */
  getGuildVoiceRegions: (token, guildID) =>
    request('GET', regions(guildID), token),

  /**
   * Get an invite
   * @arg {string} token Token used for authorizing the request
   * @arg {string} inviteCode The invite code
   * @arg {object} [options] Options
   * @arg {boolean} [options.with_count] With count
   * @returns {Promise<object>}
   */
  getInvite: (token, inviteCode, options) =>
    request('GET', invite(inviteCode), token, options),

  /**
   * Get a member
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {string} userID The user's id
   * @returns {Promise<object>}
   */
  getMember: (token, guildID, userID) =>
    request('GET', member(guildID, userID), token),

  /**
   * Get an array of members in a guild
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {object} [options] Options for the request
   * @arg {string} [options.after] Get the members after this id
   * @arg {number} [options.limit] Amount of members to get
   * @returns {Promise<object[]>}
   */
  getMembers: (token, guildID, options) =>
    request('GET', members(guildID), token, options),

  /**
   * Get a message
   * @arg {string} token Token used for authorizing the request
   * @arg {string} channelID The channel's id
   * @arg {string} messageID The message's id
   * @returns {Promise<object>}
   */
  getMessage: (token, channelID, messageID) =>
    request('GET', message(channelID, messageID), token),

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
  getMessageReactionUsers: (token, channelID, messageID, emoji, options) =>
    request('GET', reaction(channelID, messageID, emoji), token, options),

  /**
   * Get a channel's messages
   * @arg {string} token Token used for authorizing the request
   * @arg {string} channelID The channel's id
   * @arg {object} [options] Options for the request
   * @arg {string} [options.after] Get the messages after this id
   * @arg {string} [options.around] Get the messages around this id
   * @arg {string} [options.before] Get the messages before this id
   * @arg {number} [options.limit] The amount of messages to get
   * @returns {Promise<object[]>}
   */
  getMessages: (token, channelID, options) =>
    request('GET', messages(channelID), token, options),

  /**
   * Get a channel's pinned messages
   * @arg {string} token Token used for authorizing the request
   * @arg {string} channelID The channel's id
   * @returns {Promise<object[]>}
   */
  getPinnedMessages: (token, channelID) =>
    request('GET', pins(channelID), token),

  /**
   * Kick a member
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {string} userID The user's id
   * @returns {Promise<void>}
   */
  kickMember: (token, guildID, userID) =>
    request('DELETE', member(guildID, userID), token),

  /**
   * Leave a guild
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @returns {Promise<void>}
   */
  leaveGuild: (token, guildID) =>
    request('DELETE', meGuild(guildID), token),

  /**
   * Pin a message
   * @arg {string} token Token used for authorizing the request
   * @arg {string} channelID The channel's id
   * @arg {string} messageID The message's id
   * @returns {Promise<void>}
   */
  pinMessage: (token, channelID, messageID) =>
    request('PUT', pin(channelID, messageID), token),

  /**
   * Prune members of a guild
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {object} [options] Options for the request
   * @arg {number} [options.days] Number of days to prune
   * @arg {boolean} [options.compute_prune_count] Recommend this as false
   * @returns {Promise<void>}
   */
  pruneMembers: (token, guildID, options) =>
    request('POST', prune(guildID), token, options),

  /**
   * Remove a role from a member
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {string} userID The user's id
   * @arg {string} roleID The role's id
   * @returns {Promise<void>}
   */
  removeMemberRole: (token, guildID, userID, roleID) =>
    request('DELETE', memberRole(guildID, userID, roleID), token),

  /**
   * Sync a guild integration
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @returns {Promise<void>}
   */
  syncGuildIntegration: (token, guildID) =>
    request('POST', sync(guildID), token),

  /**
   * Type in a channel
   * @arg {string} token Token used for authorizing the request
   * @arg {string} channelID The channel's id
   * @returns {Promise<void>}
   */
  typeIn: (token, channelID) => request('POST', typing(channelID), token),

  /**
   * Unban a member
   * @arg {string} token Token used for authorizing the request
   * @arg {string} guildID The guild's id
   * @arg {string} userID The user's id
   * @returns {Promise<void>}
   */
  unbanMember: (token, guildID, userID) =>
    request('DELETE', ban(guildID, userID), token),

  /**
   * Unpin a message
   * @arg {string} token Token used for authorizing the request
   * @arg {string} channelID The channel's id
   * @arg {string} messageID The message's id
   * @returns {Promise<void>}
   */
  unpinMessage: (token, channelID, messageID) =>
    request('DELETE', pin(channelID, messageID), token)
};
