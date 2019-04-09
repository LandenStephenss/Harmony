# Harmony
[![Discord](https://canary.discordapp.com/api/guilds/536724303522299925/widget.png?style=shield)](https://discord.gg/rNPmCBR)

A [Node.js](https://nodejs.org/) wrapper for making [Discord](https://discordapp.com/) bots.
## Why Harmony?
* Full coverage over Discord's API (not yet)
* High-level, functional interface
* Asynchronous I/O operations
* Built-in, easily extendable command framework (not yet)

## Sample
```js
const harmony = require('harmony');
const token = 'Bot TOKEN';

const onMessageCreate = (msg) => {
  if (msg.content === 'ping') {
    harmony.rest.message.createMessage(token, msg.channel_id, {
      content: 'Pong!'
    }).catch(console.error);
  }
};

const main = async () => {
  const shards = await harmony.ws.initializeShards(token);
  for (let i = 0; i < shards.length; ++i) {
    shards[i].on('MESSAGE_CREATE', onMessageCreate);
  }
};

main();
```

## Have any feedback?
Feel free to drop by our [Discord](https://discord.gg/rNPmCBR) server if you have any. We'd love to hear it!
