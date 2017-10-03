const Commands = require(`../../../__Global/Structures/Commands`);
const { username } = require(`mojang`);
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
      description: `Player info`,
      usage: `Minecraft [Name]`,
      aliases: [`mc`]
    });
  }

  run(client, message, args) {
    if (args.length < 1) return client.missingArgs(message, this.usage);
    if (args[0] < 3 || args[0] > 32) client.send(message, `Please input valid name`, { code: `` });

    username(args[0]).then(data => {
      const embed = new MessageEmbed()
        .setAuthor(`${data.name} (UUID: ${data.id})`, `https://visage.surgeplay.com/face/${data.id}`)
        .setImage(`https://visage.surgeplay.com/full/512/${data.id}`)
        .setColor(0x00FF00)
        .setFooter(client.botName)
        .setTimestamp();
      client.send(message, { embed });
    }).catch(() => client.send(message, `Invalid name, Please input valid name`, { code: `` }));
  }
}

module.exports = Command;
