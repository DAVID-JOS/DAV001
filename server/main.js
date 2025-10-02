// server/main.js
import { Meteor } from "meteor/meteor";
import dotenv from "dotenv";

// Load .env file
dotenv.config();

// Import APIs
import "../imports/api/wallets.js";
import "../imports/api/mining.js";
import "../imports/api/exchange.js";
import "../imports/api/transfer_api.js";

Meteor.startup(() => {
  console.log("🚀 Mine App backend started");
  console.log("⚡ .env loaded:");
  console.log("APP_NAME:", process.env.APP_NAME);
  console.log("MONIEPOINT_BASE_URL:", process.env.MONIEPOINT_BASE_URL);
});
