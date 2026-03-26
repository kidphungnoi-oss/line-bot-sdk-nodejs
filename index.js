const express = require('express');
const app = express();

app.use(express.json());

// test หน้าเว็บ
app.get('/', (req, res) => {
  res.send('OK');
});

// webhook
app.post('/webhook', (req, res) => {
  console.log('Webhook received');
  res.status(200).send('OK');
});

// run server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server running on port ' + port);
});
