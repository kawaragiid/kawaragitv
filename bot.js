// bot.js
const { Client, GatewayIntentBits } = require('discord.js');
const m3u8url = require('./m3u8url');
const axios = require('axios');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('ready', () => {
    console.log('Bot is ready!');
});

client.on('messageCreate', async message => {
    if (message.content.startsWith('!playlist')) {
        message.channel.send(`Current playlist: ${m3u8url}`);
    } else if (message.content.startsWith('!play')) {
        // Contoh kontrol tayangan
        // Misalnya mengirimkan request ke server untuk mulai memainkan tayangan tertentu
        const response = await axios.get(`http://localhost:3000/play`);
        message.channel.send(`Playing: ${response.data}`);
    }
});

client.login('YOUR_DISCORD_BOT_TOKEN');
