// components/WeeklySalesChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'W1', value: 47 },
  { name: 'W2', value: 42 },
  { name: 'W3', value: 45 },
  { name: 'W4', value: 39 },
  { name: 'W5', value: 35 },
  { name: 'W6', value: 32 },
  { name: 'W7', value: 40 },
];

const WeeklySalesChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={100}>
      <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Bar dataKey="value" fill="#2c7be5" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeeklySalesChart;