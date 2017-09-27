const Commands = require(`../Structures/Commands`);
const { exec } = require(`child_process`);
const { parse } = require(`path`);

class Command extends Commands {
  constructor(client) {
    super(client, {
      enabled: true,
      show: true,
      cooldown: false,
      cooldownTime: 3,
      name: parse(__filename).base.replace(`.js`, ``),
      description: `Executes bash/batch commands`,
      usage: `Exec [Command]`,
      aliases: [``]
    });
  }

  async run(client, message, args) {
    if (!client.ownerIDs.includes(message.author.id)) return client.errorMessage(message, null, `Sorry, you do not have permission for this command`);
    if (args.length < 1) return client.errorMessage(message, message.content.replace(client.botPrefix, ``), this.usage);

    exec(args.join(` `), { cwd: `../../` }, (err, stdout, stderr) => {
      if (err) return client.errorMessage(message, args.join(` `), err, `bash`, null, true);
      if (stderr) return client.errorMessage(message, args.join(` `), stderr, `bash`, null, true);

      client.successMessage(message, args.join(` `), stdout, `bash`);
    });
  }
}

module.exports = Command;
