'use strict';

module.exports = {
  commands: {
    command: require('./src/commands/Command'),
    commander: require('./src/commands/Commander')
  },
  rest: {
    channel: require('./src/rest/channel'),
    gateway: require('./src/rest/gateway'),
    guild: require('./src/rest/guild'),
    invite: require('./src/rest/invite'),
    message: require('./src/rest/message'),
    request: require('./src/rest/request'),
    user: require('./src/rest/user'),
    webhook: require('./src/rest/webhook')
  },
  cdn: require('./src/cdn'),
  ws: require('./src/ws')
};
