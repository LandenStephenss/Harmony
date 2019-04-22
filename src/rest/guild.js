'use strict';

const request = require('./request');

const guild = (guildID) => `guilds/${guildID}`;

const meGuild = (guildID) => `users/@me/guilds/${guildID}`;

const ban = (guildID, userID) => `guilds/${guildID}/bans/${userID}`;

const bans = (guildID) => `guilds/${guildID}/bans`;

const member = (guildID, userID) => `guilds/${guildID}/members/${userID}`;

const members = (guildID) => `guilds/${guildID}/members`;

const memberRole = (guildID, userID, roleID) =>
  `guilds/${guildID}/members/${userID}/roles/${roleID}`;

const prune = (guildID) => `guilds/${guildID}/prune`;

const role = (guildID, roleID) => `guilds/${guildID}/roles/${roleID}`;

const roles = (guildID) => `guilds/${guildID}/roles`;

const regions = (guildID) => `guilds/${guildID}/regions`;

const integration = (guildID, integrationID) =>
  `guilds/${guildID}/integrations/${integrationID}`;

const integrations = (guildID) => `guilds/${guildID}/integrations`;

const sync = (guildID) => `guilds/${guildID}/integrations/sync`;

const vanity = (guildID) => `guilds/${guildID}/vanity-url`;

const embed = (guildID) => `guilds/${guildID}/embed`;

const auditLogs = (guildID) => `guilds/${guildID}/audit-logs`;

const emoji = (guildID, emojiID) => `guilds/${guildID}/emojis/${emojiID}`;

const emojis = (guildID) => `guilds/${guildID}/emojis`;

/**
 * Get a guild
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @returns {Promise<Object>}
 */
const getGuild = (token, guildID) => request('GET', guild(guildID), token);

/**
 * Get the guilds the bot is in
 * @arg {String} token Token used for authorizing the request
 * @returns {Promise<Object[]>}
 */
const getGuilds = (token) => request('GET', 'users/@me/guilds', token);

/**
 * Create a guild
 * (Note: A guild is only created if the bot is in < 10 guilds)
 * @arg {String} token Token used for authorizing the request
 * @arg {Object} options Options for the request
 * @arg {String} options.name The guild's name
 * @arg {String} [options.region] The guild's region
 * @arg {String} [options.icon] The guild's icon
 * @arg {Number} [options.verification_level] The verification level
 * @arg {Number} [options.default_message_notifications] Message notifications
 * @arg {Number} [options.explicit_content_filter] The content filter
 * @arg {Object[]} [options.roles] An array of roles to create with
 * @arg {Object[]} [options.channel] An array of channels to create with
 * @returns {Promise<Object>}
 */
const createGuild = (token, options) =>
  request('POST', 'guilds', token, options);

/**
 * Edit a guild
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {Object} options Options for the request
 * @arg {String} [options.name] Set the name
 * @arg {String} [options.region] Set the region
 * @arg {Number} [options.verification_level] Set the verification level
 * @arg {Number} [options.default_message_notifications] Message notifications
 * @arg {Number} [options.explicit_content_filter] Content filter
 * @arg {String} [options.afk_channel_id] Set the afk channel
 * @arg {Number} [options.afk_timeout] Set the afk timeout
 * @arg {String} [options.icon] Set the icon
 * @arg {string} [options.owner_id] Set the owner(why is this a thing lol)
 * @arg {String} [options.splash] Set the splash (VIP only)
 * @arg {String} [options.system_channel_id] Set the system channel
 * @returns {Promise<Object>}
 */
const editGuild = (token, guildID, options) =>
  request('PATCH', guild(guildID), token, options);

/**
 * Delete a guild
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @returns {Promise<void>}
 */
const deleteGuild = (token, guildID) =>
  request('DELETE', guild(guildID), token);

/**
 * Leave a guild
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @returns {Promise<void>}
 */
const leaveGuild = (token, guildID) =>
  request('DELETE', meGuild(guildID), token);

/**
 * Get a ban object
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {String} userID The user's id
 * @returns {Promise<Object>}
 */
const getBan = (token, guildID, userID) =>
  request('GET', ban(guildID, userID), token);

/**
 * Get an array of ban objects from a guild
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @returns {Promise<Object[]>}
 */
const getBans = (token, guildID) => request('GET', bans(guildID), token);

/**
 * Get a member
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {String} userID The user's id
 * @returns {Promise<Object>}
 */
const getMember = (token, guildID, userID) =>
  request('GET', member(guildID, userID), token);

