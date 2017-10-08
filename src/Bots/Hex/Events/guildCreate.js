const Events = require(`../../../__Global/Structures/Events`);

class Event extends Events {
	async run(client, guild) {
		client.log(`${client.botName} Has joined ${guild.name}`);

		await guild.members.fetch();

		if (guild.id === `110373943822540800`) return;

		if (guild.roles.size > 200) {
			return client.send(client.defaultChannel(guild), `This server has more than 200 roles, This bot will not work.`);
		}

		if (guild.memberCount - guild.members.filter(member => member.user.bot).size > 200) {
			return client.send(client.defaultChannel(guild), `This server has more than 200 non-bot members, You may experience issues with the max role size`);
		}
	}
}

module.exports = Event;
