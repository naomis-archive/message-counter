import { Client } from "discord.js";

import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { handleMessages } from "./modules/handleMessages";
import { logHandler } from "./utils/logHandler";
import { validateEnv } from "./utils/validateEnv";

(async () => {
  validateEnv();

  await connectDatabase();

  const bot = new Client({ intents: IntentOptions });

  bot.on("messageCreate", async (message) => await handleMessages(message));

  bot.on("ready", () => {
    logHandler.log("debug", "Discord ready!");
  });

  await bot.login(process.env.TOKEN);
})();
