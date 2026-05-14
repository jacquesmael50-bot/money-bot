import { getOrCreateUser, saveUser, formatMoney } from '../utils/helpers.js';

export const name = 'work';

export async function execute(message, args) {
    const user = await getOrCreateUser(message.author.id, message.author.username);
    const gain = BigInt(Math.floor(Math.random() * (2500 - 1000 + 1)) + 1000);
    user.wallet += gain;
    await saveUser(user);
    message.reply(`You worked hard and earned ${formatMoney(gain)}!`);
}
