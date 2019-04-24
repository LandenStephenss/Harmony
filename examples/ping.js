const harmony = require('@apacheli/harmony');
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
