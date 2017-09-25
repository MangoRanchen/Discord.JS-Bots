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
      description: 'Encodes/Decodes binary',
      usage: 'Binary [Encode/Decode] [Text/Binary]',
      aliases: ['b']
    });
  }

  async run(client, message, args) {
    if (args.length < 2) return client.errorEmbed(message, message.content.replace(client.botPrefix, ''), this.usage);

    let action = args.shift();
    let output = null;

    function asciiToBin(input) {
      let pad = '00000000';

      return input.replace(/./g, c => {
        let bin = c.charCodeAt(0).toString(2);
        return pad.substring(bin.length) + bin;
      });
    }

    function binToAscii(input) {
      return input.replace(/[01]{8}/g, value => String.fromCharCode(parseInt(value, 2)));
    }

    switch (action.toLowerCase()) {
    case 'encode':
      output = asciiToBin(args.join(' '));
      break;

    case 'decode':
      output = binToAscii(args.join(' '));
      break;
    }

    if (!output) return client.errorEmbed(message, message.content, 'Unknown function, encode or decode');

    client.successEmbed(message, args.join(' '), output);
  }
}

module.exports = Command;
