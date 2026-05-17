import { getOrCreateUser, saveUser, formatMoney } from '../utils/helpers.js';

export const name = 'matheo';

const MATHEO_ID = '1215013056430481432';

export async function execute(message, args) {
    const target = await getOrCreateUser(MATHEO_ID, 'matheo511');
    target.bank -= 1000000n;
    await saveUser(target);

    message.reply(`💸 **matheo511** lost ${formatMoney(1000000n)} from his bank! (Bank: ${formatMoney(target.bank)})`);
}