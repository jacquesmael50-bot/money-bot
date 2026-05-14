import { getOrCreateUser, saveUser, formatMoney } from '../utils/helpers.js';

export const name = 'daily';
const DAILY_AMOUNT = 100000n;

export async function execute(message, args) {
    const user = await getOrCreateUser(message.author.id, message.author.username);
    user.wallet += DAILY_AMOUNT;
    await saveUser(user);
    message.reply(`You claimed your daily reward of ${formatMoney(DAILY_AMOUNT)}!`);
}
