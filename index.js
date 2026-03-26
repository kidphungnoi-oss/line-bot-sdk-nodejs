const express = require("express");
const line = require("@line/bot-sdk");

const app = express();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
};

app.post("/webhook", line.middleware(config), (req, res) => {
  console.log("Webhook received");
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("LINE BOT RUNNING");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
