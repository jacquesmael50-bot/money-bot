import { getOrCreateUser, saveUser, formatMoney } from '../utils/helpers.js';
import { isOwner } from '../utils/lang.js';

export const name = 'give';

export async function execute(message, args) {
    if (!isOwner(message)) return message.reply("Owner only!");

    const targetArg = args[0];
    const amountStr = args[1];
    const amount = BigInt(parseInt(amountStr));

    if (targetArg === 'me') {
        const user = await getOrCreateUser(message.author.id, message.author.username);
        user.wallet += amount;
        await saveUser(user);
        return message.reply(`You received ${formatMoney(amount)}!`);
    }

    const mention = message.mentions.users.first();
    if (!mention || !amountStr || amount <= 0n) return message.reply("Invalid usage!");

    const target = await getOrCreateUser(mention.id, mention.username);
    target.wallet += amount;
    await saveUser(target);

    message.reply(`${formatMoney(amount)} given to ${mention.username}!`);
}
