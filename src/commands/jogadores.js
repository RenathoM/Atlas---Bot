const { ActionRowBuilder, StringSelectMenuBuilder, SlashCommandBuilder } = require('discord.js');
const { getTeamsWithYears, teamNamesPT, teamFlags } = require('../data/database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('jogadores')
    .setDescription('Exibe o menu de seleção dos jogadores especiais'),

  async execute(interaction) {
    const teamsMap = getTeamsWithYears();
    const options = [];

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
      .setCustomId('select_team')
      .setPlaceholder('Seleções')
      .addOptions(options.slice(0, 25));

    const row = new ActionRowBuilder().addComponents(selectMenu);

    await interaction.reply({
      content: 'Escolha o país para ver os jogadores especiais.',
      components: [row],
      ephemeral: true
    });
  }
};
