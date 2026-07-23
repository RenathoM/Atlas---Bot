const { Routes } = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`Bot online como: ${client.user.tag}`);

    if (!client.rest || !client.commandsData) {
      console.warn('Não há dados de comandos ou REST configurados para registrar Slash Commands.');
      return;
    }

    try {
      await client.rest.put(Routes.applicationCommands(client.application?.id || client.user?.id), {
        body: client.commandsData
      });
      console.log('Comandos slash registrados com sucesso!');
    } catch (error) {
      console.error('Erro ao registrar comandos slash:', error);
    }
  }
};
