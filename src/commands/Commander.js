'use strict';

const EventEmitter = require('events');

const Command = require('./command');
const message = require('../rest/message');
const ws = require('../ws');

/**
 * Command framework for the Harmony library
 * @extends {EventEmitter}
 */
class Commander extends EventEmitter {

  constructor(options = {}) {
    super();
    this.token = options.token;
    this.shardCount = options.shardCount || 1;
    this.wsOptions = options.wsOptions || {};
    this.urlOptions = options.urlOptions;
    this.ignoreBots = options.ignoreBots;
    this.globalPrefix = options.globalPrefix || '!';
    this.guildPrefixes = options.guildPrefixes || {};
    this.unknownCommandResponse = options.unknownCommandResponse || {
      content: 'Could not find that command!'
    };
    this.shards = null;
    this.commands = {};
  }

  async connect() {
    const shards = await ws.initializeShards(
      this.token, this.shardCount, this.wsOptions, this.urlOptions
    );
    for (let i = 0; i < shards.length; ++i) {
      shards[i].on('debug', (data, id) => {
        this.emit(data.t, data.d, id);
      });
    }
    this.shards = shards;
  }

  createCommand(data) {
    const command = new Command(this, data);
    if (Object.prototype.hasOwnProperty.call(this.commands, command.name)) {
      throw new Error(`Name '${command.name}' is already registered`);
    }
    this.commands[command.name] = command;
    return command;
  }

  async onMessageCreate(msg) {
    if (msg.guild_id !== '536724303522299925') {
      return;
    }
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
    const command = this.commands[name];
    if (command === undefined) {
      if (typeof this.unknownCommandResponse === 'function') {
        this.unknownCommandResponse(msg, name);
      } else {
        this.createMessage(msg.channel_id, this.unknownCommandResponse);
      }
    } else {
      let result = command.run(msg, args);
      if (result instanceof Promise) {
        result = await result;
      }
      if (result !== undefined) {
        this.createMessage(msg.channel_id, result);
      }
    }
  }

  createMessage(channelID, options) {
    return message.createMessage(this.token, channelID, options);
  }

  handleMessageCreate() {
    this.on('MESSAGE_CREATE', this.onMessageCreate);
  }
}

module.exports = Commander;
