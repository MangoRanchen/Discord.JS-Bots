const Events = require(`../Structures/Events`);
const { MessageEmbed } = require(`discord.js`);

class Event extends Events {
	run(client, guild) {
		if (process.env.LOCAL) return;

		const embed = new MessageEmbed()
			.setAuthor(guild.name, guild.iconURL())
			.setColor(0x00FF00)
			.setFooter(`Joined`)
			.setTimestamp();
		client.send(client.channels.get(`363003869288202242`), { embed });
	}
}

module.exports = Event;
