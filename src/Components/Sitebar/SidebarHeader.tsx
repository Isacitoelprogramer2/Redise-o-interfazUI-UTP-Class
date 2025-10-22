"use client";

import React from "react";
import { PanelRightOpen, PanelLeftOpen } from "lucide-react";

interface SidebarHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isOpen, onToggle }) => {
  return (
    <div className={`group relative flex items-center p-4 border-b border-neutral-800 transition-all duration-200 ${
      isOpen ? 'justify-between' : 'justify-center group-hover:justify-center'
    }`}>
      <div className={`flex items-center gap-3 transition-opacity duration-200 ${!isOpen ? 'group-hover:opacity-0' : ''}`}>
        {/* Logo cambia según estado: versión compacta cuando está cerrado */}
        {isOpen ? (
          <img src="/new-logo.c86d23e3 1.svg" alt="Logo UTP" className="h-6 w-auto" />
        ) : (
          <img src="/Logo-utp-simple.svg" alt="Logo UTP simple" className="h-8 w-auto" />
        )}
      </div>
      <button
        onClick={onToggle}
        className={`absolute p-2 hover:bg-neutral-800 rounded-lg transition-all duration-200 ${
          isOpen ? 'right-4' : 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden group-hover:flex'
        }`}
        aria-label={isOpen ? "Cerrar sidebar" : "Abrir sidebar"}
      >
        {/* Icono cambia: cuando está abierto mostramos PanelRightOpen para cerrar hacia la derecha,
            cuando está cerrado mostramos PanelLeftOpen para indicar que puede abrirse */}
        {isOpen ? (
          <PanelRightOpen size={20} className="text-[#BDBDBD]" />
        ) : (
          <PanelLeftOpen size={24} className="text-[#BDBDBD]" />
        )}
      </button>
    </div>
  );
};

export default SidebarHeader;