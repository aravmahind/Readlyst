import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { Storage } from '@google-cloud/storage';
import { Firestore } from '@google-cloud/firestore';
import { PubSub } from '@google-cloud/pubsub';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.join(__dirname, '../readlyst-svc.json');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
const upload = multer({ storage: multer.memoryStorage() });

const storage = new Storage({
  keyFilename: serviceAccountPath,
  projectId: 'readlyst-26fb0',
});
const bucket = storage.bucket('readlyst-bucket');

const firestore = new Firestore({
  keyFilename: serviceAccountPath,
  projectId: 'readlyst-26fb0',
});

const pubsub = new PubSub({
  keyFilename: serviceAccountPath,
  projectId: 'readlyst-26fb0',
});
const topicName = 'book-uploaded';

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.post('/add-book', upload.single('cover'), (req, res) => {
  try {
    const { title, author, price, description, ownerId, ownerEmail } = req.body;

    if (!req.file) {
      return res.status(400).send({ error: 'Cover image is required' });
    }

    const originalname = req.file.originalname.replace(/\s+/g, '-');
    const blob = bucket.file(`${Date.now()}-${encodeURIComponent(originalname)}`);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: req.file.mimetype,
    });

    blobStream.on('error', (err) => {
      console.error(err);
      res.status(500).send({ error: 'Error uploading cover image' });
    });

    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      const docRef = await firestore.collection('books').add({
        title,
        author,
        price,
        description,
        ownerId,
        ownerEmail,
        imageUrl: publicUrl,
        createdAt: new Date(),
      });

      await pubsub.topic(topicName).publishMessage({
        json: {
          id: docRef.id,
          title,
          author,
          price,
          description,
          ownerId,
          ownerEmail,
          imageUrl: publicUrl,
          createdAt: new Date().toISOString(),
        },
      });

      res.status(200).send({ id: docRef.id, imageUrl: publicUrl });
    });

    blobStream.end(req.file.buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
