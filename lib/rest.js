'use strict';

const request = require('./request');

const bulkDelete = (channelID) => `${channelMessages(channelID)}/bulk-delete`;
const channel = (channelID) => `channels/${channelID}`;
const channelInvites = (channelID) => `${channel(channelID)}/invites`;
const channelMessage = (channelID, messageID) =>
  `${channelMessages(channelID)}/${messageID}`;
const channelMessages = (channelID) => `${channel(channelID)}/messages`;
const channelPin = (channelID, messageID) =>
  `${channelPins(channelID)}/${messageID}`;
const channelPins = (channelID) => `${channel(channelID)}/pins`;
const channelTyping = (channelID) => `${channel(channelID)}/typing`;
const channelWebhooks = (channelID) => `${channel(channelID)}/webhooks`;
const guild = (guildID) => `guilds/${guildID}`;
const guildAuditLogs = (guildID) => `${guild(guildID)}/audit-logs`;
const guildBan = (guildID, userID) => `${guildBans(guildID)}/${userID}`;
const guildBans = (guildID) => `${guild(guildID)}/bans`;
const guildChannels = (guildID) => `${guild(guildID)}/channels`;
const guildEmbed = (guildID) => `${guild(guildID)}/embed`;
const guildEmoji = (guildID, emojiID) => `${guildEmojis(guildID)}/${emojiID}`;
const guildEmojis = (guildID) => `${guild(guildID)}/emojis`;
const guildIntegration = (guildID, integrationID) =>
  `${guildIntegrations(guildID)}/${integrationID}`;
const guildIntegrations = (guildID) => `${guild(guildID)}/integrations`;
const guildIntegrationsSync = (guildID) => `${guildIntegrations(guildID)}/sync`;
const guildInvites = (guildID) => `${guild(guildID)}/invites`;
const guildMember = (guildID, userID) => `${guildMembers(guildID)}/${userID}`;
const guildMembers = (guildID) => `${guild(guildID)}/members`;
const guildPrune = (guildID) => `${guild(guildID)}/prune`;
const guildRegions = (guildID) => `${guild(guildID)}/regions`;
const guildRole = (guildID, roleID) => `${guildRoles(guildID)}/${roleID}`;
const guildRoles = (guildID) => `${guild(guildID)}/roles`;
const guildVanityURL = (guildID) => `${guild(guildID)}/vanity-url`;
const guildWebhooks = (guildID) => `${guild(guildID)}/webhooks`;
const invite = (inviteCode) => `/invites/${inviteCode}`;
const meGuild = (guildID) => `users/@me/guilds/${guildID}`;
const memberRole = (guildID, userID, roleID) =>
  `${guildMember(guildID, userID)}/roles/${roleID}`;
const messageReaction = (channelID, messageID, emoji) =>
  `${messageReactions(channelID, messageID)}/${emoji}`;
const messageReactions = (channelID, messageID) =>
  `${channelMessage(channelID, messageID)}/reactions`;
const permission = (channelID, overwriteID) =>
  `${channel(channelID)}/permissions/${overwriteID}`;
const tokenWebhook = (webhookID, webhookToken) =>
  `${webhook(webhookID)}/${webhookToken}`;
