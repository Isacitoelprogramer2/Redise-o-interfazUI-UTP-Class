import React from 'react';
import Link from 'next/link';

interface LoginButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const LoginButton = ({ children, onClick, href, type = 'button' }: LoginButtonProps) => {
  const className = "w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors mt-4 cursor-pointer block text-center";

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
};
