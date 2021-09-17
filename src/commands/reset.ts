import { Message } from "discord.js";

import MessageCounts from "../database/models/MessageCount";
import { logHandler } from "../utils/logHandler";

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
    logHandler.log("error", "Error in the reset command");
    logHandler.log("error", err);
  }
};
