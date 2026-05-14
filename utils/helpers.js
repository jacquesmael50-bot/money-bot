import { db } from './db.js';
import { usersTable } from './schema.js';
import { eq } from 'drizzle-orm';

export async function getOrCreateUser(discordId, username) {
    const existing = await db.select().from(usersTable).where(eq(usersTable.discordId, discordId));
    if (existing.length > 0) return existing[0];

    const inserted = await db.insert(usersTable).values({
        discordId,
        username,
        wallet: 0n,
        bank: 0n,
    }).returning();

    return inserted[0];
}

export function formatMoney(amount) {
    return '$' + amount.toLocaleString();
}
