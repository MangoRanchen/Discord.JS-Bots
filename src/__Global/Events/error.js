const Events = require(`../Structures/Events`);

class Event extends Events {
  constructor(client) {
    super(client);
  }

  async run(client, info) {
    client.error(info);
  }
}

module.exports = Event;
