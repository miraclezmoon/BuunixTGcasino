import { db } from './db';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';

export const getUser = async (id) => db.select().from(users).where(eq(users.id, id)).get();

export const createUser = async (id, referredBy) => db.insert(users).values({ id, referredBy }).run();

export const rewardReferrer = async (refId) =>
  db.update(users).set({ balance: db.raw(`balance + 100`) }).where(eq(users.id, refId)).run();

export const countReferrals = async (refId) => {
  const result = await db.select({ count: db.raw('count(*)') }).from(users).where(eq(users.referredBy, refId)).get();
  return result?.count || 0;
};
