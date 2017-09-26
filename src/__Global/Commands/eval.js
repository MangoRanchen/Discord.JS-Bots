const Commands = require(`../Structures/Commands`);
const { parse } = require(`path`);

class Command extends Commands {
  constructor(client) {
    super(client, {
      enabled: true,
      show: true,
      cooldown: false,
      cooldownTime: 3,
      name: parse(__filename).base.replace(`.js`, ``),
      description: `Evaluates javascript code`,
      usage: `Eval [Code]`,
      aliases: [``]
    });
  }

  async run(client, message, args) {
    if (args.length < 1) return client.missingArgs(message);
    if (!client.ownerIDs.includes(message.author.id)) return;

    try {
      client.successEmbed(message, args.join(` `), client.clean(eval(args.join(` `))), `js`, `js`);
    } catch (error) {
      client.errorEmbed(message, args.join(` `), error, `js`);
    }
  }
}

module.exports = Command;
