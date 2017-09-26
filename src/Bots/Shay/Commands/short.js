const Commands = require(`../../../__Global/Structures/Commands`);
const { MessageEmbed } = require(`discord.js`);
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
      aliases: [``]
    });
  }

  async run(client, message, args) {
    if (args.length < 1) return client.errorMessage(message, message.content.replace(client.botPrefix, ``), this.usage);

    googl.shorten(args[0]).then(url => {
      let embed = new MessageEmbed()
        .setTitle(url)
        .setDescription(`Link has been shortened`)
        .setURL(url)
        .setColor(0x4285F4)
        .setFooter(client.botName)
        .setTimestamp();
      client.send(message, { embed });
    }).catch(error => client.errorMessage(message, args[0], error));
  }
}

module.exports = Command;
