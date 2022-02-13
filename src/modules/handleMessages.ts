import { Message } from "discord.js";

import { display } from "../commands/display";
import { reset } from "../commands/reset";
import { AuthorisedManagers } from "../config/AuthorisedManagers";
import { errorHandler } from "../utils/errorHandler";

import { countMessages } from "./countMessages";

/**
 * Handles the messageCreate logic.
 *
 * @param {Message} message The Discord Message object.
 */
export const handleMessages = async (message: Message): Promise<void> => {
  try {
    if (message.author.bot) {
      return;
    }

    if (message.content.startsWith("==")) {
      if (!AuthorisedManagers.includes(message.author.id)) {
        return;
      }

      if (message.content.startsWith("==display")) {
        await display(message);
        return;
      }

      if (message.content.startsWith("==reset")) {
        await reset(message);
      }
      return;
    }

    await countMessages(message);
  } catch (err) {
    await errorHandler("handleMessages", err);
  }
};
