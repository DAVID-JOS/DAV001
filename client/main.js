import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";
import "./main.html";
import "./main.css";

import { ReactiveVar } from "meteor/reactive-var";
const walletsState = new ReactiveVar([]);

Template.body.onCreated(function () {
  Meteor.call("wallets.all", (err, res) => {
    if (!err) walletsState.set(res);
  });

  setInterval(() => {
    Meteor.call("wallets.all", (err, res) => {
      if (!err) walletsState.set(res);
    });
  }, 2000);
});

Template.body.helpers({
  wallets() {
    return walletsState.get();
  },
});

Template.body.events({
  // Add wallet
  "click #addWallet"() {
    const address = document.getElementById("walletAddress").value;
    if (!address) return alert("Enter wallet address!");
    Meteor.call("wallets.insert", address, 0, (err) => {
      if (err) alert("❌ " + err.message);
      else alert("✅ Wallet added");
    });
  },

  // Convert USD → NGN
  "click #convertToNaira"() {
    const usd = parseFloat(document.getElementById("usdAmount").value);
    if (!usd) return alert("Enter USD amount!");
    Meteor.call("exchange.usdToNgn", usd, (err, res) => {
      if (!err) {
        document.getElementById("exchangeResult").innerText =
          `💱 ${usd} USD = ₦${res}`;
      } else {
        alert("❌ " + err.message);
      }
    });
  },

  // Auto Transfer: Wallet SKD → USD → NGN → Moniepoint
  "click #transferBtn"() {
    const acct = document.getElementById("acctNum").value;
    const bank = document.getElementById("bankCode").value;

    if (!acct || !bank) return alert("Fill in account + bank code!");

    const wallets = walletsState.get();
    if (!wallets.length) return alert("No wallets found!");

    const wallet = wallets[0]; // take first wallet
    if (wallet.balance <= 0) return alert("Wallet empty!");

    const SKD_TO_USD = Meteor.settings.public.skdToUsd || 2000;
    const USD_TO_NGN = Meteor.settings.public.usdToNgn || 1500;

    const usdValue = wallet.balance * SKD_TO_USD;
    const nairaValue = usdValue * USD_TO_NGN;

    Meteor.call(
      "transfer.toMoniepoint",
      acct,
      bank,
      nairaValue,
      (err, res) => {
        if (err) {
          document.getElementById("transferResult").innerText =
            "❌ Transfer failed: " + err.message;
        } else {
          document.getElementById("transferResult").innerText =
            `✅ Sent ₦${nairaValue} from ${wallet.address}`;
          
          // Reset wallet after cash-out
          Meteor.call("wallets.updateBalance", wallet.address, -wallet.balance);
        }
      }
    );
  },
});
