// server/routers/env.js
import { Router } from "express";
import axios from "axios";

const router = Router();
const IQAIR_KEY = process.env.IQAIR_KEY;

// GET /api/env/:city  — використовуємо nearest_city, щоб не залежати від назви
router.get("/:city", async (req, res, next) => {
  try {
    const resp = await axios.get("https://api.airvisual.com/v2/nearest_city", {
      params: { key: IQAIR_KEY }
    });

    // витягаємо дані
    const pollution = resp.data.data.current.pollution;
    res.json({
      aqi:  pollution.aqius,
      pm25: pollution.pm25 || "none",
      pm10: pollution.pm10 || "none",
      ts:   Date.now(),
    });
  } catch (err) {
    console.error("❌ Екодані (server error):", err.response?.data || err.message);
    res.status(500).json({ message: "Не вдалося отримати екологічні дані" });
  }
});

export default router;
