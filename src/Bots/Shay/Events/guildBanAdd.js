const Events = require(`../../../__Global/Structures/Events`);
const { MessageEmbed } = require(`discord.js`);

class Event extends Events {
  run(client, guild, user) {
    if (process.env.LOCAL) return;
    if (guild.id !== `361532026354139156`) return;
    client.fetchWebhook(process.env.WEBHOOK_ModLog_ID, process.env.WEBHOOK_ModLog_TOKEN).then(webhook => {
      const embed = new MessageEmbed()
        .setAuthor(user.username, user.displayAvatarURL())
        .setColor(0x00FF00)
        .setFooter(`Banned`)
        .setTimestamp();
      webhook.send({ embed });
    });
  }
}

module.exports = Event;
