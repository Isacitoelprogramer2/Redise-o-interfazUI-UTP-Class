import React from 'react';
import { LoginHeader } from '@/Components/Login/LoginHeader';
import { LoginForm } from '@/Components/Login/LoginForm';

export default function Login() {
  return (
    <main className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-4">
        <div className='bg-neutral-900 p-10 rounded-2xl'>
        <LoginHeader />
        <LoginForm />
        </div>
      
    </main>
  );
}
