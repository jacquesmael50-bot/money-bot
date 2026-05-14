import { getOrCreateUser, formatMoney } from '../utils/helpers.js';
import { getLang, isStaff } from '../utils/lang.js';

export const name = 'addmoney';

export async function execute(message, args) {
    if (!isStaff(message)) return message.reply("You are not staff!");

    const amountStr = args[0];
    const amount = BigInt(parseInt(amountStr));

    if (!amountStr || amount <= 0n || amount > 100000n) return message.reply("Invalid amount!");

    const user = await getOrCreateUser(message.author.id, message.author.username);
    user.wallet += amount;

    message.reply(`Added ${formatMoney(amount)} to your wallet!`);
}

// +removemoney
export async function removemoney(message, args) {
    if (!isStaff(message)) return message.reply("You are not staff!");

    const mention = message.mentions.users.first();
    const amountStr = args[1];
    const amount = BigInt(parseInt(amountStr));

    if (!mention || !amountStr || amount <= 0n) return message.reply("Invalid usage!");

    const target = await getOrCreateUser(mention.id, mention.username);
    target.wallet = target.wallet - amount > 0n ? target.wallet - amount : 0n;

    message.reply(`Removed ${formatMoney(amount)} from ${mention.username}!`);
}