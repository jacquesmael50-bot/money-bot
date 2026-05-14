import { getOrCreateUser, formatMoney } from '../utils/helpers.js';
import { getLang } from '../utils/lang.js';

export const name = 'transfer';

export async function execute(message, args) {
    const lang = getLang(message);
    const mention = message.mentions.users.first();
    const amountStr = args[1];

    if (!mention || !amountStr) return message.reply('Usage: +transfer <user> <amount>');

    const amount = BigInt(parseInt(amountStr));
    if (amount <= 0n) return message.reply('Invalid amount!');

    const sender = await getOrCreateUser(message.author.id, message.author.username);
    const recipient = await getOrCreateUser(mention.id, mention.username);

    if (sender.wallet < amount) return message.reply("You don't have enough money in wallet!");

    sender.wallet -= amount;
    recipient.wallet += amount;

    message.reply(`You transferred ${formatMoney(amount)} to ${mention.username}!`);
}