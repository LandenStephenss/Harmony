'use strict';

const request = require('./request');

const auditLogs = (guildID) => `${guild(guildID)}/audit-logs`;
const ban = (guildID, userID) => `${bans(guildID)}/${userID}`;
const bans = (guildID) => `guilds/${guildID}/bans`;
const bulkDelete = (channelID) => `${messages(channelID)}/bulk-delete`;
const channel = (channelID) => `channels/${channelID}`;
const channelInvites = (channelID) => `${channel(channelID)}/invites`;
const channelWebhooks = (channelID) => `channels/${channelID}/webhooks`;
const embed = (guildID) => `${guild(guildID)}/embed`;
const emoji = (guildID, emojiID) => `${emojis(guildID)}/${emojiID}`;
const emojis = (guildID) => `${guild(guildID)}/emojis`;
const guild = (guildID) => `guilds/${guildID}`;
const guildChannels = (guildID) => `${guild(guildID)}/channels`;
const guildInvites = (guildID) => `${guild(guildID)}/invites`;
const guildWebhooks = (guildID) => `guilds/${guildID}/webhooks`;
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
const tokenWebhook = (webhookID, webhookToken) =>
  `webhooks/${webhookID}/${webhookToken}`;
const user = (userID) => `users/${userID}`;
const typing = (channelID) => `${channel(channelID)}/typing`;
const userReaction = (channelID, messageID, emoji, user) =>
  `${reaction(channelID, messageID, emoji)}/${user}`;
const vanity = (guildID) => `${guild(guildID)}/vanity-url`;
const webhook = (webhookID) => `webhooks/${webhookID}`;

/**
 * Add a role to a member
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {string} userID The user's id
 * @arg {string} roleID The role's id
 * @returns {Promise<void>}
 */
const addMemberRole = (token, guildID, userID, roleID) =>
  request('PUT', memberRole(guildID, userID, roleID), token);

/**
 * Ban a member
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {string} userID The user's id
 * @arg {number} [days] Delete message days
 * @returns {Promise<void>}
 */
const banMember = (token, guildID, userID, days = null) =>
  request('PUT', ban(guildID, userID), token, {
    'delete-message-days': days
  });

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
 * @returns {Promise<object>}
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
const createChannelInvite = (token, channelID, options) =>
  request('POST', channelInvites(channelID), token, options);

/**
 * Create a guild
 * @arg {string} token Token used for authorizing the request
 * @arg {object} options Options for the request
 * @returns {Promise<object>}
 */
const createGuild = (token, options) =>
  request('POST', 'guilds', token, options);

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
const createGuildEmoji = (token, guildID, options) =>
  request('POST', emojis(guildID), token, options);

/**
 * Create a guild integration
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {object} options Guild integration options
 * @arg {string} options.type The type of integration
 * @arg {string} options.id The integration id
 * @returns {Promise<void>}
 */
const createGuildIntegration = (token, guildID, options) =>
  request('POST', integrations(guildID), token, options);

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
const createMessageReaction = (token, channelID, messageID, emoji) =>
  request('PUT', userReaction(channelID, messageID, emoji), token);

/**
 * Create a private channel with a user
 * @arg {string} token Token used for authorizing the request
 * @arg {string} userID The user's id
 * @returns {Promise<object>}
 */
const createPrivateChannel = (token, userID) =>
  request('POST', 'users/@me/channels', token, { recipient_id: userID });

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
const createRole = (token, guildID, options) =>
  request('POST', roles(guildID), token, options);

/**
 * Create a webhook for a channel
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @arg {Object} options Options for the request
 * @arg {String} options.name Name for the webhook
 * @arg {String} options.avatar Default avatar for the webhook
 * @returns {Promise<Object>}
 */
const createWebhook = (token, channelID, options) =>
  request('POST', channelWebhooks(channelID), token, options);

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
 * Delete a guild
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @returns {Promise<void>}
 */
const deleteGuild = (token, guildID) =>
  request('DELETE', guild(guildID), token);

/**
 * Delete a guild emoji
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {string} emojiID The emoji's id
 * @returns {Promise<void>}
 */
const deleteGuildEmoji = (token, guildID, emojiID) =>
  request('DELETE', emoji(guildID, emojiID), token);

