'use client';

import React from 'react';
import { FilteredParam } from '@/types';
import { formatValue } from '@/utils/categorize';

interface DataTableProps {
  data: FilteredParam[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden">
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-slate-900/90 backdrop-blur-sm z-10">
            <tr className="border-b border-slate-700">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                Parameter
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {data.length > 0 ? (
              data.map(({ key, value }) => (
                <tr
                  key={key}
                  className="hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <code className="text-blue-400 font-mono text-sm">
                      {key}
                    </code>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-cyan-400 font-mono text-sm">
                      {formatValue(value)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={2}
                  className="px-6 py-12 text-center text-slate-400"
                >
                  No parameters found matching your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
