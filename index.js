const express = require('express');
const line = require('@line/bot-sdk');

const app = express();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

app.get('/', (req, res) => {
  res.status(200).send('LINE BOT RUNNING');
});

app.post('/webhook', line.middleware(config), async (req, res) => {
  try {
    if (!req.body || !req.body.events) {
      return res.status(200).json([]);
    }

    const results = await Promise.all(req.body.events.map(handleEvent));
    return res.status(200).json(results);
  } catch (err) {
    console.error(err);
    return res.status(200).send('OK');
  }
});

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return null;
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: `คุณพิมพ์ว่า: ${event.message.text}`
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on ${PORT}`);
});
