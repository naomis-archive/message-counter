import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

import { Command } from "../interfaces/Command";
import { errorEmbedGenerator } from "../utils/errorEmbedGenerator";
import { errorHandler } from "../utils/errorHandler";

export const help: Command = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Explains how to use this bot."),
  run: async (interaction) => {
    try {
      await interaction.deferReply();

      const embed = new MessageEmbed();
      embed.setTitle("Hello There!");
      embed.setDescription(
        "I'm Naomi's Message Monitor! I'm here to help you keep track of your server's message count. This can be helpful for recognising active members, or granting additional experience points through a levelling bot, or more!"
      );
      embed.addField(
        "How does it work?",
        "It's quite simple! Simply grant me permission to `Read Message History` and `View Channel` in any channel you want me to count messages for, and I'll start counting!"
      );
      embed.addField(
        "What if I don't want to be counted?",
        "Individual Discord users can opt out by making a request in our [support server](https://chat.nhcarrigan.com) - You can opt out your entire server by kicking me!"
      );
      embed.addField(
        "Where can I get more information?",
        "Check out [my documentation](https://docs.nhcarrigan.com/#/discord-message-monitor/index) for details such as my privacy policy!"
      );

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      const id = await errorHandler("help command", err);
      await interaction.editReply({
        embeds: [errorEmbedGenerator(id, "help command")],
      });
    }
  },
};
