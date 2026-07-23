const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Toca uma música no canal de voz')
    .addStringOption((option) =>
      option
        .setName('musica')
        .setDescription('Link ou nome da música')
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();
    try {
      const query = interaction.options.getString('musica', true);
      const voiceChannel = interaction.member.voice.channel;

      if (!voiceChannel) {
        return interaction.editReply({
          content: 'Você precisa estar em um canal de voz para tocar música.',
          ephemeral: true
        });
      }

      const player = interaction.client.player;
      const playResult = await player.play(voiceChannel, query, {
        searchEngine: QueryType.AUTO,
        metadata: {
          channel: interaction.channel,
          requestedBy: interaction.user
        },
        nodeOptions: {
          emitNewSongOnly: true
        }
      });

      const track = playResult.track;
      const embed = new EmbedBuilder()
        .setTitle('🎵 Música adicionada à fila')
        .setDescription(`**${track.title}**`)
        .addFields(
          { name: 'Duração', value: track.duration || 'Desconhecida', inline: true },
          { name: 'Pedido por', value: `<@${interaction.user.id}>`, inline: true }
        )
        .setThumbnail(track.thumbnail || null)
        .setColor(0xFEE75C);

      return interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error('Erro no comando /play:', error);
      return interaction.editReply({
        content: 'Erro ao buscar ou tocar a música. Tente novamente mais tarde.',
        ephemeral: true
      });
    }
  }
};
