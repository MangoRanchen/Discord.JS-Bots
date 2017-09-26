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
      description: `Generates an invite to the guild`,
      usage: `Generate [GuildID]`,
      aliases: [``]
    });
  }

  async run(client, message, args) {
    if (args.length < 1) return client.missingArgs(message);
    if (!client.ownerIDs.includes(message.author.id)) return;

    client.guilds.get(args.join(` `)).channels.first().createInvite({ maxAge: 1 })
      .then(invite => message.channel.send(invite.url))
      .catch(error => client.errorEmbed(message, null, error));
  }
}

module.exports = Command;
