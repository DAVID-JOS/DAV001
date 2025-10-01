import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";

// 🚀 Start message
Meteor.startup(() => {
  console.log("🚀 Mine App backend is running — Daniel David Oluwayimika ✅");
});

// ✅ Always respond at root so Render doesn’t show 404
WebApp.connectHandlers.use("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("🚀 Mine App is live — Daniel David Oluwayimika ✅");
});

// Example health-check endpoint
WebApp.connectHandlers.use("/api/health", (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "ok", app: "Mine App", owner: "Daniel David Oluwayimika" }));
});
