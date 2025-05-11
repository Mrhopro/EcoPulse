import { useState } from 'react';
import Header from './elements/Header';
import Sidebar from './elements/Sidebar';
import './styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Placeholder components for routes
const Dashboard = () => <div className="page-container"><h2>Dashboard</h2><p>Welcome to EcoPulse dashboard!</p></div>;
const Activities = () => <div className="page-container"><h2>Activities</h2><p>Track your eco-friendly activities here.</p></div>;
const LocalEcology = () => <div className="page-container"><h2>Local Ecology</h2><p>Explore your local ecosystem.</p></div>;
const Challenges = () => <div className="page-container"><h2>Challenges</h2><p>Take on environmental challenges.</p></div>;
const Leaderboard = () => <div className="page-container"><h2>Leaderboard</h2><p>See how you compare to others.</p></div>;
const Profile = () => <div className="page-container"><h2>Profile</h2><p>Your EcoPulse profile information.</p></div>;

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar onToggle={toggleSidebar} />
        <Header sidebarCollapsed={sidebarCollapsed} />
        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/act" element={<Activities />} />
            <Route path="/eco" element={<LocalEcology />} />
            <Route path="/chal" element={<Challenges />} />
            <Route path="/lead" element={<Leaderboard />} />
            <Route path="/me" element={<Profile />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;