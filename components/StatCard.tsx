import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  description?: string;
}

export default function StatCard({ title, value, icon: Icon, trend, description }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
          {trend && (
            <p className={`text-sm mt-2 flex items-center ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-1">{trend.isPositive ? '↑' : '↓'}</span>
              {trend.value}
            </p>
          )}
        </div>
        <div className="ml-4">
          <div className="bg-blue-100 rounded-full p-3">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
