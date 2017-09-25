const Commands = require('../Structures/Commands');
const { parse } = require('path');

class Command extends Commands {
  constructor(client) {
    super(client, {
      enabled: true,
      show: true,
      cooldown: false,
      cooldownTime: 3,
      name: parse(__filename).base.replace('.js', ''),
      description: 'Runs process.exit()',
      usage: 'Exit',
      aliases: ['process.exit()']
    });
  }

  run(client, message) {
    if (!client.ownerIDs.includes(message.author.id)) return;
    process.exit();
  }
}

module.exports = Command;
