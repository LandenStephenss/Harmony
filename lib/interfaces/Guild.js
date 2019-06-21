'use strict';

const Channel = require('./Channel');
const Member = require('./Member');
const Presence = require('./Presence');
const Role = require('./Role');

const create = (data, shardID) => {
  const guild = {
    afkChannelID: null,
    afkTimeout: null,
    applicationID: data.application_id,
    available: !data.unavailable,
    banner: null,
    channels: new Map(),
    defaultMessageNotifcations: null,
    description: null,
    embedChannelID: null,
    embedEnabled: null,
    emojis: new Map(),
    explicitContentFilter: null,
    features: null,
    icon: null,
    id: data.id,
    maxMembers: null,
    maxPresences: null,
    memberCount: data.member_count,
    members: new Map(),
    mfaLevel: null,
    name: null,
    owner: null,
    preferredLocale: null,
    premiumSubscriptionCount: null,
    premiumTier: null,
    region: null,
    roles: new Map(),
    shardID,
    splash: null,
    systemChannelFlags: null,
    systemChannelID: null,
    vanityURLCode: null,
    verificationLevel: null,
    widgetEnabled: null,
    widgetChannelID: null
  };
  for (const emoji of data.emojis) {
    guild.emojis.set(emoji.id, emoji);
  }
  for (const role of data.roles) {
    guild.roles.set(role.id, Role.create(role));
  }
  for (const channel of data.channels) {
    guild.channels.set(channel.id, Channel.create(channel));
  }
  for (const member of data.members) {
    guild.members.set(member.user.id, Member.create(member));
  }
  for (const presence of data.presences) {
    const member = guild.members.get(presence.user.id);
    member.presence = Presence.create(presence);
  }
  for (const voiceState of data.voice_states) {
    guild.members.get(voiceState.user_id).voiceState = voiceState;
  }
  return update(guild, data);
};

const update = (guild, data) => {
  guild.afkChannelID = data.afk_channel_id;
  guild.afkTimeout = data.afk_timeout;
  guild.available = !data.unavailable;
  guild.banner = data.banner;
  guild.defaultMessageNotifcations = data.default_message_notifications;
  guild.description = data.description;
  guild.embedChannelID = data.embed_channel_id;
  guild.embedEnabled = data.embed_enabled;
  guild.explicitContentFilter = data.explicit_content_filter;
  guild.features = data.features;
  guild.icon = data.icon;
  guild.maxMembers = data.max_members || 250000;
  guild.maxPresences = data.max_presences || 5000;
  guild.mfaLevel = data.mfa_level;
  guild.name = data.name;
  guild.ownerID = data.owner_id;
  guild.preferredLocale = data.preferred_locale;
  guild.premiumSubscriptionCount = data.premium_subscription_count;
  guild.premiumTier = data.premium_tier;
  guild.region = data.region;
  guild.splash = data.splash;
  guild.systemChannelFlags = data.system_channel_flags;
  guild.systemChannelID = data.system_channel_id;
  guild.vanityURLCode = data.vanity_url_code;
  guild.verificationLevel = data.verification_level;
  guild.widgetEnabled = !!data.widget_enabled;
  guild.widgetChannelID = data.widget_channel_id || null;
  return guild;
};

module.exports = {
  create,
  update
};
