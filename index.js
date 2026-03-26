const express = require('express');
const app = express();

app.use(express.json());

// ✅ หน้า test
app.get('/', (req, res) => {
  res.send('OK');
});

// ✅ webhook (แบบไม่ใช้ LINE SDK ก่อน)
app.post('/webhook', (req, res) => {
  console.log(req.body);
  res.status(200).send('OK');
});

// ✅ start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server running on port ' + port);
});
