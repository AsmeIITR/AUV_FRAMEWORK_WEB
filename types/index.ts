export interface PixhawkConfig {
  [key: string]: number;
}

export interface CategoryMap {
  [category: string]: string[];
}

export interface FilteredParam {
  key: string;
  value: number;
}

export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting' | 'error';

export interface Attitude {
  roll: number;
  pitch: number;
  yaw: number;
  rollspeed: number;
  pitchspeed: number;
  yawspeed: number;
  timestamp?: number;
}

export interface GPS {
  fix_type: number;
  latitude: number;
  longitude: number;
  altitude: number;
  eph: number;
  epv: number;
  velocity: number;
  cog: number;
  satellites_visible: number;
}

export interface Battery {
  voltage?: number;
  voltage_battery?: number;
  current_battery: number;
  battery_remaining: number;
  temperature?: number;
  voltages?: number[];
}

export interface VfrHud {
  airspeed: number;
  groundspeed: number;
  heading: number;
  throttle: number;
  alt: number;
  climb: number;
}

export interface GlobalPosition {
  latitude: number;
  longitude: number;
  altitude_msl: number;
  altitude_rel: number;
  vx: number;
  vy: number;
  vz: number;
  heading: number;
}

export interface Altitude {
  altitude_monotonic: number;
  altitude_amsl: number;
  altitude_relative: number;
  bottom_clearance: number;
}

export interface RcChannels {
  chan1_raw: number;
  chan2_raw: number;
  chan3_raw: number;
  chan4_raw: number;
  rssi: number;
}

export interface TelemetryData {
  attitude?: Attitude;
  gps?: GPS;
  battery?: Battery;
  vfr_hud?: VfrHud;
  global_position?: GlobalPosition;
  altitude?: Altitude;
  rc_channels?: RcChannels;
  sys_status?: any;
  heartbeat?: any;
}

export interface WebSocketMessage {
  type: 'telemetry' | 'parameters' | 'error' | 'parameter_set_response';
  data?: any;
  message?: string;
  success?: boolean;
  name?: string;
}
