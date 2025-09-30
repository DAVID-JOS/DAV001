import { Meteor } from "meteor/meteor";
import fs from "fs";

const DATA_FILE = "data.json";

// Helper to read wallets from file
function readWallets() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const raw = fs.readFileSync(DATA_FILE);
  return JSON.parse(raw).wallets || [];
}

// Helper to write wallets to file
function writeWallets(wallets) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ wallets }, null, 2));
}

Meteor.methods({
  "wallets.all"() {
    return readWallets();
  },

  "wallets.insert"(address, balance = 0) {
    const wallets = readWallets();
    if (wallets.find((w) => w.address === address)) {
      throw new Meteor.Error("wallet-exists", "Wallet already exists");
    }
    wallets.push({ address, balance });
    writeWallets(wallets);
    return true;
  },

  "wallets.updateBalance"(address, amount) {
    const wallets = readWallets();
    const wallet = wallets.find((w) => w.address === address);
    if (!wallet) throw new Meteor.Error("wallet-not-found", "Wallet not found");
    wallet.balance += amount;
    writeWallets(wallets);
    return wallet;
  },
});
