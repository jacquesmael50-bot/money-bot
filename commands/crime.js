import { getOrCreateUser, saveUser, formatMoney } from '../utils/helpers.js';

export const name = 'crime';

export async function execute(message, args) {
    const user = await getOrCreateUser(message.author.id, message.author.username);
    const gain = BigInt(Math.floor(Math.random() * (17000 - 5000 + 1)) + 5000);
    user.wallet += gain;
    await saveUser(user);
    message.reply(`Crime success! You earned ${formatMoney(gain)}!`);
}
