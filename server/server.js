import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routers/auth.js";
import envRoutes from "./routers/env.js";
import challengeRoutes from "./routers/challenges.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Вимикаємо ETag, щоб Express не відповідав 304 за умовчанням
app.disable('etag');

// Глобально забороняємо кешування у всіх відповідях
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// 1) CORS — запити лише з фронтенду
app.use(cors({
  origin: "http://localhost:3000",  // фронтенд
  credentials: true,                // щоб з фронту приходили кукі та header "Set-Cookie" міг приходити
}));

// 2) Парсери
app.use(express.json());
app.use(cookieParser());

// 3) Роутери
app.use("/auth", authRoutes);
app.use("/api/env", envRoutes);
app.use("/challenges", challengeRoutes);

// 4) Глобальний error-handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Внутрішня помилка сервера" });
});

app.listen(PORT, () =>
  console.log(`🟢 API server running on http://localhost:${PORT}`)
);