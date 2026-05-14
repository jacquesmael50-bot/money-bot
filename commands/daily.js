import { getOrCreateUser, formatMoney } from '../utils/helpers.js';
import { getLang } from '../utils/lang.js';

export const name = 'daily';
const DAILY_AMOUNT = 100000n;

export async function execute(message, args) {
    const lang = getLang(message);
    const user = await getOrCreateUser(message.author.id, message.author.username);

    // Pour simplifier ici, pas de cooldown implémenté pour l’exemple
    user.wallet += DAILY_AMOUNT;

    message.reply(`You claimed your daily reward of ${formatMoney(DAILY_AMOUNT)}!`);
}