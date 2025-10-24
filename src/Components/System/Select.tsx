"use client";

import { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';


export interface Option {
  value: string | number;
  label: string;
}

export interface AdvancedSelectProps {
  id: string;
  options: Option[]; // Un array de objetos con la forma de "Option"
  initialValue?: string | number;
  placeholder?: string;
  onValueChange: (value: string | number) => void;
  className?: string;
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export function AdvancedSelect({
  id,
  options,
  initialValue = '',
  placeholder = 'Selecciona una opción...',
  onValueChange,
  className = '',
}: AdvancedSelectProps) {
  const [selectedValue, setSelectedValue] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Obtener la etiqueta de la opción seleccionada
  const selectedOption = options.find(option => option.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  // Cerrar dropdown cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (value: string | number) => {
    setSelectedValue(value);
    onValueChange(value);
    setIsOpen(false);
  };

  return (
    <div className={`w-full ${className}`} ref={dropdownRef}>
      
      <div className="relative">
        {/* Button que activa el dropdown */}
        <button
          type="button"
          id={id}
          onClick={() => setIsOpen(!isOpen)}
          className="
            w-full flex items-center justify-between
            px-3 py-3 text-left
            bg-neutral-900 rounded-lg border border-transparent
            shadow-sm cursor-pointer
            hover:border-neutral-500
            focus:outline-none 
            transition-colors
          "
        >
          <span className={`text-sm ${!selectedValue ? 'text-neutral-500' : 'text-neutral-100'}`}>
            {displayText}
          </span>
          <ChevronDown 
            className={`h-5 w-5 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div 
            className="
              absolute z-10 mt-2 w-full
              bg-neutral-900 border border-neutral-700 rounded-md
              shadow-lg max-h-60 overflow-auto
              origin-top
            "
            style={{
              animation: 'scaleIn 0.15s ease-out'
            }}
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`
                  flex items-center justify-start gap-2
                  px-3 py-2 cursor-pointer
                  hover:bg-neutral-700
                  transition-colors
                  ${selectedValue === option.value ? 'bg-neutral-700' : ''}
                `}
              >
                <span className="w-4 h-4 flex items-center justify-center">
                  {selectedValue === option.value && (
                    <Check className="h-4 w-4 text-neutral-400" />
                  )}
                </span>
                <span className={`text-sm ${selectedValue === option.value ? 'font-medium text-neutral-100' : 'text-neutral-300'}`}>
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}