const Events = require('../Structures/Events');

class Event extends Events {
  constructor(client) {
    super(client);
  }

  async run(client) {
    console.log(client.user.username);

    if (client.user.bot) {
      client.user.setActivity(`${client.botPrefix}help`);
    }
  }
}

module.exports = Event;
