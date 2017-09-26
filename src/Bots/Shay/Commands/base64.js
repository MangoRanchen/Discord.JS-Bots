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
      description: `Encodes or Decodes base64`,
      usage: `Base64 [Encode/Decode] [Text/Base64]`,
      aliases: [`b64`, `64`]
    });
  }

  async run(client, message, args) {
    if (args.length < 2) return client.errorEmbed(message, message.content.replace(client.botPrefix, ``), this.usage);

    let action = args.shift();
    let output = null;

    switch (action.toLowerCase()) {
    case `encode`:
      output = Buffer.from(args.join(` `)).toString(`base64`);
      break;

    case `decode`:
      output = Buffer.from(args.join(` `), `base64`).toString(`ascii`);
      break;
    }

    if (output === null) return client.errorEmbed(message, message.content, `Unknown function, encode or decode`);

    client.successEmbed(message, args.join(` `), output);
  }
}

module.exports = Command;
