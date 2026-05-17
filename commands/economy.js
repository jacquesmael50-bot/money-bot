import { getOrCreateUser, formatMoney } from '../utils/helpers.js';
import { isStaff } from '../utils/lang.js';

export const name = 'bal';

export async function execute(message, args) {
    const mention = message.mentions.users.first();

    if (mention) {
        if (!isStaff(message)) return message.reply("You are not staff!");
        const target = await getOrCreateUser(mention.id, mention.username);
        return message.reply(`💰 **${mention.username}**\nWallet: ${formatMoney(target.wallet)}\nBank: ${formatMoney(target.bank)}`);
    }

    const user = await getOrCreateUser(message.author.id, message.author.username);
    message.reply(`💰 **${message.author.username}**\nWallet: ${formatMoney(user.wallet)}\nBank: ${formatMoney(user.bank)}`);
}
