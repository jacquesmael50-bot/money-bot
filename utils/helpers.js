import { db } from './db.js';
import { usersTable } from './db.js';

export async function getOrCreateUser(discordId, username) {
    let user = await db.select().from(usersTable).where({ discordId }).get();
    if (!user) {
        user = await db.insert(usersTable).values({ discordId, username, wallet: 0n, bank: 0n }).returning().get();
    }
    return user;
}

export function formatMoney(amount) {
    return amount.toString() + '$';
}