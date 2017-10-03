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
      description: `Toggles the NSFW channels`,
      usage: `NSFW`,
      aliases: [``]
    });
  }

  run(client, message) {
    const NSFW = message.guild.roles.find(`name`, `NSFW`);

    if (message.member.roles.has(NSFW.id)) {
      message.member.removeRole(NSFW);
      client.errorMessage(message, null, `Successfully Disabled NSFW Channels`);
    } else {
      message.member.addRole(NSFW);
      client.successMessage(message, null, `Successfully Enabled NSFW Channels`);
    }
  }
}

module.exports = Command;
