'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, User, AlertCircle } from 'lucide-react';

interface LoginInputProps {
  label: string;
  placeholder: string;
  type?: string;
  icon?: 'user' | 'password';
  warningMessage?: string;
  id: string;
}

export const LoginInput = ({
  label,
  placeholder,
  type = 'text',
  icon,
  warningMessage,
  id
}: LoginInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="mb-6 w-full">
      <label htmlFor={id} className="block text-white font-medium mb-2 text-sm">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          className="w-full bg-[#171717] border border-[#2d2d2d] text-white rounded-lg py-3 px-4 focus:outline-none focus:border-[#ff4545] transition-colors placeholder-gray-600"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          {icon === 'user' && <User size={20} />}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-none hover:text-white transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
      </div>
      {warningMessage && (
        <div className="flex items-center mt-2 text-gray-500 text-xs">
          <AlertCircle size={14} className="mr-1" />
          <span>{warningMessage}</span>
        </div>
      )}
    </div>
  );
};
