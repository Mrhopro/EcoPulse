import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';

import Header from './elements/Header';
import Sidebar from './elements/Sidebar';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './elements/Dashboard';
import './styles/App.css';




// Placeholder components для інших сторінок
// const Dashboard    = () => <div className="page-container"><h2>Dashboard</h2></div>;
const Activities   = () => <div className="page-container"><h2>Activities</h2></div>;
const LocalEcology = () => <div className="page-container"><h2>Local Ecology</h2></div>;
const Challenges   = () => <div className="page-container"><h2>Challenges</h2></div>;
const Leaderboard  = () => <div className="page-container"><h2>Leaderboard</h2></div>;
const Profile      = () => <div className="page-container"><h2>Profile</h2></div>;

// Layout-компонент з Header + Sidebar
function Layout({ sidebarCollapsed, onToggle }) {
  return (
    <>
      <Header sidebarCollapsed={sidebarCollapsed} />
      <Sidebar onToggle={onToggle} />
       <main className={`main ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <Routes>
          <Route path="/"       element={<Dashboard />} />
          <Route path="/act"    element={<Activities />} />
          <Route path="/eco"    element={<LocalEcology />} />
          <Route path="/chal"   element={<Challenges />} />
          <Route path="/lead"   element={<Leaderboard />} />
          <Route path="/me"     element={<Profile />} />
          <Route path="*"      element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

// Основне App, де сховаємо Layout на /register
function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  const isAuthPage = ['/register', '/login'].includes(location.pathname);

   return isAuthPage ? (
    location.pathname === '/register'
      ? <Register />
      : <Login />
  ) : (
    <Layout 
      sidebarCollapsed={sidebarCollapsed}
      onToggle={setSidebarCollapsed}
    />
  );
}


export default function Root() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/Dashboard" element={<App />} />
        <Route path="/register" element={<App />} />
        <Route path="/login" element={<App />} />
        <Route path="/*" element={<App />} />
        
      </Routes>
    </BrowserRouter>
  );
}