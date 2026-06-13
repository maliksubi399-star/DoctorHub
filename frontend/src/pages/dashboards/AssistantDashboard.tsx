import { useState } from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { useDarkMode } from '../../context/DarkModeContext';

const AssistantDashboard = () => {
  const { isDark } = useDarkMode();

  return (
    <div 
      className="container mx-auto px-4 py-8 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: isDark ? '#0f172a' : '#f8fafc' }}
    >
      <div className="mb-8">
        <h1 
          className="text-3xl font-bold"
          style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
        >
          Assistant Dashboard
        </h1>
        <p 
          className="mt-2"
          style={{ color: isDark ? '#cbd5e1' : '#475569' }}
        >
          Verify payments and confirm appointments.
        </p>
      </div>

      <div 
        className="overflow-hidden rounded-xl border mb-8 transition-colors"
        style={{
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          borderColor: isDark ? '#334155' : '#e2e8f0'
        }}
      >
        <div 
          className="border-b px-6 py-4 flex justify-between items-center"
          style={{ borderColor: isDark ? '#334155' : '#e2e8f0' }}
        >
          <h2 
            className="text-lg font-semibold flex items-center gap-2"
            style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
          >
            <Clock className="h-5 w-5 text-amber-500" />
            Pending Payment Verifications
          </h2>
        </div>
        <div className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr 
                style={{
                  backgroundColor: isDark ? '#0f172a' : '#f9fafb',
                  borderBottom: isDark ? '1px solid #334155' : '1px solid #e5e7eb'
                }}
              >
                <th 
                  className="px-6 py-3 text-sm font-medium"
                  style={{ color: isDark ? '#94a3b8' : '#6b7280' }}
                >
                  Appointment ID
                </th>
                <th 
                  className="px-6 py-3 text-sm font-medium"
                  style={{ color: isDark ? '#94a3b8' : '#6b7280' }}
                >
                  Patient
                </th>
                <th 
                  className="px-6 py-3 text-sm font-medium"
                  style={{ color: isDark ? '#94a3b8' : '#6b7280' }}
                >
                  Screenshot
                </th>
                <th 
                  className="px-6 py-3 text-sm font-medium text-right"
                  style={{ color: isDark ? '#94a3b8' : '#6b7280' }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td 
                  colSpan={4} 
                  className="px-6 py-12 text-center"
                  style={{ color: isDark ? '#94a3b8' : '#6b7280' }}
                >
                  No pending payments to verify.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssistantDashboard;
