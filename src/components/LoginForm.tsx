import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface LoginFormProps {
  onLogin: () => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Используем "фиктивный" email на основе ника
    const email = `${username.toLowerCase()}@wedding.local`;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setError('Неверный ник или пароль');
      console.error('Login error:', error.message);
    } else {
      onLogin();
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Вход для молодожёнов</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm">{error}</div>
        )}

        <div>
          <label className="block text-sm text-gray-700 mb-1">Ник (groom / bride)</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          {loading ? 'Входим...' : 'Войти'}
        </button>
      </form>
    </div>
  );
}
