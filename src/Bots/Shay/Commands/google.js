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
      description: `Converts the text into a lmgtfu URL`,
      usage: `Google [Text]`,
      aliases: [`lmgtfu`]
    });
  }

  async run(client, message, args) {
    if (args.length < 1) return client.errorMessage(message, message.content.replace(client.botPrefix, ``), this.usage);

    const embed = new MessageEmbed()
      .setAuthor(`http://lmgtfy.com/?q=${args.join(`+`)}`, `https://i.imgur.com/Khn3Mny.png`)
      .setDescription(`Searched for: ${args.join(` `)}`)
      .setColor(0x4885ED)
      .setFooter(client.botName)
      .setTimestamp();
    client.send(message, { embed });
  }
}

module.exports = Command;
