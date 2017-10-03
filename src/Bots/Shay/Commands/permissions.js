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
    if (args.length < 1) return client.missingArgs(message, this.usage);

    if (!message.guild.roles.find(`name`, args.join(` `))) return;

    client.send(message, client.clean(new Permissions(message.guild.roles.find(`name`, args.join(` `)).permissions).serialize()).toUpperCase().replace(/[{}, ]/g, ``), { code: `` });
  }
}

module.exports = Command;
