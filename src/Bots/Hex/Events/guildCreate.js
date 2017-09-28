const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
  constructor(client) {
    super(client);
  }

  async run(client, guild) {
    client.log(`${client.botName} Has joined ${guild.name}`);

    await guild.members.fetch();

    if (guild.id === `110373943822540800`) return;

    if (guild.memberCount - guild.members.filter(member => member.user.bot).size > 100) {
      client.defaultChannel(guild).send(`Sorry, This server has more than 100 non-bot members.`);
      return guild.leave();
    }

    if (guild.roles.size > 100) {
      client.defaultChannel(guild).send(`Sorry, This server has more than 100 roles.`);
      return guild.leave();
    }
  }
}

module.exports = Event;
