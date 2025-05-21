import { Router } from "express";
import axios         from "axios";

const router = Router();
const IQAIR_KEY = process.env.IQAIR_KEY;

// GET /api/env/:city  — ми ігноруємо :city, завжди беремо nearest_city
router.get("/:city", async (req, res, next) => {
  try {
    // Якщо вам потрібно саме за назвою:
    // const city = req.params.city;
    // але краще — nearest_city:
    const response = await axios.get("https://api.airvisual.com/v2/nearest_city", {
      params: { key: IQAIR_KEY }
    });

    const pollution = response.data.data.current.pollution;
    res.json({
      aqi:   pollution.aqius,
      pm25:  pollution.pm25,
      pm10:  pollution.pm10,
      ts:    Date.now(),
    });
  } catch (err) {
    // Логування детальної помилки
    console.error("❌ Екодані (server error):", err.response?.data || err.message);
    res.status(500).json({ message: "Не вдалося отримати екологічні дані" });
  }
});

export default router;
