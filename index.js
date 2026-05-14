import 'dotenv/config';
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Collection pour toutes les commandes
client.commands = new Collection();

// Charger les commandes depuis /commands
const commandsPath = path.join('./commands');
fs.readdirSync(commandsPath).forEach(file => {
    if (file.endsWith('.js')) {
        import(`./commands/${file}`).then(commandModule => {
            const commandName = commandModule.name;
            client.commands.set(commandName, commandModule);
        });
    }
});

// Listener messages
client.on('messageCreate', async (message) => {
    if (!message.content.startsWith('+') || message.author.bot) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
        await command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('❌ There was an error executing that command.');
    }
});

client.login(process.env.TOKEN);