/**
 * Delete a guild integration
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {string} integrationID The integration's id
 * @returns {Promise<void>}
 */
const deleteGuildIntegration = (token, guildID, integrationID) =>
  request('DELETE', integration(guildID, integrationID), token);

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
 * Delete a user's reaction
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @arg {string} messageID The message's id
 * @arg {string} emoji The emoji
 * @arg {string} user The user
 * @returns {Promise<void>}
 */
const deleteMessageReaction = (token, channelID, messageID, emoji, user) =>
  request('DELETE', userReaction(channelID, messageID, emoji, user), token);

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
 * Delete a role
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {string} roleID The role's id
 * @returns {Promise<void>}
 */
const deleteRole = (token, guildID, roleID) =>
  request('DELETE', role(guildID, roleID), token);

/**
 * Delete a webhook
 * @arg {String} token Token used for authorizing the request
 * @arg {String} webhookID The webhook's id
 * @returns {Promise<void>}
 */
const deleteWebhook = (token, webhookID) =>
  request('DELETE', webhook(webhookID), token);

/**
 * Delete a webhook from a token
 * @arg {String} webhookID The webhook's id
 * @arg {String} webhookToken The webhook's token
 * @returns {Promise<void>}
 */
const deleteWebhookFromToken = (webhookID, webhookToken) =>
  request('DELETE', tokenWebhook(webhookID, webhookToken));

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
 * Edit a guild
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {object} options Options for the request
 * @returns {Promise<object>}
 */
const editGuild = (token, guildID, options) =>
  request('PATCH', guild(guildID), token, options);

/**
 * Edit the embed of a guild
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {object} options Options for the edit
 * @returns {Promise<object>}
 */
const editGuildEmbed = (token, guildID, options) =>
  request('PATCH', embed(guildID), token, options);

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
const editGuildEmoji = (token, guildID, emojiID, options) =>
  request('PATCH', emoji(guildID, emojiID), token, options);

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
const editGuildIntegration = (token, guildID, integrationID, options) =>
  request('PATCH', integration(guildID, integrationID), token, options);

/**
 * Edit a guild member
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {string} userID The user's id
 * @arg {object} options Member edit options
 * @returns {Promise<void>}
 */
const editMember = (token, guildID, userID, options) =>
  request('PATCH', member(guildID, userID), token, options);

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
 * @returns {Promise<object>}
 */
const editRole = (token, guildID, roleID, options) =>
  request('PATCH', role(guildID, roleID), token, options);

/**
 * Edit role positions
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {object[]} roles An array of role positions
 * @returns {Promise<object[]>}
 */
const editRolePositions = (token, guildID, roles) =>
  request('PATCH', roles(guildID), token, roles);

/**
 * Edit the client user
 * @arg {string} token Token used for authorizing the request
 * @arg {object} options Options for the edit
 * @arg {string} [options.username] Set the username
 * @arg {string} [options.avatar] Set the avatar
 * @returns {Promise<object>}
 */
const editSelf = (token, options) =>
  request('PATCH', user('@me'), token, options);

/**
 * Edit a webhook
 * @arg {String} token Token used for authorizing the request
 * @arg {String} webhookID The webhook's id
 * @arg {Object} options Options for the request
 * @arg {String} [options.name] Set the new name
 * @arg {String} [options.avatar] Set the new avatar
 * @arg {String} [options.channel_id] Move the default channel
 * @returns {Promise<void>}
 */
const editWebhook = (token, webhookID, options) =>
  request('PATCH', webhook(webhookID), token, options);

/**
 * Edit a webhook from a token
 * @arg {String} webhookID The webhook's id
 * @arg {String} webhookToken The webhook's token
 * @arg {Object} options Options for the request
 * @arg {String} [options.name] Set the new name
 * @arg {String} [options.avatar] Set the new avatar
 * @arg {String} [options.channel_id] Move the default channel
 * @returns {Promise<void>}
 */
const editWebhookFromToken = (webhookID, webhookToken, options) =>
  request('PATCH', tokenWebhook(webhookID, webhookToken), null, options);

