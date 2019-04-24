'use strict';

/**
 * Command structure and stuff
 */
class Command {

  constructor(client, data = {}) {
    this._client = client;
    this.name = data.name;
    this.description = data.description;
    this.run = data.run;
  }
}

module.exports = Command;
