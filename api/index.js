import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import admin from 'firebase-admin'
// import serviceAccount from '../api/talkfusion-356a7-ec96d5b17903.json'

// const serviceAccount = require('../api/talkfusion-356a7-ec96d5b17903.json');
// const serviceAccount = await import('../api/talkfusion-356a7-ec96d5b17903.json', {
//   assert: { type: 'json' }
// });


// const SEARCH_API_URL = 'https://api.bing.microsoft.com/v7.0/search';

import translate from 'google-translate-api-x';
import cors from 'cors'

dotenv.config();

mongoose.connect(process.env.DB_URL).then(() => {
    console.log('DB Connected Successfully...');
}).catch((err) => {
    console.log(err);
})


const app = express();

app.use(cors());

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://talkfusion-356a7.firebaseio.com"
})


app.use(express.json());


app.post('/translate', async (req, res) => {
    const { text, targetLanguage } = req.body;
  
    try {
      const result = await translate(text, { to: targetLanguage });
      const translatedText = result.text;
      res.json({ translatedText });
    } catch (error) {
      console.error('Error translating text:', error);
      res.status(500).json({ error: 'Failed to translate text' });
    }
  });




  const db = admin.firestore();

  app.get('/messages', async (req, res) => {
    try {
      const snapshot = await db.collection('messages').orderBy('createdAt').get();
      const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.json(messages);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

app.listen(5000, () => {
    console.log("port 5000 running...");
})
