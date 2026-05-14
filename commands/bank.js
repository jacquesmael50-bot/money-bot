import { getOrCreateUser, saveUser, formatMoney } from '../utils/helpers.js';

export const name = 'bank';

export async function execute(message, args) {
    const user = await getOrCreateUser(message.author.id, message.author.username);
    message.reply(`Bank: ${formatMoney(user.bank)} (wallet: ${formatMoney(user.wallet)})`);
}

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
    await saveUser(user);

    message.reply(`Deposited ${formatMoney(amount)} to bank!`);
}
