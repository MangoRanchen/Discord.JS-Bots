class Commands {
  constructor(client, info) {
    constructor(client, info);
    if (!client) throw new Error('A client must be specified.');
    this.client = client;
    this.enabled = info.enabled;
    this.show = info.show;
    this.cooldown = info.cooldown;
    this.cooldownTime = info.cooldownTime;
    this.name = info.name;
    this.description = info.description;
    this.usage = info.usage;
    this.aliases = info.aliases;
  }
}

module.exports = Commands;
