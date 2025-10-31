'use client';

import React, { useState } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { ConnectionCard } from '@/components/ConnectionCard';
import { TelemetryPanel } from '@/components/TelemetryPanel';
import { ParametersPanel } from '@/components/ParametersPanel';
import { WaitingState } from '@/components/WaitingState';
import { Activity, Settings } from 'lucide-react';

export default function Home() {
  const [wsUrl, setWsUrl] = useState('ws://localhost:3000/ws/pixhawk/');
  const { telemetry, parameters, status, connect, disconnect, error } = useWebSocket(wsUrl);

  const hasTelemetry = Object.keys(telemetry).length > 0;
  const hasParameters = Object.keys(parameters).length > 0;
  const hasAnyData = hasTelemetry || hasParameters;
  const isDisconnected = status === 'disconnected';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            AUVF-25
          </h1>
          <p className="text-slate-400">
            Real-time telemetry and parameter monitoring
          </p>
          <div className="mt-4 text-sm text-slate-500 space-y-1">
            <p><strong>Real data:</strong> ws://localhost:3000/ws/pixhawk/</p>
            <p><strong>Test data:</strong> ws://localhost:3000/ws/simulated/</p>
          </div>
        </div>

        <div className="mb-6">
          <ConnectionCard
            wsUrl={wsUrl}
            setWsUrl={setWsUrl}
            status={status}
            onConnect={connect}
            onDisconnect={disconnect}
            error={error}
          />
        </div>

        {!hasAnyData && isDisconnected && <WaitingState />}
        {hasAnyData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-slate-200">Live Telemetry</h2>
                <span className="ml-auto px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                  {hasTelemetry ? '● Live' : '○ Waiting'}
                </span>
              </div>
              
              {hasTelemetry ? (
                <TelemetryPanel telemetry={telemetry} />
              ) : (
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700 text-center">
                  <Activity className="w-16 h-16 mx-auto mb-4 text-slate-600 animate-pulse" />
                  <p className="text-slate-400">Waiting for telemetry data...</p>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-slate-200">Parameters</h2>
                <span className="ml-auto px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                  {hasParameters ? `${Object.keys(parameters).length} params` : 'Waiting'}
                </span>
              </div>
              
              {hasParameters ? (
                <ParametersPanel parameters={parameters} />
              ) : (
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700 text-center">
                  <Settings className="w-16 h-16 mx-auto mb-4 text-slate-600 animate-pulse" />
                  <p className="text-slate-400">Waiting for parameters...</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
