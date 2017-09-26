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
      description: `Shows guild information on the mentioned user`,
      usage: `UserInfo [Mention/ID]`,
      aliases: [`user`]
    });
  }

  async run(client, message, args) {
    let member = message.member;
    if (message.mentions.members.array().size) {
      member = message.mentions.members.first();
    } else {
      member = message.guild.members.get(args[0]);
    }

    const embed = new MessageEmbed()
      .addField(`User Name`, member.user.username, true)
      .addField(`Guild Nickname`, member.nickname === null ? `No Nickname` : member.nickname, true)

      .addField(`Status`, this.resolveStatus(member), true)
      .addField(`Game`, member.presence.game ? member.presence.game.name : `None`, true)

      .addField(`Roles (A-Z)`, message.member.roles.map(role => `\`${role.name}\``).sort().join(`\n`).replace(/@/g, ``))
      .addField(`Server Join Date`, member.joinedAt)
      .addField(`Account Creation Date`, member.user.createdAt)

      .setThumbnail(member.user.displayAvatarURL())
      .setColor(0x00FF00)
      .setFooter(client.botName)
      .setTimestamp();
    client.send(message, { embed });
  }

  resolveStatus(member) {
    member.user.presence.status
      .replace(`online`, `Online`)
      .replace(`offline`, `Offline`)
      .replace(`idle`, `Away`)
      .replace(`dnd`, `Do Not Disturb`);
  }
}

module.exports = Command;
