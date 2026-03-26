const express = require('express');
const line = require('@line/bot-sdk');

const app = express();

// ❗ ใส่อันนี้ก่อน
app.use(express.json());

// ===== LINE CONFIG =====
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

// ===== ROOT (ไม่ผ่าน middleware) =====
app.get('/', (req, res) => {
  res.status(200).send('LINE BOT RUNNING');
});

// ===== WEBHOOK (แยก middleware) =====
app.post('/webhook',
  line.middleware(config),
  async (req, res) => {
    try {
      const results = await Promise.all(
        (req.body.events || []).map(handleEvent)
      );
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(200).end();
    }
  }
);

// ===== HANDLE EVENT =====
async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return null;
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: `คุณพิมพ์ว่า: ${event.message.text}`
  });
}

// ===== START SERVER =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on ${PORT}`);
});
