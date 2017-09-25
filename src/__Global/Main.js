const Client = require('../__Global/Structures/Functions');
const { join, resolve } = require('path');
const { readdir } = require('fs');

const client = new Client({
  messageCacheMaxSize: 100,
  messageCacheLifetime: 600,
  messageSweepInterval: 10,
  disabledEvents: [
    // 'READY',
    // 'RESUMED',
    'GUILD_SYNC',
    // 'GUILD_CREATE',
    'GUILD_DELETE',
    'GUILD_UPDATE',
    // 'GUILD_MEMBER_ADD',
    // 'GUILD_MEMBER_REMOVE',
    'GUILD_MEMBER_UPDATE',
    'GUILD_MEMBERS_CHUNK',
    'GUILD_ROLE_CREATE',
    'GUILD_ROLE_DELETE',
    'GUILD_ROLE_UPDATE',
    'GUILD_BAN_ADD',
    'GUILD_BAN_REMOVE',
    'CHANNEL_CREATE',
    'CHANNEL_DELETE',
    'CHANNEL_UPDATE',
    'CHANNEL_PINS_UPDATE',
    // 'MESSAGE_CREATE',
    'MESSAGE_DELETE',
    'MESSAGE_UPDATE',
    'MESSAGE_DELETE_BULK',
    'MESSAGE_REACTION_ADD',
    'MESSAGE_REACTION_REMOVE',
    'MESSAGE_REACTION_REMOVE_ALL',
    'USER_UPDATE',
    'USER_NOTE_UPDATE',
    'USER_SETTINGS_UPDATE',
    'PRESENCE_UPDATE',
    'VOICE_STATE_UPDATE',
    'TYPING_START',
    'VOICE_SERVER_UPDATE',
    'RELATIONSHIP_ADD',
    'RELATIONSHIP_REMOVE'
  ]
});

// Global Commands
readdir(join(__dirname, './Commands/'), (error, files) => {
  if (error) throw error;
  files.forEach(file => {
    if (file.split('.').slice(-1)[0] !== 'js') return;
    const Name = file.split('.')[0];
    const CommandClass = require(`./Commands/${file}`);
    const Command = new CommandClass(client);
    client.commands.set(Name, Command);
    Command.aliases.forEach(alias => {
      client.aliases.set(alias, Name);
    });
  });
});

// Local Commands
readdir(join('.', './Commands/'), (error, files) => {
  if (error) throw error;
  files.forEach(file => {
    if (file.split('.').slice(-1)[0] !== 'js') return;
    const Name = file.split('.')[0];
    const CommandClass = require(join(resolve('.'), `/Commands/${file}`));
    const Command = new CommandClass(client);
    client.commands.set(Name, Command);
    Command.aliases.forEach(alias => {
      client.aliases.set(alias, Name);
    });
  });
});

// Global Events
readdir(join(__dirname, './Events/'), (error, files) => {
  if (error) throw error;
  files.forEach(file => {
    const Name = file.split('.')[0];
    const EventClass = require(`./Events/${file}`);
    const Event = new EventClass(client);
    client.on(Name, (...args) => Event.run(client, ...args));
  });
});

// Local Events
readdir(join('.', './Events/'), (error, files) => {
  if (error) throw error;
  files.forEach(file => {
    const Name = file.split('.')[0];
    const EventClass = require(join(resolve('.'), `/Events/${file}`));
    const Event = new EventClass(client);
    client.on(Name, (...args) => Event.run(client, ...args));
  });
});

process.on('uncaughtException', error => {
  client.error(error.stack.replace(new RegExp(`${__dirname}/`, 'g'), './'));
});

process.on('unhandledRejection', error => {
  client.error(error.stack.replace(new RegExp(`${__dirname}/`, 'g'), './'));
});

client.login(process.env[client.botName]);
