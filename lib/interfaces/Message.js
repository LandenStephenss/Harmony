'use strict';

const id = require('../util/id');

/**
 * Interface of a message
 * @arg {object} data Raw data from the API
 * @arg {object} client Client to use
 * @returns {Message}
 */
const create = (data, client) => {
  const message = {
    activity: data.activity || null,
    application: data.application || null,
    attachments: data.attachments,
    author: data.author,
    channelID: data.channel_id,
    content: getContent(data, client),
    editedTimestamp: null,
    embeds: null,
    guildID: data.guild_id || null,
    id: data.id,
    mentionEveryone: null,
    mentions: null,
    mentionRoles: null,
    nonce: data.nonce || null,
    pinned: null,
    reactions: new Map(),
    tts: data.tts,
    type: data.type
  };
  if (data.reactions !== undefined) {
    for (const reaction of data.reactions) {
      message.reactions.set(reaction.emoji.id || reaction.emoji.name, reaction);
    }
  }
  update(message, data, client);
  return message;
};

const joinMessages = [
  '{} just joined the server - glhf!',
  '{} just joined. Everyone, look busy!',
  '{} just joined. Can I get a heal?',
  '{} joined your party.',
  '{} joined. You must construct additional pylons.',
  'Ermagherd. {} is here.',
  'Welcome, {}. Stay awhile and listen.',
  'Welcome, {}. We were expecting you ( ͡° ͜ʖ ͡°)',
  'Welcome, {}. We hope you brought pizza.',
  'Welcome {}. Leave your weapons by the door.',
  'A wild {} appeared.',
  'Swoooosh. {} just landed.',
  'Brace yourselves. {} just joined the server.',
  '{} just joined... or did they?',
  '{} just arrived. Seems OP - please nerf.',
  '{} just slid into the server.',
  'A {} has spawned in the server.',
  'Big {} showed up!',
  'Where’s {}? In the server!',
  '{} hopped into the server. Kangaroo!!',
  '{} just showed up. Hold my beer.',
  'Challenger approaching - {} has appeared!',
  'It\'s a bird! It\'s a plane! Nevermind, it\'s just {}.',
  'It\'s {}! Praise the sun! \\\\[T]/',
  'Never gonna give {} up. Never gonna let {} down.',
  '{} has joined the battle bus.',
  'Cheers, love! {}\'s here!',
  'Hey! Listen! {} has joined!',
  'We\'ve been expecting you {}',
  'It\'s dangerous to go alone, take {}!',
  '{} has joined the server! It\'s super effective!',
  'Cheers, love! {} is here!',
  '{} is here, as the prophecy foretold.',
  '{} has arrived. Party\'s over.',
  'Ready player {}',
  '{} is here to kick butt and chew bubblegum. And {} is all out of gum.',
  'Hello. Is it {} you\'re looking for?',
  '{} has joined. Stay a while and listen!',
  'Roses are red, violets are blue, {} joined this server with you'
];

const getContent = (data, client) => {
  let str;
  if (data.type === 0) {
    str = data.content;
  } else if (data.type === 6) {
    str = `<@${data.author.id}> pinned a message to this channel. ` +
      '**See all the pins.**';
  } else if (data.type === 7) {
    str = joinMessages[id.toTimestamp(data.id) % 39]
      .replace('{}', `<@${data.author.id}>`);
  } else if (data.type > 7 && data.type < 12) {
    str = `<@${data.author.id}> just boosted the server!`;
    if (data.type > 8) {
      const guild = client.guilds.get(data.guild_id);
      str += ` ${guild.name} has achieved **Level ${data.type - 8}!**`;
    }
  }
  return str || '';
};

const update = (msg, data) => {
  if (msg.type === 0 && msg.content !== data.content) {
    msg.content = data.content;
    msg.editedTimestamp = data.edited_timestamp;
    msg.mentionEveryone = data.mention_everyone;
    msg.mentions = data.mentions;
    msg.mentionRoles = data.mention_roles;
  }
  msg.embeds = data.embeds;
  msg.pinned = data.pinned;
};

module.exports = {
  create,
  joinMessages,
  getContent,
  update
};

/**
 * @typedef {object} Message
 * @prop {object} activity Message activity
 * @prop {object} application Message application
 * @prop {object[]} attachments The message's attachments
 * @prop {User} author The author of the message
 * @prop {string} channelID The message's channel's id
 * @prop {string} content The content of the message
 * @prop {number} editedTimestamp The timestamp of the last edit
 * @prop {object[]} embeds The message's embeds
 * @prop {string} guildID The message's guild's id
 * @prop {string} id The message's id
 * @prop {boolean} mentionEveryone If the message mentions everyone or not
 * @prop {User[]} mentions Array of users the message mentions
 * @prop {Role[]} mentionRoles Array of roles of the message mentions
 * @prop {string} nonce Message nonce
 * @prop {boolean} pinned If the message is pinned or not
 * @prop {Map<string, object>} reactions Message reactions
 * @prop {boolean} tts If the message is tts or not
 * @prop {string} type The message's type
 */
