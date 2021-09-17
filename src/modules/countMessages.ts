import { Message } from "discord.js";

import MessageCounts from "../database/models/MessageCount";
import { logHandler } from "../utils/logHandler";

/**
 * Module to count messages from a user.
 *
 * @param {Message} message The Discord message object.
 */
export const countMessages = async (message: Message): Promise<void> => {
  try {
    const { author } = message;

    const data =
      (await MessageCounts.findOne({ userId: author.id })) ||
      (await MessageCounts.create({
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
    logHandler.log("error", "Error in the countMessages module:");
    logHandler.log("error", err);
  }
};
