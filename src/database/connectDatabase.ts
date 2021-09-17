import { connect } from "mongoose";

import { logHandler } from "../utils/logHandler";

/**
 * Module to instantiate the database connection.
 */
export const connectDatabase = async (): Promise<void> => {
  try {
    await connect(process.env.MONGO_URI as string);
    logHandler.log("debug", "database connected");
  } catch (err) {
    logHandler.log("error", "There was an error in the database connection.");
    logHandler.log("error", err);
  }
};
