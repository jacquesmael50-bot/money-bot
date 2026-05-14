import { pgTable, varchar, bigint, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: varchar('id', { length: 32 }).primaryKey(),
    username: varchar('username', { length: 100 }).notNull(),
    wallet: bigint('wallet', { mode: 'bigint' }).notNull().default(0n),
    bank: bigint('bank', { mode: 'bigint' }).notNull().default(0n),
    lastDaily: timestamp('last_daily'),
    lastWeekly: timestamp('last_weekly'),
    lastWork: timestamp('last_work'),
    lastCrime: timestamp('last_crime'),
    createdAt: timestamp('created_at').defaultNow(),
});
