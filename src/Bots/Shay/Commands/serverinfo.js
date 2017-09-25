const Commands = require('../../../__Global/Structures/Commands');
const { MessageEmbed } = require('discord.js');
const { parse } = require('path');

class Command extends Commands {
  constructor(client) {
    super(client, {
      enabled: true,
      show: true,
      cooldown: false,
      cooldownTime: 3,
      name: parse(__filename).base.replace('.js', ''),
      description: 'Shows server info',
      usage: 'ServerInfo',
      aliases: ['server']
    });
  }

  async run(client, message) {
    const guild = message.guild;

    await guild.members.fetch();

    const embed = new MessageEmbed()
      .setAuthor(`${guild.owner.user.username} (${guild.owner.user.id})`, guild.owner.user.displayAvatarURL())

      .addField('Guild Name', guild.name, true)
      .addField('Guild ID', guild.id, true)
      .addBlankField(true)

      .addField('Categories', this.getChannelTypeSize(message.guild.channels, 'category'), true)
      .addField('Text Channels', this.getChannelTypeSize(message.guild.channels, 'text'), true)
      .addField('Voice Channels', this.getChannelTypeSize(message.guild.channels, 'voice'), true)

      .addField('Users', client.formatNumbers(guild.members.filter(member => !member.user.bot).size), true)
      .addField('Bots', client.formatNumbers(guild.members.filter(member => member.user.bot).size), true)
      .addField('Emojis', guild.emojis.size, true)

      .addField('Verification Level', this.resolveVerificationLevel(guild.verificationLevel), true)
      .addField('Explicit Filter Level', this.resolveExplicitLevel(guild.explicitContentFilter), true)
      .addField('Voice Region', guild.region.toUpperCase(), true)

      .addField('Guld Creation Date', guild.createdAt)
      .addField('Owner Creation Date', guild.owner.user.createdAt)
      .addField('Roles (A-Z)', guild.roles.map(role => `\`${role.name}\``).sort().join('\n').replace(/@/g, ''))

      .setColor(0x00FF00)
      .setFooter(client.botName)
      .setTimestamp();
    message.channel.send({ embed });
  }

  resolveVerificationLevel(level) {
    return String(level)
      .replace(0, 'None')
      .replace(1, 'Low')
      .replace(2, 'Medium')
      .replace(3, '(╯°□°）╯︵ ┻━┻')
      .replace(4, '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻');
  }

  resolveExplicitLevel(level) {
    return String(level)
      .replace(0, 'Scan nobody')
      .replace(1, 'Scan members without role')
      .replace(2, 'Scan everyone');
  }

  getChannelTypeSize(channels, type) {
    return channels.filter(channel => channel.type === type).size;
  }
}

module.exports = Command;
