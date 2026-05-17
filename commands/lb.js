import { db } from '../utils/db.js';
import { usersTable } from '../utils/schema.js';
import { desc } from 'drizzle-orm';

export const name = 'lb';

export async function execute(message, args) {
    const top = await db.select().from(usersTable).orderBy(desc(usersTable.bank)).limit(10);

    if (top.length === 0) return message.reply("No players yet!");

    const medals = ['🥇', '🥈', '🥉'];
    const lines = top.map((user, i) => {
        const medal = medals[i] || `**#${i + 1}**`;
        return `${medal} **${user.username}** — ${formatBank(user.bank)}`;
    });

    message.reply(`💰 **Leaderboard (Bank)**\n\n${lines.join('\n')}`);
}

function formatBank(amount) {
    return '$' + Number(amount).toLocaleString();
}
