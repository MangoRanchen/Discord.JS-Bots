const Commands = require(`../../../__Global/Structures/Commands`);
const { parse } = require(`path`);
const googl = require(`goo.gl`);
googl.setKey(process.env.GOOGLE_URL_API);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: true,
			cooldown: false,
			cooldownTime: 3,
			name: parse(__filename).base.replace(`.js`, ``),
			description: `Shortens the URL`,
			usage: `Short [URL]`,
			aliases: []
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this.usage);

		googl.shorten(args[0]).then(url => {
			client.send(message, url);
		});
	}
}

module.exports = Command;
