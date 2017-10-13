const Events = require(`../Structures/Events`);

class Event extends Events {
	run(client) {
		console.log(client.user.username);

		if (client.user.bot) {
			client.user.setActivity(`${client.botPrefix}help | ${client.guilds.size} ${client.guilds.size > 1 ? `Guilds` : `Guild`} | By Shayne Hartford (ShayBox)`);
		}
	}
}

module.exports = Event;