const user = (userID) => `users/${userID}`;
const userReaction = (channelID, messageID, emoji, user) =>
  `${messageReaction(channelID, messageID, emoji)}/${user}`;
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
  request('PUT', guildBan(guildID, userID), token, {
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
  request('POST', guildEmojis(guildID), token, options);

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
  request('POST', guildIntegrations(guildID), token, options);

/**
 * Create a message
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @arg {object} options Message options
 * @arg {string} [options.content] Message content
 * @arg {object} [options.embed] Embed object
 * @arg {string} [options.nonce] Message nonce
 * @arg {boolean} [options.tts] Send the message as tts if true
 * @arg {{ name: string, data: Buffer }[]} [files] Files to upload
 * @returns {Promise<object>}
 */
const createMessage = (token, channelID, options, files) =>
  request('POST', channelMessages(channelID), token, options, null, files);

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
  request('POST', guildRoles(guildID), token, options);

/**
 * Create a webhook for a channel
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @arg {object} options Options for the request
 * @arg {string} options.name Name for the webhook
 * @arg {string} options.avatar Default avatar for the webhook
 * @returns {Promise<object>}
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
  request('DELETE', messageReactions(channelID, messageID), token);

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
  request('DELETE', guildEmoji(guildID, emojiID), token);

/**
 * Delete a guild integration
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {string} integrationID The integration's id
 * @returns {Promise<void>}
 */
const deleteGuildIntegration = (token, guildID, integrationID) =>
  request('DELETE', guildIntegration(guildID, integrationID), token);

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
  request('DELETE', channelMessage(channelID, messageID), token);

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
  request('DELETE', guildRole(guildID, roleID), token);

/**
 * Delete a webhook
 * @arg {string} token Token used for authorizing the request
 * @arg {string} webhookID The webhook's id
 * @returns {Promise<void>}
 */
const deleteWebhook = (token, webhookID) =>
  request('DELETE', webhook(webhookID), token);

/**
 * Delete a webhook from a token
 * @arg {string} webhookID The webhook's id
 * @arg {string} webhookToken The webhook's token
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
  request('PATCH', guildEmbed(guildID), token, options);

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
  request('PATCH', guildEmoji(guildID, emojiID), token, options);

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
  request('PATCH', guildIntegration(guildID, integrationID), token, options);

/**
 * Edit a guild member
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {string} userID The user's id
 * @arg {object} options Member edit options
 * @returns {Promise<void>}
 */
const editMember = (token, guildID, userID, options) =>
  request('PATCH', guildMember(guildID, userID), token, options);

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
  request('PATCH', channelMessage(channelID, messageID), token, options);

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
  request('PATCH', guildRole(guildID, roleID), token, options);

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
 * Edit self nick in a guild
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {string} nick Nick to set
 * @returns {Promise<void>}
 */
const editSelfGuildNick = (token, guildID, nick) =>
  request('PATCH', `${guildMember(guildID, '@me')}/nick`, token, { nick });

/**
 * Edit a webhook
 * @arg {string} token Token used for authorizing the request
 * @arg {string} webhookID The webhook's id
 * @arg {object} options Options for the request
 * @arg {string} [options.name] Set the new name
 * @arg {string} [options.avatar] Set the new avatar
 * @arg {string} [options.channel_id] Move the default channel
 * @returns {Promise<void>}
 */
const editWebhook = (token, webhookID, options) =>
  request('PATCH', webhook(webhookID), token, options);

/**
 * Edit a webhook from a token
 * @arg {string} webhookID The webhook's id
 * @arg {string} webhookToken The webhook's token
 * @arg {object} options Options for the request
 * @arg {string} [options.name] Set the new name
 * @arg {string} [options.avatar] Set the new avatar
 * @arg {string} [options.channel_id] Move the default channel
 * @returns {Promise<void>}
 */
const editWebhookFromToken = (webhookID, webhookToken, options) =>
  request('PATCH', tokenWebhook(webhookID, webhookToken), null, options);

/**
 * Execute a webhook
 * @arg {string} token Token used for authorizing the request
 * @arg {string} webhookID The webhook's id
 * @arg {string} webhookToken The webhook's token
 * @arg {object} options Options for the request
 * @arg {string} [options.content] Content for the message
 * @arg {string} [options.username] Username to appear for the message
 * @arg {string} [options.avatar_url] Avatar url
 * @arg {boolean} [options.tts] Send the message as tts if true
 * @arg {object[]} [options.embeds] An array of embed objects
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
  request('GET', guildBan(guildID, userID), token);

/**
 * Get the banned users of a guild
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @returns {Promise<object[]>}
 */
const getBans = (token, guildID) => request('GET', guildBans(guildID), token);

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
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @returns {Promise<object[]>}
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
  request('GET', guildAuditLogs(guildID), token, options);

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
const getGuildEmbed = (token, guildID) =>
  request('GET', guildEmbed(guildID), token);

/**
 * Get an emoji
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {string} emojiID The emoji's id
 * @returns {Promise<object>}
 */
const getGuildEmoji = (token, guildID, emojiID) =>
  request('GET', guildEmoji(guildID, emojiID), token);

/**
 * Get a guild's emojis
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @returns {Promise<object[]>}
 */
const getGuildEmojis = (token, guildID) =>
  request('GET', guildEmojis(guildID), token);

/**
 * Get a guild's integrations
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @returns {Promise<object[]>}
 */
const getGuildIntegrations = (token, guildID) =>
  request('GET', guildIntegrations(guildID), token);

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
  request('GET', guildPrune(guildID), token, options);

/**
 * Get a guild's roles
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @returns {Promise<object[]>}
 */
const getGuildRoles = (token, guildID) =>
  request('GET', guildRoles(guildID), token);

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
const getGuildVanityURL = (token, guildID) =>
  request('GET', guildVanityURL(guildID), token);

/**
 * Get a guild's voice regions
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @returns {Promise<string[]>}
 */
const getGuildVoiceRegions = (token, guildID) =>
  request('GET', guildRegions(guildID), token);

/**
 * Get a guild's webhooks
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @returns {Promise<object[]>}
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
  request('GET', guildMember(guildID, userID), token);

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
  request('GET', guildMembers(guildID), token, options);

/**
 * Get a message
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @arg {string} messageID The message's id
 * @returns {Promise<object>}
 */
const getMessage = (token, channelID, messageID) =>
  request('GET', channelMessage(channelID, messageID), token);

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
  request('GET', messageReaction(channelID, messageID, emoji), token, options);

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
  request('GET', channelMessages(channelID), token, options);

/**
 * Get a channel's pinned messages
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @returns {Promise<object[]>}
 */
const getPinnedMessages = (token, channelID) =>
  request('GET', channelPins(channelID), token);

/**
 * Get a webhook
 * @arg {string} token Token used for authorizing the request
 * @arg {string} webhookID The webhook's id
 * @returns {Promise<object>}
 */
const getWebhook = (token, webhookID) =>
  request('GET', webhook(webhookID), token);

/**
 * Get a webhook from a token
 * @arg {string} webhookID The webhook's id
 * @arg {string} webhookToken The webhook's token
 * @returns {Promise<object>}
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
  request('DELETE', guildMember(guildID, userID), token);

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
  request('PUT', channelPin(channelID, messageID), token);

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
  request('POST', guildPrune(guildID), token, options);

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
  request('POST', guildIntegrationsSync(guildID), token);

/**
 * Type in a channel
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @returns {Promise<void>}
 */
const triggerTypingIndicaor = (token, channelID) =>
  request('POST', channelTyping(channelID), token);

/**
 * Unban a member
 * @arg {string} token Token used for authorizing the request
 * @arg {string} guildID The guild's id
 * @arg {string} userID The user's id
 * @returns {Promise<void>}
 */
const unbanMember = (token, guildID, userID) =>
  request('DELETE', guildBan(guildID, userID), token);

/**
 * Unpin a message
 * @arg {string} token Token used for authorizing the request
 * @arg {string} channelID The channel's id
 * @arg {string} messageID The message's id
 * @returns {Promise<void>}
 */
const unpinMessage = (token, channelID, messageID) =>
  request('DELETE', channelPin(channelID, messageID), token);

const __endpoints__ = {
  bulkDelete,
  channel,
  channelInvites,
  channelMessage,
  channelMessages,
  channelPin,
  channelPins,
  channelTyping,
  channelWebhooks,
  guild,
  guildAuditLogs,
  guildBan,
  guildBans,
  guildChannels,
  guildEmbed,
  guildEmoji,
  guildEmojis,
  guildIntegration,
  guildIntegrations,
  guildIntegrationsSync,
  guildInvites,
  guildMember,
  guildMembers,
  guildPrune,
  guildRegions,
  guildRole,
  guildRoles,
  guildVanityURL,
  guildWebhooks,
  invite,
  meGuild,
  memberRole,
  messageReaction,
  messageReactions,
  permission,
  tokenWebhook,
  user,
  userReaction,
  webhook
};

module.exports = {
  __endpoints__,
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
  editSelfGuildNick,
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
  getGuildVanityURL,
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
  triggerTypingIndicaor,
  unbanMember,
  unpinMessage
};
