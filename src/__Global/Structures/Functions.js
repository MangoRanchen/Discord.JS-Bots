const { Client, MessageEmbed, Collection } = require(`discord.js`);
const { sep, resolve } = require(`path`);
const { inspect } = require(`util`);
const PastebinAPI = require(`pastebin-js`);
const pastebin = new PastebinAPI(process.env.PASTEBIN_API);

class CustomClient extends Client {
  constructor(options) {
    super(options);
    this.botName = resolve(`.`).split(sep).slice(-1)[0];
    this.botPrefix = `${this.botName.toLowerCase().charAt(0)}!`;
    this.commands = new Collection();
    this.aliases = new Collection();
    this.cooldownUsers = [];
    this.ownerIDs = [`358558305997684739`];
  }

  // Client Log/Warn/Error
  log(input) {
    console.log(input);
    if (process.env.LOCAL) return;
    this.console(input, `Log`);
  }

  warn(input) {
    console.warn(input);
    if (process.env.LOCAL) return;
    this.console(input, `Warn`);
  }

  error(input) {
    console.error(input);
    if (process.env.LOCAL) return;
    this.console(input, `Error`);
  }

  console(input, type) {
    this.fetchWebhook(process.env.WEBHOOK_Console_ID, process.env.WEBHOOK_Console_TOKEN).then(webhook => {
      const embed = new MessageEmbed()
        .setDescription(input)
        .setColor(0x00FF00)
        .setFooter(`${type} | ${this.botName}`)
        .setTimestamp();
      webhook.send({ embed });
    });
  }

  // Add/Remove/Check Cooldown
  removeCooldown(userID, time) {
    let index = this.cooldownUsers.indexOf(userID);
    if (index > -1) {
      setTimeout(() => {
        this.cooldownUsers = this.cooldownUsers.splice(index, 0);
      }, time * 1000);
    }
  }

  addCooldown(userID, time) {
    this.cooldownUsers.push(userID);
    this.removeCooldown(userID, time);
  }

  checkCooldown(userID) {
    return this.cooldownUsers.indexOf(userID) > -1;
  }

  // MaxLength/Error/Success Embed
  maxLengthEmbed(message, input, output, inputType, outputType) {
    if (output.length < 2000) return this.user.bot ? client.send(message, output, { code: outputType ? outputType : `` }) : client.send(message, output, { code: outputType ? outputType : `` });

    let embed = new MessageEmbed()
      .setColor(0xFF0000)
      .setFooter(this.botName)
      .setTimestamp();

    if (input) {
      if (inputType) {
        embed
          .addField(`:inbox_tray: Input`, `\`\`\`${inputType}\n${input}\n\`\`\``);
      } else {
        embed
          .addField(`:inbox_tray: Input`, `\`\`\`${input}\`\`\``);
      }
    }

    pastebin.createPaste(output, input, null, 1, `1D`).then(data => {
      embed
        .addField(`:x: ERROR`, `Output was too long, ${data}`);
    }).fail(error => {
      this.log(output);
      this.errorEmbed(message, `Pastebin Upload`, error);
    });


    if (this.user.bot) {
      client.send(message, { embed });
    } else {
      setTimeout(() => { client.send(message, { embed }); }, 500);
    }

    this.send(message, { embed });
  }

  errorEmbed(message, input, output, inputType, outputType) {
    if ((input && input.length > 1024) || (output && output.length > 1024)) return this.maxLengthEmbed(message, input, output, inputType, outputType);

    let embed = new MessageEmbed()
      .setColor(0xFF0000)
      .setFooter(this.botName)
      .setTimestamp();

    if (input) {
      if (inputType) {
        embed
          .addField(`:inbox_tray: Input`, `\`\`\`${inputType}\n${input}\n\`\`\``);
      } else {
        embed
          .addField(`:inbox_tray: Input`, `\`\`\`${input}\`\`\``);
      }
    }

    if (output) {
      if (outputType) {
        embed
          .addField(`:x: ERROR`, `\`\`\`${outputType}\n${output}\n\`\`\``);
      } else {
        embed
          .addField(`:x: ERROR`, `\`\`\`${output}\`\`\``);
      }
    }

    if (String(embed).length > 2000) return this.maxLengthEmbed(message, input, output, inputType, outputType);

    this.send(message, { embed });
  }

  successEmbed(message, input, output, inputType, outputType) {
    if ((input && input.length > 1024) || (output && output.length > 1024)) return this.maxLengthEmbed(message, input, output, inputType, outputType);

    let embed = new MessageEmbed()
      .setColor(0x00FF00)
      .setFooter(this.botName)
      .setTimestamp();

    if (input) {
      if (inputType) {
        embed
          .addField(`:inbox_tray: Input`, `\`\`\`${inputType}\n${input}\n\`\`\``);
      } else {
        embed
          .addField(`:inbox_tray: Input`, `\`\`\`${input}\`\`\``);
      }
    }

    if (output) {
      if (outputType) {
        embed
          .addField(`:outbox_tray: Output`, `\`\`\`${outputType}\n${output}\n\`\`\``);
      } else {
        embed
          .addField(`:outbox_tray: Output`, `\`\`\`${output}\`\`\``);
      }
    }

    if (String(embed).length > 2000) return this.maxLengthEmbed(message, input, output, inputType, outputType);

    this.send(message, { embed });
  }

  send(message, ...content) {
    if (this.user.bot) {
      message.channel.send(...content);
    } else {
      setTimeout(() => { message.edit(...content); }, 500);
    }
  }

  clean(text) {
    let SECRET = `[SECRET!]`;
    if (typeof text !== `string`) { text = inspect(text, { depth: 0 }); }
    text = text
      .replace(/`/g, `\`${String.fromCharCode(8203)}`)
      .replace(/@/g, `@${String.fromCharCode(8203)}`)
      // Client Tokens
      .replace(process.env.Shay, SECRET)
      // Webhook IDs & Tokens
      // Console
      .replace(process.env.WEBHOOK_Console_ID, SECRET)
      .replace(process.env.WEBHOOK_Console_TOKEN, SECRET)
      // API Keys
      .replace(process.env.CLEVERBOT_API, SECRET)
      .replace(process.env.GOOGLE_URL, SECRET)
      .replace(process.env.PASTEBIN_API, SECRET);
    return text;
  }

  formatTime(input, toggle) {
    let days = Math.floor(input / 86400);
    let hours = Math.floor((input % 86400) / 3600);
    let minutes = Math.floor(((input % 86400) % 3600) / 60);
    let seconds = Math.floor(((input % 86400) % 3600) % 60);

    let output = [];

    let dayStr = `d`;
    let hourStr = `h`;
    let minuteStr = `m`;
    let secondStr = `s`;

    if (toggle) {
      dayStr = ` days`;
      hourStr = ` hours`;
      minuteStr = ` minutes`;
      secondStr = ` seconds`;
    }

    if (days > 0) output.push(`${days}${dayStr}`);
    if (hours > 0) output.push(`${hours}${hourStr}`);
    if (minutes > 0) output.push(`${minutes}${minuteStr}`);
    if (seconds > 0) output.push(`${seconds}${secondStr}`);

    return output.join(` `);
  }

  formatNumbers(input) {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, `,`);
  }

  defaultChannel(guild) {
    if (guild.systemChannel) return guild.systemChannel;
    return guild.channels.find(channel => channel.permissionsFor(guild.me).has(`SEND_MESSAGES`));
  }
}

module.exports = CustomClient;
