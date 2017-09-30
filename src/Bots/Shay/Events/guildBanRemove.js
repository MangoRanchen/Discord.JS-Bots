const Events = require(`../../../__Global/Structures/Events`);
const { MessageEmbed } = require(`discord.js`);

class Event extends Events {
  run(client, guild, user) {
    if (process.env.LOCAL) return;
    if (guild.id !== `361532026354139156`) return;

    const embed = new MessageEmbed()
      .setAuthor(user.username, user.displayAvatarURL())
      .setColor(0x00FF00)
      .setFooter(`Pardoned`)
      .setTimestamp();
    client.channels.get(`363701182822350859`).send({ embed });
  }
}

module.exports = Event;
