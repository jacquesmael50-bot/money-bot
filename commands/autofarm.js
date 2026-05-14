import { getOrCreateUser, saveUser, formatMoney } from '../utils/helpers.js';

export const name = 'autofarm';

const activeFarms = new Set();
const DURATION_MS = 10 * 60 * 1000; // 10 minutes
const TOTAL_GAIN = 300000n;
const INTERVAL_MS = 60 * 1000; // toutes les minutes
const GAIN_PER_TICK = 30000n; // 30 000 par minute x 10 = 300 000

export async function execute(message, args) {
    const userId = message.author.id;

    if (activeFarms.has(userId)) {
        return message.reply("⚙️ Your autofarm is already running!");
    }

    activeFarms.add(userId);
    message.reply(`⚙️ Autofarm started! You will earn **${formatMoney(TOTAL_GAIN)}** in 10 minutes.`);

    let ticks = 0;
    const interval = setInterval(async () => {
        ticks++;
        try {
            const user = await getOrCreateUser(userId, message.author.username);
            user.wallet += GAIN_PER_TICK;
            await saveUser(user);
        } catch (e) {
            console.error('Autofarm error:', e);
        }

        if (ticks >= 10) {
            clearInterval(interval);
            activeFarms.delete(userId);
            message.reply(`✅ Autofarm finished! You earned **${formatMoney(TOTAL_GAIN)}** in total.`);
        }
    }, INTERVAL_MS);
}