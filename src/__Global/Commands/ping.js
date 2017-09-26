const Commands = require(`../Structures/Commands`);
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
      description: `Responds message and heartbeat ping`,
      usage: `Ping`,
      aliases: [``]
    });
  }

  run(client, message) {
    if (!client.user.bot) message.delete({ timeout: 500 });

    client.send(message, `Loading...`).then(sent => {
      const embed = new MessageEmbed()
        .addField(`Heartbeat`, `${Math.round(client.ping)}ms`, true)
        .addField(`Message`, `${Math.round(sent.createdTimestamp - message.createdTimestamp)}ms`, true)
        .setColor(0x00FFFF)
        .setFooter(client.botName)
        .setTimestamp();
      sent.edit({ embed });
    });
  }
}

module.exports = Command;
