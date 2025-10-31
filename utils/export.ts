import { PixhawkConfig } from '@/types';

export const exportAsJSON = (data: PixhawkConfig): void => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `pixhawk-config-${new Date().toISOString()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportAsCSV = (data: PixhawkConfig): void => {
  const headers = 'Parameter,Value\n';
  const rows = Object.entries(data)
    .map(([key, value]) => `${key},${value}`)
    .join('\n');
  
  const csv = headers + rows;
  const csvBlob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(csvBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `pixhawk-config-${new Date().toISOString()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
