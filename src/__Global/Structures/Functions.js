const { Client, MessageEmbed, Collection } = require(`discord.js`);
const { readdirSync, statSync } = require(`fs`);
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
    this.cooldown = [];
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
  removeCooldown(userID, commandName, time) {
    let index = this.cooldown.indexOf(userID + commandName);
    if (index > -1) {
      setTimeout(() => {
        this.cooldown = this.cooldown.splice(index, 0);
      }, time * 1000);
    }
  }

  addCooldown(userID, commandName, time) {
    this.cooldown.push(userID + commandName);
    this.removeCooldown(userID, commandName, time);
  }

  checkCooldown(userID, commandName) {
    return this.cooldown.indexOf(userID + commandName) > -1;
  }

  // MaxLength/Error/Success Embed
  async maxLengthMessage(message, input, output, inputType, outputType, embedToggle) {
    if (input && output && input.length < 2000 && output.length < 2000) {
      await this.send(message, input, { code: inputType });
      await this.send(message, output, { code: outputType });
    } else if (!embedToggle) {
      let embed = new MessageEmbed()
        .setColor(0xFF0000)
        .setFooter(this.botName)
        .setTimestamp();

      if (input) {
        if (input.length < 1024) {
          embed
            .addField(`📥 Input`, `\`\`\`${inputType}\n${input}\n\`\`\``);
        } else {
          pastebin.createPaste(input, `Input`, null, 1, `1D`).then(data => {
            embed
              .addField(`❌ ERROR`, `Input was too long, ${data}`);
          }).fail(error => {
            this.log(input);
            this.errorMessage(message, `Pastebin Upload`, error);
          });
        }
      }

      if (output) {
        if (output.length < 1024) {
          embed
            .addField(`📤 Output`, `\`\`\`${inputType}\n${output}\n\`\`\``);
        } else {
          pastebin.createPaste(output, `Output`, null, 1, `1D`).then(data => {
            embed
              .addField(`❌ ERROR`, `Output was too long, ${data}`);
          }).fail(error => {
            this.log(output);
            this.errorMessage(message, `Pastebin Upload`, error);
          });
        }
      }

      this.send(message, { embed });
    } else {
      let content = ``;

      if (input) {
        if (input.length < 1024) {
          content += `📤 **Input:**\n\`\`\`${inputType}\n${input}\n\`\`\``;
        } else {
          pastebin.createPaste(input, `Input`, null, 1, `1D`).then(data => {
            content += `📤 **Input:**\nInput was too long ${data}`;
          }).fail(error => {
            this.log(input);
            this.errorMessage(message, `Pastebin Upload`, error);
          });
        }
      }

      if (output) {
        if (output.length < 1024) {
          content += `📤 **Output:**\n\`\`\`${outputType}\n${output}\n\`\`\``;
        } else {
          pastebin.createPaste(output, `Output`, null, 1, `1D`).then(data => {
            content += `📤 **Output:**\nOutput was too long ${data}`;
          }).fail(error => {
            this.log(output);
            this.errorMessage(message, `Pastebin Upload`, error);
          });
        }
      }

      this.send(message, content);
    }
  }

  errorMessage(message, input, output, inputType, outputType, embedToggle) {
    if (!embedToggle) {
      if ((input && input.length > 1024) || (output && output.length > 1024)) return this.maxLengthMessage(message, input, output, inputType, outputType, embedToggle);

      let embed = new MessageEmbed()
        .setColor(0xFF0000)
        .setFooter(this.botName)
        .setTimestamp();

      if (input) {
        embed
          .addField(`📥 Input`, `\`\`\`${inputType}\n${input}\n\`\`\``);
      }

      if (output) {
        embed
          .addField(`❌ ERROR`, `\`\`\`${outputType}\n${output}\n\`\`\``);
      }

      if (String(embed).length > 2000) return this.maxLengthMessage(message, input, output, inputType, outputType, embedToggle);

      this.send(message, { embed });
    } else {
      const content = `` +
      `📥 **Input:**\n` +
      `\`\`\`${inputType}\n${input}\n\`\`\`\n` +
      `❌ **Error:**\n` +
      `\`\`\`${outputType}\n${output}\n\`\`\``;

      if (String(content).length > 2000) return this.maxLengthMessage(message, input, output, inputType, outputType, embedToggle);

      this.send(message, content);
    }
  }

  successMessage(message, input, output, inputType, outputType, embedToggle) {
    if (!embedToggle) {
      if ((input && input.length > 1024) || (output && output.length > 1024)) return this.maxLengthMessage(message, input, output, inputType, outputType, embedToggle);

      let embed = new MessageEmbed()
        .setColor(0x00FF00)
        .setFooter(this.botName)
        .setTimestamp();

      if (input) {
        embed
          .addField(`📥 Input`, `\`\`\`${inputType}\n${input}\n\`\`\``);
      }

      if (output) {
        embed
          .addField(`📤 Output`, `\`\`\`${outputType}\n${output}\n\`\`\``);
      }

      if (String(embed).length > 2000) return this.maxLengthMessage(message, input, output, inputType, outputType, embedToggle);

      this.send(message, { embed });
    } else {
      const content = `` +
      `📥 **Input:**\n` +
      `\`\`\`${inputType}\n${input}\n\`\`\`\n` +
      `📤 **Output:**\n` +
      `\`\`\`${outputType}\n${output}\n\`\`\``;

      if (String(content).length > 2000) return this.maxLengthMessage(message, input, output, inputType, outputType, embedToggle);

      this.send(message, content);
    }
  }

  send(message, ...content) {
    return new Promise(async resolve => {
      if (this.user.bot) {
        resolve(await message.channel.send(...content));
      } else {
        setTimeout(() => {
          resolve(message.edit(...content));
        }, 500);
      }
    });
  }

  clean(text) {
    let SECRET = `[SECRET!]`;
    if (typeof text !== `string`) { text = inspect(text, { depth: 0 }); }
    text = text
      .replace(/`/g, `\`${String.fromCharCode(8203)}`)
      .replace(/@/g, `@${String.fromCharCode(8203)}`);

    // API Keys
    for (let env in process.env) {
      if (env.includes(`_API`)) {
        text = text.replace(process.env[env], SECRET);
      }
    }

    // Webhooks
    for (let env in process.env) {
      if (env.includes(`WEBHOOK_`)) {
        text = text.replace(process.env[env], SECRET);
      }
    }

    // Tokens
    isDirectory(resolve(`../../Bots`)).forEach(dir => {
      text = text.replace(process.env[dir], SECRET);
    });

    function isDirectory(source) {
      return readdirSync(source).filter(name => statSync(`${source}/${name}`).isDirectory());
    }

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
