const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
  constructor(client) {
    super(client);
  }

  async run(client, member) {
    let role = member.roles.find(`name`, `USER-${member.id}`);

    if (role) role.delete();
  }
}

module.exports = Event;
