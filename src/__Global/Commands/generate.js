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
			aliases: []
		});
	}

	run(client, message, args) {
		if (!client.ownerIDs.includes(message.author.id)) return client.send(message, `Sorry, you do not have permission for this command`);
		if (args.length < 1) return client.missingArgs(message, this.usage);

		client.guilds.get(args.join(` `)).channels.first().createInvite({ maxAge: 1 })
			.then(invite => client.send(message, invite.url))
			.catch(error => client.send(message, error, { code: `` }));
	}
}

module.exports = Command;
