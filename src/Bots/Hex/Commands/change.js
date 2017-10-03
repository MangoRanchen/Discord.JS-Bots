const Commands = require(`../../../__Global/Structures/Commands`);
const { MessageEmbed } = require(`discord.js`);
const randomColor = require(`randomcolor`);
const { parse } = require(`path`);

class Command extends Commands {
  constructor(client) {
    super(client, {
      enabled: true,
      show: true,
      cooldown: true,
      cooldownTime: 60,
      name: parse(__filename).base.replace(`.js`, ``),
      description: `Changes the color role's color`,
      usage: `Change [Hex Value or RANDOM]`,
      aliases: [`hex`, `color`, `colour`]
    });
  }

  run(client, message, args) {
    if (args.length < 1) args.push(randomColor());
    if (args[0].toLowerCase().includes(`random`)) args[0] = randomColor();

    if (/^#[0-9A-F]{6}$/i.test(args[0]) || /^[0-9A-F]{6}$/i.test(args[0])) {
      let embed = new MessageEmbed();
      if (!message.guild.me.hasPermission([`MANAGE_ROLES`])) {
        embed
          .setTitle(`❌ **ERROR**`)
          .setDescription(
            `Invalid permissions\n` +
              `\`MANAGE_ROLES\``
          )
          .setColor(0xFF0000)
          .setFooter(client.botName)
          .setTimestamp();
        return;
      }

      let roleName = `USER-${message.author.id}`;
      let roleColor = parseInt(args[0].replace(`#`, ``).replace(`0x`, ``), 16);
      let rolePermissions = message.author.id === `86699451317493760` ? [`ADMINISTRATOR`] : [];

      if (message.member.colorRole === null) {
        message.guild.createRole({
          data: {
            name: roleName,
            color: roleColor,
            permissions: rolePermissions
          }
        }).then(role => {
          message.member.addRole(role);
        });
      } else if (message.member.colorRole.name !== roleName) {
        try {
          message.member.colorRole.edit({ color: `DEFAULT` });

          embed
            .setTitle(`❌ **ERROR**`)
            .setDescription(`The role \`${message.member.colorRole.name}\` wasn't set to "Default" or "000000", I fixed it for you, Please try that command again.`)
            .setColor(0xFF0000)
            .setFooter(client.botName)
            .setTimestamp();
          return;
        } catch (error) {
          embed
            .setTitle(`❌ **ERROR**`)
            .setDescription(`Please set the color of the \`${message.member.colorRole.name}\` role to "Default" or "000000"`)
            .setColor(0xFF0000)
            .setFooter(client.botName)
            .setTimestamp();
          return;
        }
      } else {
        message.member.colorRole.edit({
          color: roleColor,
          permissions: rolePermissions
        });
      }
      embed
        .setTitle(`✅ **Changed to #${args[0].toUpperCase().replace(`#`, ``)}**`)
        .setColor(roleColor)
        .setFooter(client.botName)
        .setTimestamp();
      client.send(message, { embed });
    } else {
      const embed = new MessageEmbed()
        .setTitle(`❌ **ERROR**`)
        .setDescription(
          `Invalid arguments\n` +
          `Try \`h!change #FFFFFF\``
        )
        .setColor(0xFF0000)
        .setFooter(client.botName)
        .setTimestamp();
      client.send(message, { embed });
    }
  }
}

module.exports = Command;
