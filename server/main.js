import { Meteor } from "meteor/meteor";
import "../imports/api/wallets.js";
import "../imports/api/mining.js";
import "../imports/api/exchange.js";
import "../imports/api/transfer_api.js";

Meteor.startup(() => {
  console.log("🚀 Mine App backend started");
});