/**
 * Execute a webhook
 * @arg {String} token Token used for authorizing the request
 * @arg {String} webhookID The webhook's id
 * @arg {String} webhookToken The webhook's token
 * @arg {Object} options Options for the request
 * @arg {String} [options.content] Content for the message
 * @arg {String} [options.username] Username to appear for the message
 * @arg {String} [options.avatar_url] Avatar url
 * @arg {Boolean} [options.tts] Send the message as tts if true
 * @arg {Object[]} [options.embeds] An array of embed objects
 * @returns {Promise<void>}
 */
const executeWebhook = (token, webhookID, webhookToken, options) =>
  request('POST', tokenWebhook(webhookID, webhookToken), token, options);

/**
 * Get a ban object
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {string} userID The user's id
 * @returns {Promise<object>}
 */
const getBan = (token, guildID, userID) =>
  request('GET', ban(guildID, userID), token);

/**
 * Get the banned users of a guild
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @returns {Promise<object[]>}
 */
const getBans = (token, guildID) => request('GET', bans(guildID), token);

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
 * Get a channel's webhooks
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @returns {Promise<Object[]>}
 */
const getChannelWebhooks = (token, channelID) =>
  request('GET', channelWebhooks(channelID), token);

/**
 * Get the gateway object
 * @returns {Promise<object>}
 */
const getGateway = () => request('GET', 'gateway');

/**
 * Get a guild
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @returns {Promise<object>}
 */
const getGuild = (token, guildID) => request('GET', guild(guildID), token);

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
const getGuildAuditLogs = (token, guildID, options) =>
  request('GET', auditLogs(guildID), token, options);

/**
 * Get a guild's channels
 * @arg {sring} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @returns {Promise<object[]>}
 */
const getGuildChannels = (token, guildID) =>
  request('GET', guildChannels(guildID), token);

/**
 * Get the embed of a guild
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @returns {Promise<object>}
 */
const getGuildEmbed = (token, guildID) => request('GET', embed(guildID), token);

/**
 * Get an emoji
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {string} emojiID The emoji's id
 * @returns {Promise<object>}
 */
const getGuildEmoji = (token, guildID, emojiID) =>
  request('GET', emoji(guildID, emojiID), token);

/**
 * Get a guild's emojis
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @returns {Promise<object[]>}
 */
const getGuildEmojis = (token, guildID) =>
  request('GET', emojis(guildID), token);

/**
 * Get a guild's integrations
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @returns {Promise<object[]>}
 */
const getGuildIntegrations = (token, guildID) =>
  request('GET', integrations(guildID), token);

/**
 * Get a guild's invites
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @returns {Promise<object[]>}
 */
const getGuildInvites = (token, guildID) =>
  request('GET', guildInvites(guildID), token);

/**
 * Get the prune count of a guild
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {object} [options] Options for the request
 * @arg {number} [options.days] Number of days
 * @returns {Promise<object>}
 */
const getGuildPruneCount = (token, guildID, options) =>
  request('GET', prune(guildID), token, options);

/**
 * Get a guild's roles
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @returns {Promise<object[]>}
 */
const getGuildRoles = (token, guildID) => request('GET', roles(guildID), token);

/**
 * Get the guilds the bot is in
 * @arg {string} token Token used for authorizing the request
 * @returns {Promise<object[]>}
 */
const getGuilds = (token) => request('GET', 'users/@me/guilds', token);

/**
 * Get a guild vanity code
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @returns {Promise<object>}
 */
const getGuildVanityCode = (token, guildID) =>
  request('GET', vanity(guildID), token);

/**
 * Get a guild's voice regions
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @returns {Promise<string[]>}
 */
const getGuildVoiceRegions = (token, guildID) =>
  request('GET', regions(guildID), token);

/**
 * Get a guild's webhooks
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @returns {Promise<Object[]>}
 */
const getGuildWebhooks = (token, guildID) =>
  request('GET', guildWebhooks(guildID), token);

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
 * Get a member
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {string} userID The user's id
 * @returns {Promise<object>}
 */
const getMember = (token, guildID, userID) =>
  request('GET', member(guildID, userID), token);

/**
 * Get an array of members in a guild
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {object} [options] Options for the request
 * @arg {string} [options.after] Get the members after this id
 * @arg {number} [options.limit] Amount of members to get
 * @returns {Promise<object[]>}
 */
