import { getOrCreateUser, saveUser, formatMoney } from '../utils/helpers.js';

export const name = 'weekly';
const WEEKLY_AMOUNT = 500000n;
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 jours

export async function execute(message, args) {
    const user = await getOrCreateUser(message.author.id, message.author.username);

    const now = new Date();
    if (user.lastWeekly) {
        const diff = now - new Date(user.lastWeekly);
        if (diff < COOLDOWN_MS) {
            const remaining = COOLDOWN_MS - diff;
            const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            return message.reply(`⏳ You already claimed your weekly! Come back in **${days}d ${hours}h**.`);
        }
    }

    user.wallet += WEEKLY_AMOUNT;
    user.lastWeekly = now;
    await saveUser(user);

    message.reply(`✅ You claimed your weekly reward of ${formatMoney(WEEKLY_AMOUNT)}!`);
}
