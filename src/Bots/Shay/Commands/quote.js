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
			description: `Quotes a message`,
			usage: `Quote [MessageID] [ChannelID]`,
			aliases: [`q`]
		});
	}

	run(client, message, args) {
		if (args.length < 1) return client.missingArgs(message, this.usage);

		let messageID = args[0];
		let channelID = args[1] ? args[1] : message.channel.id;

		client.channels.get(channelID).messages.fetch(messageID).then(quote => {
			const embed = new MessageEmbed()
				.setAuthor(quote.author.username, quote.author.displayAvatarURL())
				.addField(`Message: `, quote.content)
				.setColor(0x00FF00)
				.setFooter(client.botName)
				.setTimestamp();
			client.send(message, { embed });
		});
	}
}

module.exports = Command;
