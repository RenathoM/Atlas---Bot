const specialsData = {
  1970: { Brazil: { Pele: { variantName: "Pele", ovr: 113, tier: "Limitbreaker", positions: ['ST', 'LW'], imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Pele_con_brasil_%28cropped%29.jpg/250px-Pele_con_brasil_%28cropped%29.jpg" } } },
  1974: { Netherlands: { Cruyff: { variantName: "GB Cruyff", ovr: 108, tier: "Ballon", positions: ['AM', 'LW'], imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Johan_Cruijff_%281974%29.jpg/250px-Johan_Cruijff_%281974%29.jpg" } },
  Germany: { Beckenbauer: { variantName: "SB Beckenbauer", ovr: 106, tier: "Ballon", positions: ['CB', 'CM'], imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/56/Franz_Beckenbauer_%281975%29.jpg/250px-Franz_Beckenbauer_%281975%29.jpg" } } },
  1986: { Argentina: { Maradona: { variantName: "GB Maradona", ovr: 109, tier: "Ballon", positions: ['ST', 'AM'], imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Maradona-Mundial_86_con_la_copa.JPG" } } },
  1994: { Brazil: { Romario: { variantName: "GB Romario", ovr: 107, tier: "Ballon", positions: ['ST'], imageUrl: "https://a.espncdn.com/photo/2020/0424/r692550_1296x729_16-9.jpg" } },
   Italy: { "R. Baggio": { variantName: "SB Baggio", ovr: 106, tier: "Ballon", positions: ['AM', 'ST'], imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Roberto_Baggio_-_Italia_%2790.jpg/250px-Roberto_Baggio_-_Italia_%2790.jpg" },
    Maldini: { variantName: "Maldini", ovr: 113, tier: "Limitbreaker", positions: ['LB', 'CB'], imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdKlUo69oHViBWp1FQyBWMt6Mr1ABA1jWaoqeowUuVhMEvi-nU_zOKsCA&s=10" } } },
  2002: { Germany: { Kahn: { variantName: "GB Kahn", ovr: 108, tier: "Ballon", positions: ['GK'], imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXKcNgl34zfgpRHNmI0H8VDYuL-oe_qLtULnY86dugBHE76voY_sGTQxs&s=10" } },
   Senegal: { "P. Diop": { variantName: "P. Diop", ovr: 105, tier: "Breakout", positions: ['CM', 'DM'], imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAgZhLlevt6howB8uBJNv_77p_6MU5ZCuGhWR6kSyQNLIuCva3UkUEDywe&s=10" } },
    "South Korea": { "Ahn Jung-Hwan": { variantName: "Ahn Jung-Hwan", ovr: 106, tier: "Breakout", positions: ['ST', 'LW'], imageUrl: "https://calciopedia.com.br/wp-content/uploads/2016/02/gettyimages-1061019.jpg" } },
     Brazil: { R9: { variantName: "SB R9", ovr: 106, tier: "Ballon", positions: ['ST'], imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy8BZlPeKlo1vvua6g-LKuaq42qrGS0KDMQPFSi6CS4UJ8Ot1AWkqFW3E&s=10" } },
      England: { Beckham: { variantName: "Beckham", ovr: 112, tier: "Limitbreaker", positions: ['RM', 'RW'], imageUrl: "https://i.pinimg.com/474x/be/92/23/be9223743cd406d64e9425b50a89bdce.jpg" } },
       France: { Zidane: { variantName: "Zidane", ovr: 114, tier: "Limitbreaker", positions: ['AM', 'CM'], imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR06J4ym7zTc11PoTnUyBOR8CoQ-Lj4CLSFlmgFjhRXIURphzcaoFQLR8o&s=10" } } },
  2006: { France: { Zidane: { variantName: "GB Zidane", ovr: 108, tier: "Ballon", positions: ['AM', 'CM'], imageUrl: "https://i.pinimg.com/736x/65/b9/7e/65b97e387b8dc91d346ecfbe6fb7e1e1.jpg" },
   Henry: { variantName: "Henry", ovr: 102, tier: "Prime", positions: ['LW', 'ST'], imageUrl: "https://www.onthisday.com/images/people/thierry-henry.jpg?w=720" } },
    Italy: { Cannavaro: { variantName: "SB Cannavaro", ovr: 106, tier: "Ballon", positions: ['CB', 'LB'], imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUj84Vkkertne9Fz7oJ2SyOFi9dLvzmAeM3udEDbMEMAJo7WvfrH-Fyc2W&s=10" },
     Pirlo: { variantName: "Pirlo", ovr: 101, tier: "Prime", positions: ['CM', 'DM'], imageUrl: "https://cdn-img.staticzz.com/img/planteis/new/94/92/69492_andrea_pirlo_20250423084850.jpg" },
      Buffon: { variantName: "Buffon", ovr: 105, tier: "Cup", positions: ['GK'], imageUrl: "https://thumbs.dreamstime.com/b/gianluigi-buffon-durante-partida-hannover-alemanha-de-maio-ta%C3%A7a-mundial-da-ffa-it%C3%A1lia-ghana-match-hdiarena-185176570.jpg" } },
       Sweden: { Zlatan: { variantName: "Zlatan", ovr: 103, tier: "Prime", positions: ['ST', 'LW'], imageUrl: "https://cdn-img.staticzz.com/img/planteis/new/06/57/70657_zlatan_ibrahimovic_20240608051734.jpg" } },
        Brazil: { Ronaldinho: { variantName: "Ronaldinho", ovr: 104, tier: "Prime", positions: ['LW', 'AM'], imageUrl: "https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/763_ronaldinho.jpg" } },
         Germany: { Podolski: { variantName: "Podolski", ovr: 107, tier: "Breakout", positions: ['LW', 'ST'], imageUrl: "https://cdn-img.staticzz.com/img/planteis/new/96/81/59681_lukas_podolski_20240615235723.jpg" } } },
  2010: { Uruguay: { Forlan: { variantName: "GB Forlan", ovr: 107, tier: "Ballon", positions: ['ST', 'LW'], imageUrl: "https://cdn-img.staticzz.com/img/planteis/new/63/28/756328_diego_forlan_20240709070917.jpg" } },
   Netherlands: { Sneijder: { variantName: "SB Sneijder", ovr: 105, tier: "Ballon", positions: ['AM', 'CM'], imageUrl: "https://img.a.transfermarkt.technology/portrait/big/4673-1684166804.jpg?lm=1" },
    Robben: { variantName: "Robben", ovr: 100, tier: "Prime", positions: ['RW', 'LW'], imageUrl: "https://static.wikia.nocookie.net/futebolistas/images/2/2d/Robben.png/revision/latest?cb=20101122075654&path-prefix=pt-br" } },
     Spain: { Xavi: { variantName: "Xavi", ovr: 101, tier: "Prime", positions: ['CM'], imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ03BoGc8WLFM9z7An8ac9xpKGoMUMTB8zUwGuuocxKa31yvjag3UK0u5PY&s=10" },
      Iniesta: { variantName: "Iniesta", ovr: 105, tier: "Cup", positions: ['CM', 'LW'], imageUrl: "https://static.wikia.nocookie.net/futebolistas/images/9/98/Iniesta.png/revision/latest?cb=20101122073649&path-prefix=pt-br" },
       Casillas: { variantName: "Casillas", ovr: 111, tier: "Limitbreaker", positions: ['GK'], imageUrl: "https://media.gettyimages.com/id/102045744/pt/foto/potchefstroom-south-africa-iker-casillas-of-spain-poses-during-the-official-fifa-world-cup-2010.jpg?s=612x612&w=gi&k=20&c=LpRC5MeTfW6L-v6i_ZIGrBO60gU4CrVApxFYt_o4a9g=" } },
        Brazil: { Kaka: { variantName: "Kaka", ovr: 101, tier: "Prime", positions: ['CAM', 'LW'], imageUrl: "https://cdn-img.staticzz.com/img/planteis/new/89/60/738960_kaka_20240530002348.jpg" } },
         "Ivory Coast": { Drogba: { variantName: "Drogba", ovr: 101, tier: "Prime", positions: ['ST'], imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThhvRiASae1tKmpDjqDM5mQM-C5f4XpQYB9dY3LPSlMPBssOxaoyaKXE&s=10" } },
          Germany: { Muller: { variantName: "Muller", ovr: 108, tier: "Breakout", positions: ['ST', 'LW'], imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3OO4xmXZpBdUKe7HMRj4vYeUnkpUNooOJtNI3jfXGq0_FQVBzeLggGqYk&s=10" } } },
  2014: { Germany: { Muller: { variantName: "SB Muller", ovr: 105, tier: "Ballon", positions: ['ST', 'LW'], imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4e/FIFA_WC-qualification_2014_-_Austria_vs._Germany_2012-09-11_-_Thomas_M%C3%BCller_01_edit.JPG" },
   Neuer: { variantName: "Neuer", ovr: 105, tier: "Cup", positions: ['GK'], imageUrl: "https://pbs.twimg.com/media/Fh1HYKSWAAAdqsh.jpg" },
    Kroos: { variantName: "Kroos", ovr: 105, tier: "Cup", positions: ['CM', 'CAM'], imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/98/CSKA-RM18_%287%29_%28cropped%29.jpg" } },
     Brazil: { Neymar: { variantName: "Neymar", ovr: 103, tier: "Prime", positions: ['LW', 'RW'], imageUrl: "https://i.pinimg.com/736x/17/5e/c8/175ec8388f362873371468f823490a.jpg" },
      Marcelo: { variantName: "Marcelo", ovr: 112, tier: "Limitbreaker", positions: ['LB'], imageUrl: "https://cdn-img.staticzz.com/img/planteis/new/36/38/2173638_marcelo_20240924144631.jpg" } },
       Uruguay: { Suarez: { variantName: "Suarez", ovr: 102, tier: "Prime", positions: ['ST'], imageUrl: "https://cdn-img.staticzz.com/img/planteis/new/79/13/2607913_luis_suarez_20240502163057.png" } },
        Portugal: { Ronaldo: { variantName: "Ronaldo", ovr: 114, tier: "Limitbreaker", positions: ['LW', 'LM'], imageUrl: "https://www.shutterstock.com/editorial/image-editorial/N9DdI712Ndz1M5zcQ2NA==/cristiano-ronaldo-real-madrid-440nw-4231557cx.jpg" } },
         Argentina: { Messi: { variantName: "Messi", ovr: 104, tier: "Prime", positions: ['ST', 'CM'], imageUrl: "https://cdn-img.staticzz.com/img/planteis/new/13/39/2551339_lionel_messi_20260123011714.jpg" } },
          Colombia: { James: { variantName: "James", ovr: 108, tier: "Breakout", positions: ['CAM', 'CM'], imageUrl: "https://conteudo.imguol.com.br/c/esporte/56/2019/06/12/2019-06-12T1560376238571_v2_4x3.jpg" } } },
  2018: { France: { Pogba: { variantName: "Pogba", ovr: 105, tier: "Cup", positions: ['CM', 'DM'], imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Paul_Pogba_2018.jpg" },
   Griezmann: { variantName: "Griezmann", ovr: 105, tier: "Cup", positions: ['LW', 'ST'], imageUrl: "https://assets.goal.com/images/v3/blt197173125aab412a/7f917afb833b29af17816293de513844249d4168.jpg?auto=webp&format=pjpg&width=3840&quality=60" },
    Mbappe: { variantName: "Mbappe", ovr: 112, tier: "Limitbreaker", positions: ['LW', 'ST'], imageUrl: "https://cloudfront-us-east-1.images.arcpublishing.com/estadao/LJP7SFIPDVJNXICOBBISJJLAZA.jpg" },
     Pavard: { variantName: "Pavard", ovr: 106, tier: "Breakout", positions: ['RB', 'CB'], imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Benjamin_Pavard_20180709.jpg" } },
      Mexico: { Lozano: { variantName: "Lozano", ovr: 105, tier: "Breakout", positions: ['LW', 'RW'], imageUrl: "https://cdn-img.staticzz.com/img/planteis/new/86/29/4508629_hirving_lozano_20250127192758.jpg" } },
       Croatia: { Modric: { variantName: "GB Modric", ovr: 107, tier: "Ballon", positions: ['LM', 'CM'], imageUrl: "https://api.my-rent.net/object_picture/object_picture/116567" } },
        Belgium: { Hazard: { variantName: "SB Hazard", ovr: 106, tier: "Ballon", positions: ['LW', 'RW'], imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn6pXDf2kpxsX8951G71ja8c1zq34Q9gpLSeP74X7nhJqMiDXa0XXxNXyv&s=10" },
         "De Bruyne": { variantName: "De Bruyne", ovr: 102, tier: "Prime", positions: ['CM', 'CAM'], imageUrl: "https://cdn-img.staticzz.com/img/planteis/new/77/10/3907710_kevin_de_bruyne_20260515065922.png" },
          Courtois: { variantName: "Courtois", ovr: 111, tier: "Limitbreaker", positions: ['GK'], imageUrl: "https://media.gettyimages.com/id/102045744/pt/foto/potchefstroom-south-africa-iker-casillas-of-spain-poses-during-the-official-fifa-world-cup-2010.jpg?s=612x612&w=gi&k=20&c=LpRC5MeTfW6L-v6i_ZIGrBO60gU4CrVApxFYt_o4a9g=" } },
           Portugal: { Ronaldo: { variantName: "Ronaldo", ovr: 104, tier: "Prime", positions: ['LW', 'LM'], imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg?utm_source=pt.wikiquote.org&utm_campaign=index&utm_content=original" } },
            Egypt: { Salah: { variantName: "Salah", ovr: 100, tier: "Prime", positions: ['RW', 'LW'], imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Mo_Salah_2018.png" } },
             Spain: { Ramos: { variantName: "Ramos", ovr: 113, tier: "Limitbreaker", positions: ['CB', 'RB'], imageUrl: "https://www.ogol.com.br/img/jogadores/new/98/94/9894_sergio_ramos_20251210115318.jpg" } },
              Brazil: { Neymar: { variantName: "Neymar", ovr: 111, tier: "Limitbreaker", positions: ['LW', 'RW'], imageUrl: "https://p2.trrsf.com/image/fget/cf/1200/1600/middle/images.terra.com/2018/01/29/2018-01-29T140831Z_1_LYNXMPEU11I_RTROPTP_4_SOCCER-FRANCE-PSG-MPL.JPG" } } },
  2022: { Argentina: { Messi: { variantName: "GB Messi", ovr: 109, tier: "Ballon", positions: ['ST', 'CM'], imageUrl: "https://cdn-img.staticzz.com/img/planteis/new/37/73/6363773_lionel_messi_20240617223940.jpg" },
   "Di Maria": { variantName: "Di Maria", ovr: 105, tier: "Cup", positions: ['RW', 'LW'], imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/NIG-ARG_%285%29.jpg/250px-NIG-ARG_%285%29.jpg" },
    "E. Fernandez": { variantName: "E. Fernandez", ovr: 107, tier: "Breakout", positions: ['CM', 'CAM'], imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/df/Enzo_Fern%C3%A1ndez_WC2022.jpg" } },
     Netherlands: { "Van Dijk": { variantName: "Van Dijk", ovr: 111, tier: "Limitbreaker", positions: ['CB'], imageUrl: "https://cdn-img.staticzz.com/img/planteis/new/24/73/6272473_virgil_van_dijk_20240605053030.jpg" } },
      France: { Mbappe: { variantName: "SB Mbappe", ovr: 105, tier: "Ballon", positions: ['LW', 'ST'], imageUrl: "https://cloudfront-us-east-1.images.arcpublishing.com/estadao/LJP7SFIPDVJNXICOBBISJJLAZA.jpg" } },
       "South Korea": { Son: { variantName: "Son", ovr: 100, tier: "Prime", positions: ['LW', 'RW'], imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIQLmT5YODMVC_8XAK_Wc9K1bCA_VLhXbH6jn0NLRlOBO-nfTFn55yqAs&s=10" } } },
  2026: { France: { Mbappe: { variantName: "Mbappe", ovr: 104, tier: "Prime", positions: ['LW', 'ST'], imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Kylian_Mbappe_France_v_Senegal_16_June_2026-391.jpg" },
   Olise: { variantName: "Olise", ovr: 106, tier: "Breakout", positions: ['RW', 'LW'], imageUrl: "https://cdn-img.staticzz.com/img/planteis/new/79/13/2607913_luis_suarez_20240502163057.png" } },
    Argentina: { Messi: { variantName: "Messi", ovr: 115, tier: "Limitbreaker", positions: ['ST', 'CM'], imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRNAJvTqabBGu4-BwlxWRm7GHlTnDo0in20-mMRO4re1ap-NyfMWqiuvly&s=10" } },
     Norway: { Haaland: { variantName: "Haaland", ovr: 103, tier: "Prime", positions: ['ST'], imageUrl: "https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2026/04/haaland_noruega-e1775746524824.jpg?w=1200&h=1200&crop=1" } },
      Spain: { Yamal: { variantName: "Yamal", ovr: 103, tier: "Prime", positions: ['LW', 'RW'], imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKMvagvr-ARQ825oeIl2kTWFHStnPvA0yEKFj4KNYLoSE5kfECVjQEwOKS&s=10" } },
       England: { Bellingham: { variantName: "Bellingham", ovr: 102, tier: "Prime", positions: ['CM', 'CAM'], imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi0jD7u7ic0hwbi636W7BwJh1wpO4LTq8WMHSr8eoAQ-uTfUgVOW34F9s&s=10" } },
        Brazil: { Vinicius: { variantName: "Vinicius", ovr: 102, tier: "Prime", positions: ['LW', 'RW'], imageUrl: "https://s2-oglobo.glbimg.com/lq_EDGoAkYTzM3D4Q5Wx3Ybev_8=/0x0:924x626/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2026/k/0/metuuYQzOSkzoNATNAKw/115417813-miami-gardens-florida-june-24-vinicius-junior-7-of-brazil-celebrates-scoring-his-teams.jpg" } } }
};

const teamNamesPT = {
  Brazil: "Brasil",
  Netherlands: "Holanda",
  Germany: "Alemanha",
  Argentina: "Argentina",
  Italy: "Itália",
  Senegal: "Senegal",
  "South Korea": "Coreia do Sul",
  England: "Inglaterra",
  France: "França",
  Sweden: "Suécia",
  Uruguay: "Uruguai",
  Spain: "Espanha",
  "Ivory Coast": "Costa do Marfim",
  Colombia: "Colômbia",
  Portugal: "Portugal",
  Mexico: "México",
  Croatia: "Croácia",
  Belgium: "Bélgica",
  Egypt: "Egito",
  Norway: "Noruega"
};

const teamFlags = {
  Brazil: "🇧🇷",
  Netherlands: "🇳🇱",
  Germany: "🇩🇪",
  Argentina: "🇦🇷",
  Italy: "🇮🇹",
  Senegal: "🇸🇳",
  "South Korea": "🇰🇷",
  England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  France: "🇫🇷",
  Sweden: "🇸🇪",
  Uruguay: "🇺🇾",
  Spain: "🇪🇸",
  "Ivory Coast": "🇨🇮",
  Colombia: "🇨🇴",
  Portugal: "🇵🇹",
  Mexico: "🇲🇽",
  Croatia: "🇭🇷",
  Belgium: "🇧🇪",
  Egypt: "🇪🇬",
  Norway: "🇳🇴"
};

const formationPositions = ['LW', 'ST', 'RW', 'LM', 'CM', 'RM', 'LB', 'CB', 'CB', 'RB', 'GK'];
const searchPositions = ['LW', 'ST', 'RW', 'LM', 'CM', 'RM', 'LB', 'CB', 'RB', 'GK'];
const positionAliases = {
  AM: 'CM',
  CAM: 'CM',
  DM: 'CM'
};

function getPlayerPosition(player = {}, index = 0) {
  if (Array.isArray(player.positions) && player.positions.length) {
    return player.positions.join(' / ');
  }

  if (player.positions) return player.positions;
  if (player.position) return player.position;

  return '—';
}

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

function normalizeSearchPosition(position = '') {
  const normalized = String(position).trim().toUpperCase();
  if (!normalized) return null;
  return positionAliases[normalized] || normalized;
}

function getPlayerPositions(player = {}) {
  const rawPositions = [];

  if (Array.isArray(player.positions) && player.positions.length) {
    rawPositions.push(...player.positions);
  } else if (typeof player.positions === 'string' && player.positions.trim()) {
    rawPositions.push(player.positions);
  } else if (player.position) {
    rawPositions.push(player.position);
  }

  const normalized = rawPositions
    .map((position) => normalizeSearchPosition(position))
    .filter((position) => searchPositions.includes(position));

  return Array.from(new Set(normalized));
}

function getAvailablePositionsForTeam(teamKey) {
  const positions = new Set();

  for (const yearData of Object.values(specialsData)) {
    const teamData = yearData[teamKey];
    if (!teamData) continue;

    for (const player of Object.values(teamData)) {
      for (const position of getPlayerPositions(player)) {
        positions.add(position);
      }
    }
  }

  return Array.from(positions).sort((a, b) => searchPositions.indexOf(a) - searchPositions.indexOf(b));
}

function playerMatchesPosition(player = {}, selectedPosition) {
  if (!selectedPosition || selectedPosition === 'all') {
    return true;
  }

  const normalizedSelected = normalizeSearchPosition(selectedPosition);
  return getPlayerPositions(player).includes(normalizedSelected);
}

module.exports = {
  specialsData,
  teamNamesPT,
  teamFlags,
  formationPositions,
  searchPositions,
  getPlayerPosition,
  getTeamsWithYears,
  getPlayerPositions,
  getAvailablePositionsForTeam,
  playerMatchesPosition
};
