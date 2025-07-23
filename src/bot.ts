import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { handleStart } from './commands/start';
import { handleBalance } from './commands/balance';
import { handleReferrals } from './commands/referrals';
dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN!, { polling: true });

bot.onText(/\/start (.+)/, (msg, match) => handleStart(bot, msg, match));
bot.onText(/\/start/, (msg) => handleStart(bot, msg));
bot.onText(/\/balance/, (msg) => handleBalance(bot, msg));
bot.onText(/\/referrals/, (msg) => handleReferrals(bot, msg));

console.log('🤖 Telegram bot is running...');
