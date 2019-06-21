'use strict';

const id = require('../util/id');

const create = (data, client) => ({
  activity: data.activity || null,
  application: data.application || null,
  attachments: data.attachments,
  author: data.author,
  channelID: data.channel_id,
  content: getContent(data, client),
  editedTimestamp: data.edited_timestamp,
  embeds: data.embeds,
  guildID: data.guild_id || null,
  id: data.id,
  mentionEveryone: data.mention_everyone,
  mentions: data.mentions,
  mentionRoles: data.mention_roles,
  nonce: data.nonce || null,
  pinned: data.pinned,
  tts: data.tts,
  type: data.type
});

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

const getContent = (msg, client) => {
  let str = null;
  if (msg.type === 0) {
    str = msg.content;
  } else if (msg.type === 6) {
    str = `<@${msg.author.id}> pinned a message to this channel. ` +
      '**See all the pins.**';
  } else if (msg.type === 7) {
    str = joinMessages[id.toTimestamp(msg.id) % 39]
      .replace('{}', `<@${msg.author.id}>`);
  }
  else if (msg.type > 7 && msg.type < 12) {
    str = `<@${msg.author.id}> just boosted the server!`;
    if (msg.type > 8) {
      const guild = client.guilds.get(msg.guild_id);
      str += ` ${guild.name} has achieved **Level ${msg.type - 8}!**`;
    }
  }
  return str;
};

// eslint-disable-next-line no-unused-vars
const update = (msg, data) => {
};

module.exports = {
  create,
  joinMessages,
  getContent,
  update
};
