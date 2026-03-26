const express = require('express');
const line = require('@line/bot-sdk');

const app = express();

// ====== เช็ค ENV ก่อน (กันพัง) ======
if (!process.env.CHANNEL_ACCESS_TOKEN || !process.env.CHANNEL_SECRET) {
  console.log('❌ Missing LINE ENV variables');
}

// ====== CONFIG ======
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || 'test',
  channelSecret: process.env.CHANNEL_SECRET || 'test',
};

const client = new line.Client(config);

// ====== TEST SERVER ======
app.get('/', (req, res) => {
  res.send('LINE BOT RUNNING');
});

// ====== WEBHOOK SAFE MODE (ไม่พังแน่นอน) ======
app.post('/webhook', express.json(), async (req, res) => {
  console.log('📩 Webhook:', JSON.stringify(req.body));

  try {
    const events = req.body.events || [];

    for (const event of events) {
      if (event.type === 'message' && event.message.type === 'text') {
        await client.replyMessage(event.replyToken, {
          type: 'text',
          text: `คุณพิมพ์ว่า: ${event.message.text}`,
        });
      }
    }

    res.status(200).send('OK');
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(200).send('ERROR (but still 200)');
  }
});

// ====== START SERVER ======
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
