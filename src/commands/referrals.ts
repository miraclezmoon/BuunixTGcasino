import { countReferrals } from '../storage';

export const handleReferrals = async (bot, msg) => {
  const id = msg.from.id.toString();
  const count = await countReferrals(id);
  bot.sendMessage(msg.chat.id, `👥 You have referred ${count} users.`);
};
