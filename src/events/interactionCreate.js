const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder } = require('discord.js');
const {
  specialsData,
  teamNamesPT,
  teamFlags,
  getPlayerPosition,
  playerMatchesPosition,
  searchPositions
} = require('../data/database');
const { buildScopeSelectionRow } = require('../commands/jogadores');

function buildPaginationRow(mode, scopeValue, selectedPosition, currentPage, totalPages) {
  const prevPage = Math.max(0, currentPage - 1);
  const nextPage = Math.min(totalPages - 1, currentPage + 1);
  const prevButton = new ButtonBuilder()
    .setCustomId(`page_result:${mode}:${encodeURIComponent(scopeValue)}:${encodeURIComponent(selectedPosition)}:${prevPage}`)
    .setLabel('<')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(currentPage === 0 || totalPages <= 1);

  const nextButton = new ButtonBuilder()
    .setCustomId(`page_result:${mode}:${encodeURIComponent(scopeValue)}:${encodeURIComponent(selectedPosition)}:${nextPage}`)
    .setLabel('>')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(currentPage >= totalPages - 1 || totalPages <= 1);

  const searchButton = new ButtonBuilder()
    .setCustomId('search_again')
    .setLabel('🔍')
    .setStyle(ButtonStyle.Primary);

  return new ActionRowBuilder().addComponents(prevButton, nextButton, searchButton);
}

function getPlayersForContext(mode, scopeValue, selectedPosition) {
  const playersList = [];
  const years = Object.keys(specialsData).sort((a, b) => Number(a) - Number(b));

  if (mode === 'global') {
    for (const year of years) {
      for (const [teamKey, teamData] of Object.entries(specialsData[year])) {
        if (!teamData) continue;

        for (const [playerKey, player] of Object.entries(teamData)) {
          if (playerMatchesPosition(player, selectedPosition)) {
            playersList.push({ year, teamKey, playerKey, ...player });
          }
        }
      }
    }
  } else {
    for (const year of years) {
      const teamData = specialsData[year][scopeValue];
      if (!teamData) continue;

      for (const [playerKey, player] of Object.entries(teamData)) {
        playersList.push({ year, playerKey, ...player });
      }
    }
  }

  return playersList;
}

