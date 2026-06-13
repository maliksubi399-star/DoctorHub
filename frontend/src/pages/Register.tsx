import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDarkMode } from '../context/DarkModeContext';

const Register = () => {
  const { isDark } = useDarkMode();
  const navigate = useNavigate();
  const [role, setRole] = useState('PATIENT');
  const [formData, setFormData] = useState<any>({
    name: '', email: '', password: '', role: 'PATIENT',
    dob: '', gender: 'Male', bloodGroup: 'A+',
    specialization: '', treatmentType: 'ALLOPATHIC', experience: '', bio: '',
    doctorId: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    setRole(newRole);
    setFormData({ ...formData, role: newRole });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      if (role === 'PATIENT') navigate('/dashboard/patient');
      else if (role === 'DOCTOR') navigate('/dashboard/doctor');
      else if (role === 'ASSISTANT') navigate('/dashboard/assistant');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    backgroundColor: isDark ? '#0f172a' : '#ffffff',
    borderColor: isDark ? '#334155' : '#d1d5db',
    color: isDark ? '#e2e8f0' : '#1e293b'
  };

  const labelStyle = {
    color: isDark ? '#e2e8f0' : '#374151'
  };

  return (
    <div 
      className="flex min-h-[calc(100vh-130px)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
      style={{ backgroundColor: isDark ? '#0f172a' : '#f8fafc' }}
    >
      <div 
        className="w-full max-w-xl p-8 rounded-xl border shadow-xl transition-colors"
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
            Create an account
          </h2>
          <p 
            className="mt-2 text-sm"
            style={{ color: isDark ? '#cbd5e1' : '#6b7280' }}
          >
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="font-medium hover:opacity-80"
              style={{ color: '#38bdf8' }}
            >
              Sign in
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1" style={labelStyle}>
                I am registering as a
              </label>
              <select 
                name="role" 
                value={role} 
                onChange={handleRoleChange} 
                className="w-full px-4 py-2 rounded-md border transition-colors"
                style={inputStyle}
              >
                <option value="PATIENT">Patient</option>
                <option value="DOCTOR">Doctor</option>
                <option value="ASSISTANT">Assistant</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={labelStyle}>
                Full Name
              </label>
              <input 
                name="name" 
                type="text" 
                required 
                className="w-full px-4 py-2 rounded-md border transition-colors"
                style={inputStyle}
                value={formData.name} 
                onChange={handleChange} 
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={labelStyle}>
                Email address
              </label>
              <input 
                name="email" 
                type="email" 
                required 
                className="w-full px-4 py-2 rounded-md border transition-colors"
                style={inputStyle}
                value={formData.email} 
                onChange={handleChange} 
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1" style={labelStyle}>
                Password
              </label>
              <input 
                name="password" 
                type="password" 
                required 
                className="w-full px-4 py-2 rounded-md border transition-colors"
                style={inputStyle}
                value={formData.password} 
                onChange={handleChange} 
              />
            </div>

            {/* Patient Fields */}
            {role === 'PATIENT' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1" style={labelStyle}>
                    Date of Birth
                  </label>
                  <input 
                    name="dob" 
                    type="date" 
                    required 
                    className="w-full px-4 py-2 rounded-md border transition-colors"
                    style={inputStyle}
                    value={formData.dob} 
                    onChange={handleChange} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={labelStyle}>
                    Gender
                  </label>
                  <select 
                    name="gender" 
                    className="w-full px-4 py-2 rounded-md border transition-colors"
                    style={inputStyle}
                    value={formData.gender} 
                    onChange={handleChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1" style={labelStyle}>
                    Blood Group
                  </label>
                  <select 
                    name="bloodGroup" 
                    className="w-full px-4 py-2 rounded-md border transition-colors"
                    style={inputStyle}
                    value={formData.bloodGroup} 
                    onChange={handleChange}
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </>
            )}

            {/* Doctor Fields */}
            {role === 'DOCTOR' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1" style={labelStyle}>
                    Specialization
                  </label>
                  <input 
                    name="specialization" 
                    type="text" 
                    required 
                    className="w-full px-4 py-2 rounded-md border transition-colors"
                    style={inputStyle}
                    value={formData.specialization} 
                    onChange={handleChange} 
                    placeholder="e.g. Cardiologist" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={labelStyle}>
                    Treatment Type
                  </label>
                  <select 
                    name="treatmentType" 
                    className="w-full px-4 py-2 rounded-md border transition-colors"
                    style={inputStyle}
                    value={formData.treatmentType} 
                    onChange={handleChange}
                  >
                    <option value="ALLOPATHIC">Allopathic</option>
                    <option value="HOMEOPATHIC">Homeopathic</option>
                    <option value="HERBAL">Herbal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={labelStyle}>
                    Experience (Years)
                  </label>
                  <input 
                    name="experience" 
                    type="number" 
                    required 
                    className="w-full px-4 py-2 rounded-md border transition-colors"
                    style={inputStyle}
                    value={formData.experience} 
                    onChange={handleChange} 
                    min="0" 
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1" style={labelStyle}>
                    Bio
                  </label>
                  <textarea 
                    name="bio" 
                    rows={3} 
                    className="w-full px-4 py-2 rounded-md border transition-colors"
                    style={inputStyle}
                    value={formData.bio} 
                    onChange={handleChange}
                  ></textarea>
                </div>
              </>
            )}

            {/* Assistant Fields */}
            {role === 'ASSISTANT' && (
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1" style={labelStyle}>
                  Assigned Doctor ID
                </label>
                <input 
                  name="doctorId" 
                  type="number" 
                  required 
                  className="w-full px-4 py-2 rounded-md border transition-colors"
                  style={inputStyle}
                  value={formData.doctorId} 
                  onChange={handleChange} 
                  placeholder="Doctor ID number" 
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-base py-3 rounded-md font-medium transition-colors mt-4"
            style={{
              backgroundColor: '#38bdf8',
              color: '#0f172a',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
