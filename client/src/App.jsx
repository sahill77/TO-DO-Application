import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { getUser, isAuthenticated } from './utils/helpers';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      const savedUser = getUser();
      if (savedUser) {
        setUser(savedUser);
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard user={user} /></ProtectedRoute>} />
      <Route  path="*" element={<Navigate to={isAuthenticated() ? '/dashboard' : '/login'} replace />} />
    </Routes>
  );
}

export default App;
