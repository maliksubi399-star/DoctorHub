import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Doctors from './pages/Doctors';
import ProtectedRoute from './components/ProtectedRoute';
import PatientDashboard from './pages/dashboards/PatientDashboard';
import DoctorDashboard from './pages/dashboards/DoctorDashboard';
import AssistantDashboard from './pages/dashboards/AssistantDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';

function App() {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="doctors" element={<Doctors />} />
            
            {/* Protected Dashboards */}
            <Route element={<ProtectedRoute allowedRoles={['PATIENT']} />}>
              <Route path="dashboard/patient" element={<PatientDashboard />} />
            </Route>
            
            <Route element={<ProtectedRoute allowedRoles={['DOCTOR']} />}>
              <Route path="dashboard/doctor" element={<DoctorDashboard />} />
            </Route>
            
            <Route element={<ProtectedRoute allowedRoles={['ASSISTANT']} />}>
              <Route path="dashboard/assistant" element={<AssistantDashboard />} />
            </Route>
            
            <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']} />}>
              <Route path="dashboard/admin" element={<AdminDashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
  );
}

export default App;
