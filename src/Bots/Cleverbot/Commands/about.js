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
      description: `Information about me`,
      usage: `About`,
      aliases: [``]
    });
  }

  run(client, message) {
    if (message.channel.name.includes(`cleverbot`)) return;
    const embed = new MessageEmbed()
      .setTitle(`About`)
      .setDescription(
        `I am Cleverbot\n` +
        `I was created by **Shayne Hartford**\n` +
        `To use me, create a channel with "cleverbot" in the name\n` +
        `And start talking :D`
      )
      .setColor(0x00FF00)
      .setFooter(client.botName)
      .setTimestamp();
    client.send(message, { embed });
  }
}

module.exports = Command;
