import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  balance: integer('balance').default(1000),
  referredBy: text('referred_by'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(Date.now()),
});
