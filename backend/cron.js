import cronJob from './cron.js'; 

import { CronJob } from "cron";
import http from "node:http";
import https from "node:https";

// every 14 minutes send a GET request to the health endpoint
const job = new CronJob("*/14 * * * *", function () {
  const base = process.env.FRONTEND_URL || process.env.CLIENT_URL || "http://localhost:5000";
  if (!base) return;
  
  const url = new URL("/health", base).href;
  const client = url.startsWith("https:") ? https : http;

  client
    .get(url, (res) => {
      if (res.statusCode === 200) console.log("✅ Health check ping sent at", new Date().toLocaleTimeString());
      else console.log("❌ Health check failed", res.statusCode);
    })
    .on("error", (e) => console.error("❌ Ping error:", e.message));
});

export default job;
