const Harmony = require('@apacheli/Harmony');
const bot = Harmony.ws.createClient('TOKEN');

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
