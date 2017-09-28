const Events = require(`../Structures/Events`);
const { MessageEmbed } = require(`discord.js`);

class Event extends Events {
  constructor(client) {
    super(client);
  }

  run(client, guild) {
    if (process.env.LOCAL) return;
    client.fetchWebhook(process.env.WEBHOOK_GuildLog_ID, process.env.WEBHOOK_GuildLog_TOKEN).then(webhook => {
      const embed = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL())
        .setColor(0x00FF00)
        .setFooter(`Left`)
        .setTimestamp();
      webhook.send({ embed });
    });
  }
}

module.exports = Event;
