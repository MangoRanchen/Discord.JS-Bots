const Commands = require(`../../../__Global/Structures/Commands`);
const { parse } = require(`path`);

class Command extends Commands {
  constructor(client) {
    super(client, {
      enabled: true,
      show: true,
      cooldown: false,
      cooldownTime: 3,
      name: parse(__filename).base.replace(`.js`, ``),
      description: `Random number between min and max`,
      usage: `Between [Min] [Max]`,
      aliases: []
    });
  }

  run(client, message, args) {
    if (args.length < 2) return client.missingArgs(message, this.usage);

    client.send(message, Math.round((Math.random() * args[1]) + args[0]), { code: `` });
  }
}

module.exports = Command;
