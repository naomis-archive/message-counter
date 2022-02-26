import { MessageEmbed } from "discord.js";

/**
 * Generates an embed explaining to the user how to fix an error.
 *
 * @param {string} id The error ID.
 * @param {string} context Brief description of where the error occurred.
 * @returns {MessageEmbed} An embed explaining to the user how to fix an error.
 */
export const errorEmbedGenerator = (
  id: string,
  context: string
): MessageEmbed => {
  const embed = new MessageEmbed();
  embed.setTitle("Oops! Something went wrong!");
  embed.setDescription(`An error occurred in the ${context}`);
  embed.addField("What happened?", "Something went wrong with this command.");
  embed.addField(
    "Did I do something wrong?",
    "Errors can happen for a number of reasons. It could be due to the permissions you gave me, my code, or a number of other possibilities."
  );
  embed.addField(
    "So what can I do to fix it?",
    "If you need assitance with this feature, please [join our support server](https://chat.nhcarrigan.com). Once there, give this ErrorId to the support team to assist you."
  );
  embed.addField("Error ID", id);
  return embed;
};
