import { Users, Activity } from 'lucide-react';
import { useDarkMode } from '../../context/DarkModeContext';

const AdminDashboard = () => {
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
          Admin Dashboard
        </h1>
        <p 
          className="mt-2"
          style={{ color: isDark ? '#cbd5e1' : '#475569' }}
        >
          Platform analytics and user management.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div 
          className="p-6 rounded-xl border border-l-4 transition-colors"
          style={{
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderColor: isDark ? '#334155' : '#e2e8f0',
            borderLeftColor: '#3b82f6'
          }}
        >
          <div className="flex items-center gap-4">
            <div 
              className="p-3 rounded-full"
              style={{
                backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6'
              }}
            >
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p 
                className="text-sm font-medium"
                style={{ color: isDark ? '#94a3b8' : '#6b7280' }}
              >
                Total Patients
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
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p 
                className="text-sm font-medium"
                style={{ color: isDark ? '#94a3b8' : '#6b7280' }}
              >
                Total Doctors
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
            borderLeftColor: '#a855f7'
          }}
        >
          <div className="flex items-center gap-4">
            <div 
              className="p-3 rounded-full"
              style={{
                backgroundColor: isDark ? 'rgba(168, 85, 247, 0.1)' : 'rgba(168, 85, 247, 0.1)',
                color: '#a855f7'
              }}
            >
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p 
                className="text-sm font-medium"
                style={{ color: isDark ? '#94a3b8' : '#6b7280' }}
              >
                Total Appointments
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
            User Management
          </h2>
        </div>
        <div 
          className="p-6 text-center py-12"
          style={{ color: isDark ? '#94a3b8' : '#6b7280' }}
        >
          User list will appear here.
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
