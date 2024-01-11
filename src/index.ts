import { Client, WebhookClient } from "discord.js";

import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { handleInteraction } from "./modules/handleInteraction";
import { handleMessages } from "./modules/handleMessages";
import { errorHandler } from "./utils/errorHandler";
import { registerCommands } from "./utils/registerCommands";
import { validateEnv } from "./utils/validateEnv";

(async () => {
  try {
    validateEnv();

    await connectDatabase();

    const bot = new Client({ intents: IntentOptions });
    const hook = new WebhookClient({ url: process.env.DEBUG_HOOK as string });

    bot.on("messageCreate", async (message) => await handleMessages(message));

    bot.on(
      "interactionCreate",
      async (interaction) => await handleInteraction(interaction)
    );

    bot.on("ready", async () => {
      await registerCommands();
      await hook.send({
        content: "Naomi Message Monitor online!",
        username: "Message Counter",
        avatarURL: "https://cdn.nhcarrigan.com/avatars/nhcarrigan.png",
      });
    });

    bot.on("guildCreate", async (guild) => {
      await hook.send({
        content: `Message counter joined guild: ${guild.name} - ${guild.id}`,
        username: "Message Counter",
        avatarURL: "https://cdn.nhcarrigan.com/avatars/nhcarrigan.png",
      });
    });

    bot.on("guildDelete", async (guild) => {
      await hook.send({
        content: `Message counter left guild: ${guild.name} - ${guild.id}`,
        username: "Message Counter",
        avatarURL: "https://cdn.nhcarrigan.com/avatars/nhcarrigan.png",
      });
    });

    await bot.login(process.env.TOKEN);
  } catch (err) {
    await errorHandler("index", err);
  }
})();
