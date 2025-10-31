import { PixhawkConfig, CategoryMap } from '@/types';

export const categorizeParams = (data: PixhawkConfig): CategoryMap => {
  const categories: CategoryMap = {
    'Serial': [],
    'Compass': [],
    'GPS': [],
    'IMU/INS': [],
    'Battery': [],
    'Motor': [],
    'Servo': [],
    'Button': [],
    'RC': [],
    'EKF': [],
    'Attitude': [],
    'Position': [],
    'Failsafe': [],
    'Logging': [],
    'Barometer': [],
    'Camera': [],
    'Relay': [],
    'Fence': [],
    'Temperature': [],
    'System': [],
    'Other': []
  };

  Object.keys(data).forEach(key => {
    if (key.startsWith('SERIAL')) {
      categories['Serial'].push(key);
    } else if (key.startsWith('COMPASS')) {
      categories['Compass'].push(key);
    } else if (key.startsWith('GPS')) {
      categories['GPS'].push(key);
    } else if (key.startsWith('INS')) {
      categories['IMU/INS'].push(key);
    } else if (key.startsWith('BATT')) {
      categories['Battery'].push(key);
    } else if (key.startsWith('MOT')) {
      categories['Motor'].push(key);
    } else if (key.startsWith('SERVO')) {
      categories['Servo'].push(key);
    } else if (key.startsWith('BTN')) {
      categories['Button'].push(key);
    } else if (key.startsWith('RC')) {
      categories['RC'].push(key);
    } else if (key.startsWith('EK')) {
      categories['EKF'].push(key);
    } else if (key.startsWith('ATC') || key.startsWith('ACRO')) {
      categories['Attitude'].push(key);
    } else if (key.startsWith('PSC') || key.startsWith('WPNAV') || key.startsWith('LOIT') || key.startsWith('CIRCLE')) {
      categories['Position'].push(key);
    } else if (key.startsWith('FS_')) {
      categories['Failsafe'].push(key);
    } else if (key.startsWith('LOG')) {
      categories['Logging'].push(key);
    } else if (key.startsWith('BARO')) {
      categories['Barometer'].push(key);
    } else if (key.startsWith('CAM')) {
      categories['Camera'].push(key);
    } else if (key.startsWith('RELAY')) {
      categories['Relay'].push(key);
    } else if (key.startsWith('FENCE')) {
      categories['Fence'].push(key);
    } else if (key.startsWith('TEMP')) {
      categories['Temperature'].push(key);
    } else if (key.startsWith('SYSID') || key.startsWith('STAT') || key.startsWith('FRAME') || key.startsWith('AHRS')) {
      categories['System'].push(key);
    } else {
      categories['Other'].push(key);
    }
  });

  return categories;
};

export const getActiveCategories = (categoryMap: CategoryMap): string[] => {
  return Object.keys(categoryMap).filter(cat => categoryMap[cat].length > 0);
};

export const formatValue = (value: number): string => {
  if (typeof value === 'number' && !Number.isInteger(value)) {
    return value.toFixed(6);
  }
  return String(value);
};
