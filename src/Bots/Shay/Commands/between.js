const Commands = require('../../../__Global/Structures/Commands');
const { parse } = require('path');

class Command extends Commands {
  constructor(client) {
    super(client, {
      enabled: true,
      show: true,
      cooldown: false,
      cooldownTime: 3,
      name: parse(__filename).base.replace('.js', ''),
      description: 'Random number between min and max',
      usage: 'Between [Min] [Max]',
      aliases: ['']
    });
  }

  async run(client, message, args) {
    if (args.length < 2) return client.errorEmbed(message, message.content.replace(client.botPrefix, ''), this.usage);

    client.successEmbed(message, message.content, Math.round((Math.random() * args[1]) + args[0]));
  }
}

module.exports = Command;