const getMembers = (token, guildID, options) =>
  request('GET', members(guildID), token, options);

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
const getMessageReactionUsers = (token, channelID, messageID, emoji, options) =>
  request('GET', reaction(channelID, messageID, emoji), token, options);

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
 * Get a webhook
 * @arg {String} token Token used for authorizing the request
 * @arg {String} webhookID The webhook's id
 * @returns {Promise<Object>}
 */
const getWebhook = (token, webhookID) =>
  request('GET', webhook(webhookID), token);

/**
 * Get a webhook from a token
 * @arg {String} webhookID The webhook's id
 * @arg {String} webhookToken The webhook's token
 * @returns {Promise<Object>}
 */
const getWebhookFromToken = (webhookID, webhookToken) =>
  request('GET', tokenWebhook(webhookID, webhookToken));

/**
 * Get a user
 * @arg {string} token Token used for authorizing the request
 * @arg {object} userID The user's id
 * @returns {Promise<object>}
 */
const getUser = (token, userID) => request('GET', user(userID), token);

/**
 * Kick a member
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {string} userID The user's id
 * @returns {Promise<void>}
 */
const kickMember = (token, guildID, userID) =>
  request('DELETE', member(guildID, userID), token);

/**
 * Leave a guild
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @returns {Promise<void>}
 */
const leaveGuild = (token, guildID) =>
  request('DELETE', meGuild(guildID), token);

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
 * Prune members of a guild
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {object} [options] Options for the request
 * @arg {number} [options.days] Number of days to prune
 * @arg {boolean} [options.compute_prune_count] Recommend this as false
 * @returns {Promise<void>}
 */
const pruneMembers = (token, guildID, options) =>
  request('POST', prune(guildID), token, options);

/**
 * Remove a role from a member
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {string} userID The user's id
 * @arg {string} roleID The role's id
 * @returns {Promise<void>}
 */
const removeMemberRole = (token, guildID, userID, roleID) =>
  request('DELETE', memberRole(guildID, userID, roleID), token);

/**
 * Sync a guild integration
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @returns {Promise<void>}
 */
const syncGuildIntegration = (token, guildID) =>
  request('POST', sync(guildID), token);

/**
 * Type in a channel
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @returns {Promise<void>}
 */
const typeIn = (token, channelID) => request('POST', typing(channelID), token);

/**
 * Unban a member
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {string} userID The user's id
 * @returns {Promise<void>}
 */
const unbanMember = (token, guildID, userID) =>
  request('DELETE', ban(guildID, userID), token);

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
  addMemberRole,
  banMember,
  bulkDeleteMessages,
  createChannel,
  createChannelInvite,
  createGuild,
  createGuildEmoji,
  createGuildIntegration,
  createMessage,
  createMessageReaction,
  createPrivateChannel,
  createRole,
  createWebhook,
  deleteAllReactions,
  deleteChannel,
  deleteGuild,
  deleteGuildEmoji,
  deleteGuildIntegration,
  deleteInvite,
  deleteMessage,
  deleteMessageReaction,
  deleteOverwrite,
  deleteRole,
  deleteWebhook,
  deleteWebhookFromToken,
  editChannel,
  editChannelPositions,
  editGuild,
  editGuildEmbed,
  editGuildEmoji,
  editGuildIntegration,
  editMember,
  editMessage,
  editOverwrite,
  editRole,
  editRolePositions,
  editSelf,
  editWebhook,
  editWebhookFromToken,
  executeWebhook,
  getBan,
  getBans,
  getBotGateway,
  getChannel,
  getChannelInvites,
  getChannelWebhooks,
  getGateway,
  getGuild,
  getGuildAuditLogs,
  getGuildChannels,
  getGuildEmbed,
  getGuildEmoji,
  getGuildEmojis,
  getGuildIntegrations,
  getGuildInvites,
  getGuildPruneCount,
  getGuildRoles,
  getGuilds,
  getGuildVanityCode,
  getGuildVoiceRegions,
  getGuildWebhooks,
  getInvite,
  getMember,
  getMembers,
  getMessage,
  getMessageReactionUsers,
  getMessages,
  getPinnedMessages,
  getUser,
  getWebhook,
  getWebhookFromToken,
  kickMember,
  leaveGuild,
  pinMessage,
  pruneMembers,
  removeMemberRole,
  syncGuildIntegration,
  typeIn,
  unbanMember,
  unpinMessage
};
