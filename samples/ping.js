const Harmony = require('@apacheli/harmony');
const token = 'Bot TOKEN';
const bot = Harmony.ws.createClient(token);

bot.emitter.on('ready', () => {
  // eslint-disable-next-line no-console
  console.log('I am ready!');
});

bot.emitter.on('messageCreate', (msg) => {
  if (msg.content === 'ping') {
    Harmony.rest.createMessage(token, msg.channelID, {
      content: 'Pong!'
    });
  }
});

Harmony.ws.connect(token, null, bot);
