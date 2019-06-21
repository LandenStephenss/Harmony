'use strict';

const create = (data) => update({
  activities: null,
  clientStatus: null,
  game: null,
  status: null
}, data);

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

// eslint-disable-next-line
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
  return presence;
};

module.exports = {
  create,
  game,
  update
};
