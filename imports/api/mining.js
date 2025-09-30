import { Meteor } from "meteor/meteor";
import "./wallets.js";
import fs from "fs";

const DATA_FILE = "data.json";
const MINING_RATE = 200; // SKD per second

function readWallets() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const raw = fs.readFileSync(DATA_FILE);
  return JSON.parse(raw).wallets || [];
}

function writeWallets(wallets) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ wallets }, null, 2));
}

// Mining loop
Meteor.startup(() => {
  Meteor.setInterval(() => {
    const wallets = readWallets();
    wallets.forEach((wallet) => {
      wallet.balance += MINING_RATE;
    });
    writeWallets(wallets);
  }, 1000);
});
