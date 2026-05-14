import { getOrCreateUser, formatMoney } from '../utils/helpers.js';
import { getLang, isOwner } from '../utils/lang.js';

export const name = 'rob';

export async function execute(message, args) {
    const lang = getLang(message);
    const mention = message.mentions.users.first();

    if (!mention) return message.reply('You must mention a user to rob!');
    if (isOwner(message) && mention.id === message.author.id) return message.reply("You cannot rob the owner!");

    const target = await getOrCreateUser(mention.id, mention.username);
    const user = await getOrCreateUser(message.author.id, message.author.username);

    if (target.wallet <= 0n) return message.reply(`${mention.username} has no money in wallet!`);

    const gain = BigInt(Math.floor(Math.random() * (10000 - 2000 + 1)) + 2000);
    const stolen = gain > target.wallet ? target.wallet : gain;

    target.wallet -= stolen;
    user.wallet += stolen;

    message.reply(`You robbed ${stolen}$ from ${mention.username}!`);
}