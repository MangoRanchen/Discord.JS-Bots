const Events = require('../Structures/Events');

class Event extends Events {
  constructor(client) {
    super(client);
  }

  async run(client, info) {
    client.warn(info);
  }
}

module.exports = Event;
