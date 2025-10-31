'use client';

import React from 'react';
import { TelemetryData } from '@/types';
import { Gauge, Navigation, Battery, Zap, Radio, Satellite } from 'lucide-react';

interface TelemetryPanelProps {
  telemetry: TelemetryData;
}

export const TelemetryPanel: React.FC<TelemetryPanelProps> = ({ telemetry }) => {
  const toDegrees = (rad: number) => (rad * 180 / Math.PI).toFixed(1);
  
  return (
    <div className="space-y-4">
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <Gauge className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-slate-200">Attitude</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="text-xs text-slate-400 mb-1">Roll</div>
            <div className="text-2xl font-bold text-cyan-400">
              {telemetry.attitude ? toDegrees(telemetry.attitude.roll) : '--'}°
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {telemetry.attitude ? `${telemetry.attitude.rollspeed.toFixed(2)} rad/s` : '--'}
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="text-xs text-slate-400 mb-1">Pitch</div>
            <div className="text-2xl font-bold text-green-400">
              {telemetry.attitude ? toDegrees(telemetry.attitude.pitch) : '--'}°
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {telemetry.attitude ? `${telemetry.attitude.pitchspeed.toFixed(2)} rad/s` : '--'}
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="text-xs text-slate-400 mb-1">Yaw</div>
            <div className="text-2xl font-bold text-purple-400">
              {telemetry.attitude ? toDegrees(telemetry.attitude.yaw) : '--'}°
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {telemetry.attitude ? `${telemetry.attitude.yawspeed.toFixed(2)} rad/s` : '--'}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <Satellite className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-slate-200">GPS</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="text-xs text-slate-400 mb-1">Latitude</div>
            <div className="text-lg font-mono text-cyan-400">
              {telemetry.gps?.latitude.toFixed(6) || '--'}
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="text-xs text-slate-400 mb-1">Longitude</div>
            <div className="text-lg font-mono text-cyan-400">
              {telemetry.gps?.longitude.toFixed(6) || '--'}
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="text-xs text-slate-400 mb-1">Altitude</div>
            <div className="text-lg font-bold text-green-400">
              {telemetry.gps?.altitude.toFixed(1) || '--'} m
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="text-xs text-slate-400 mb-1">Satellites</div>
            <div className="text-lg font-bold text-yellow-400">
              {telemetry.gps?.satellites_visible || '--'}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <Battery className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-slate-200">Battery</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="text-xs text-slate-400 mb-1">Voltage</div>
            <div className="text-xl font-bold text-yellow-400">
              {(telemetry.battery?.voltage || telemetry.battery?.voltage_battery || 0).toFixed(2)} V
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="text-xs text-slate-400 mb-1">Current</div>
            <div className="text-xl font-bold text-orange-400">
              {telemetry.battery?.current_battery.toFixed(2) || '--'} A
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="text-xs text-slate-400 mb-1">Remaining</div>
            <div className={`text-xl font-bold ${
              (telemetry.battery?.battery_remaining || 0) > 50 ? 'text-green-400' :
              (telemetry.battery?.battery_remaining || 0) > 20 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {telemetry.battery?.battery_remaining.toFixed(0) || '--'}%
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <Navigation className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-slate-200">Flight Data</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="text-xs text-slate-400 mb-1">Ground Speed</div>
            <div className="text-xl font-bold text-cyan-400">
              {telemetry.vfr_hud?.groundspeed.toFixed(1) || '--'} m/s
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="text-xs text-slate-400 mb-1">Heading</div>
            <div className="text-xl font-bold text-purple-400">
              {telemetry.vfr_hud?.heading.toFixed(0) || '--'}°
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="text-xs text-slate-400 mb-1">Throttle</div>
            <div className="text-xl font-bold text-green-400">
              {telemetry.vfr_hud?.throttle.toFixed(0) || '--'}%
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3">
            <div className="text-xs text-slate-400 mb-1">Climb Rate</div>
            <div className={`text-xl font-bold ${
              (telemetry.vfr_hud?.climb || 0) > 0 ? 'text-green-400' : 
              (telemetry.vfr_hud?.climb || 0) < 0 ? 'text-red-400' : 'text-slate-400'
            }`}>
              {telemetry.vfr_hud?.climb.toFixed(1) || '--'} m/s
            </div>
          </div>
        </div>
      </div>

      {telemetry.rc_channels && (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <Radio className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-slate-200">RC Input</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">Roll (Ch1)</div>
              <div className="text-lg font-mono text-cyan-400">
                {telemetry.rc_channels.chan1_raw}
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">Pitch (Ch2)</div>
              <div className="text-lg font-mono text-cyan-400">
                {telemetry.rc_channels.chan2_raw}
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">Throttle (Ch3)</div>
              <div className="text-lg font-mono text-green-400">
                {telemetry.rc_channels.chan3_raw}
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-xs text-slate-400 mb-1">Signal (RSSI)</div>
              <div className={`text-lg font-bold ${
                telemetry.rc_channels.rssi > 70 ? 'text-green-400' :
                telemetry.rc_channels.rssi > 40 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {telemetry.rc_channels.rssi}%
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
