const Events = require(`../../../__Global/Structures/Events`);
const { MessageEmbed } = require(`discord.js`);

class Event extends Events {
	run(client, member) {
		if (process.env.LOCAL) return;
		if (member.guild.id !== `361532026354139156`) return;

		const embed = new MessageEmbed()
			.setAuthor(member.user.username, member.user.displayAvatarURL())
			.setColor(0xFF0000)
			.setFooter(`Left`)
			.setTimestamp();
		client.channels.get(`361540602858569728`).send({ embed });
	}
}

module.exports = Event;
