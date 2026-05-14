import { getOrCreateUser, saveUser, formatMoney } from '../utils/helpers.js';

export const name = 'weekly';
const WEEKLY_AMOUNT = 500000n;

export async function execute(message, args) {
    const user = await getOrCreateUser(message.author.id, message.author.username);
    user.wallet += WEEKLY_AMOUNT;
    await saveUser(user);
    message.reply(`You claimed your weekly reward of ${formatMoney(WEEKLY_AMOUNT)}!`);
}
