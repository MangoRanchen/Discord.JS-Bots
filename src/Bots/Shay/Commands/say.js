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
      description: `Converts text into emojis`,
      usage: `Say [Text]`,
      aliases: [``]
    });
  }

  async run(client, message, args) {
    if (args.length < 1) return client.errorEmbed(message, message.content.replace(client.botPrefix, ``), this.usage);

    const numbers = [`zero`, `one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`, `nine`];

    setTimeout(() => {
      message.channel.send(args.join(` `)
        .replace(/[A-Z]/ig, letter => `:regional_indicator_${letter.toLowerCase()}:`)
        .replace(/[0-9]/ig, number => `:${numbers[number]}:`)
        .replace(`?`, `:grey_question:`)
        .replace(`#`, `:hash:`)
        .replace(`!`, `:exclamation:`)
        .replace(`$`, `:heavy_dollar_sign:`)
        .replace(`+`, `:heavy_plus_sign:`)
        .replace(`-`, `:heavy_minus_sign:`)
        .replace(`<`, `:arrow_backward:`)
        .replace(`>`, `:arrow_forward:`)
        .replace(`*`, `:asterisk:`)
        .replace(`.`, ``)
      );
    }, 500);
  }
}

module.exports = Command;
