import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

import MessageCounts from "../database/models/MessageCount";
import { Command } from "../interfaces/Command";
import { errorEmbedGenerator } from "../utils/errorEmbedGenerator";
import { errorHandler } from "../utils/errorHandler";

export const display: Command = {
  data: new SlashCommandBuilder()
    .setName("display")
    .setDescription("Displays the top ten members by message count."),
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
        !member.permissions.has("MANAGE_GUILD")
      ) {
        await interaction.editReply(
          "You do not have permission to use this command."
        );
        return;
      }

      const leaders = await MessageCounts.find({ serverId: guild.id })
        .sort({ messageCount: -1 })
        .limit(10);

      if (!leaders.length) {
        await interaction.editReply("I don't have any data for this server.");
        return;
      }

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

      await interaction.editReply({ embeds: [leaderEmbed] });
    } catch (err) {
      const id = await errorHandler("display", err);
      await interaction.editReply({
        embeds: [errorEmbedGenerator(id, "display command")],
      });
    }
  },
};
