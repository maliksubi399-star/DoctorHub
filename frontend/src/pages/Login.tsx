import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useDarkMode } from '../context/DarkModeContext';

const Login = () => {
  const { isDark } = useDarkMode();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      const role = response.data.user.role;
      if (role === 'PATIENT') navigate('/dashboard/patient');
      else if (role === 'DOCTOR') navigate('/dashboard/doctor');
      else if (role === 'ASSISTANT') navigate('/dashboard/assistant');
      else if (role === 'ADMIN' || role === 'SUPER_ADMIN') navigate('/dashboard/admin');
      else navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="flex min-h-[calc(100vh-130px)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
      style={{ backgroundColor: isDark ? '#0f172a' : '#f8fafc' }}
    >
      <div 
        className="w-full max-w-md p-8 rounded-xl border shadow-xl transition-colors"
        style={{
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          borderColor: isDark ? '#334155' : '#e2e8f0'
        }}
      >
        <div className="text-center mb-8">
          <h2 
            className="text-3xl font-bold tracking-tight"
            style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
          >
            Welcome back
          </h2>
          <p 
            className="mt-2 text-sm"
            style={{ color: isDark ? '#cbd5e1' : '#6b7280' }}
          >
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="font-medium hover:opacity-80"
              style={{ color: '#38bdf8' }}
            >
              Sign up today
            </Link>
          </p>
        </div>

        {error && (
          <div 
            className="mb-4 rounded-md p-4 border"
            style={{
              backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : 'rgba(254, 242, 242, 1)',
              borderColor: isDark ? 'rgba(239, 68, 68, 0.3)' : 'rgba(248, 113, 113, 0.5)',
              color: isDark ? '#f87171' : '#dc2626'
            }}
          >
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label 
              className="block text-sm font-medium mb-1"
              style={{ color: isDark ? '#e2e8f0' : '#374151' }}
            >
              Email address
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 rounded-md border transition-colors"
              placeholder="you@example.com"
              style={{
                backgroundColor: isDark ? '#0f172a' : '#ffffff',
                borderColor: isDark ? '#334155' : '#d1d5db',
                color: isDark ? '#e2e8f0' : '#1e293b'
              }}
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label 
              className="block text-sm font-medium mb-1"
              style={{ color: isDark ? '#e2e8f0' : '#374151' }}
            >
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 rounded-md border transition-colors"
              placeholder="••••••••"
              style={{
                backgroundColor: isDark ? '#0f172a' : '#ffffff',
                borderColor: isDark ? '#334155' : '#d1d5db',
                color: isDark ? '#e2e8f0' : '#1e293b'
              }}
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                id="remember-me" 
                type="checkbox" 
                className="h-4 w-4 rounded"
                style={{
                  backgroundColor: isDark ? '#1e293b' : '#ffffff',
                  borderColor: isDark ? '#475569' : '#d1d5db'
                }}
              />
              <label 
                htmlFor="remember-me" 
                className="ml-2 block text-sm"
                style={{ color: isDark ? '#cbd5e1' : '#6b7280' }}
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a 
                href="#" 
                className="font-medium hover:opacity-80"
                style={{ color: '#38bdf8' }}
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-base py-3 rounded-md font-medium transition-colors"
            style={{
              backgroundColor: '#38bdf8',
              color: '#0f172a',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
