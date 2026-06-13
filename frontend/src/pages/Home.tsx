import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Search, ShieldCheck } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';

const Home = () => {
  const { isDark } = useDarkMode();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section 
        className="relative overflow-hidden text-white py-24 sm:py-32 transition-colors duration-300"
        style={{ backgroundColor: isDark ? '#0f172a' : '#1e293b' }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div 
          className="absolute inset-0 bg-gradient-to-r to-transparent"
          style={{ backgroundColor: isDark ? 'rgba(15, 23, 42, 0.8)' : 'rgba(30, 41, 59, 0.8)' }}
        ></div>
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-2xl space-y-8">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              Your Health, <span style={{ color: '#38bdf8' }}>Our Priority</span>
            </h1>
            <p className="text-lg max-w-xl" style={{ color: '#cbd5e1' }}>
              Connect with top medical professionals across Allopathic, Homeopathic, and Herbal treatments. Book appointments, manage records, and get the care you deserve.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                to="/doctors" 
                className="text-lg px-8 py-4 rounded-full font-medium transition-colors"
                style={{ 
                  backgroundColor: '#38bdf8',
                  color: '#0f172a'
                }}
              >
                Find a Doctor <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        className="py-24 transition-colors duration-300"
        style={{ backgroundColor: isDark ? '#1e293b' : '#f8fafc' }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: isDark ? '#e2e8f0' : '#1e293b' }}
            >
              Why Choose Doctor Hub?
            </h2>
            <p 
              className="mt-4 text-lg"
              style={{ color: isDark ? '#cbd5e1' : '#475569' }}
            >
              We provide a seamless healthcare experience from finding the right specialist to managing your prescriptions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Search, title: 'Specialized Care', desc: 'Filter doctors by disease and treatment type to find the perfect match for your needs.' },
              { icon: Calendar, title: 'Easy Scheduling', desc: 'Book appointments online and upload your payment screenshots securely for quick confirmation.' },
              { icon: ShieldCheck, title: 'Secure Records', desc: 'Your medical history and prescriptions are securely stored and only accessible to authorized doctors.' }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="p-8 text-center rounded-xl border transition-shadow hover:shadow-lg"
                style={{
                  backgroundColor: isDark ? '#0f172a' : '#ffffff',
                  borderColor: isDark ? '#334155' : '#e2e8f0',
                  color: isDark ? '#e2e8f0' : '#1e293b'
                }}
              >
                <div 
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full mb-6"
                  style={{
                    backgroundColor: isDark ? 'rgba(56, 189, 248, 0.1)' : 'rgba(37, 99, 235, 0.1)',
                    color: isDark ? '#38bdf8' : '#2563eb'
                  }}
                >
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p style={{ color: isDark ? '#cbd5e1' : '#6b7280' }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
