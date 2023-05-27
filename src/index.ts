import { Client, WebhookClient } from "discord.js";

import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { handleInteraction } from "./modules/handleInteraction";
import { handleMessages } from "./modules/handleMessages";
import { errorHandler } from "./utils/errorHandler";
import { validateEnv } from "./utils/validateEnv";
import { registerCommands } from "./utils/registerCommands";

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
      await hook.send("Naomi Message Monitor online!");
    });

    bot.on("guildCreate", async (guild) => {
      await hook.send(
        `Message counter joined guild: ${guild.name} - ${guild.id}`
      );
    });

    bot.on("guildDelete", async (guild) => {
      await hook.send(
        `Message counter left guild: ${guild.name} - ${guild.id}`
      );
    });

    await bot.login(process.env.TOKEN);
  } catch (err) {
    await errorHandler("index", err);
  }
})();
