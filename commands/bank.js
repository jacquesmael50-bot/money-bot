import { getOrCreateUser, saveUser, formatMoney } from '../utils/helpers.js';

export const name = 'bank';

export async function execute(message, args) {
    const user = await getOrCreateUser(message.author.id, message.author.username);
    message.reply(`Bank: ${formatMoney(user.bank)} (wallet: ${formatMoney(user.wallet)})`);
}

export async function dep(message, args) {
    const user = await getOrCreateUser(message.author.id, message.author.username);
    const amountStr = args[0];
    if (!amountStr) return message.reply("Usage: +dep <amount|all>");

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

    message.reply(`✅ Deposited ${formatMoney(amount)} to bank!`);
}

export async function with_(message, args) {
    const user = await getOrCreateUser(message.author.id, message.author.username);
    const amountStr = args[0];
    if (!amountStr) return message.reply("Usage: +with <amount|all>");

    let amount;
    if (amountStr.toLowerCase() === 'all') {
        amount = user.bank;
    } else {
        amount = BigInt(parseInt(amountStr));
    }

    if (amount <= 0n || user.bank < amount) return message.reply("Invalid amount or not enough in bank!");

    user.bank -= amount;
    user.wallet += amount;
    await saveUser(user);

    message.reply(`✅ Withdrew ${formatMoney(amount)} to wallet!`);
}
