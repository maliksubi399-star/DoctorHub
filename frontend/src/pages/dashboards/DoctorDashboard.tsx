import { useState } from 'react';
import { Users, FileText, PlusCircle } from 'lucide-react';
import { useDarkMode } from '../../context/DarkModeContext';

const DoctorDashboard = () => {
  const { isDark } = useDarkMode();

  return (
    <div 
      className="container mx-auto px-4 py-8 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: isDark ? '#0f172a' : '#f8fafc' }}
    >
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 
            className="text-3xl font-bold"
            style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
          >
            Doctor Dashboard
          </h1>
          <p 
            className="mt-2"
            style={{ color: isDark ? '#cbd5e1' : '#475569' }}
          >
            Manage your schedule, clinics, and write prescriptions.
          </p>
        </div>
        <button 
          className="px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
          style={{
            backgroundColor: '#38bdf8',
            color: '#0f172a'
          }}
        >
          <PlusCircle className="h-4 w-4" /> Add Clinic
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div 
          className="p-6 rounded-xl border border-l-4 transition-colors"
          style={{
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderColor: isDark ? '#334155' : '#e2e8f0',
            borderLeftColor: '#38bdf8'
          }}
        >
          <div className="flex items-center gap-4">
            <div 
              className="p-3 rounded-full"
              style={{
                backgroundColor: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                color: '#38bdf8'
              }}
            >
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p 
                className="text-sm font-medium"
                style={{ color: isDark ? '#94a3b8' : '#6b7280' }}
              >
                Today's Patients
              </p>
              <h3 
                className="text-2xl font-bold"
                style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
              >
                0
              </h3>
            </div>
          </div>
        </div>
        <div 
          className="p-6 rounded-xl border border-l-4 transition-colors"
          style={{
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderColor: isDark ? '#334155' : '#e2e8f0',
            borderLeftColor: '#f59e0b'
          }}
        >
          <div className="flex items-center gap-4">
            <div 
              className="p-3 rounded-full"
              style={{
                backgroundColor: isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                color: '#f59e0b'
              }}
            >
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p 
                className="text-sm font-medium"
                style={{ color: isDark ? '#94a3b8' : '#6b7280' }}
              >
                Pending Prescriptions
              </p>
              <h3 
                className="text-2xl font-bold"
                style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
              >
                0
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div 
        className="overflow-hidden rounded-xl border transition-colors"
        style={{
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          borderColor: isDark ? '#334155' : '#e2e8f0'
        }}
      >
        <div 
          className="border-b px-6 py-4"
          style={{ borderColor: isDark ? '#334155' : '#e2e8f0' }}
        >
          <h2 
            className="text-lg font-semibold"
            style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
          >
            Today's Appointments
          </h2>
        </div>
        <div className="p-6">
          <div 
            className="text-center py-12"
            style={{ color: isDark ? '#94a3b8' : '#6b7280' }}
          >
            No appointments scheduled for today.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
