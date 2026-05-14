import { getOrCreateUser, formatMoney } from '../utils/helpers.js';
import { getLang } from '../utils/lang.js';

export const name = 'bank';

export async function execute(message, args) {
    const lang = getLang(message);
    const user = await getOrCreateUser(message.author.id, message.author.username);

    message.reply(`Bank: ${formatMoney(user.bank)} (wallet: ${formatMoney(user.wallet)})`);
}

// +dep and +dep all
export async function dep(message, args) {
    const user = await getOrCreateUser(message.author.id, message.author.username);
    const amountStr = args[0];

    if (!amountStr) return message.reply("Usage: +dep <number> or +dep all");

    let amount;
    if (amountStr.toLowerCase() === 'all') {
        amount = user.wallet;
    } else {
        amount = BigInt(parseInt(amountStr));
    }

    if (amount <= 0n || user.wallet < amount) return message.reply("Invalid amount!");

    user.wallet -= amount;
    user.bank += amount;

    message.reply(`Deposited ${formatMoney(amount)} to bank!`);
}