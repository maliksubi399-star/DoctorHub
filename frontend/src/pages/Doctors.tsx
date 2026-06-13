import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import { Search, MapPin, Star } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';

const Doctors = () => {
  const { isDark } = useDarkMode();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get('/api/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
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
          Find a Doctor
        </h1>
        <p 
          className="mt-2"
          style={{ color: isDark ? '#cbd5e1' : '#475569' }}
        >
          Search our network of specialized healthcare professionals.
        </p>
      </div>

      <div className="mb-8 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search 
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5"
            style={{ color: isDark ? '#64748b' : '#cbd5e1' }}
          />
          <input 
            type="text" 
            placeholder="Search by name or disease..." 
            className="pl-10 px-4 py-2 rounded-md border w-full transition-colors"
            style={{
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
              borderColor: isDark ? '#334155' : '#e2e8f0',
              color: isDark ? '#e2e8f0' : '#1e293b'
            }}
          />
        </div>
        <select 
          className="px-4 py-2 rounded-md border transition-colors"
          style={{
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderColor: isDark ? '#334155' : '#e2e8f0',
            color: isDark ? '#e2e8f0' : '#1e293b'
          }}
        >
          <option value="">All Treatments</option>
          <option value="ALLOPATHIC">Allopathic</option>
          <option value="HOMEOPATHIC">Homeopathic</option>
          <option value="HERBAL">Herbal</option>
        </select>
      </div>

      {loading ? (
        <p 
          className="text-center py-12"
          style={{ color: isDark ? '#94a3b8' : '#6b7280' }}
        >
          Loading doctors...
        </p>
      ) : doctors.length === 0 ? (
        <div 
          className="text-center py-12 rounded-xl border"
          style={{
            backgroundColor: isDark ? '#1e293b' : '#ffffff',
            borderColor: isDark ? '#334155' : '#e2e8f0'
          }}
        >
          <p style={{ color: isDark ? '#94a3b8' : '#6b7280' }}>
            No doctors found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map(doctor => (
            <div 
              key={doctor.id} 
              className="overflow-hidden rounded-xl border transition-shadow hover:shadow-lg"
              style={{
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                borderColor: isDark ? '#334155' : '#e2e8f0'
              }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 
                      className="text-lg font-bold"
                      style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
                    >
                      {doctor.user.name}
                    </h3>
                    <p 
                      className="font-medium text-sm"
                      style={{ color: '#38bdf8' }}
                    >
                      {doctor.specialization}
                    </p>
                  </div>
                  <span 
                    className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium border"
                    style={{
                      backgroundColor: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                      color: isDark ? '#38bdf8' : '#2563eb',
                      borderColor: isDark ? 'rgba(56, 189, 248, 0.3)' : 'rgba(37, 99, 235, 0.1)'
                    }}
                  >
                    {doctor.treatmentType}
                  </span>
                </div>
                
                <p 
                  className="text-sm mb-4 line-clamp-2"
                  style={{ color: isDark ? '#cbd5e1' : '#6b7280' }}
                >
                  {doctor.bio || 'No biography provided.'}
                </p>
                
                <div 
                  className="flex items-center gap-2 text-sm mb-6"
                  style={{ color: isDark ? '#cbd5e1' : '#6b7280' }}
                >
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                  <span>{doctor.experience} Years Experience</span>
                </div>
                
                <Link 
                  to={`/book/${doctor.id}`} 
                  className="w-full block text-center py-2 rounded-md font-medium transition-colors"
                  style={{
                    backgroundColor: '#38bdf8',
                    color: '#0f172a'
                  }}
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Doctors;
