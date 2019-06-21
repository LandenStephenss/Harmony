const Harmony = require('@apacheli/harmony');
const bot = Harmony.ws.createClient('Bot TOKEN');

bot.emitter.on('ready', () => {
  // eslint-disable-next-line no-console
  console.log('I am ready!');
});

bot.emitter.on('messageCreate', (msg) => {
  if (msg.content === 'ping') {
    bot.createMessage(msg.channelID, { content: 'Pong!' });
  }
});

bot.connect();
