require('dotenv').config();
const { 
  Client, 
  GatewayIntentBits, 
  ActionRowBuilder, 
  StringSelectMenuBuilder, 
  EmbedBuilder, 
  REST, 
  Routes, 
  SlashCommandBuilder 
} = require('discord.js');

// Base de Dados de Jogadores
const specialsData = {
  1970: {
    Brazil: { Pele: { variantName: "Pele", ovr: 113, tier: "Limitbreaker" } }
  },
  1974: {
    Netherlands: { Cruyff: { variantName: "GB Cruyff", ovr: 108, tier: "Ballon" } },
    Germany: { Beckenbauer: { variantName: "SB Beckenbauer", ovr: 106, tier: "Ballon" } }
  },
  1986: {
    Argentina: { Maradona: { variantName: "GB Maradona", ovr: 109, tier: "Ballon" } }
  },
  1994: {
    Brazil: { Romario: { variantName: "GB Romario", ovr: 107, tier: "Ballon" } },
    Italy: { 
      "R. Baggio": { variantName: "SB Baggio", ovr: 106, tier: "Ballon" }, 
      Maldini: { variantName: "Maldini", ovr: 113, tier: "Limitbreaker" } 
    }
  },
  2002: {
    Germany: { Kahn: { variantName: "GB Kahn", ovr: 108, tier: "Ballon" } },
    Senegal: { "P. Diop": { variantName: "P. Diop", ovr: 105, tier: "Breakout" } },
    "South Korea": { "Ahn Jung-Hwan": { variantName: "Ahn Jung-Hwan", ovr: 106, tier: "Breakout" } },
    Brazil: { R9: { variantName: "SB R9", ovr: 106, tier: "Ballon" } },
    England: { Beckham: { variantName: "Beckham", ovr: 112, tier: "Limitbreaker" } },
    France: { Zidane: { variantName: "Zidane", ovr: 114, tier: "Limitbreaker" } }
  },
  2006: {
    France: { 
      Zidane: { variantName: "GB Zidane", ovr: 108, tier: "Ballon" }, 
      Henry: { variantName: "Henry", ovr: 102, tier: "Prime" } 
    },
    Italy: { 
      Cannavaro: { variantName: "SB Cannavaro", ovr: 106, tier: "Ballon" }, 
      Pirlo: { variantName: "Pirlo", ovr: 101, tier: "Prime" }, 
      Buffon: { variantName: "Buffon", ovr: 105, tier: "Cup" } 
    },
    Sweden: { Zlatan: { variantName: "Zlatan", ovr: 103, tier: "Prime" } },
    Brazil: { Ronaldinho: { variantName: "Ronaldinho", ovr: 104, tier: "Prime" } },
    Germany: { Podolski: { variantName: "Podolski", ovr: 107, tier: "Breakout" } }
  },
  2010: {
    Uruguay: { Forlan: { variantName: "GB Forlan", ovr: 107, tier: "Ballon" } },
    Netherlands: { 
      Sneijder: { variantName: "SB Sneijder", ovr: 105, tier: "Ballon" }, 
      Robben: { variantName: "Robben", ovr: 100, tier: "Prime" } 
    },
    Spain: { 
      Xavi: { variantName: "Xavi", ovr: 101, tier: "Prime" }, 
      Iniesta: { variantName: "Iniesta", ovr: 105, tier: "Cup" }, 
      Casillas: { variantName: "Casillas", ovr: 111, tier: "Limitbreaker" } 
    },
    Brazil: { Kaka: { variantName: "Kaka", ovr: 101, tier: "Prime" } },
    "Ivory Coast": { Drogba: { variantName: "Drogba", ovr: 101, tier: "Prime" } },
    Germany: { Muller: { variantName: "Muller", ovr: 108, tier: "Breakout" } }
  },
  2014: {
    Germany: { 
      Muller: { variantName: "SB Muller", ovr: 105, tier: "Ballon" }, 
      Neuer: { variantName: "Neuer", ovr: 105, tier: "Cup" }, 
      Kroos: { variantName: "Kroos", ovr: 105, tier: "Cup" } 
    },
    Brazil: { 
      Neymar: { variantName: "Neymar", ovr: 103, tier: "Prime" }, 
      Marcelo: { variantName: "Marcelo", ovr: 112, tier: "Limitbreaker" } 
    },
    Uruguay: { Suarez: { variantName: "Suarez", ovr: 102, tier: "Prime" } },
    Portugal: { Ronaldo: { variantName: "Ronaldo", ovr: 114, tier: "Limitbreaker" } },
    Argentina: { Messi: { variantName: "Messi", ovr: 104, tier: "Prime" } },
    Colombia: { James: { variantName: "James", ovr: 108, tier: "Breakout" } }
  },
  2018: {
    France: { 
      Pogba: { variantName: "Pogba", ovr: 105, tier: "Cup" }, 
      Griezmann: { variantName: "Griezmann", ovr: 105, tier: "Cup" }, 
      Mbappe: { variantName: "Mbappe", ovr: 112, tier: "Limitbreaker" }, 
      Pavard: { variantName: "Pavard", ovr: 106, tier: "Breakout" } 
    },
    Mexico: { Lozano: { variantName: "Lozano", ovr: 105, tier: "Breakout" } },
    Croatia: { Modric: { variantName: "GB Modric", ovr: 107, tier: "Ballon" } },
    Belgium: { 
      Hazard: { variantName: "SB Hazard", ovr: 106, tier: "Ballon" }, 
      "De Bruyne": { variantName: "De Bruyne", ovr: 102, tier: "Prime" }, 
      Courtois: { variantName: "Courtois", ovr: 111, tier: "Limitbreaker" } 
    },
    Portugal: { Ronaldo: { variantName: "Ronaldo", ovr: 104, tier: "Prime" } },
    Egypt: { Salah: { variantName: "Salah", ovr: 100, tier: "Prime" } },
    Spain: { Ramos: { variantName: "Ramos", ovr: 113, tier: "Limitbreaker" } },
    Brazil: { Neymar: { variantName: "Neymar", ovr: 111, tier: "Limitbreaker" } }
  },
  2022: {
    Argentina: { 
      Messi: { variantName: "GB Messi", ovr: 109, tier: "Ballon" }, 
      "Di Maria": { variantName: "Di Maria", ovr: 105, tier: "Cup" }, 
      "E. Fernandez": { variantName: "E. Fernandez", ovr: 107, tier: "Breakout" } 
    },
    Netherlands: { "Van Dijk": { variantName: "Van Dijk", ovr: 111, tier: "Limitbreaker" } },
    France: { Mbappe: { variantName: "SB Mbappe", ovr: 105, tier: "Ballon" } },
    "South Korea": { Son: { variantName: "Son", ovr: 100, tier: "Prime" } }
  },
  2026: {
    France: { 
      Mbappe: { variantName: "Mbappe", ovr: 104, tier: "Prime" }, 
      Olise: { variantName: "Olise", ovr: 106, tier: "Breakout" } 
    },
    Argentina: { Messi: { variantName: "Messi", ovr: 115, tier: "Limitbreaker" } },
    Norway: { Haaland: { variantName: "Haaland", ovr: 103, tier: "Prime" } },
    Spain: { Yamal: { variantName: "Yamal", ovr: 103, tier: "Prime" } },
    England: { Bellingham: { variantName: "Bellingham", ovr: 102, tier: "Prime" } },
    Brazil: { Vinicius: { variantName: "Vinicius", ovr: 102, tier: "Prime" } }
  }
};

