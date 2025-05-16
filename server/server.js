import "dotenv/config";
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routers/auth.js';


const app = express();
const PORT = process.env.PORT || 4000;

// ДОЗВОЛЯЄМО ВСІ ORIGIN (DEV ONLY!)
app.use(cors());

// or:
// app.use(cors({ origin: 'http://localhost:3000' }));

app.use(bodyParser.json());
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
