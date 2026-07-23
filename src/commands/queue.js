const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Mostra as próximas músicas na fila'),

  async execute(interaction) {
    await interaction.deferReply();

    try {
      const queue = interaction.client.player.nodes.get(interaction.guild.id);
      if (!queue || queue.isEmpty()) {
        return interaction.editReply({
          content: 'A fila está vazia no momento.',
          ephemeral: true
        });
      }

      const current = queue.currentTrack;
      const queueTracks = queue.tracks?.toArray?.() || [];
      const upcoming = queueTracks.slice(1);
      const listDescription = upcoming
        .slice(0, 10)
        .map((track, index) => `${index + 1}. ${track.title} (${track.duration || 'Desconhecida'})`)
        .join('\n') || 'Nenhuma música na fila.';

      const embed = new EmbedBuilder()
        .setTitle('🎧 Fila de reprodução')
        .setDescription(`**Tocando agora:** ${current ? current.title : 'Nenhuma'}\n\n**Próximas:**\n${listDescription}`)
        .setColor(0xFEE75C);

      return interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error('Erro no comando /queue:', error);
      return interaction.editReply({
        content: 'Erro ao exibir a fila.',
        ephemeral: true
      });
    }
  }
};
