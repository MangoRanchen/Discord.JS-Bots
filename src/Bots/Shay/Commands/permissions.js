const Commands = require(`../../../__Global/Structures/Commands`);
const { Permissions } = require(`discord.js`);
const { parse } = require(`path`);

class Command extends Commands {
  constructor(client) {
    super(client, {
      enabled: true,
      show: true,
      cooldown: false,
      cooldownTime: 3,
      name: parse(__filename).base.replace(`.js`, ``),
      description: `Shows role permissions`,
      usage: `Permissions [Role Name]`,
      aliases: [`perms`]
    });
  }

  run(client, message, args) {
    if (args.length < 1) return client.errorMessage(message, message.content.replace(client.botPrefix, ``), this.usage);

    if (!message.guild.roles.find(`name`, args.join(` `))) return;

    client.successMessage(message, `Permissions for ${args.join(` `)}`, client.clean(new Permissions(message.guild.roles.find(`name`, args.join(` `)).permissions).serialize()).toUpperCase().replace(/[{}, ]/g, ``));
  }
}

module.exports = Command;
