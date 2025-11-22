'use client';

import { LoginInput } from './LoginInput';
import { LoginButton } from './LoginButton';
import Link from 'next/link';

export const LoginForm = () => {
  return (
    <div className="w-full max-w-md px-4">
      <form onSubmit={(e) => e.preventDefault()}>
        <LoginInput
          id="utp-code"
          label="Código UTP"
          placeholder="U1234567"
          icon="user"
          warningMessage="No digitar el @utp.edu.pe"
        />
        
        <LoginInput
          id="password"
          label="Contraseña"
          placeholder="****************"
          type="password"
          icon="password"
        />
        
        <div className="mb-6">
          <Link 
            href="#" 
            className="text-white text-xs underline hover:text-gray-300 transition-colors font-medium"
          >
            Restablecer contraseña
          </Link>
        </div>

        <LoginButton href="/">
          Iniciar sesión
        </LoginButton>
      </form>
    </div>
  );
};
