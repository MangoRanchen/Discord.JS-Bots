const Events = require(`../Structures/Events`);

class Event extends Events {
  run(client, info) {
    client.warn(info);
  }
}

module.exports = Event;
