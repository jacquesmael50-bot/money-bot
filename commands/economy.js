import { getOrCreateUser, formatMoney } from '../utils/helpers.js';
import { getLang } from '../utils/lang.js';

export const name = 'bal';

export async function execute(message, args) {
    const lang = getLang(message);
    const user = await getOrCreateUser(message.author.id, message.author.username);
    message.reply(`Wallet: ${formatMoney(user.wallet)}\nBank: ${formatMoney(user.bank)}`);
}