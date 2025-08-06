import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WeddingInvitation from './components/WeddingInvitation';
import LoginForm from './components/LoginForm';
import AdminPanel from './components/AdminPanel';
import { supabase } from './lib/supabase';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    // Проверка сессии при загрузке
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setCheckingSession(false);
    });

    // Слушаем изменения авторизации
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (checkingSession) {
    return <div className="p-8 text-gray-500">Загрузка...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeddingInvitation />} />
        <Route
          path="/admin"
          element={
            isAuthenticated
              ? <AdminPanel onLogout={() => setIsAuthenticated(false)} />
              : <LoginForm onLogin={() => setIsAuthenticated(true)} />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
