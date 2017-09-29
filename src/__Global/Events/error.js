const Events = require(`../Structures/Events`);

class Event extends Events {
  run(client, info) {
    client.error(info);
  }
}

module.exports = Event;
