import { readFile } from "fs/promises";
import http from "http";
import https from "https";

import express from "express";

import { logHandler } from "../utils/logHandler";

/**
 * Module to start a basic webserver for uptime monitoring.
 */
export const startServer = async () => {
  const app = express();

  app.use("/", (req, res) => {
    res.send("Hi");
  });

  const httpServer = http.createServer(app);

  httpServer.listen(1080, () => {
    logHandler.log("http", "http server listening on port 80");
  });

  if (process.env.NODE_ENV === "production") {
    const privateKey = await readFile(
      "/etc/letsencrypt/live/message-counter.nhcarrigan.com/privkey.pem",
      "utf8"
    );
    const certificate = await readFile(
      "/etc/letsencrypt/live/message-counter.nhcarrigan.com/cert.pem",
      "utf8"
    );
    const ca = await readFile(
      "/etc/letsencrypt/live/message-counter.nhcarrigan.com/chain.pem",
      "utf8"
    );

    const credentials = {
      key: privateKey,
      cert: certificate,
      ca: ca,
    };

    const httpsServer = https.createServer(credentials, app);

    httpsServer.listen(1443, () => {
      logHandler.log("http", "https server listening on port 1443");
    });
  }
};
