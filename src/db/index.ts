
import { drizzle } from 'drizzle-orm/sqlite3';
import sqlite3 from 'sqlite3';
import * as schema from './schema';

const sqlite = new sqlite3.Database('data.db');
export const db = drizzle(sqlite, { schema });
