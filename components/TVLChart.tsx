'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HistoricalDataPoint } from '@/types/pendle';
import { format } from 'date-fns';
import { formatLargeNumber } from '@/lib/utils/formatters';

interface TVLChartProps {
  data: HistoricalDataPoint[];
  title?: string;
}

export default function TVLChart({ data, title = 'TVL 历史趋势' }: TVLChartProps) {
  const chartData = data.map(point => ({
    date: format(new Date(point.timestamp), 'MM/dd'),
    tvl: point.value,
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorTvl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
          />
          <YAxis
            tick={{ fontSize: 12 }}
            stroke="#9ca3af"
            tickFormatter={(value) => formatLargeNumber(value, 0)}
            label={{ value: 'TVL', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '8px',
            }}
            formatter={(value: any) => [formatLargeNumber(value), 'TVL']}
          />
          <Area
            type="monotone"
            dataKey="tvl"
            stroke="#10b981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorTvl)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
