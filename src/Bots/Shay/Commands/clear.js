const Commands = require(`../../../__Global/Structures/Commands`);
const { parse } = require(`path`);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: true,
			cooldown: false,
			cooldownTime: 3,
			name: parse(__filename).base.replace(`.js`, ``),
			description: `Clears 1-100 messages`,
			usage: `Clear [1-100]`,
			aliases: [`prune`, `purge`]
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this.usage);
		if (!message.guild.me.hasPermission(`MANAGE_MESSAGES`) || !message.member.hasPermission(`MANAGE_MESSAGES`)) return client.send(message, `Missing Permissions "MANAGE_MESSAGES"`, { code: `` });
		if (args[0] < 1 || args[0 > 100]) return client.send(message, `Number between 1 and 100`, { code: `` });

		message.channel.bulkDelete(args[0]);
	}
}

module.exports = Command;
