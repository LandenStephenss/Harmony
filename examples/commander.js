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
  run() {
    return { content: 'Ping!' };
  }
});
bot.handleMessageCreate();
bot.connect();
