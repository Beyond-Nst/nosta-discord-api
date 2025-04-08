const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/register', async (req, res) => {
  const { name, email, message } = req.body;
  const webhook = process.env.DISCORD_WEBHOOK;

  const payload = {
    content: `📩 **Nouveau message reçu**
**Nom :** ${name}
**Email :** ${email}
**Message :** ${message}`
  };

  try {
    await axios.post(webhook, payload);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Erreur Webhook:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Nosta Studio API - OK');
});

app.listen(PORT, () => {
  console.log(`Serveur en ligne sur le port ${PORT}`);
});