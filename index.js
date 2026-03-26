const express = require('express');
const line = require('@line/bot-sdk');

const app = express();

// 🔐 ใช้ ENV จาก Railway
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

// ====== TEST SERVER ======
app.get('/', (req, res) => {
  res.send('LINE BOT RUNNING');
});

// ====== WEBHOOK (สำคัญมาก) ======
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// ====== BOT LOGIC ======
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const replyText = `คุณพิมพ์ว่า: ${event.message.text}`;

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: replyText,
  });
}

// ====== START SERVER ======
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
