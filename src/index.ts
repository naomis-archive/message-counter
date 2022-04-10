import { Client, WebhookClient } from "discord.js";

import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { handleInteraction } from "./modules/handleInteraction";
import { handleMessages } from "./modules/handleMessages";
import { startServer } from "./server/server";
import { errorHandler } from "./utils/errorHandler";
import { validateEnv } from "./utils/validateEnv";

(async () => {
  try {
    validateEnv();

    await connectDatabase();

    await startServer();

    const bot = new Client({ intents: IntentOptions });
    const hook = new WebhookClient({ url: process.env.DEBUG_HOOK as string });

    bot.on("messageCreate", async (message) => await handleMessages(message));

    bot.on(
      "interactionCreate",
      async (interaction) => await handleInteraction(interaction)
    );

    bot.on("ready", async () => {
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
