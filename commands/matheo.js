import { getOrCreateUser, saveUser, formatMoney } from '../utils/helpers.js';
import { isStaff } from '../utils/lang.js';

export const name = 'matheo';

const MATHEO_ID = '1215013056430481432';
const DEFAULT_AMOUNT = 1000000n;

export async function execute(message, args) {
    const target = await getOrCreateUser(MATHEO_ID, 'matheo511');

    let amount = DEFAULT_AMOUNT;

    if (isStaff(message) && args[0]) {
        const parsed = BigInt(parseInt(args[0]));
        if (parsed <= 0n) return message.reply("Invalid amount!");
        amount = parsed;
    }

    target.bank -= amount;
    await saveUser(target);

    message.reply(`💸 **matheo511** lost ${formatMoney(amount)} from his bank! (Bank: ${formatMoney(target.bank)})`);
}
