import { useState, useEffect, useCallback, useRef } from 'react';
import { PixhawkConfig, ConnectionStatus, TelemetryData, WebSocketMessage } from '@/types';

interface UseWebSocketReturn {
  telemetry: TelemetryData;
  parameters: PixhawkConfig;
  status: ConnectionStatus;
  connect: () => void;
  disconnect: () => void;
  setParameter: (name: string, value: number) => void;
  error: string | null;
}

export const useWebSocket = (url: string): UseWebSocketReturn => {
  const [telemetry, setTelemetry] = useState<TelemetryData>({});
  const [parameters, setParameters] = useState<PixhawkConfig>({});
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setStatus('disconnected');
  }, []);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      setStatus('connecting');
      setError(null);

      const websocket = new WebSocket(url);

      websocket.onopen = () => {
        console.log('WebSocket Connected');
        setStatus('connected');
        setError(null);
      };

      websocket.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          
          if (message.type === 'telemetry' && message.data) {
            setTelemetry(message.data);
          } else if (message.type === 'parameters' && message.data) {
            setParameters(message.data);
          } else if (message.type === 'error') {
            setError(message.message || 'Unknown error');
          } else if (message.type === 'parameter_set_response') {
            console.log(`Parameter ${message.name} set: ${message.success}`);
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
          setError('Failed to parse received data');
        }
      };

      websocket.onerror = (event) => {
        console.error('WebSocket error:', event);
        setStatus('error');
        setError('WebSocket connection error');
      };

      websocket.onclose = (event) => {
        console.log('WebSocket Disconnected', event.code, event.reason);
        setStatus('disconnected');
        wsRef.current = null;
        
        if (event.code !== 1000) {
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log('Attempting to reconnect...');
            connect();
          }, 3000);
        }
      };

      wsRef.current = websocket;
    } catch (err) {
      console.error('Error connecting to WebSocket:', err);
      setStatus('error');
      setError('Failed to connect to WebSocket');
    }
  }, [url]);

  const setParameter = useCallback((name: string, value: number) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        command: 'set_parameter',
        name,
        value
      }));
    }
  }, []);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    telemetry,
    parameters,
    status,
    connect,
    disconnect,
    setParameter,
    error,
  };
};
