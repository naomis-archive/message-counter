import { logHandler } from "./logHandler";

/**
 * Module to validate the expected environment variables are set.
 * Terminates the process with a non-zero exit code on missing values.
 */
export const validateEnv = (): void => {
  if (!process.env.TOKEN) {
    logHandler.log("error", "Missing Discord bot token.");
    process.exit(1);
  }
  if (!process.env.MONGO_URI) {
    logHandler.log("error", "Missing Database Connection String");
    process.exit(1);
  }
  logHandler.log("debug", "Environment variables valid!");
};
