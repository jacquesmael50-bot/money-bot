import { getOrCreateUser, saveUser, formatMoney } from '../utils/helpers.js';

export const name = 'roulette';

export async function execute(message, args) {
    const color = args[0]?.toLowerCase();
    const betStr = args[1];
    const user = await getOrCreateUser(message.author.id, message.author.username);

    if (!color || !betStr) return message.reply("Usage: +roulette <red/black> <amount>");
    const bet = BigInt(parseInt(betStr));
    if (bet <= 0n || bet > user.wallet) return message.reply("Invalid bet amount!");

    const outcome = Math.random() < 0.5 ? 'red' : 'black';

    if (color === outcome) {
        user.wallet += bet;
        await saveUser(user);
        message.reply(`You won! The ball landed on ${outcome}. You earned ${formatMoney(bet)}!`);
    } else {
        user.wallet -= bet;
        await saveUser(user);
        message.reply(`You lost! The ball landed on ${outcome}. You lost ${formatMoney(bet)}!`);
    }
}
