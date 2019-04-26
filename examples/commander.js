'use strict';

const harmony = require('@apacheli/harmony');
const bot = new harmony.commands.Commander({
  token: 'Bot TOKEN',
  globalPrefix: '=>',
  guildPrefixes: {
    '536724303522299925': ['>', '::']
  }
});

bot.createCommand({
  name: 'ping',
  aliases: ['pong'],
  run: () => ({ content: 'Pong!' })
});

bot.handleMessageEvents();
bot.connect();