/**
 * Get an array of members in a guild
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {Object} [options] Options for the request
 * @arg {Number} [options.limit] Amount of members to get
 * @arg {String} [options.after] Get the members after this id
 * @returns {Promise<Object[]>}
 */
const getMembers = (token, guildID, options) =>
  request('GET', members(guildID), token, options);

/**
 * Edit a guild member
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {String} userID The user's id
 * @arg {Object} options Options for the request
 * @arg {String} [options.nick] Set the member's nickname
 * @arg {String[]} [options.roles] Set the member's roles
 * @arg {Boolean} [options.mute] Mute the member
 * @arg {Boolean} [options.deaf] Deafen the member
 * @arg {String} [options.channel_id] Set the channel (if connected)
 * @returns {Promise<void>}
 */
const editMember = (token, guildID, userID, options) =>
  request('PATCH', member(guildID, userID), token, options);

/**
 * Add a role to a member
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {String} userID The user's id
 * @arg {String} roleID The role's id
 * @returns {Promise<void>}
 */
const addMemberRole = (token, guildID, userID, roleID) =>
  request('PUT', memberRole(guildID, userID, roleID), token);

/**
 * Remove a role from a member
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {String} userID The user's id
 * @arg {String} roleID The role's id
 * @returns {Promise<void>}
 */
const removeMemberRole = (token, guildID, userID, roleID) =>
  request('DELETE', memberRole(guildID, userID, roleID), token);

/**
 * Kick a member
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {String} userID The user's id
 * @returns {Promise<void>}
 */
const kickMember = (token, guildID, userID) =>
  request('DELETE', member(guildID, userID), token);

/**
 * Ban a member
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {String} userID The user's id
 * @arg {Number} [days] The amount days to delete
 * @returns {Promise<void>}
 */
const banMember = (token, guildID, userID, days = null) =>
  request('PUT', ban(guildID, userID), token, {
    'delete-message-days': days
  });

/**
 * Unban a member
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {String} userID The user's id
 * @returns {Promise<void>}
 */
const unbanMember = (token, guildID, userID) =>
  request('DELETE', ban(guildID, userID), token);

/**
 * Get the prune count of a guild
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {Object} [options] Options for the request
 * @arg {Number} [options.days] Number of days to test
 * @returns {Promise<Object>}
 */
const getPruneCount = (token, guildID, options) =>
  request('GET', prune(guildID), token, options);

/**
 * Prune members of a guild
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {Object} [options] Options for the request
 * @arg {Number} [options.days] Number of days to prune
 * @arg {Boolean} [options.compute_prune_count] Recommend this as false
 * @returns {Promise<void>}
 */
const pruneMembers = (token, guildID, options) =>
  request('POST', prune(guildID), token, options);

/**
 * Get a guild's roles
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @returns {Promise<Object[]>}
 */
const getRoles = (token, guildID) => request('GET', roles(guildID), token);

/**
 * Create a role
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {Object} [options] Options for the request
 * @arg {String} [options.name] The role's name
 * @arg {Number} [options.permissions] The role's permissions
 * @arg {Number} [options.color] The role's color
 * @arg {Boolean} [options.hoist] Make the role hoisted if true
 * @arg {Boolean} [options.mentionable] Make the role mentionable if true
 * @returns {Promise<Object>}
 */
const createRole = (token, guildID, options) =>
  request('POST', roles(guildID), token, options);

/**
 * Delete a role
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {String} roleID The role's id
 * @returns {Promise<void>}
 */
const deleteRole = (token, guildID, roleID) =>
  request('DELETE', role(guildID, roleID), token);

/**
 * Edit a role
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {String} roleID The role's id
 * @arg {Object} options Options for the request
 * @arg {String} [options.name] The role's name
 * @arg {Number} [options.permissions] The role's permissions
 * @arg {Number} [options.color] The role's color
 * @arg {Boolean} [options.hoist] Make the role hoisted if true
 * @arg {Boolean} [options.mentionable] Make the role mentionable if true
 * @returns {Promise<Object>}
 */
const editRole = (token, guildID, roleID, options) =>
  request('PATCH', role(guildID, roleID), token, options);

/**
 * Edit role positions
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {Object[]} roles An array of { id, position }
 * @returns {Promise<Object[]>}
 */
const editRolePositions = (token, guildID, roles) =>
  request('PATCH', roles(guildID), token, roles);

/**
 * Get a guild's voice regions
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @returns {Promise<String[]>}
 */
const getVoiceRegions = (token, guildID) =>
  request('GET', regions(guildID), token);

/**
 * Get a guild's integrations
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @returns {Promise<Object[]>}
 */
const getIntegrations = (token, guildID) =>
  request('GET', integrations(guildID), token);

