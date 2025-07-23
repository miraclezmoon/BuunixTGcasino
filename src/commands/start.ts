import { getUser, createUser, rewardReferrer } from '../storage';

export const handleStart = async (bot, msg, match?) => {
  const id = msg.from.id.toString();
  const ref = match?.[1];
  const user = await getUser(id);

  if (!user) {
    await createUser(id, ref);
    if (ref) await rewardReferrer(ref);
  }

  bot.sendMessage(msg.chat.id, `🎰 Welcome to the Casino!\nCheck your balance with /balance.`);
};
