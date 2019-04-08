# Harmony
A [Node.js](https://nodejs.org/) wrapper for making [Discord](https://discordapp.com/) bots.

## Why Harmony?
* Full coverage over Discord's API (not yet)
* High-level, functional interface
* Asynchronous I/O operations
* Built-in, easily extendable command framework (not yet)

## Sample
```js
const harmony = require('harmony');

const onMessageCreate = (msg) => {
  if (msg.content === 'ping') {
    harmony.rest.message.createMessage(token, msg.channel_id, {
      content: 'Pong!'
    }).catch(console.error);
  }
};

const main = async (token) => {
  const shards = await harmony.ws.initializeShards(token);
  for (let i = 0; i < shards.length; ++i) {
    shards[i].on('MESSAGE_CREATE', onMessageCreate);
  }
};

main('Bot MjM4NDk0NzU2NTIxMzc3Nzky.CunGFQ.wUILz7z6HoJzVeq6pyHPmVgQgV4');
```

## Have any feedback?
Feel free to drop by our [Discord](https://discord.gg/rNPmCBR) server if you have any. We'd love to hear it!
