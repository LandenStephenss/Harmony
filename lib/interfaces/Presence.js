'use strict';

/**
 * Interface for a presence object
 * @arg {object} data Raw data from the API
 * @returns {Presence}
 */
const create = (data) => {
  const presence = {
    activities: null,
    clientStatus: null,
    game: null,
    status: null
  };
  update(presence, data);
  return presence;
};

const game = (data) => ({
  applicationID: data.application_id || null,
  assets: data.assets || null,
  details: data.details || null,
  flags: data.flags || null,
  instance: data.instance || null,
  name: data.name,
  party: data.party || null,
  timestamps: data.timestamps || null,
  type: data.type,
  url: data.url || null
});

const update = (presence, data) => {
  presence.activities = data.activities.map(game);
  presence.clientStatus = {
    desktop: 'offline',
    mobile: 'offline',
    web: 'offline',
    ...data.client_status
  };
  presence.game = data.game && game(data.game);
  presence.status = data.status;
};

module.exports = {
  create,
  game,
  update
};

/**
 * @typedef {object} Presence
 * @prop {Activity[]} activities Presence activities
 * @prop {object} clientStatus The client status
 * @prop {Activity} game The presence game
 * @prop {string} status The presence status
 */

/**
 * @typedef {object} Activity
 * @prop {string} applicationID Application id
 * @prop {object} assets The assets
 * @prop {object} details The details
 * @prop {object} flags The flags
 * @prop {object} instance Instance
 * @prop {string} name The activity's name
 * @prop {object} party Party
 * @prop {object} timestamps Timestamps
 * @prop {number} type The activity's type
 * @prop {string} url The twitch url (if streaming)
 */
