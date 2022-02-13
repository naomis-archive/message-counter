import { Message } from "discord.js";

import MessageCounts from "../database/models/MessageCount";
import { errorHandler } from "../utils/errorHandler";

/**
 * Module to reset the message counts.
 *
 * @param {Message} message The Discord Message object.
 */
export const reset = async (message: Message): Promise<void> => {
  try {
    await MessageCounts.deleteMany();

    await message.channel.send("Message counts have been reset.");
  } catch (err) {
    await errorHandler("reset command", err);
  }
};
