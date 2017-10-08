const Commands = require(`../../../__Global/Structures/Commands`);
const { MessageEmbed } = require(`discord.js`);
const { parse } = require(`path`);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: true,
			cooldown: false,
			cooldownTime: 3,
			name: parse(__filename).base.replace(`.js`, ``),
			description: `Shows support message`,
			usage: `Support`,
			aliases: []
		});
	}

	run(client, message) {
		const embed = new MessageEmbed()
			.setTitle(`Thank you for inviting me to your server!`)
			.setDescription(`` +
								`**Note:**\n` +
								`\`You must set the color of every role to "Default" for me to work!\`\n` +
								`\`If you would like more support join my discord\` https://discord.io/shaybox`
			);
		client.send(message, { embed });
	}
}

module.exports = Command;
