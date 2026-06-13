import { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, Calendar as CalendarIcon, Clock, CheckCircle } from 'lucide-react';
import { useDarkMode } from '../../context/DarkModeContext';

const PatientDashboard = () => {
  const { isDark } = useDarkMode();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd fetch the patient's appointments here
    // Currently the API endpoints allow booking and getting a single appt.
    // We would need a GET /api/appointments to fetch all for the user.
    // For now, we simulate an empty state.
    setLoading(false);
  }, []);

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
          Patient Dashboard
        </h1>
        <p 
          className="mt-2"
          style={{ color: isDark ? '#cbd5e1' : '#475569' }}
        >
          Manage your appointments, medical history, and prescriptions.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
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
              <CalendarIcon className="h-6 w-6" />
            </div>
            <div>
              <p 
                className="text-sm font-medium"
                style={{ color: isDark ? '#94a3b8' : '#6b7280' }}
              >
                Upcoming Appointments
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
            borderLeftColor: '#22c55e'
          }}
        >
          <div className="flex items-center gap-4">
            <div 
              className="p-3 rounded-full"
              style={{
                backgroundColor: isDark ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                color: '#22c55e'
              }}
            >
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p 
                className="text-sm font-medium"
                style={{ color: isDark ? '#94a3b8' : '#6b7280' }}
              >
                Prescriptions
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
          className="border-b px-6 py-4 flex justify-between items-center"
          style={{ borderColor: isDark ? '#334155' : '#e2e8f0' }}
        >
          <h2 
            className="text-lg font-semibold"
            style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
          >
            Your Appointments
          </h2>
          <button 
            className="text-sm py-1.5 px-4 rounded-md font-medium transition-colors"
            style={{
              backgroundColor: '#38bdf8',
              color: '#0f172a'
            }}
          >
            Book New
          </button>
        </div>
        <div className="p-6">
          {loading ? (
            <p 
              className="text-center py-8"
              style={{ color: isDark ? '#94a3b8' : '#6b7280' }}
            >
              Loading...
            </p>
          ) : appointments.length === 0 ? (
            <div className="text-center py-12">
              <div 
                className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{
                  backgroundColor: isDark ? '#334155' : '#f3f4f6',
                  color: isDark ? '#64748b' : '#9ca3af'
                }}
              >
                <CalendarIcon className="h-8 w-8" />
              </div>
              <h3 
                className="text-lg font-medium"
                style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
              >
                No appointments yet
              </h3>
              <p 
                className="mt-1 mb-6"
                style={{ color: isDark ? '#cbd5e1' : '#6b7280' }}
              >
                You haven't booked any appointments.
              </p>
              <button 
                className="px-4 py-2 rounded-md font-medium transition-colors"
                style={{
                  backgroundColor: '#38bdf8',
                  color: '#0f172a'
                }}
              >
                Find a Doctor
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Appointment list items would go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
