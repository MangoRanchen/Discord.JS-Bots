const Commands = require(`../Structures/Commands`);
const { MessageEmbed, version } = require(`discord.js`);
const { cpuLoad, memoryUsage } = require(`os-toolbox`);
const { homepage } = require(`../../../package.json`);
const { exec } = require(`child_process`);
const { parse } = require(`path`);
const getos = require(`getos`);

class Command extends Commands {
  constructor(client) {
    super(client, {
      enabled: true,
      show: true,
      cooldown: false,
      cooldownTime: 3,
      name: parse(__filename).base.replace(`.js`, ``),
      description: `Shows bot & OS info`,
      usage: `BotInfo`,
      aliases: [`bot`]
    });
  }

  async run(client, message) {
    message.channel.send(`Loading...`).then(sent => {
      let memberCount = 0;
      client.guilds.forEach(guild => {
        memberCount += guild.memberCount;
      });

      getos((error, response) => {
        if (error) return client.errorEmbed(message, message.content, error);

        exec(`npm -v`, async (error2, stdout, stderr) => {
          if (error2) return client.errorEmbed(message, message.content, error);
          if (stderr) return client.errorEmbed(message, message.content, stderr);

          const embed = new MessageEmbed()
            .setAuthor(`GitHub Repo`, `https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png`)
            .setTitle(homepage)

            .addField(`Node Version`, process.version, true)
            .addField(`NPM Version`, stdout, true)
            .addField(`Discord.JS Version`, version, true)

            .addField(`OS Type`, response.os.replace(`win32`, `Windows`).replace(`linux`, `Linux`), true)
            .addField(`OS CPU`, `${await cpuLoad()}% used`, true)
            .addField(`OS RAM`, process.env.LOCAL !== undefined ? `${await memoryUsage()}% used of 8GB` : `${await memoryUsage()}% used of 512MB`, true)

            .addField(`Heartbeat Ping`, `${Math.round(client.ping)}ms`, true)
            .addField(`Message Ping`, `${Math.round(sent.createdTimestamp - message.createdTimestamp)}ms`, true)
            .addField(`Process Uptime`, client.formatTime(process.uptime()), true)

            .addField(`Guilds`, client.guilds.size, true)
            .addField(`Channels`, client.formatNumbers(client.channels.size), true)
            .addField(`Members`, client.formatNumbers(memberCount), true)

            .setColor(0x00FF00)
            .setFooter(client.botName)
            .setTimestamp();
          sent.edit({ embed });
        });
      });
    });
  }
}

module.exports = Command;
