import { getStore } from "@netlify/blobs";

export default async (req, context) => {
    const TOPIC_ID = "4751465";
    const ROBLOX_TOPIC_URL = `https://devforum.roblox.com/t/${TOPIC_ID}.json`; 
    
    // Obtém as credenciais e o modo de teste das variáveis de ambiente / .env
    const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
    const TARGET_USER_IDS = process.env.TARGET_USER_IDS ? process.env.TARGET_USER_IDS.split(",") : [];
    const FORCE_TEST_RUN = process.env.FORCE_TEST_RUN === "true";

    if (!BOT_TOKEN || TARGET_USER_IDS.length === 0) {
        console.error("Variáveis de ambiente ou IDs de usuário não configurados.");
        return new Response("Configuração incompleta", { status: 500 });
    }

    try {
        // Inicializa o Netlify Blobs para lembrar o último post verificado entre as execuções
        const store = getStore("forum-monitor");
        let lastCheckedPostNumber = await store.get("lastCheckedPostNumber");
        lastCheckedPostNumber = lastCheckedPostNumber ? parseInt(lastCheckedPostNumber) : 0;

        // 1. Busca os dados do DevForum
        const topicResponse = await fetch(ROBLOX_TOPIC_URL, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        });
        
        if (!topicResponse.ok) throw new Error(`Erro ao acessar Roblox: ${topicResponse.status}`);
        
        const topicData = await topicResponse.json();
        const topicTitle = topicData.title;
        const highestPostNumber = topicData.highest_post_number;
        const stream = topicData.post_stream.stream;
        const latestPostId = stream[stream.length - 1];

        // Verifica se há um post novo comparado ao salvo no Blobs
        const isNewPost = lastCheckedPostNumber === 0 || highestPostNumber > lastCheckedPostNumber;

        // Se o Modo de Teste estiver ligado OU se houver um post novo real
        if (FORCE_TEST_RUN || isNewPost) {
            
            // 2. Busca o conteúdo detalhado do último post
            const postResponse = await fetch(`https://devforum.roblox.com/posts/${latestPostId}.json`, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
            });
            
            if (!postResponse.ok) throw new Error(`Erro ao buscar post: ${postResponse.status}`);
            
            const post = await postResponse.json();
            const cleanContent = post.cooked ? post.cooked.replace(/<[^>]*>?/gm, '').substring(0, 3900) : "";
            
            // 3. Dispara a DM para os usuários configurados
            for (const userId of TARGET_USER_IDS) {
                await sendDiscordDM(userId.trim(), BOT_TOKEN, topicTitle, TOPIC_ID, post, cleanContent, FORCE_TEST_RUN);
            }

            // Atualiza o registro salvo no Netlify Blobs
            await store.set("lastCheckedPostNumber", highestPostNumber.toString());
            
            const modeMessage = FORCE_TEST_RUN ? "[MODO TESTE ATIVO] Último post enviado" : `Novo post detectado (#${highestPostNumber})`;
            return new Response(modeMessage, { status: 200 });

        } else {
            return new Response(`Nenhum post novo. Último registrado: #${lastCheckedPostNumber}`, { status: 200 });
        }

    } catch (error) {
        console.error(`Erro na execução: ${error.message}`);
        return new Response(`Erro: ${error.message}`, { status: 500 });
    }
};

// Função auxiliar para enviar a mensagem privada (DM)
async function sendDiscordDM(userId, botToken, topicTitle, topicId, post, content, isTest) {
    try {
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

        const messageHeader = isTest 
            ? `🔔 **[TESTE DE SISTEMA] Último post atual do DevForum:**` 
            : `🔔 **Novo post no DevForum do Roblox!**`;

        await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
            method: "POST",
            headers: {
                "Authorization": `Bot ${botToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: messageHeader,
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

// Configuração do agendamento (Roda automaticamente a cada 5 minutos no Netlify)
export const config = {
    schedule: "*/5 * * * *"
};