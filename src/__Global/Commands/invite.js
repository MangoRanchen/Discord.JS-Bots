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
      description: `Gives bot invite link`,
      usage: `Invite`,
      aliases: [``]
    });
  }

  async run(client, message) {
    let embed = new MessageEmbed();

    if (client.user.bot) {
      embed
        .setTitle(`Invite Link`)
        .setURL(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`)
        .setColor(0x00FFFF)
        .setFooter(`Note: I may be a private bot`);
    } else {
      embed
        .setTitle(`I'm a user account, I can't be invited`)
        .setColor(0x00FFFF);
    }
    message.channel.send({ embed });
  }
}

module.exports = Command;
