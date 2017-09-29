const Commands = require(`../../../__Global/Structures/Commands`);
const asciify = require(`asciify`);
const { parse } = require(`path`);

class Command extends Commands {
  constructor(client) {
    super(client, {
      enabled: true,
      show: true,
      cooldown: false,
      cooldownTime: 3,
      name: parse(__filename).base.replace(`.js`, ``),
      description: `Converts the text to an ascii`,
      usage: `Ascii [Text]`,
      aliases: [``]
    });
  }

  run(client, message, args) {
    if (args.length < 1) return client.errorMessage(message, message.content.replace(client.botPrefix, ``), this.usage);

    asciify(args.join(` `), `standard`, (error, response) => {
      if (error) return client.errorMessage(message, message.content, error);

      client.send(message, response, { code: `` });
    });
  }
}

module.exports = Command;
