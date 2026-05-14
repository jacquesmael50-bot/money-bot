import { getOrCreateUser, formatMoney } from '../utils/helpers.js';
import { getLang } from '../utils/lang.js';

export const name = 'work';

export async function execute(message, args) {
    const lang = getLang(message);
    const user = await getOrCreateUser(message.author.id, message.author.username);

    // Gain aléatoire entre 1000 et 2500
    const gain = BigInt(Math.floor(Math.random() * (2500 - 1000 + 1)) + 1000);

    user.wallet += gain;

    message.reply(`You worked hard and earned ${formatMoney(gain)}!`);
}