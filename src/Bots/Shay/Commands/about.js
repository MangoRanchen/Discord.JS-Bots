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
      description: `About the bot`,
      usage: `About`,
      aliases: [``]
    });
  }

  async run(client, message) {
    const embed = new MessageEmbed()
      .setTitle(`Custom Bot`)
      .setDescription(`I am a custom bot created by ShayBox for this guild`);
    client.send(message, { embed });
  }
}

module.exports = Command;
