import { Client, WebhookClient } from "discord.js";

import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { handleMessages } from "./modules/handleMessages";
import { errorHandler } from "./utils/errorHandler";
import { validateEnv } from "./utils/validateEnv";

(async () => {
  try {
    validateEnv();

    await connectDatabase();

    const bot = new Client({ intents: IntentOptions });

    bot.on("messageCreate", async (message) => await handleMessages(message));

    bot.on("ready", async () => {
      const hook = new WebhookClient({ url: process.env.DEBUG_HOOK as string });
      await hook.send("Monokuma Message Monitor online!");
    });

    await bot.login(process.env.TOKEN);
  } catch (err) {
    await errorHandler("index", err);
  }
})();
