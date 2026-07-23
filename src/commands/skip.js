const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Pula a música atual'),

  async execute(interaction) {
    await interaction.deferReply();

    try {
      const queue = interaction.client.player.nodes.get(interaction.guild.id);
      if (!queue || !queue.isPlaying()) {
        return interaction.editReply({
          content: 'Não há música tocando no momento.',
          ephemeral: true
        });
      }

      const current = queue.currentTrack;
      const skipped = queue.node.skip();

      if (!skipped) {
        return interaction.editReply({
          content: 'Não foi possível pular a música atual.',
          ephemeral: true
        });
      }

      const embed = new EmbedBuilder()
        .setTitle('⏭️ Música pulada')
        .setDescription(`A música **${current?.title || 'desconhecida'}** foi pulada.`)
        .setColor(0xFEE75C);

      return interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error('Erro no comando /skip:', error);
      return interaction.editReply({
        content: 'Erro ao tentar pular a música.',
        ephemeral: true
      });
    }
  }
};
