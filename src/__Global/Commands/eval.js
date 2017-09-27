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
    if (!client.ownerIDs.includes(message.author.id)) return client.errorMessage(message, null, `Sorry, you do not have permission for this command`);
    if (args.length < 1) return client.errorMessage(message, message.content.replace(client.botPrefix, ``), this.usage);

    try {
      client.successMessage(message, args.join(` `), client.clean(eval(args.join(` `))), `js`, `js`, true);
    } catch (error) {
      client.errorMessage(message, args.join(` `), error, `js`, null, true);
    }
  }
}

module.exports = Command;
