import { getOrCreateUser, saveUser, formatMoney } from '../utils/helpers.js';

export const name = 'heist';

export async function execute(message, args) {
    const user = await getOrCreateUser(message.author.id, message.author.username);
    const gain = BigInt(Math.floor(Math.random() * (7000 - 2000 + 1)) + 2000);
    user.wallet += gain;
    await saveUser(user);
    message.reply(`Heist success! You earned ${formatMoney(gain)}!`);
}
