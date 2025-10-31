'use client';

import React, { useState, useMemo } from 'react';
import { PixhawkConfig } from '@/types';
import { Search, Filter, Settings } from 'lucide-react';
import { categorizeParams, getActiveCategories, formatValue } from '@/utils/categorize';

interface ParametersPanelProps {
  parameters: PixhawkConfig;
}

export const ParametersPanel: React.FC<ParametersPanelProps> = ({ parameters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categoryMap = useMemo(() => categorizeParams(parameters), [parameters]);
  const activeCategories = useMemo(() => getActiveCategories(categoryMap), [categoryMap]);

  const filteredParams = useMemo(() => {
    let keys = selectedCategory === 'All' 
      ? Object.keys(parameters)
      : categoryMap[selectedCategory] || [];

    if (searchTerm) {
      keys = keys.filter(key =>
        key.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return keys.map(key => ({ key, value: parameters[key] }));
  }, [parameters, searchTerm, selectedCategory, categoryMap]);

  const paramCount = Object.keys(parameters).length;

  return (
    <div className="space-y-4">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <Settings className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-slate-200">Parameters</h3>
          <span className="ml-auto text-sm text-slate-400">
            {filteredParams.length} / {paramCount}
          </span>
        </div>

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search parameters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer text-sm"
          >
            <option value="All">All Categories</option>
            {activeCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto">
          {filteredParams.length > 0 ? (
            <div className="divide-y divide-slate-700">
              {filteredParams.map(({ key, value }) => (
                <div
                  key={key}
                  className="px-4 py-3 hover:bg-slate-700/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <code className="text-sm text-blue-400 font-mono">
                      {key}
                    </code>
                    <span className="text-sm text-cyan-400 font-mono">
                      {formatValue(value)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-12 text-center text-slate-400">
              {paramCount === 0 ? 'Waiting for parameters...' : 'No parameters found'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