function buildResultEmbeds(playersList, mode, scopeValue) {
  return playersList.slice(0, 10).map((player) => {
    const position = getPlayerPosition(player);
    const teamName = mode === 'global' ? (teamNamesPT[player.teamKey] || player.teamKey) : null;
    const embed = new EmbedBuilder()
      .setColor(0xFEE75C)
      .setAuthor({ name: player.playerKey })
      .setTitle(`${player.year} • ${mode === 'global' ? `${teamName} • ` : ''}${player.tier}`)
      .addFields(
        { name: 'Posição', value: position, inline: true },
        { name: 'OVR', value: `${player.ovr}`, inline: true }
      );

    if (player.imageUrl && !player.imageUrl.includes('URL_DA_FOTO_AQUI')) {
      embed.setThumbnail(player.imageUrl);
    }

    return embed;
  });
}

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
          content: 'Ocorreu um erro ao executar este comando. Tente novamente mais tarde.'
        };

        if (interaction.deferred || interaction.replied) {
          try {
            await interaction.editReply(response);
          } catch (editError) {
            console.error('Não foi possível editar a resposta da interação:', editError);
          }
        } else {
          try {
            await interaction.reply(response);
          } catch (replyError) {
            console.error('Não foi possível responder à interação:', replyError);
          }
        }
      }
    }

    if (interaction.isStringSelectMenu() && interaction.customId === 'select_scope') {
      try {
        const selectedScope = interaction.values[0];

        if (selectedScope === 'all_teams') {
          const positionOptions = searchPositions.map((position) => ({
            label: position,
            value: position,
            description: `Buscar ${position} em todas as seleções`
          }));

          const positionMenu = new StringSelectMenuBuilder()
            .setCustomId('select_position_global')
            .setPlaceholder('Posição')
            .addOptions(positionOptions);

          const row = new ActionRowBuilder().addComponents(positionMenu);

          return interaction.update({
            content: 'Escolha a posição para buscar em todas as seleções.',
            components: [row],
            embeds: []
          });
        }

        const selectedTeam = selectedScope;
        const teamName = teamNamesPT[selectedTeam] || selectedTeam;
        const playersList = getPlayersForContext('team', selectedTeam, 'all');

        if (!playersList.length) {
          return interaction.update({
            content: `Nenhum jogador especial encontrado para ${teamName}.`,
            embeds: []
          });
        }

        const pageSize = 10;
        const totalPages = Math.max(1, Math.ceil(playersList.length / pageSize));
        const page = 0;
        const pagePlayers = playersList.slice(page * pageSize, (page + 1) * pageSize);
        const embeds = buildResultEmbeds(pagePlayers, 'team', selectedTeam);
        const paginationRow = buildPaginationRow('team', selectedTeam, 'all', page, totalPages);

        await interaction.update({
          content: `**Jogadores da seleção ${teamName} ${teamFlags[selectedTeam] || ''}**\nPágina 1/${totalPages}`,
          components: [paginationRow],
          embeds
        });
      } catch (error) {
        console.error('Erro ao processar seleção de escopo:', error);
        await interaction.update({
          content: 'Falha ao carregar o resultado da busca.',
          embeds: []
        });
      }
    }

    if (interaction.isStringSelectMenu() && interaction.customId === 'select_position_global') {
      try {
        const selectedPosition = interaction.values[0];
        const playersList = getPlayersForContext('global', null, selectedPosition);

        if (!playersList.length) {
          return interaction.update({
            content: `Nenhum jogador encontrado para a posição ${selectedPosition}.`,
            embeds: []
          });
        }

        const pageSize = 10;
        const totalPages = Math.max(1, Math.ceil(playersList.length / pageSize));
        const page = 0;
        const pagePlayers = playersList.slice(page * pageSize, (page + 1) * pageSize);
        const embeds = buildResultEmbeds(pagePlayers, 'global', selectedPosition);
        const paginationRow = buildPaginationRow('global', 'all_teams', selectedPosition, page, totalPages);

        const positionMenu = new StringSelectMenuBuilder()
          .setCustomId('select_position_global')
          .setPlaceholder('Posição')
          .addOptions(searchPositions.map((position) => ({
            label: position,
            value: position,
            description: `Buscar ${position} em todas as seleções`
          })));

        const row = new ActionRowBuilder().addComponents(positionMenu);

        await interaction.update({
          content: `**Busca por posição:** ${selectedPosition}\nPágina 1/${totalPages}`,
          components: [row, paginationRow],
          embeds
        });
      } catch (error) {
        console.error('Erro ao processar busca global por posição:', error);
        await interaction.update({
          content: 'Falha ao aplicar a busca por posição.',
          embeds: []
        });
      }
    }

    if (interaction.isButton() && interaction.customId === 'search_again') {
      const row = buildScopeSelectionRow();
      await interaction.update({
        content: 'Escolha uma seleção para ver todos os jogadores ou use “Todas as seleções” para buscar por posição.',
        components: [row],
        embeds: []
      });
    }

    if (interaction.isButton() && interaction.customId.startsWith('page_result:')) {
      try {
        const [_, mode, encodedScope, encodedPosition, targetPage] = interaction.customId.split(':');
        const scopeValue = decodeURIComponent(encodedScope || 'all_teams');
        const selectedPosition = decodeURIComponent(encodedPosition || 'all');
        const page = Number(targetPage || 0);
        const playersList = getPlayersForContext(mode, scopeValue === 'all_teams' ? null : scopeValue, selectedPosition);

        if (!playersList.length) {
          return interaction.update({
            content: 'Nenhum jogador encontrado para esta página.',
            embeds: []
          });
        }

        const pageSize = 10;
        const totalPages = Math.max(1, Math.ceil(playersList.length / pageSize));
        const safePage = Math.min(Math.max(0, page), totalPages - 1);
        const pagePlayers = playersList.slice(safePage * pageSize, (safePage + 1) * pageSize);
        const embeds = buildResultEmbeds(pagePlayers, mode, scopeValue === 'all_teams' ? null : scopeValue);
        const paginationRow = buildPaginationRow(mode, scopeValue === 'all_teams' ? null : scopeValue, selectedPosition, safePage, totalPages);

        let content = '';
        if (mode === 'global') {
          content = `**Busca por posição:** ${selectedPosition}\nPágina ${safePage + 1}/${totalPages}`;
        } else {
          const teamName = teamNamesPT[scopeValue] || scopeValue;
          content = `**Jogadores da seleção ${teamName} ${teamFlags[scopeValue] || ''}**\nPágina ${safePage + 1}/${totalPages}`;
        }

        const row = mode === 'global'
          ? new ActionRowBuilder().addComponents(new StringSelectMenuBuilder()
            .setCustomId('select_position_global')
            .setPlaceholder('Posição')
            .addOptions(searchPositions.map((position) => ({
              label: position,
              value: position,
              description: `Buscar ${position} em todas as seleções`
            }))))
          : null;

        await interaction.update({
          content,
          components: row ? [row, paginationRow] : [paginationRow],
          embeds
        });
      } catch (error) {
        console.error('Erro ao navegar pelas páginas:', error);
        await interaction.update({
          content: 'Falha ao navegar pelas páginas.',
          embeds: []
        });
      }
    }
  }
};
