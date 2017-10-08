const Commands = require(`../Structures/Commands`);
const { MessageEmbed } = require(`discord.js`);
const { exec } = require(`child_process`);
const { parse } = require(`path`);
const PastebinAPI = require(`pastebin-js`);
const pastebin = new PastebinAPI(process.env.PASTEBIN_API);

class Command extends Commands {
	constructor(client) {
		super(client, {
			enabled: true,
			show: false,
			cooldown: false,
			cooldownTime: 3,
			name: parse(__filename).base.replace(`.js`, ``),
			description: `Executes bash/batch commands`,
			usage: `Exec [Command]`,
			aliases: []
		});
	}

	run(client, message, args) {
		if (!client.ownerIDs.includes(message.author.id)) return client.send(message, `Sorry, you do not have permission for this command`);
		if (args.length < 1) return client.missingArgs(message, this.usage);

		let embed = new MessageEmbed()
			.setFooter(client.botName)
			.setTimestamp();

		if (args.join(` `).length < 1024) {
			embed.addField(`📥 Input`, `\`\`\`\n${args.join(` `)}\n\`\`\``);
		} else {
			pastebin.createPaste(args.join(` `), `Input`, null, 1, `1D`).then(data => {
				embed.addField(`❌ Error`, `Input was too long, ${data}`);
			}).fail(error => {
				this.error(error);
				this.send(message, `Pastebin Upload`);
			});
		}

		exec(args.join(` `), { cwd: `../../` }, (error, stdout, stderr) => {
			if (stderr) {
				embed.setColor(0xFF0000);

				if (stderr.length < 1024) {
					embed.addField(`❌ Error`, `\`\`\`bash\n${stderr}\n\`\`\``);
				} else {
					pastebin.createPaste(stderr, `Error`, null, 1, `1D`).then(data => {
						embed.addField(`❌ Error`, `Error was too long, ${data}`);
					}).fail(error => {
						this.error(error);
						this.send(message, `Pastebin Upload`);
					});
				}
				return client.send(message, { embed });
			}

			if (error) {
				embed.setColor(0xFF0000);

				if (String(error).length < 1024) {
					embed.addField(`❌ Error`, `\`\`\`bash\n${error}\n\`\`\``);
				} else {
					pastebin.createPaste(error, `Error`, null, 1, `1D`).then(data => {
						embed.addField(`❌ Error`, `Error was too long, ${data}`);
					}).fail(error => {
						this.error(error);
						this.send(message, `Pastebin Upload`);
					});
				}
				return client.send(message, { embed });
			}

			embed.setColor(0x00FF00);

			if (stdout.length < 1024) {
				embed.addField(`📤 Output`, `\`\`\`\bashn${stdout}\n\`\`\``);
			} else {
				pastebin.createPaste(stdout, `Output`, null, 1, `1D`).then(data => {
					embed.addField(`❌ Error`, `Output was too long, ${data}`);
				}).fail(error => {
					this.error(error);
					this.send(message, `Pastebin Upload`);
				});
			}

			client.send(message, { embed });
		});
	}
}

module.exports = Command;
