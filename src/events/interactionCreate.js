const { EmbedBuilder } = require('discord.js');
const { specialsData, teamNamesPT, teamFlags, getPlayerPosition } = require('../data/database');

module.exports = {
  name: 'interactionCreate',
  once: false,
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`Erro no comando ${interaction.commandName}:`, error);

        const response = {
          content: 'Ocorreu um erro ao executar este comando. Tente novamente mais tarde.',
          ephemeral: true
        };

        if (interaction.deferred || interaction.replied) {
          await interaction.editReply(response);
        } else {
          await interaction.reply(response);
        }
      }
    }

    if (interaction.isStringSelectMenu() && interaction.customId === 'select_team') {
      try {
        const selectedTeam = interaction.values[0];
        const playersList = [];
        const years = Object.keys(specialsData).sort((a, b) => Number(a) - Number(b));

        for (const year of years) {
          const teamData = specialsData[year][selectedTeam];
          if (!teamData) continue;

          for (const [playerKey, player] of Object.entries(teamData)) {
            playersList.push({ year, playerKey, ...player });
          }
        }

        if (!playersList.length) {
          return interaction.update({
            content: 'Nenhum jogador especial encontrado para esta seleção.',
            embeds: []
          });
        }

        const embeds = playersList.slice(0, 10).map((player, index) => {
          const position = getPlayerPosition(player, index);
          const embed = new EmbedBuilder()
            .setColor(0xFEE75C)
            .setAuthor({ name: player.playerKey })
            .setTitle(`${player.year} • ${player.tier}`)
            .addFields(
              { name: 'Posição', value: position, inline: true },
              { name: 'OVR', value: `${player.ovr}`, inline: true }
            );

          if (player.imageUrl && !player.imageUrl.includes('URL_DA_FOTO_AQUI')) {
            embed.setThumbnail(player.imageUrl);
          }

          return embed;
        });

        await interaction.update({
          content: `**Jogadores da seleção ${teamNamesPT[selectedTeam] || selectedTeam} ${teamFlags[selectedTeam] || ''}**`,
          embeds
        });
      } catch (error) {
        console.error('Erro ao processar seleção de time:', error);
        await interaction.update({
          content: 'Falha ao carregar os jogadores do time selecionado.',
          embeds: []
        });
      }
    }
  }
};
