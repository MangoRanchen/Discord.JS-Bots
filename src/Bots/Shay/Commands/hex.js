const Commands = require(`../../../__Global/Structures/Commands`);
const { MessageEmbed } = require(`discord.js`);
const { parse } = require(`path`);

class Command extends Commands {
  constructor(client) {
    super(client, {
      enabled: true,
      show: true,
      cooldown: false,
      cooldownTime: 3,
      name: parse(__filename).base.replace(`.js`, ``),
      description: `Shows the hex value in an embed`,
      usage: `Hex [Hex Value]`,
      aliases: [`color`, `colour`]
    });
  }

  async run(client, message, args) {
    if (args.length < 1) return client.errorEmbed(message, message.content.replace(client.botPrefix, ``), this.usage);

    if (/[0-9A-F]{6}/i.test(args)) {
      const embed = new MessageEmbed()
        .setTitle(`#${args.join(` `).replace(`#`, ``)}`)
        .setColor(parseInt(args.join(` `).replace(`#`, ``), 16));
      client.send(message, { embed });
    }
  }
}

module.exports = Command;
