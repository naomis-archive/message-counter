import { Interaction } from "discord.js";

import { CommandList } from "../commands/CommandList";
import { errorHandler } from "../utils/errorHandler";

/**
 * Handles the interaction event from Discord.
 *
 * @param {Interaction} interaction The interaction payload from Discord.
 */
export const handleInteraction = async (interaction: Interaction) => {
  try {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    const target = CommandList.find(
      (el) => el.data.name === interaction.commandName
    );

    if (!target) {
      return;
    }

    await target.run(interaction);
  } catch (err) {
    await errorHandler("handleInteraction", err);
  }
};
