const { readdirSync } = require('fs');
const path = require('path');
const { Collection } = require('discord.js');

function loadCommands(client, commandsPath) {
  const commands = new Collection();
  const commandFiles = readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
  const slashCommands = [];

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if (!command.data || !command.execute) {
      console.warn(`Comando inválido detectado em ${file}`);
      continue;
    }

    commands.set(command.data.name, command);
    slashCommands.push(command.data.toJSON());
  }

  client.commands = commands;
  return slashCommands;
}

module.exports = {
  loadCommands
};
