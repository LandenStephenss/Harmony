'use strict';

module.exports = {
  events: require('./lib/events'),
  interfaces: {
    Channel: require('./lib/interfaces/Channel'),
    Emoji: require('./lib/interfaces/Emoji'),
    Guild: require('./lib/interfaces/Guild'),
    Member: require('./lib/interfaces/Member'),
    Message: require('./lib/interfaces/Message'),
    Presence: require('./lib/interfaces/Presence'),
    Role: require('./lib/interfaces/Role')
  },
  request: require('./lib/request'),
  rest: require('./lib/rest'),
  util: {
    id: require('./lib/util/id'),
    write: require('./lib/util/write')
  },
  version: require('./package.json').version,
  ws: require('./lib/ws')
};
