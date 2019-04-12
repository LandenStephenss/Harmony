'use strict';

const request = require('./request');

const webhook = (webhookID) => `webhooks/${webhookID}`;

const tokenWebhook = (webhookID, webhookToken) =>
  `webhooks/${webhookID}/${webhookToken}`;

const channelWebhooks = (channelID) => `channels/${channelID}/webhooks`;

const guildWebhooks = (guildID) => `guilds/${guildID}/webhooks`;

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
 * Get a channel's webhooks
 * @arg {String} token Token used for authorizing the request
 * @arg {String} channelID The channel's id
 * @returns {Promise<Object[]>}
 */
const getChannelWebhooks = (token, channelID) =>
  request('GET', channelWebhooks(channelID), token);

/**
 * Get a guild's webhooks
 * @arg {String} token Token used for authorizing the request
 * @arg {String} guildID The guild's id
 * @returns {Promise<Object[]>}
 */
const getGuildWebhooks = (token, guildID) =>
  request('GET', guildWebhooks(guildID), token);

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
 * Edit a webhook
 * @arg {String} token Token used for authorizing the request
 * @arg {String} webhookID The webhook's id
 * @arg {Object} options Options for the request
 * @arg {String} [options.name] Set the new name
 * @arg {String} [options.avatar] Set the new avatar
 * @arg {String} [options.channel_id] Move the default channel
 * @returns {Promise<void>}
 */
const editWebhook = (token, webhookID) =>
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

module.exports = {
  paths: {
    webhook,
    tokenWebhook,
    channelWebhooks,
    guildWebhooks
  },
  getWebhook,
  getWebhookFromToken,
  getChannelWebhooks,
  getGuildWebhooks,
  createWebhook,
  deleteWebhook,
  deleteWebhookFromToken,
  editWebhook,
  editWebhookFromToken,
  executeWebhook
};
