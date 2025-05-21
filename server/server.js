import "dotenv/config";
import envRoutes from "./routers/env.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routers/auth.js";
import { authMiddleware } from './middlewares/auth.js';

const app = express();
const PORT = process.env.PORT || 4000;

// CORS
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true,
}));

// Парсери
app.use(express.json());
app.use(cookieParser());

// Роутери
app.use("/auth", authRoutes);
app.use("/api/env", envRoutes);

// Захищений приклад приватного роута
app.get('/protected', authMiddleware, (req, res) => {
  // доступна req.user
  res.json({ message: `Hello ${req.user.name}`, user: req.user });
});

// Глобальний handler помилок
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Внутрішня помилка сервера" });
});

app.listen(PORT, () =>
  console.log(`🟢 API server running on http://localhost:${PORT}`)
);