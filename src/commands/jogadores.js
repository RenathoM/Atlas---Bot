const { ActionRowBuilder, StringSelectMenuBuilder, SlashCommandBuilder } = require('discord.js');
const { getTeamsWithYears, teamNamesPT, teamFlags } = require('../data/database');

function buildScopeSelectionRow() {
  const teamsMap = getTeamsWithYears();
  const options = [
    {
      label: 'Todas as seleções',
      value: 'all_teams',
      description: 'Buscar uma posição em todas as seleções',
      emoji: '🌍'
    }
  ];

  for (const [teamKey, yearsSet] of Object.entries(teamsMap)) {
    const sortedYears = Array.from(yearsSet).sort((a, b) => a - b).join(', ');
    const label = teamNamesPT[teamKey] || teamKey;
    const emoji = teamFlags[teamKey] || '🏳️';

    options.push({
      label,
      value: teamKey,
      description: sortedYears.length > 50 ? `${sortedYears.substring(0, 47)}...` : sortedYears,
      emoji
    });
  }

  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('select_scope')
    .setPlaceholder('Seleção ou busca global')
    .addOptions(options.slice(0, 25));

  return new ActionRowBuilder().addComponents(selectMenu);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('jogadores')
    .setDescription('Exibe o menu de seleção dos jogadores especiais'),
  buildScopeSelectionRow,

  async execute(interaction) {
    const row = buildScopeSelectionRow();

    if (interaction.deferred || interaction.replied) {
      await interaction.editReply({
        content: 'Escolha uma seleção para ver todos os jogadores ou use “Todas as seleções” para buscar por posição.',
        components: [row]
      });
    } else {
      await interaction.reply({
        content: 'Escolha uma seleção para ver todos os jogadores ou use “Todas as seleções” para buscar por posição.',
        components: [row],
        flags: 64
      });
    }
  }
};
