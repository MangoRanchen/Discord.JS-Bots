const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
  constructor(client) {
    super(client);
  }

  async run(client, message) {
    if (message.channel.name === `bots` && message.content.startsWith(`-`)) message.delete({ timeout: 500 });
    if (message.channel.name === `welcome`) {
      message.delete({ timeout: 500 });
      if (message.content.toLowerCase().includes(`i agree`)) {
        message.member.addRole(message.guild.roles.find(`name`, `Verified`));
      } else {
        message.member.kick();
      }
    }
  }
}

module.exports = Event;
