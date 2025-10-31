'use client';

import React from 'react';
import { RefreshCw } from 'lucide-react';

export const WaitingState: React.FC = () => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700 text-center">
      <RefreshCw className="w-16 h-16 mx-auto mb-4 text-slate-600 animate-spin" />
      <h3 className="text-xl font-semibold text-slate-400 mb-2">
        Waiting for connection...
      </h3>
      <p className="text-slate-500">
        Connect to a Server to receive live data
      </p>
    </div>
  );
};
