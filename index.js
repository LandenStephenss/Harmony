'use strict';

module.exports = {
  rest: {
    channel: require('./src/rest/channel'),
    gateway: require('./src/rest/gateway'),
    guild: require('./src/rest/guild'),
    message: require('./src/rest/message'),
    request: require('./src/rest/request')
  },
  cdn: require('./src/cdn'),
  ws: require('./src/ws')
};
