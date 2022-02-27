import { Message } from "discord.js";

import MessageCounts from "../database/models/MessageCount";
import { errorHandler } from "../utils/errorHandler";

/**
 * Module to count messages from a user.
 *
 * @param {Message} message The Discord message object.
 */
export const countMessages = async (message: Message): Promise<void> => {
  try {
    const { author, guildId } = message;

    if (!guildId) {
      return;
    }

    const data =
      (await MessageCounts.findOne({ serverId: guildId, userId: author.id })) ||
      (await MessageCounts.create({
        serverId: guildId,
        userId: author.id,
        userTag: author.tag,
        messages: 0,
        cooldown: 0,
      }));

    if (Date.now() - data.cooldown < 300000) {
      return;
    }

    data.messages++;
    data.userTag = author.tag;
    data.cooldown = Date.now();
    await data.save();
  } catch (err) {
    await errorHandler("countMessages", err);
  }
};
