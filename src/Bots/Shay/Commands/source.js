const Commands = require(`../../../__Global/Structures/Commands`);
const { MessageEmbed } = require(`discord.js`);
const { homepage } = require(`../../../../package.json`);
const { parse } = require(`path`);

class Command extends Commands {
  constructor(client) {
    super(client, {
      enabled: true,
      show: true,
      cooldown: false,
      cooldownTime: 3,
      name: parse(__filename).base.replace(`.js`, ``),
      description: `Shows GitHub Repo URL`,
      usage: `Source`,
      aliases: [`repo`, `github`]
    });
  }

  async run(client, message) {
    const embed = new MessageEmbed()
      .setAuthor(`GitHub Repo`, `https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png`)
      .setTitle(homepage)
      .setColor(0x00FFFF);
    client.send(message, { embed });
  }
}

module.exports = Command;
