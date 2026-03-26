const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('OK');
});

app.post('/webhook', (req, res) => {
  console.log('WEBHOOK:', req.body);
  res.status(200).send('OK');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server running on port ' + port);
});
