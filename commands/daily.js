import { getOrCreateUser, saveUser, formatMoney } from '../utils/helpers.js';

export const name = 'daily';
const DAILY_AMOUNT = 100000n;
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 heures

export async function execute(message, args) {
    const user = await getOrCreateUser(message.author.id, message.author.username);

    const now = new Date();
    if (user.lastDaily) {
        const diff = now - new Date(user.lastDaily);
        if (diff < COOLDOWN_MS) {
            const remaining = COOLDOWN_MS - diff;
            const hours = Math.floor(remaining / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            return message.reply(`⏳ You already claimed your daily! Come back in **${hours}h ${minutes}m**.`);
        }
    }

    user.wallet += DAILY_AMOUNT;
    user.lastDaily = now;
    await saveUser(user);

    message.reply(`✅ You claimed your daily reward of ${formatMoney(DAILY_AMOUNT)}!`);
}
