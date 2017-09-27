const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
  constructor(client) {
    super(client);
  }

  async run(client, message) {
    if (message.channel.name === `bots`) {
      if (message.content.startsWith(`-`)) message.delete({ timeout: 500 });
      if (message.author.id === `234395307759108106`) message.delete({ timeout: 10000 }).catch(() => null);
    }
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
