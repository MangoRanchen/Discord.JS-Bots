const Commands = require(`../../../__Global/Structures/Commands`);
const { parse } = require(`path`);

class Command extends Commands {
  constructor(client) {
    super(client, {
      enabled: true,
      show: true,
      cooldown: false,
      cooldownTime: 3,
      name: parse(__filename).base.replace(`.js`, ``),
      description: `Picks a random guild member`,
      usage: `Member`,
      aliases: [``]
    });
  }

  run(client, message) {
    let randomMember = null;

    pickMember();

    function pickMember() {
      randomMember = message.guild.members.random();

      if (randomMember.user.bot) return pickMember();

      client.send(message, randomMember.user.username);
    }
  }
}

module.exports = Command;
