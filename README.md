# Harmony
[![Discord](https://canary.discordapp.com/api/guilds/536724303522299925/widget.png?style=shield)](https://discord.gg/rNPmCBR)

A [Discord](https://discordapp.com/) bot framework for the [Node.js](https://nodejs.org/) environment.

## Installing
You'll need Node.js 10 or higher. Go [here](https://nodejs.org/) to install it.
```
npm install @apacheli/harmony
```

## Sample
```js
const Harmony = require('@apacheli/harmony');
const bot = Harmony.ws.createClient('Bot TOKEN');

bot.emitter.on('ready', () => {
  console.log('I am ready!');
});

bot.emitter.on('messageCreate', (msg) => {
  if (msg.content === 'ping') {
    bot.createMessage(msg.channelID, { content: 'Pong!' });
  }
});

bot.connect();
```
More samples can be found [here](https://github.com/Apacheli/Harmony/tree/rewrite/samples) in the samples directory.

## Support
Feel free to join the [Discord](https://discord.gg/rNPmCBR) server for support.
