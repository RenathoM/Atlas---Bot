const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Para a música e desconecta do canal de voz'),

  async execute(interaction) {
    await interaction.deferReply();

    try {
      const queue = interaction.client.player.nodes.get(interaction.guild.id);

      if (!queue || !queue.isPlaying()) {
        return interaction.editReply({
          content: 'Não há música tocando para parar.',
          ephemeral: true
        });
      }

      queue.delete();

      const embed = new EmbedBuilder()
        .setTitle('⏹️ Música parada')
        .setDescription('A fila foi limpa e o bot se desconectou do canal de voz.')
        .setColor(0xFEE75C);

      return interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error('Erro no comando /stop:', error);
      return interaction.editReply({
        content: 'Erro ao tentar parar o player.',
        ephemeral: true
      });
    }
  }
};
