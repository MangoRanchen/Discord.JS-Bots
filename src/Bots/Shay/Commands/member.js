const Commands = require('../../../__Global/Structures/Commands');
const { parse } = require('path');

class Command extends Commands {
  constructor(client) {
    super(client, {
      enabled: true,
      show: true,
      cooldown: false,
      cooldownTime: 3,
      name: parse(__filename).base.replace('.js', ''),
      description: 'Picks a random guild member',
      usage: 'Member',
      aliases: ['']
    });
  }

  async run(client, message) {
    let randomMember = null;

    pickMember();

    function pickMember() {
      randomMember = message.guild.members.random();

      if (randomMember !== null && !randomMember.user.bot) {
        message.channel.send(randomMember.user.username);
      } else {
        pickMember();
      }
    }
  }
}

module.exports = Command;
