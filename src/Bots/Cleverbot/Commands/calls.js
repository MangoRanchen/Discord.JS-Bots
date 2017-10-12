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
			description: `Lists Used API Calls vs Total API Calls`,
			usage: `Calls`,
			aliases: []
		});
	}

	run(client, message) {
		client.database.find({}).then(data => {
			client.send(message,
				`${data[0].USED_API_CALLS} / ${data[1].TOTAL_API_CALLS}\n` +
				`Please donate to increase our calls, All donations go twords buying more!\n` +
				`<htps://paypal.me/hydarbolt>`
			);
		});
	}
}

module.exports = Command;
