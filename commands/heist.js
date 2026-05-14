import { getOrCreateUser, formatMoney } from '../utils/helpers.js';
import { getLang } from '../utils/lang.js';

export const name = 'heist';

export async function execute(message, args) {
    const lang = getLang(message);
    const user = await getOrCreateUser(message.author.id, message.author.username);

    const gain = BigInt(Math.floor(Math.random() * (7000 - 2000 + 1)) + 2000);
    user.wallet += gain;

    message.reply(`Heist success! You earned ${formatMoney(gain)}!`);
}