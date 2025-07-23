import { getUser } from '../storage';

export const handleBalance = async (bot, msg) => {
  const id = msg.from.id.toString();
  const user = await getUser(id);
  bot.sendMessage(msg.chat.id, `💰 Your balance: $${user?.balance ?? 0}`);
};
