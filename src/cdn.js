'use strict';

const emoji = (emojiID, format = 'png') => `emojis/${emojiID}.${format}`;

const icon = (guildID, guildIcon, format = 'png') =>
  `icons/${guildID}/${guildIcon}.${format}`;

const splash = (guildID, guildSplash, format = 'png') =>
  `splashes/${guildID}/${guildSplash}.${format}`;

const banner = (guildID, guildBanner, format = 'png') =>
  `banners/${guildID}/${guildBanner}.${format}`;

const defaultAvatar = (id, format = 'png') =>
  `embed/avatars/${id}.${format}`;

const avatar = (userID, userAvatar, format = 'png') =>
  `avatars/${userID}/${userAvatar}.${format}`;

const application = {
  icon: (applicationID, applicationIcon, format = 'png') =>
    `app-icons/${applicationID}/${applicationIcon}.${format}`,
  asset: (applicationID, assetID, format = 'png') =>
    `app-assets/${applicationID}/${assetID}.${format}`
};

module.exports = {
  baseURL: 'https://cdn.discordapp.com/',
  emoji,
  icon,
  splash,
  banner,
  defaultAvatar,
  avatar,
  application
};
