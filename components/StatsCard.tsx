'use client';

import React from 'react';

interface StatItem {
  label: string;
  value: number;
  color: string;
}

interface StatsCardProps {
  stats: StatItem[];
}

export const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all"
        >
          <div className="text-slate-400 text-sm mb-1">{stat.label}</div>
          <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
};
