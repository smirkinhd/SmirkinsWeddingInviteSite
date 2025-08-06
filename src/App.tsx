import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import LoginForm from './components/LoginForm';
import AdminPanel from './components/AdminPanel';
import WeddingInvitation from './components/WeddingInvitation';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeddingInvitation />} />
        <Route 
          path="/admin" 
          element={
            isAuthenticated ? (
              <AdminPanel onLogout={() => setIsAuthenticated(false)} />
            ) : (
              <LoginForm onLogin={() => setIsAuthenticated(true)} />
            )
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;