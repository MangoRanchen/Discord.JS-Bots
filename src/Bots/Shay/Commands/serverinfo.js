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
      description: `Shows server info`,
      usage: `ServerInfo`,
      aliases: [`server`]
    });
  }

  async run(client, message) {
    await message.guild.members.fetch();

    const embed = new MessageEmbed()
      .setAuthor(`${message.guild.owner.user.username} (${message.guild.owner.user.id})`, message.guild.owner.user.displayAvatarURL())

      .addField(`Guild Name`, message.guild.name, true)
      .addField(`Guild ID`, message.guild.id, true)
      .addBlankField(true)

      .addField(`Categories`, this.getChannelTypeSize(message.guild.channels, `category`), true)
      .addField(`Text Channels`, this.getChannelTypeSize(message.guild.channels, `text`), true)
      .addField(`Voice Channels`, this.getChannelTypeSize(message.guild.channels, `voice`), true)

      .addField(`Users`, client.formatNumbers(message.guild.members.filter(member => !member.user.bot).size), true)
      .addField(`Bots`, client.formatNumbers(message.guild.members.filter(member => member.user.bot).size), true)
      .addField(`Emojis`, message.guild.emojis.size, true)

      .addField(`Verification Level`, this.resolveVerificationLevel(message.guild.verificationLevel), true)
      .addField(`Explicit Filter Level`, this.resolveExplicitLevel(message.guild.explicitContentFilter), true)
      .addField(`Voice Region`, message.guild.region.toUpperCase(), true)

      .addField(`Guld Creation Date`, message.guild.createdAt)
      .addField(`Owner Creation Date`, message.guild.owner.user.createdAt)
      .addField(`Roles (A-Z)`, message.guild.roles.map(role => `\`${role.name}\``).sort().join(`\n`).replace(/@/g, ``))

      .setColor(0x00FF00)
      .setFooter(client.botName)
      .setTimestamp();
    client.send(message, { embed });
  }

  resolveVerificationLevel(level) {
    return String(level)
      .replace(0, `None`)
      .replace(1, `Low`)
      .replace(2, `Medium`)
      .replace(3, `(╯°□°）╯︵ ┻━┻`)
      .replace(4, `┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻`);
  }

  resolveExplicitLevel(level) {
    return String(level)
      .replace(0, `Scan nobody`)
      .replace(1, `Scan members without role`)
      .replace(2, `Scan everyone`);
  }

  getChannelTypeSize(channels, type) {
    return channels.filter(channel => channel.type === type).size;
  }
}

module.exports = Command;