// Dicionário de Países e Mapeamento de Anos
const teamNamesPT = {
  Brazil: "Brasil", Netherlands: "Holanda", Germany: "Alemanha", Argentina: "Argentina",
  Italy: "Itália", Senegal: "Senegal", "South Korea": "Coreia do Sul", England: "Inglaterra",
  France: "França", Sweden: "Suécia", Uruguay: "Uruguai", Spain: "Espanha",
  "Ivory Coast": "Costa do Marfim", Colombia: "Colômbia", Portugal: "Portugal",
  Mexico: "México", Croatia: "Croácia", Belgium: "Bélgica", Egypt: "Egito", Norway: "Noruega"
};

// Mapeia todas as seleções únicas e os anos em que possuem jogadores
function getTeamsWithYears() {
  const teamsMap = {};
  for (const [year, teams] of Object.entries(specialsData)) {
    for (const teamKey of Object.keys(teams)) {
      if (!teamsMap[teamKey]) teamsMap[teamKey] = new Set();
      teamsMap[teamKey].add(year);
    }
  }
  return teamsMap;
}

// Inicializa o Client do Bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Registrar Comandos Slash Auto-configurados
const commands = [
  new SlashCommandBuilder()
    .setName('jogadores')
    .setDescription('Exibe o menu de seleção dos jogadores')
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

client.once('ready', async () => {
  console.log(`Bot online como: ${client.user.tag}`);
  
  try {
    console.log('Registrando comandos Slash...');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log('Comandos registrados com sucesso!');
  } catch (error) {
    console.error('Erro ao registrar comandos:', error);
  }
});

// Listener de Interações (Comando e Menu)
client.on('interactionCreate', async interaction => {
  // 1. Comando /jogadores
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'jogadores') {
      const teamsMap = getTeamsWithYears();
      const options = [];

      for (const [teamKey, yearsSet] of Object.entries(teamsMap)) {
        const sortedYears = Array.from(yearsSet).sort((a, b) => a - b).join(', ');
        const label = teamNamesPT[teamKey] || teamKey;

        options.push({
          label: label,
          value: teamKey,
          description: sortedYears.length > 50 ? sortedYears.substring(0, 47) + '...' : sortedYears
        });
      }

      // Limite do Discord: SelectMenu aceita até 25 opções
      const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('select_team')
        .setPlaceholder('Seleções')
        .addOptions(options.slice(0, 25));

      const row = new ActionRowBuilder().addComponents(selectMenu);

      await interaction.reply({
        content: '**Jogadores Etc**',
        components: [row],
        ephemeral: true
      });
    }
  }

  // 2. Resposta do Menu de Seleção
  if (interaction.isStringSelectMenu() && interaction.customId === 'select_team') {
    const selectedTeam = interaction.values[0];
    const playersList = [];

    // Coletar jogadores da seleção ordenados por ano (crescente)
    const years = Object.keys(specialsData).sort((a, b) => Number(a) - Number(b));
require('dotenv').config();
const { 
  Client, 
  GatewayIntentBits, 
  ActionRowBuilder, 
  StringSelectMenuBuilder, 
  EmbedBuilder, 
  REST, 
  Routes, 
  SlashCommandBuilder 
} = require('discord.js');

// Base de Dados de Jogadores (Adicionado o campo 'imageUrl')
// IMPORTANTE: Substitua "URL_DA_FOTO_AQUI" pelos links reais das imagens (terminados em .png ou .jpg)
const specialsData = {
  1970: {
    Brazil: { Pele: { variantName: "Pele", ovr: 113, tier: "Limitbreaker", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Pele_con_brasil_%28cropped%29.jpg/250px-Pele_con_brasil_%28cropped%29.jpg" } }
  },
  1974: {
    Netherlands: { Cruyff: { variantName: "GB Cruyff", ovr: 108, tier: "Ballon", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Johan_Cruijff_%281974%29.jpg/250px-Johan_Cruijff_%281974%29.jpg" } },
    Germany: { Beckenbauer: { variantName: "SB Beckenbauer", ovr: 106, tier: "Ballon", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/B Beckenbauer_%281974%29.jpg/250px-B Beckenbauer_%281974%29.jpg" } }
  },
  1986: {
    Argentina: { Maradona: { variantName: "GB Maradona", ovr: 109, tier: "Ballon", imageUrl: "URL_DA_FOTO_AQUI" } }
  },
  1994: {
    Brazil: { Romario: { variantName: "GB Romario", ovr: 107, tier: "Ballon", imageUrl: "URL_DA_FOTO_AQUI" } },
    Italy: { 
      "R. Baggio": { variantName: "SB Baggio", ovr: 106, tier: "Ballon", imageUrl: "URL_DA_FOTO_AQUI" }, 
      Maldini: { variantName: "Maldini", ovr: 113, tier: "Limitbreaker", imageUrl: "URL_DA_FOTO_AQUI" } 
    }
  },
  2002: {
    Germany: { Kahn: { variantName: "GB Kahn", ovr: 108, tier: "Ballon", imageUrl: "URL_DA_FOTO_AQUI" } },
    Senegal: { "P. Diop": { variantName: "P. Diop", ovr: 105, tier: "Breakout", imageUrl: "URL_DA_FOTO_AQUI" } },
    "South Korea": { "Ahn Jung-Hwan": { variantName: "Ahn Jung-Hwan", ovr: 106, tier: "Breakout", imageUrl: "URL_DA_FOTO_AQUI" } },
    Brazil: { R9: { variantName: "SB R9", ovr: 106, tier: "Ballon", imageUrl: "URL_DA_FOTO_AQUI" } },
    England: { Beckham: { variantName: "Beckham", ovr: 112, tier: "Limitbreaker", imageUrl: "URL_DA_FOTO_AQUI" } },
    France: { Zidane: { variantName: "Zidane", ovr: 114, tier: "Limitbreaker", imageUrl: "URL_DA_FOTO_AQUI" } }
  },
  2006: {
    France: { 
      Zidane: { variantName: "GB Zidane", ovr: 108, tier: "Ballon", imageUrl: "URL_DA_FOTO_AQUI" }, 
      Henry: { variantName: "Henry", ovr: 102, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } 
    },
    Italy: { 
      Cannavaro: { variantName: "SB Cannavaro", ovr: 106, tier: "Ballon", imageUrl: "URL_DA_FOTO_AQUI" }, 
      Pirlo: { variantName: "Pirlo", ovr: 101, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" }, 
      Buffon: { variantName: "Buffon", ovr: 105, tier: "Cup", imageUrl: "URL_DA_FOTO_AQUI" } 
    },
    Sweden: { Zlatan: { variantName: "Zlatan", ovr: 103, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } },
    Brazil: { Ronaldinho: { variantName: "Ronaldinho", ovr: 104, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } },
    Germany: { Podolski: { variantName: "Podolski", ovr: 107, tier: "Breakout", imageUrl: "URL_DA_FOTO_AQUI" } }
  },
  2010: {
    Uruguay: { Forlan: { variantName: "GB Forlan", ovr: 107, tier: "Ballon", imageUrl: "URL_DA_FOTO_AQUI" } },
    Netherlands: { 
      Sneijder: { variantName: "SB Sneijder", ovr: 105, tier: "Ballon", imageUrl: "URL_DA_FOTO_AQUI" }, 
      Robben: { variantName: "Robben", ovr: 100, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } 
    },
    Spain: { 
      Xavi: { variantName: "Xavi", ovr: 101, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" }, 
      Iniesta: { variantName: "Iniesta", ovr: 105, tier: "Cup", imageUrl: "URL_DA_FOTO_AQUI" }, 
      Casillas: { variantName: "Casillas", ovr: 111, tier: "Limitbreaker", imageUrl: "URL_DA_FOTO_AQUI" } 
    },
    Brazil: { Kaka: { variantName: "Kaka", ovr: 101, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } },
    "Ivory Coast": { Drogba: { variantName: "Drogba", ovr: 101, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } },
    Germany: { Muller: { variantName: "Muller", ovr: 108, tier: "Breakout", imageUrl: "URL_DA_FOTO_AQUI" } }
  },
  2014: {
    Germany: { 
      Muller: { variantName: "SB Muller", ovr: 105, tier: "Ballon", imageUrl: "URL_DA_FOTO_AQUI" }, 
      Neuer: { variantName: "Neuer", ovr: 105, tier: "Cup", imageUrl: "URL_DA_FOTO_AQUI" }, 
      Kroos: { variantName: "Kroos", ovr: 105, tier: "Cup", imageUrl: "URL_DA_FOTO_AQUI" } 
    },
    Brazil: { 
      Neymar: { variantName: "Neymar", ovr: 103, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" }, 
      Marcelo: { variantName: "Marcelo", ovr: 112, tier: "Limitbreaker", imageUrl: "URL_DA_FOTO_AQUI" } 
    },
    Uruguay: { Suarez: { variantName: "Suarez", ovr: 102, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } },
    Portugal: { Ronaldo: { variantName: "Ronaldo", ovr: 114, tier: "Limitbreaker", imageUrl: "URL_DA_FOTO_AQUI" } },
    Argentina: { Messi: { variantName: "Messi", ovr: 104, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } },
    Colombia: { James: { variantName: "James", ovr: 108, tier: "Breakout", imageUrl: "URL_DA_FOTO_AQUI" } }
  },
  2018: {
    France: { 
      Pogba: { variantName: "Pogba", ovr: 105, tier: "Cup", imageUrl: "URL_DA_FOTO_AQUI" }, 
      Griezmann: { variantName: "Griezmann", ovr: 105, tier: "Cup", imageUrl: "URL_DA_FOTO_AQUI" }, 
      Mbappe: { variantName: "Mbappe", ovr: 112, tier: "Limitbreaker", imageUrl: "URL_DA_FOTO_AQUI" }, 
      Pavard: { variantName: "Pavard", ovr: 106, tier: "Breakout", imageUrl: "URL_DA_FOTO_AQUI" } 
    },
    Mexico: { Lozano: { variantName: "Lozano", ovr: 105, tier: "Breakout", imageUrl: "URL_DA_FOTO_AQUI" } },
    Croatia: { Modric: { variantName: "GB Modric", ovr: 107, tier: "Ballon", imageUrl: "URL_DA_FOTO_AQUI" } },
    Belgium: { 
      Hazard: { variantName: "SB Hazard", ovr: 106, tier: "Ballon", imageUrl: "URL_DA_FOTO_AQUI" }, 
      "De Bruyne": { variantName: "De Bruyne", ovr: 102, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" }, 
      Courtois: { variantName: "Courtois", ovr: 111, tier: "Limitbreaker", imageUrl: "URL_DA_FOTO_AQUI" } 
    },
    Portugal: { Ronaldo: { variantName: "Ronaldo", ovr: 104, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } },
    Egypt: { Salah: { variantName: "Salah", ovr: 100, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } },
    Spain: { Ramos: { variantName: "Ramos", ovr: 113, tier: "Limitbreaker", imageUrl: "URL_DA_FOTO_AQUI" } },
    Brazil: { Neymar: { variantName: "Neymar", ovr: 111, tier: "Limitbreaker", imageUrl: "URL_DA_FOTO_AQUI" } }
  },
  2022: {
    Argentina: { 
      Messi: { variantName: "GB Messi", ovr: 109, tier: "Ballon", imageUrl: "URL_DA_FOTO_AQUI" }, 
      "Di Maria": { variantName: "Di Maria", ovr: 105, tier: "Cup", imageUrl: "URL_DA_FOTO_AQUI" }, 
      "E. Fernandez": { variantName: "E. Fernandez", ovr: 107, tier: "Breakout", imageUrl: "URL_DA_FOTO_AQUI" } 
    },
    Netherlands: { "Van Dijk": { variantName: "Van Dijk", ovr: 111, tier: "Limitbreaker", imageUrl: "URL_DA_FOTO_AQUI" } },
    France: { Mbappe: { variantName: "SB Mbappe", ovr: 105, tier: "Ballon", imageUrl: "URL_DA_FOTO_AQUI" } },
    "South Korea": { Son: { variantName: "Son", ovr: 100, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } }
  },
  2026: {
    France: { 
      Mbappe: { variantName: "Mbappe", ovr: 104, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" }, 
      Olise: { variantName: "Olise", ovr: 106, tier: "Breakout", imageUrl: "URL_DA_FOTO_AQUI" } 
    },
    Argentina: { Messi: { variantName: "Messi", ovr: 115, tier: "Limitbreaker", imageUrl: "URL_DA_FOTO_AQUI" } },
    Norway: { Haaland: { variantName: "Haaland", ovr: 103, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } },
    Spain: { Yamal: { variantName: "Yamal", ovr: 103, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } },
    England: { Bellingham: { variantName: "Bellingham", ovr: 102, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } },
    Brazil: { Vinicius: { variantName: "Vinicius", ovr: 102, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } }
  }
};

// Dicionário de Nomes em PT-BR
const teamNamesPT = {
  Brazil: "Brasil", Netherlands: "Holanda", Germany: "Alemanha", Argentina: "Argentina",
  Italy: "Itália", Senegal: "Senegal", "South Korea": "Coreia do Sul", England: "Inglaterra",
  France: "França", Sweden: "Suécia", Uruguay: "Uruguai", Spain: "Espanha",
  "Ivory Coast": "Costa do Marfim", Colombia: "Colômbia", Portugal: "Portugal",
  Mexico: "México", Croatia: "Croácia", Belgium: "Bélgica", Egypt: "Egito", Norway: "Noruega"
};

// Dicionário de Emojis das Bandeiras
const teamFlags = {
  Brazil: "🇧🇷", Netherlands: "🇳🇱", Germany: "🇩🇪", Argentina: "🇦🇷",
  Italy: "🇮🇹", Senegal: "🇸🇳", "South Korea": "🇰🇷", England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  France: "🇫🇷", Sweden: "🇸🇪", Uruguay: "🇺🇾", Spain: "🇪🇸",
  "Ivory Coast": "🇨🇮", Colombia: "🇨🇴", Portugal: "🇵🇹",
  Mexico: "🇲🇽", Croatia: "🇭🇷", Belgium: "🇧🇪", Egypt: "🇪🇬", Norway: "🇳🇴"
};

// Mapeia todas as seleções únicas e os anos em que possuem jogadores
function getTeamsWithYears() {
  const teamsMap = {};
  for (const [year, teams] of Object.entries(specialsData)) {
    for (const teamKey of Object.keys(teams)) {
      if (!teamsMap[teamKey]) teamsMap[teamKey] = new Set();
      teamsMap[teamKey].add(year);
    }
  }
  return teamsMap;
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
  new SlashCommandBuilder()
    .setName('jogadores')
    .setDescription('Exibe o menu de seleção dos jogadores especiais')
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

client.once('clientReady', async () => { // Já atualizado para evitar o DeprecationWarning no futuro
  console.log(`Bot online como: ${client.user.tag}`);
  
  try {
    console.log('Registrando comandos Slash...');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log('Comandos registrados com sucesso!');
  } catch (error) {
    console.error('Erro ao registrar comandos:', error);
  }
});

client.on('interactionCreate', async interaction => {
  // 1. Comando /jogadores
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'jogadores') {
      const teamsMap = getTeamsWithYears();
      const options = [];

      for (const [teamKey, yearsSet] of Object.entries(teamsMap)) {
        const sortedYears = Array.from(yearsSet).sort((a, b) => a - b).join(', ');
        const label = teamNamesPT[teamKey] || teamKey;
        const emoji = teamFlags[teamKey] || '🏳️'; // Usa a bandeira do dicionário ou uma branca genérica

        options.push({
          label: label,
          value: teamKey,
          description: sortedYears.length > 50 ? sortedYears.substring(0, 47) + '...' : sortedYears,
          emoji: emoji // Adiciona o emoji da bandeira à opção do menu
        });
      }

      const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('select_team')
        .setPlaceholder('Seleções')
        .addOptions(options.slice(0, 25));

      const row = new ActionRowBuilder().addComponents(selectMenu);

      await interaction.reply({
        content: '**Jogadores Etc**',
        components: [row],
        ephemeral: true
      });
    }
  }

  // 2. Resposta do Menu de Seleção
  if (interaction.isStringSelectMenu() && interaction.customId === 'select_team') {
    const selectedTeam = interaction.values[0];
    const playersList = [];

    const years = Object.keys(specialsData).sort((a, b) => Number(a) - Number(b));

    for (const year of years) {
      if (specialsData[year][selectedTeam]) {
        for (const [keyName, player] of Object.entries(specialsData[year][selectedTeam])) {
          playersList.push({
            year,
            playerKey: keyName,
            ...player
          });
        }
      }
    }

    // Criando os Cards (Embeds) com foto de perfil
    const embeds = playersList.map(player => {
      const embed = new EmbedBuilder()
        .setColor(0xFEE75C) // Borda Amarela
        .setAuthor({ name: player.playerKey })
        .setTitle(`${player.year} ${player.tier}`)
        .addFields({ name: 'OVR', value: `${player.ovr}`, inline: true });
        
      // Se você substituiu o placeholder por um link real, a imagem aparecerá
      if (player.imageUrl && player.imageUrl !== "URL_DA_FOTO_AQUI") {
        embed.setThumbnail(player.imageUrl);
      }

      return embed;
    });

    await interaction.update({
      content: `**Jogadores da Seleção: ${teamNamesPT[selectedTeam] || selectedTeam} ${teamFlags[selectedTeam] || ''}**`,
      embeds: embeds.slice(0, 10) // Discord permite no máximo 10 embeds por mensagem
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
    for (const year of years) {
      if (specialsData[year][selectedTeam]) {
        for (const [keyName, player] of Object.entries(specialsData[year][selectedTeam])) {
          playersList.push({
            year,
            playerKey: keyName,
            ...player
          });
        }
      }
    }

    // Gerar Embeds estilo "Cartão Amarelo"
    const embeds = playersList.map(player => {
      return new EmbedBuilder()
        .setColor(0xFEE75C) // Borda Amarela igual à imagem
        .setAuthor({ name: player.playerKey })
        .setTitle(`${player.year} ${player.tier}`)
        .addFields({ name: 'OVR', value: `${player.ovr}`, inline: true });
    });

    // Atualiza a resposta exibindo os cards (máximo de 10 por mensagem no Discord)
    await interaction.update({
      content: `**Jogadores da Seleção: ${teamNamesPT[selectedTeam] || selectedTeam}**`,
      embeds: embeds.slice(0, 10)
    });
  }
});

client.login(process.env.DISCORD_TOKEN);