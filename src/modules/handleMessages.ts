import { Message } from "discord.js";

import { OptoutUsers } from "../config/OptoutUsers";
import { errorHandler } from "../utils/errorHandler";

import { countMessages } from "./countMessages";

/**
 * Handles the messageCreate logic.
 *
 * @param {Message} message The Discord Message object.
 */
export const handleMessages = async (message: Message): Promise<void> => {
  try {
    if (message.author.bot || OptoutUsers.includes(message.author.id)) {
      return;
    }
    await countMessages(message);
  } catch (err) {
    await errorHandler("handleMessages", err);
  }
};
