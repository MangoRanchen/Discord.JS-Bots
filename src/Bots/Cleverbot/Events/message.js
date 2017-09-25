const Events = require('../../../__Global/Structures/Events');
const Cleverbot = require('cleverbot-node');
const cleverbot = new Cleverbot;
cleverbot.configure({ botapi: process.env.CLEVERBOT_API });

class Event extends Events {
  constructor(client) {
    super(client);
  }

  async run(client, message) {
    if (message.channel.name.includes('cleverbot')) {
      if (message.author.bot) return;

      if (client.checkCooldown(message.author.id)) return message.channel.send('Cooldown, please wait!').then(m => m.delete({ timeout: 1000 }));
      client.addCooldown(message.author.id, '1');

      message.channel.startTyping();
      cleverbot.write(message.content, response => {
        message.channel.send(response.output);
        message.channel.stopTyping();
      });
    }
  }
}

module.exports = Event;
