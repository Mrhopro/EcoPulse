import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import { API } from "../api/auth";

export default function MonthlyChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // TODO: замінити на реальний ендпоінт /activities/monthly
    const fakeMonthly = Array.from({ length: 30 }, (_, i) => ({
      day: `${i + 1}`,
      points: Math.floor(Math.random() * 20) + 5
    }));
    setData(fakeMonthly);
  }, []);

  return (
    <div className="chart-card">
      <h4 className="chart-card__title">Активність за місяць</h4>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255, 0)" />
          <XAxis dataKey="day" tick={{ fill: "#a0aec0" }} axisLine={false} />
          <YAxis tick={{ fill: "#a0aec0" }} axisLine={false} />
          <Tooltip contentStyle={{ backgroundColor: "#2d3748", border: "none" }}
                   itemStyle={{ color: "#34a67f" }} />
          <Line type="monotone" dataKey="points" stroke="#34a67f" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
