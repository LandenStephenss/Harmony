'use strict';

const EventEmitter = require('events');

const Command = require('./command');
const message = require('../rest/message');
const ws = require('../ws');

const cdBlockResponse = (msg, command) => ({
  content: `<@${msg.author.id}>, you must wait \`${command
    .getCooldown(msg.author.id) * 0.001}\` seconds before using \`${
    command.name}\` again.`
});

/**
 * Command framework for the Harmony library
 */
class Commander {

  /**
   * @arg {Object} [data] Data for this commander
   * @arg {String} data.token Token used for authorizing requests
   * @arg {Number} [data.shardCount] Shard count
   * @arg {Object} [data.wsOptions] ws options
   * @arg {Boolean} [data.ignoreBots] If bots are ignored
   * @arg {String} [data.globalPrefix] Prefix shared across all servers
   * @arg {Object} [data.guildPrefixes] Prefixes per guild
   * @arg {Object|Function} [data.unknownCommandResponse] Unknown command
   * @arg {Object|Function} [data.cdBlockResponse] Command blocked by cooldown
   * @arg {Number} [data.cacheTime] The time a message stays cached
   */
  constructor(data = {}) {
    Object.defineProperty(this, 'token', { value: data.token });
    this.shardCount = data.shardCount || 1;
    this.wsOptions = data.wsOptions || {};
    this.urlOptions = data.urlOptions || null;
    this.ignoreBots = !!data.ignoreBots;
    this.globalPrefix = data.globalPrefix || '!';
    this.guildPrefixes = data.guildPrefixes || {};
    this.unknownCmdResponse = {
      content: 'Could not find that command!',
      ...data.unknownCmdResponse
    };
    this.cdBlockResponse = data.cdBlockResponse ||
      ((msg, command) => message.createMessage(data.token, msg.channel_id,
        { content: cdBlockResponse(msg, command) }));
    this.defaultCmdOptions = {
      description: 'No description.',
      cooldown: 5000,
      guildOnly: false,
      dmOnly: false,
      ...data.defaultCmdOptions
    };
    this.shards = null;
    this._emitter = new EventEmitter();
    this._messages = {};
    this._cacheTimeouts = {};
    this.cacheTime = data.cacheTime || 300000;
    this.commands = {};
    this.aliases = {};
  }

  /**
   * Connect the client
   * @returns {Promise<void>}
   */
  async connect() {
    const shards = await ws.initializeShards(this.token, this.shardCount,
      this.wsOptions, this.urlOptions);
    for (let i = 0; i < shards.length; ++i) {
      shards[i].on('debug', (data, shardID) => {
        this._emitter.emit(data.t, data.d, shardID);
      });
    }
    this.shards = shards;
  }

  /**
   * Create a commander
   * @arg {Object} [data] Data for this command
   * @arg {String} data.name The command's name
   * @arg {String[]} [data.aliases] Aliases for the command
   * @arg {Number} [data.cooldown] The cooldown
   * @arg {Boolean} [data.guildOnly] If the command is guild only
   * @arg {Function} data.run The run function
   */
  createCommand(data = {}) {
    if (this.commands[data.name] !== undefined) {
      throw new Error(`Name '${command.name}' is already registered`);
    }
    const command = new Command(this, data);
    this.commands[command.name] = command;
    for (let i = 0; i < command.aliases.length; ++i) {
      this.aliases[command.aliases[i]] = command.name;
    }
    return command;
  }

  async _onMessageCreate(msg) {
    if (msg.author.bot && this.ignoreBots) {
      return;
    }
    let prefix = this.globalPrefix;
    const guildPrefixes = this.guildPrefixes[msg.guild_id] || [];
    for (let i = 0; i < guildPrefixes.length; ++i) {
      if (msg.content.slice(0, guildPrefixes[i].length) === guildPrefixes[i]) {
        prefix = guildPrefixes[i];
        break;
      }
    }
    if (msg.content.slice(0, prefix.length) !== prefix) {
      return;
    }
    const args = msg.content.slice(prefix.length).split(' ');
    const name = args.shift();
    const command = this.commands[this.aliases[name] || name];
    const cached = this._messages[msg.id];
    if (command === undefined) {
      if (cached !== undefined) {
        return;
      }
      if (typeof this.unknownCmdResponse === 'function') {
        this.unknownCmdResponse(msg, name);
      } else if (this.unknownCmdResponse != null) {
        message.createMessage(this.token, msg.channel_id,
          this.unknownCmdResponse);
      }
      return;
    }
    if (command.guildOnly && !msg.guild_id) {
      this._emitter.emit('guildOnly', msg, command);
      return;
    }
    const cooldown = command.cooldowns[msg.author.id];
    if (cooldown !== undefined) {
      if (cached !== undefined || cooldown.responded) {
        return;
      }
      if (typeof this.cdBlockResponse === 'function') {
        this.cdBlockResponse(msg, command);
      } else if (this.cdBlockResponse != null) {
        message.createMessage(this.token, msg.channel_id,
          this.cdBlockResponse);
      }
      cooldown.responded = true;
      return;
    }
    if (command.cooldown > 0) {
      command.addCooldown(msg.author.id);
    }
    let result = command.run(msg, args);
    if (result instanceof Promise) {
      result = await result;
    }

    if (cached !== undefined) {
      if (result != null) {
        message.editMessage(this.token, msg.channel_id, cached, result);
      }
      return;
    }

    let bot = null;
    if (result != null) {
      bot = await message.createMessage(this.token, msg.channel_id, result);
      bot = bot.id;
    }
    this._messages[msg.id] = bot;
    this._cacheTimeouts[msg.id] = setTimeout(() => {
      delete this._messages[msg.id];
      delete this._cacheTimeouts[msg.id];
    }, this.cacheTime);
  }

  _onMessageUpdate(msg) {
    if (this._messages[msg.id] !== undefined) {
      this._onMessageCreate(msg);
    }
  }

  _onMessageDelete(msg) {
    if (this._messages[msg.id] !== undefined) {
      delete this._messages[msg.id];
      clearTimeout(this._cacheTimeouts[msg.id]);
      delete this._cacheTimeouts[msg.id];
      return;
    }
    const keys = Object.keys(this._messages);
    for (let i = 0; i < keys.length; ++i) {
      if (this._messages[keys[i]] === msg.id) {
        delete this._messages[keys[i]];
        clearTimeout(this._cacheTimeouts[keys[i]]);
        delete this._cacheTimeouts[keys[i]];
        break;
      }
    }
  }

  /**
   * Set up the message events
   * @returns {this}
   */
  handleMessageEvents() {
    this._emitter.on('MESSAGE_CREATE', this._onMessageCreate.bind(this));
    this._emitter.on('MESSAGE_UPDATE', this._onMessageUpdate.bind(this));
    this._emitter.on('MESSAGE_DELETE', this._onMessageDelete.bind(this));
    return this;
  }
}

module.exports = Commander;
