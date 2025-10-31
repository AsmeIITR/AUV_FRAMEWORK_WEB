'use client';

import React from 'react';
import { Wifi, WifiOff, Loader2 } from 'lucide-react';
import { ConnectionStatus } from '@/types';

interface ConnectionCardProps {
  wsUrl: string;
  setWsUrl: (url: string) => void;
  status: ConnectionStatus;
  onConnect: () => void;
  onDisconnect: () => void;
  error: string | null;
}

export const ConnectionCard: React.FC<ConnectionCardProps> = ({
  wsUrl,
  setWsUrl,
  status,
  onConnect,
  onDisconnect,
  error,
}) => {
  const isConnected = status === 'connected';
  const isConnecting = status === 'connecting';

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'bg-green-500/20 text-green-400';
      case 'connecting':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'error':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getStatusIcon = () => {
    if (isConnecting) {
      return <Loader2 className="w-5 h-5 animate-spin" />;
    }
    return isConnected ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />;
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      case 'error':
        return 'Error';
      default:
        return 'Disconnected';
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
      <div className="flex items-center gap-3 mb-4">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${getStatusColor()}`}>
          {getStatusIcon()}
          <span className="font-medium">{getStatusText()}</span>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <input
          type="text"
          value={wsUrl}
          onChange={(e) => setWsUrl(e.target.value)}
          placeholder="WebSocket URL (e.g., ws://localhost:8080)"
          disabled={isConnected || isConnecting}
          className="flex-1 px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          onClick={isConnected ? onDisconnect : onConnect}
          disabled={isConnecting}
          className={`px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            isConnected
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isConnected ? 'Disconnect' : 'Connect'}
        </button>
      </div>
    </div>
  );
};