/**
 * Create an integration
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {Object} options Options for the request
 * @arg {String} options.type The type of integration
 * @arg {String} options.id The integration id
 * @returns {Promise<void>}
 */
const createIntegration = (token, guildID, options) =>
  request('POST', integrations(guildID), token, options);

/**
 * Delete an integration
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {String} integrationID The integration's id
 * @returns {Promise<void>}
 */
const deleteIntegration = (token, guildID, integrationID) =>
  request('DELETE', integration(guildID, integrationID), token);

/**
 * Edit an integration
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {String} integrationID The integration's id
 * @arg {Object} options Options for the request
 * @arg {Number} [options.expire_behavior] The behavior when it expires
 * @arg {Number} [options.expire_grace_period] Expire grace period
 * @arg {Boolean} [options.enable_emoticons] Enable emoticons
 * @returns {Promise<void>}
 */
const editIntegration = (token, guildID, integrationID, options) =>
  request('PATCH', integration(guildID, integrationID), token, options);

/**
 * Sync an integration
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @returns {Promise<void>}
 */
const syncIntegration = (token, guildID) =>
  request('POST', sync(guildID), token);

/**
 * Get the embed of a guild
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @returns {Promise<Object>}
 */
const getEmbed = (token, guildID) => request('GET', embed(guildID), token);

/**
 * Edit the embed of a guild
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {Object} options Options for the edit
 * @returns {Promise<Object>}
 */
const editEmbed = (token, guildID, options) =>
  request('PATCH', embed(guildID), token, options);

/**
 * Get the guild vanity url
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @returns {Promise<Object>}
 */
const getVanityURL = (token, guildID) =>
  request('GET', vanity(guildID), token);

/**
 * Get the guild vanity url
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {Object} [options] Query string parameters
 * @arg {String} [options.user_id] Filter for this user
 * @arg {Number} [options.action] The type of event action
 * @arg {String} [options.before] Get the logs before this entry id
 * @arg {Number} [options.limit] The number of logs to get
 * @returns {Promise<Object>}
 */
const getAuditLogs = (token, guildID, options) =>
  request('GET', auditLogs(guildID), token, options);

/**
 * Get an emoji
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {String} emojiID The emoji's id
 * @returns {Promise<Object>}
 */
const getEmoji = (token, guildID, emojiID) =>
  request('GET', emoji(guildID, emojiID), token);

/**
 * Get a guild's emojis
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @returns {Promise<Object[]>}
 */
const getEmojis = (token, guildID) =>
  request('GET', emojis(guildID), token);

/**
 * Create an emoji
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {Object} options Options for the edit
 * @arg {Object} options.name The emoji's name
 * @arg {String} options.image Base64 image data
 * @arg {String[]} [options.roles] Roles to be whitelisted
 * @returns {Promise<Object>}
 */
const createEmoji = (token, guildID, options) =>
  request('POST', emojis(guildID), token, options);

/**
 * Edit an emoji
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {String} emojiID The emoji's id
 * @arg {Object} options Options for the edit
 * @arg {String} [options.name] Set the name
 * @arg {String[]} [options.roles] Set the roles to be whitelisted
 * @returns {Promise<Object>}
 */
const editEmoji = (token, guildID, emojiID, options) =>
  request('PATCH', emoji(guildID, emojiID), token, options);

/**
 * Delete an emoji
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @arg {String} emojiID The emoji's id
 * @returns {Promise<void>}
 */
const deleteEmoji = (token, guildID, emojiID) =>
  request('DELETE', emoji(guildID, emojiID), token);

module.exports = {
  paths: {
    guild,
    meGuild,
    ban,
    bans,
    member,
    members,
    prune,
    role,
    roles,
    regions,
    integration,
    integrations,
    embed,
    sync,
    vanity,
    auditLogs,
    emoji,
    emojis
  },
  getGuild,
  getGuilds,
  createGuild,
  deleteGuild,
  leaveGuild,
  editGuild,
  getBan,
  getBans,
  getMember,
  getMembers,
  editMember,
  addMemberRole,
  removeMemberRole,
  kickMember,
  banMember,
  unbanMember,
  getPruneCount,
  pruneMembers,
  getRoles,
  createRole,
  deleteRole,
  editRole,
  editRolePositions,
  getVoiceRegions,
  getIntegrations,
  createIntegration,
  editIntegration,
  deleteIntegration,
  syncIntegration,
  getEmbed,
  editEmbed,
  getVanityURL,
  getAuditLogs,
  getEmoji,
  getEmojis,
  createEmoji,
  deleteEmoji,
  editEmoji
};
