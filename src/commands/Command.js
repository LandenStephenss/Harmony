'use strict';

/**
 * Command structure
 */
class Command {

  /**
   * @arg {Commander} client The Commander
   * @arg {Object} [data] Data for this command
   * @arg {String} data.name The command's name
   * @arg {String[]} [data.aliases] Aliases for the command
   * @arg {Number} [data.cooldown] The cooldown
   * @arg {Boolean} [data.guildOnly] If the command is guild only
   * @arg {Function} data.run The run function
   */
  constructor(client, data = {}) {
    const options = {
      ...client.defaultCmdOptions,
      ...data
    };
    this._client = client;
    this.name = data.name;
    this.aliases = data.aliases || [];
    this.cooldown = options.cooldown;
    this.guildOnly = options.guildOnly;
    this.run = data.run;
    this.cooldowns = {};
  }

  /**
   * Add user to cooldown
   * @arg {String} userID The user's id
   * @returns {Object}
   */
  addCooldown(userID) {
    this.cooldowns[userID] = { time: Date.now(), responded: false };
    setTimeout(() => delete this.cooldowns[userID], this.cooldown);
    return this.cooldowns[userID];
  }

  /**
   * Get the time left before a user can use this command again
   * @arg {String} userID The user's id
   * @returns {Number}
   */
  getCooldown(userID) {
    return (this.cooldowns[userID].time + this.cooldown) - Date.now();
  }
}

module.exports = Command;
