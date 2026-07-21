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
  1970: { Brazil: { Pele: { variantName: "Pele", ovr: 113, tier: "Limitbreaker", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Pele_con_brasil_%28cropped%29.jpg/250px-Pele_con_brasil_%28cropped%29.jpg" } } },
  1974: { Netherlands: { Cruyff: { variantName: "GB Cruyff", ovr: 108, tier: "Ballon", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Johan_Cruijff_%281974%29.jpg/250px-Johan_Cruijff_%281974%29.jpg" } }, 
  Germany: { Beckenbauer: { variantName: "SB Beckenbauer", ovr: 106, tier: "Ballon", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/56/Franz_Beckenbauer_%281975%29.jpg" } } },
  1986: { Argentina: { Maradona: { variantName: "GB Maradona", ovr: 109, tier: "Ballon", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Maradona-Mundial_86_con_la_copa.JPG" } } },
  1994: { Brazil: { Romario: { variantName: "GB Romario", ovr: 107, tier: "Ballon", imageUrl: "https://a.espncdn.com/photo/2020/0424/r692550_1296x729_16-9.jpg" } },
   Italy: { "R. Baggio": { variantName: "SB Baggio", ovr: 106, tier: "Ballon", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Roberto_Baggio_-_Italia_%2790.jpg/250px-Roberto_Baggio_-_Italia_%2790.jpg" },
    Maldini: { variantName: "Maldini", ovr: 113, tier: "Limitbreaker", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdKlUo69oHViBWp1FQyBWMt6Mr1ABA1jWaoqeowUuVhMEvi-nU_zOKsCA&s=10" } } },
  2002: { Germany: { Kahn: { variantName: "GB Kahn", ovr: 108, tier: "Ballon", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXKcNgl34zfgpRHNmI0H8VDYuL-oe_qLtULnY86dugBHE76voY_sGTQxs&s=10" } },
   Senegal: { "P. Diop": { variantName: "P. Diop", ovr: 105, tier: "Breakout", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAgZhLlevt6howB8uBJNv_77p_6MU5ZCuGhWR6kSyQNLIuCva3UkUEDywe&s=10" } },
    "South Korea": { "Ahn Jung-Hwan": { variantName: "Ahn Jung-Hwan", ovr: 106, tier: "Breakout", imageUrl: "https://calciopedia.com.br/wp-content/uploads/2016/02/gettyimages-1061019.jpg" } },
     Brazil: { R9: { variantName: "SB R9", ovr: 106, tier: "Ballon", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy8BZlPeKlo1vvua6g-LKuaq42qrGS0KDMQPFSi6CS4UJ8Ot1AWkqFW3E&s=10" } },
      England: { Beckham: { variantName: "Beckham", ovr: 112, tier: "Limitbreaker", imageUrl: "https://i.pinimg.com/474x/be/92/23/be9223743cd406d64e9425b50a89bdce.jpg" } },
       France: { Zidane: { variantName: "Zidane", ovr: 114, tier: "Limitbreaker", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR06J4ym7zTc11PoTnUyBOR8CoQ-Lj4CLSFlmgFjhRXIURphzcaoFQLR8o&s=10" } } },
  2006: { France: { Zidane: { variantName: "GB Zidane", ovr: 108, tier: "Ballon", imageUrl: "https://i.pinimg.com/736x/65/b9/7e/65b97e387b8dc91d346ecfbe6fb7e1e1.jpg" },
   Henry: { variantName: "Henry", ovr: 102, tier: "Prime", imageUrl: "https://www.onthisday.com/images/people/thierry-henry.jpg?w=720" } },
    Italy: { Cannavaro: { variantName: "SB Cannavaro", ovr: 106, tier: "Ballon", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUj84Vkkertne9Fz7oJ2SyOFi9dLvzmAeM3udEDbMEMAJo7WvfrH-Fyc2W&s=10" },
     Pirlo: { variantName: "Pirlo", ovr: 101, tier: "Prime", imageUrl: "https://cdn-img.staticzz.com/img/planteis/new/94/92/69492_andrea_pirlo_20250423084850.jpg" },
      Buffon: { variantName: "Buffon", ovr: 105, tier: "Cup", imageUrl: "https://thumbs.dreamstime.com/b/gianluigi-buffon-durante-partida-hannover-alemanha-de-maio-ta%C3%A7a-mundial-da-ffa-it%C3%A1lia-ghana-match-hdiarena-185176570.jpg" } },
       Sweden: { Zlatan: { variantName: "Zlatan", ovr: 103, tier: "Prime", imageUrl: "https://cdn-img.staticzz.com/img/planteis/new/06/57/70657_zlatan_ibrahimovic_20240608051734.jpg" } },
        Brazil: { Ronaldinho: { variantName: "Ronaldinho", ovr: 104, tier: "Prime", imageUrl: "https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/763_ronaldinho.jpg" } },
         Germany: { Podolski: { variantName: "Podolski", ovr: 107, tier: "Breakout", imageUrl: "https://cdn-img.staticzz.com/img/planteis/new/96/81/59681_lukas_podolski_20240615235723.jpg" } } },
  2010: { Uruguay: { Forlan: { variantName: "GB Forlan", ovr: 107, tier: "Ballon", imageUrl: "https://cdn-img.staticzz.com/img/planteis/new/63/28/756328_diego_forlan_20240709070917.jpg" } },
   Netherlands: { Sneijder: { variantName: "SB Sneijder", ovr: 105, tier: "Ballon", imageUrl: "https://img.a.transfermarkt.technology/portrait/big/4673-1684166804.jpg?lm=1" },
    Robben: { variantName: "Robben", ovr: 100, tier: "Prime", imageUrl: "https://static.wikia.nocookie.net/futebolistas/images/2/2d/Robben.png/revision/latest?cb=20101122075654&path-prefix=pt-br" } },
     Spain: { Xavi: { variantName: "Xavi", ovr: 101, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" },
      Iniesta: { variantName: "Iniesta", ovr: 105, tier: "Cup", imageUrl: "URL_DA_FOTO_AQUI" },
       Casillas: { variantName: "Casillas", ovr: 111, tier: "Limitbreaker", imageUrl: "URL_DA_FOTO_AQUI" } },
        Brazil: { Kaka: { variantName: "Kaka", ovr: 101, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } },
         "Ivory Coast": { Drogba: { variantName: "Drogba", ovr: 101, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } },
          Germany: { Muller: { variantName: "Muller", ovr: 108, tier: "Breakout", imageUrl: "URL_DA_FOTO_AQUI" } } },
  2014: { Germany: { Muller: { variantName: "SB Muller", ovr: 105, tier: "Ballon", imageUrl: "URL_DA_FOTO_AQUI" },
   Neuer: { variantName: "Neuer", ovr: 105, tier: "Cup", imageUrl: "URL_DA_FOTO_AQUI" },
    Kroos: { variantName: "Kroos", ovr: 105, tier: "Cup", imageUrl: "URL_DA_FOTO_AQUI" } },
     Brazil: { Neymar: { variantName: "Neymar", ovr: 103, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" },
      Marcelo: { variantName: "Marcelo", ovr: 112, tier: "Limitbreaker", imageUrl: "URL_DA_FOTO_AQUI" } },
       Uruguay: { Suarez: { variantName: "Suarez", ovr: 102, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } },
        Portugal: { Ronaldo: { variantName: "Ronaldo", ovr: 114, tier: "Limitbreaker", imageUrl: "URL_DA_FOTO_AQUI" } },
         Argentina: { Messi: { variantName: "Messi", ovr: 104, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } },
          Colombia: { James: { variantName: "James", ovr: 108, tier: "Breakout", imageUrl: "URL_DA_FOTO_AQUI" } } },
  2018: { France: { Pogba: { variantName: "Pogba", ovr: 105, tier: "Cup", imageUrl: "URL_DA_FOTO_AQUI" },
   Griezmann: { variantName: "Griezmann", ovr: 105, tier: "Cup", imageUrl: "URL_DA_FOTO_AQUI" },
    Mbappe: { variantName: "Mbappe", ovr: 112, tier: "Limitbreaker", imageUrl: "URL_DA_FOTO_AQUI" },
     Pavard: { variantName: "Pavard", ovr: 106, tier: "Breakout", imageUrl: "URL_DA_FOTO_AQUI" } },
      Mexico: { Lozano: { variantName: "Lozano", ovr: 105, tier: "Breakout", imageUrl: "URL_DA_FOTO_AQUI" } },
       Croatia: { Modric: { variantName: "GB Modric", ovr: 107, tier: "Ballon", imageUrl: "URL_DA_FOTO_AQUI" } },
        Belgium: { Hazard: { variantName: "SB Hazard", ovr: 106, tier: "Ballon", imageUrl: "URL_DA_FOTO_AQUI" },
         "De Bruyne": { variantName: "De Bruyne", ovr: 102, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" },
          Courtois: { variantName: "Courtois", ovr: 111, tier: "Limitbreaker", imageUrl: "URL_DA_FOTO_AQUI" } },
           Portugal: { Ronaldo: { variantName: "Ronaldo", ovr: 104, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } },
            Egypt: { Salah: { variantName: "Salah", ovr: 100, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } },
             Spain: { Ramos: { variantName: "Ramos", ovr: 113, tier: "Limitbreaker", imageUrl: "URL_DA_FOTO_AQUI" } },
              Brazil: { Neymar: { variantName: "Neymar", ovr: 111, tier: "Limitbreaker", imageUrl: "URL_DA_FOTO_AQUI" } } },
  2022: { Argentina: { Messi: { variantName: "GB Messi", ovr: 109, tier: "Ballon", imageUrl: "URL_DA_FOTO_AQUI" },
   "Di Maria": { variantName: "Di Maria", ovr: 105, tier: "Cup", imageUrl: "URL_DA_FOTO_AQUI" },
    "E. Fernandez": { variantName: "E. Fernandez", ovr: 107, tier: "Breakout", imageUrl: "URL_DA_FOTO_AQUI" } },
     Netherlands: { "Van Dijk": { variantName: "Van Dijk", ovr: 111, tier: "Limitbreaker", imageUrl: "URL_DA_FOTO_AQUI" } },
      France: { Mbappe: { variantName: "SB Mbappe", ovr: 105, tier: "Ballon", imageUrl: "URL_DA_FOTO_AQUI" } },
       "South Korea": { Son: { variantName: "Son", ovr: 100, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } } },
  2026: { France: { Mbappe: { variantName: "Mbappe", ovr: 104, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" },
   Olise: { variantName: "Olise", ovr: 106, tier: "Breakout", imageUrl: "URL_DA_FOTO_AQUI" } },
    Argentina: { Messi: { variantName: "Messi", ovr: 115, tier: "Limitbreaker", imageUrl: "URL_DA_FOTO_AQUI" } },
     Norway: { Haaland: { variantName: "Haaland", ovr: 103, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } },
      Spain: { Yamal: { variantName: "Yamal", ovr: 103, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } },
       England: { Bellingham: { variantName: "Bellingham", ovr: 102, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } },
        Brazil: { Vinicius: { variantName: "Vinicius", ovr: 102, tier: "Prime", imageUrl: "URL_DA_FOTO_AQUI" } } }
};

// Dicionários
const teamNamesPT = { Brazil: "Brasil", Netherlands: "Holanda", Germany: "Alemanha", Argentina: "Argentina", Italy: "Itália", Senegal: "Senegal", "South Korea": "Coreia do Sul", England: "Inglaterra", France: "França", Sweden: "Suécia", Uruguay: "Uruguai", Spain: "Espanha", "Ivory Coast": "Costa do Marfim", Colombia: "Colômbia", Portugal: "Portugal", Mexico: "México", Croatia: "Croácia", Belgium: "Bélgica", Egypt: "Egito", Norway: "Noruega" };
const teamFlags = { Brazil: "🇧🇷", Netherlands: "🇳🇱", Germany: "🇩🇪", Argentina: "🇦🇷", Italy: "🇮🇹", Senegal: "🇸🇳", "South Korea": "🇰🇷", England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", France: "🇫🇷", Sweden: "🇸🇪", Uruguay: "🇺🇾", Spain: "🇪🇸", "Ivory Coast": "🇨🇮", Colombia: "🇨🇴", Portugal: "🇵🇹", Mexico: "🇲🇽", Croatia: "🇭🇷", Belgium: "🇧🇪", Egypt: "🇪🇬", Norway: "🇳🇴" };

// A FUNÇÃO QUE ESTAVA FALTANDO ESTÁ AQUI
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

// Configuração do Bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
  new SlashCommandBuilder()
    .setName('jogadores')
    .setDescription('Exibe o menu de seleção dos jogadores especiais')
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

client.once('ready', async () => { 
  console.log(`Bot online como: ${client.user.tag}`);
  try {
    console.log('Registrando comandos Slash...');
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    console.log('Comandos registrados com sucesso!');
  } catch (error) {
    console.error('Erro ao registrar comandos:', error);
  }
});

client.on('interactionCreate', async interaction => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'jogadores') {
      const teamsMap = getTeamsWithYears();
      const options = [];

      for (const [teamKey, yearsSet] of Object.entries(teamsMap)) {
        const sortedYears = Array.from(yearsSet).sort((a, b) => a - b).join(', ');
        const label = teamNamesPT[teamKey] || teamKey;
        const emoji = teamFlags[teamKey] || '🏳️'; 

        options.push({
          label: label,
          value: teamKey,
          description: sortedYears.length > 50 ? sortedYears.substring(0, 47) + '...' : sortedYears,
          emoji: emoji
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

  if (interaction.isStringSelectMenu() && interaction.customId === 'select_team') {
    const selectedTeam = interaction.values[0];
    const playersList = [];
    const years = Object.keys(specialsData).sort((a, b) => Number(a) - Number(b));

    for (const year of years) {
      if (specialsData[year][selectedTeam]) {
        for (const [keyName, player] of Object.entries(specialsData[year][selectedTeam])) {
          playersList.push({ year, playerKey: keyName, ...player });
        }
      }
    }

    const embeds = playersList.map(player => {
      const embed = new EmbedBuilder()
        .setColor(0xFEE75C) 
        .setAuthor({ name: player.playerKey })
        .setTitle(`${player.year} ${player.tier}`)
        .addFields({ name: 'OVR', value: `${player.ovr}`, inline: true });
        
      if (player.imageUrl && player.imageUrl !== "URL_DA_FOTO_AQUI") {
        embed.setThumbnail(player.imageUrl);
      }

      return embed;
    });

    await interaction.update({
      content: `**Jogadores da Seleção: ${teamNamesPT[selectedTeam] || selectedTeam} ${teamFlags[selectedTeam] || ''}**`,
      embeds: embeds.slice(0, 10) 
    });
  }
});

client.login(process.env.DISCORD_TOKEN);