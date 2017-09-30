const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
  run(client) {
    if (process.env.LOCAL) return;
  }
}

module.exports = Event;
