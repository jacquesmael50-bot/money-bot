import { getOrCreateUser, saveUser, formatMoney } from '../utils/helpers.js';

export const name = 'with';

export async function execute(message, args) {
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