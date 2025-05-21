import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';

// Тестовий масив даних
const testData = [
  { date: '2025-05-01', points: 10 },
  { date: '2025-05-02', points: 20 },
  { date: '2025-05-03', points: 15 },
  { date: '2025-05-04', points: 25 },
  { date: '2025-05-05', points: 30 },
  { date: '2025-05-06', points: 18 },
  { date: '2025-05-07', points: 22 },
];

export default function ActivityChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(testData);
  }, []);

  return (
    <div className="activity-chart-card">
      <h3 className="activity-chart-title">Активність за тиждень</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34a67f" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#34a67f" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tick={{ fill: '#a0aec0' }} axisLine={false} tickFormatter={(d) => d.slice(5)} />
          <YAxis tick={{ fill: '#a0aec0' }} axisLine={false} />
          <Tooltip contentStyle={{ backgroundColor: '#2d3748', border: 'none' }} itemStyle={{ color: '#34a67f' }} />
          <Line type="monotone" dataKey="points" stroke="#34a67f" strokeWidth={3} dot={{ r: 5, fill: '#34a67f' }} activeDot={{ r: 7 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}