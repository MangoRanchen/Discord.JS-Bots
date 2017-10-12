const Events = require(`../Structures/Events`);

class Event extends Events {
	run(client) {
		console.log(client.user.username);

		if (client.user.bot) {
			client.user.setActivity(`${client.botPrefix}help | ${client.guilds.size} Guilds | By Shayne Hartford (ShayBox)`);
		}
	}
}

module.exports = Event;
