const Commands = require(`../Structures/Commands`);
const { parse } = require(`path`);

class Command extends Commands {
  constructor(client) {
    super(client, {
      enabled: true,
      show: false,
      cooldown: false,
      cooldownTime: 3,
      name: parse(__filename).base.replace(`.js`, ``),
      description: `Lists all servers`,
      usage: `Servers`,
      aliases: [`guilds`]
    });
  }

  async run(client, message) {
    if (!client.ownerIDs.includes(message.author.id)) return client.errorMessage(message, null, `Sorry, you do not have permission for this command`);

    let servers = [];
    client.guilds.forEach(guild => {
      servers.push(`${guild.name}\n`);
    });

    client.maxLength(message, null, servers.sort().join(``));
  }
}

module.exports = Command;
