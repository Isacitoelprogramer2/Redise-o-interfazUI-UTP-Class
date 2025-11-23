'use client';

import { LoginInput } from './LoginInput';
import { LoginButton } from './LoginButton';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const LoginForm = () => {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push('/');
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md px-4">
      <form onSubmit={handleLogin}>
        <LoginInput
          id="email"
          label="Correo Electrónico"
          placeholder="usuario@utp.edu.pe"
          icon="user"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <LoginInput
          id="password"
          label="Contraseña"
          placeholder="****************"
          type="password"
          icon="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <div className="mb-6">
          <Link
            href="#"
            className="text-white text-xs underline hover:text-gray-300 transition-colors font-medium"
          >
            Restablecer contraseña
          </Link>
        </div>

        <LoginButton type="submit">
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </LoginButton>
      </form>
    </div>
  );
};
