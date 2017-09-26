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
      description: ``,
      usage: `Command [Required] (Optional)`,
      aliases: [``]
    });
  }

  async run(client, message, args) {
    if (args.length < 1) return client.errorEmbed(message, message.content.replace(client.botPrefix, ``), this.usage);
    // Code
  }
}

module.exports = Command;
