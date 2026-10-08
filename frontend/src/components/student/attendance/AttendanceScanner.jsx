import React from 'react';
import { QRScanner } from './QRScanner';
import { AttendanceHistory } from './AttendanceHistory';

export const AttendanceScanner = ({ onScanSuccess }) => {
  return (
    <div className="space-y-6">
      <QRScanner onScanSuccess={onScanSuccess} />
    </div>
  );
};
