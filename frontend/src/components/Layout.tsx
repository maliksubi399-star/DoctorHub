import { Outlet, Link } from 'react-router-dom';
import { Activity, Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';

const Layout = () => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <div 
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ 
        backgroundColor: isDark ? '#0f172a' : '#f8fafc',
        color: isDark ? '#e2e8f0' : '#1e293b'
      }}
    >
      <header 
        className="border-b sticky top-0 z-10 transition-colors duration-300 shadow-sm"
        style={{ 
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          borderColor: isDark ? '#475569' : '#e2e8f0'
        }}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity" style={{ color: isDark ? '#38bdf8' : '#2563eb' }}>
            <Activity className="h-6 w-6" />
            Doctor Hub
          </Link>
          <nav className="flex items-center gap-6">
            <Link 
              to="/doctors" 
              className="text-sm font-medium transition-colors"
              style={{ 
                color: isDark ? '#cbd5e1' : '#475569',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'}
              onMouseLeave={(e) => e.currentTarget.style.color = isDark ? '#cbd5e1' : '#475569'}
            >
              Find Doctors
            </Link>
            <div className="flex items-center gap-3 ml-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg transition-colors"
                style={{ 
                  backgroundColor: isDark ? '#334155' : '#f1f5f9',
                  color: isDark ? '#fbbf24' : '#334155'
                }}
                aria-label="Toggle dark mode"
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
              <Link 
                to="/login" 
                className="text-sm font-medium transition-colors"
                style={{ 
                  color: isDark ? '#cbd5e1' : '#475569',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#38bdf8'}
                onMouseLeave={(e) => e.currentTarget.style.color = isDark ? '#cbd5e1' : '#475569'}
              >
                Log in
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 rounded-md font-medium transition-colors"
                style={{ 
                  backgroundColor: isDark ? '#38bdf8' : '#2563eb',
                  color: isDark ? '#0f172a' : '#ffffff'
                }}
              >
                Sign up
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer 
        className="border-t py-8 transition-colors duration-300"
        style={{ 
          backgroundColor: isDark ? '#1e293b' : '#f8fafc',
          borderColor: isDark ? '#475569' : '#e2e8f0'
        }}
      >
        <div 
          className="container mx-auto px-4 text-center text-sm"
          style={{ color: isDark ? '#94a3b8' : '#708090' }}
        >
          &copy; {new Date().getFullYear()} Doctor Hub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
