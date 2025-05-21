import { useEffect, useState } from "react";
import { API } from "../api/auth";

export default function LocalEcology() {
  const [current, setCurrent] = useState(null);
  const city = "Chernivtsi";

  useEffect(() => {
    const fetchEnv = async () => {
      try {
        const { data } = await API.get(`/api/env/${city}`);
        setCurrent({
          aqi:  data.aqi,
          pm25: data.pm25,
          pm10: data.pm10,
        });
      } catch (err) {
        console.error("Помилка завантаження екоданих:", err);
      }
    };

    fetchEnv();
  }, [city]);

  if (!current) {
    return <div className="local-ecology">Завантаження...</div>;
  }

  return (
    <section className="local-ecology">
      <h3 className="section-title">Локальна екологія — {city}</h3>

      <div className="ecology-cards">
        <div className="card">
          <h4>AQI</h4>
          <p>{current.aqi}</p>
        </div>
        <div className="card">
          <h4>PM2.5</h4>
          <p>{current.pm25} µg/m³</p>
        </div>
        <div className="card">
          <h4>PM10</h4>
          <p>{current.pm10} µg/m³</p>
        </div>
      </div>
    </section>
  );
}
