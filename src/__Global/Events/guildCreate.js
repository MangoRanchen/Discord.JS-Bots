const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
  constructor(client) {
    super(client);
  }

  run(client, guild) {
    client.log(`${client.user.username} has joined ${guild.name}`);
  }
}

module.exports = Event;
