import { Message, MessageEmbed } from "discord.js";

import MessageCounts from "../database/models/MessageCount";
import { logHandler } from "../utils/logHandler";

/**
 * Displays the top ten members by message count.
 *
 * @param {Message} message The message object.
 */
export const display = async (message: Message): Promise<void> => {
  try {
    const leaders = await MessageCounts.find()
      .sort({ messageCount: -1 })
      .limit(10);

    const leaderEmbed = new MessageEmbed();
    leaderEmbed.setTitle("Top 10 Message Counts");
    leaderEmbed.setDescription(
      "These are the members who have been most active in the server!"
    );

    leaders.forEach((leader, index) => {
      leaderEmbed.addField(
        `${index + 1}. ${leader.userTag}`,
        `${leader.messages} messages`
      );
    });

    await message.channel.send({ embeds: [leaderEmbed] });
  } catch (err) {
    logHandler.log("error", "Error in the display command:");
    logHandler.log("error", err);
  }
};
