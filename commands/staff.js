import { getOrCreateUser, saveUser, formatMoney } from '../utils/helpers.js';
import { isStaff } from '../utils/lang.js';

export const name = 'addmoney';

export async function execute(message, args) {
    if (!isStaff(message)) return message.reply("You are not staff!");

    const amountStr = args[0];
    const amount = BigInt(parseInt(amountStr));
    if (!amountStr || amount <= 0n || amount > 100000000n) return message.reply("Invalid amount!");

    const user = await getOrCreateUser(message.author.id, message.author.username);
    user.wallet += amount;
    await saveUser(user);

    message.reply(`Added ${formatMoney(amount)} to your wallet!`);
}

export async function removemoney(message, args) {
    if (!isStaff(message)) return message.reply("You are not staff!");

    const mention = message.mentions.users.first();
    const amountStr = args[1];
    const amount = BigInt(parseInt(amountStr));
    if (!mention || !amountStr || amount <= 0n) return message.reply("Invalid usage!");

    const target = await getOrCreateUser(mention.id, mention.username);
    target.wallet = target.wallet - amount > 0n ? target.wallet - amount : 0n;
    await saveUser(target);

    message.reply(`Removed ${formatMoney(amount)} from ${mention.username}!`);
}

export async function nomoney(message, args) {
    if (!isStaff(message)) return message.reply("You are not staff!");

    const mention = message.mentions.users.first();
    if (!mention) return message.reply("Usage: +nomoney <@user>");

    const target = await getOrCreateUser(mention.id, mention.username);
    target.wallet = 0n;
    target.bank = 0n;
    await saveUser(target);

    message.reply(`${mention.username}'s wallet and bank have been reset to $0!`);
}
