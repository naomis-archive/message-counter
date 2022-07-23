import { EmbedBuilder } from "discord.js";

/**
 * Generates an embed explaining to the user how to fix an error.
 *
 * @param {string} id The error ID.
 * @param {string} context Brief description of where the error occurred.
 * @returns {EmbedBuilder} An embed explaining to the user how to fix an error.
 */
export const errorEmbedGenerator = (
  id: string,
  context: string
): EmbedBuilder => {
  const embed = new EmbedBuilder();
  embed.setTitle("Oops! Something went wrong!");
  embed.setDescription(`An error occurred in the ${context}`);
  embed.addFields([
    {
      name: "What happened?",
      value: "Something went wrong with this command.",
    },
    {
      name: "Did I do something wrong?",
      value:
        "Errors can happen for a number of reasons. It could be due to the permissions you gave me, my code, or a number of other possibilities.",
    },
    {
      name: "So what can I do to fix it?",
      value:
        "If you need assitance with this feature, please [join our support server](https://chat.nhcarrigan.com). Once there, give this ErrorId to the support team to assist you.",
    },
    {
      name: "Error ID",
      value: id,
    },
  ]);

  return embed;
};
