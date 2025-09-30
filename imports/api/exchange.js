import { Meteor } from "meteor/meteor";

const SKD_TO_USD = Meteor.settings.public.skdToUsd || 2000;
const USD_TO_NGN = Meteor.settings.public.usdToNgn || 1500;

Meteor.methods({
  "exchange.usdToNgn"(usd) {
    return usd * USD_TO_NGN;
  },

  "exchange.skdToUsd"(skd) {
    return skd * SKD_TO_USD;
  },
});
