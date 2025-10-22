'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { HistoricalDataPoint } from '@/types/pendle';
import { format } from 'date-fns';

interface APYChartProps {
  data: HistoricalDataPoint[];
  title?: string;
}

export default function APYChart({ data, title = 'APY 历史趋势' }: APYChartProps) {
  const chartData = data.map(point => ({
    date: format(new Date(point.timestamp), 'MM/dd'),
    apy: point.value.toFixed(2),
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
          />
          <YAxis
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
            label={{ value: 'APY (%)', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px',
            }}
            formatter={(value: any) => [`${value}%`, 'APY']}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="apy"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="APY"
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
