import { db } from '../utils/db.js';
import { usersTable } from '../utils/schema.js';
import { desc } from 'drizzle-orm';

export const name = 'lb';

export async function execute(message, args) {
    const top = await db.select().from(usersTable).orderBy(desc(usersTable.wallet)).limit(10);

    if (top.length === 0) return message.reply("No players yet!");

    const medals = ['🥇', '🥈', '🥉'];
    const lines = top.map((user, i) => {
        const medal = medals[i] || `**#${i + 1}**`;
        const total = user.wallet + user.bank;
        return `${medal} **${user.username}** — $${Number(total).toLocaleString()}`;
    });

    message.reply(`💰 **Leaderboard**\n\n${lines.join('\n')}`);
}