// Netlify Scheduled Function para monitorar o DevForum e enviar DMs no Discord
export default async (req, context) => {
    const TOPIC_ID = "4751465";
    const ROBLOX_TOPIC_URL = `https://devforum.roblox.com/t/${TOPIC_ID}.json`; 
    
    // Token do bot inserido diretamente
    const BOT_TOKEN = "MTQxODU2MTc1ODM2NDQzNDQ1Mg.GpD1o9.XrPNz8s_wuxZ8A6neTGzBern95VYD-KQqwE7xc";
    
    // Substitua pelos IDs de usuário reais do Discord (seu ID e o do seu amigo)
    const TARGET_USER_IDS = [
        "566300801476329472", // Atlas
        "633830918326452245"  // Marreco
    ];

    if (TARGET_USER_IDS.includes("SEU_USER_ID_AQUI")) {
        console.error("Por favor, substitua os IDs de exemplo pelos IDs reais dos usuários.");
        return new Response("IDs de usuário não configurados", { status: 500 });
    }

    try {
        // 1. Busca os dados do DevForum (lendo o ID de todos os posts para pegar o mais recente)
        const topicResponse = await fetch(ROBLOX_TOPIC_URL, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });
        
        if (!topicResponse.ok) throw new Error(`Erro ao acessar Roblox: ${topicResponse.status}`);
        
        const topicData = await topicResponse.json();
        const topicTitle = topicData.title;
        const highestPostNumber = topicData.highest_post_number;
        const stream = topicData.post_stream.stream;
        const latestPostId = stream[stream.length - 1];

        // 2. Busca o conteúdo detalhado do último post
        const postResponse = await fetch(`https://devforum.roblox.com/posts/${latestPostId}.json`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });
        
        if (!postResponse.ok) throw new Error(`Erro ao buscar post: ${postResponse.status}`);
        
        const post = await postResponse.json();
        const cleanContent = post.cooked ? post.cooked.replace(/<[^>]*>?/gm, '').substring(0, 3900) : "";
        
        // 3. Envia a DM para cada usuário cadastrado na lista via API REST do Discord
        for (const userId of TARGET_USER_IDS) {
            await sendDiscordDM(userId.trim(), BOT_TOKEN, topicTitle, TOPIC_ID, post, cleanContent);
        }

        return new Response(`Verificação concluída. Post atual: #${highestPostNumber}`, { status: 200 });

    } catch (error) {
        console.error(`Erro na execução: ${error.message}`);
        return new Response(`Erro: ${error.message}`, { status: 500 });
    }
};

// Função auxiliar para abrir o canal de DM e enviar a mensagem formatada
async function sendDiscordDM(userId, botToken, topicTitle, topicId, post, content) {
    try {
        // Passo A: Abre um canal de DM com o usuário
        const dmChannelRes = await fetch("https://discord.com/api/v10/users/@me/channels", {
            method: "POST",
            headers: {
                "Authorization": `Bot ${botToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ recipient_id: userId })
        });

        if (!dmChannelRes.ok) return;
        const channelData = await dmChannelRes.json();
        const channelId = channelData.id;

        // Passo B: Envia a mensagem com Embed para a DM do usuário
        await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
            method: "POST",
            headers: {
                "Authorization": `Bot ${botToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: `🔔 **Novo post no DevForum do Roblox!**`,
                embeds: [{
                    title: topicTitle,
                    url: `https://devforum.roblox.com/t/${topicId}/${post.post_number}`,
                    description: content,
                    color: 16711680,
                    timestamp: new Date(post.created_at).toISOString(),
                    author: {
                        name: post.username,
                        url: `https://devforum.roblox.com/u/${post.username}`
                    }
                }]
            })
        });
    } catch (e) {
        console.error(`Falha ao enviar DM para o usuário ${userId}: ${e.message}`);
    }
}

// Configuração para o Netlify rodar essa função automaticamente a cada 5 minutos
export const config = {
    schedule: "*/5 * * * *"
};
