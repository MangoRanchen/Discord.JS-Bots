const Events = require(`../../../__Global/Structures/Events`);
const { MessageEmbed } = require(`discord.js`);

class Event extends Events {
  run(client, member) {
    if (process.env.LOCAL) return;
    if (member.guild.id !== `361532026354139156`) return;
    client.fetchWebhook(process.env.WEBHOOK_MemberLog_ID, process.env.WEBHOOK_MemberLog_TOKEN).then(webhook => {
      const embed = new MessageEmbed()
        .setAuthor(member.user.username, member.user.displayAvatarURL())
        .setColor(0xFF0000)
        .setFooter(`Left`)
        .setTimestamp();
      webhook.send({ embed });
    });
  }
}

module.exports = Event;
