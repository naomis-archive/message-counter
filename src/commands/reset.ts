import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

import MessageCounts from "../database/models/MessageCount";
import { Command } from "../interfaces/Command";
import { errorEmbedGenerator } from "../utils/errorEmbedGenerator";
import { errorHandler } from "../utils/errorHandler";

export const reset: Command = {
  data: new SlashCommandBuilder()
    .setName("reset")
    .setDescription("Reset the message counts for your server."),
  run: async (interaction) => {
    try {
      await interaction.deferReply();
      const { guild, member } = interaction;
      if (!guild || !member) {
        await interaction.editReply(
          "Cannot locate the guild/member objects. Please try again later."
        );
        return;
      }
      if (
        typeof member.permissions === "string" ||
        !member.permissions.has(PermissionFlagsBits.ManageGuild)
      ) {
        await interaction.editReply(
          "You do not have permission to use this command."
        );
        return;
      }

      await MessageCounts.deleteMany({ serverId: guild.id });

      await interaction.editReply("Message counts have been reset.");
    } catch (err) {
      const id = await errorHandler("reset command", err);
      await interaction.editReply({
        embeds: [errorEmbedGenerator(id, "reset command")],
      });
    }
  },
};
