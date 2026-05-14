import 'dotenv/config';
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();

const commandsPath = path.join('./commands');
fs.readdirSync(commandsPath).forEach(file => {
    if (file.endsWith('.js')) {
        import(`./commands/${file}`).then(commandModule => {
            // Enregistre la commande principale (name + execute)
            if (commandModule.name && commandModule.execute) {
                client.commands.set(commandModule.name, commandModule);
            }
            // Enregistre aussi toutes les autres fonctions exportées comme commandes
            for (const [key, value] of Object.entries(commandModule)) {
                if (key !== 'name' && key !== 'execute' && typeof value === 'function') {
                    client.commands.set(key, { execute: value });
                }
            }
        });
    }
});

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
