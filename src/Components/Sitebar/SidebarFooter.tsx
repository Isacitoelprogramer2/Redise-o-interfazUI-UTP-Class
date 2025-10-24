'use client';

import React from 'react';
import Image from 'next/image';
import { HelpCircle, ChevronRight } from 'lucide-react';

const SidebarFooter: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <div className="p-4 border-t border-gray-800 space-y-3">
      {isOpen && (
        <>
          {/* Botón de ayuda */}
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#BDBDBD] hover:bg-neutral-700/50 hover:text-[#FFFFFF] transition-all">
            <HelpCircle size={20} />
            <span className="font-medium">Ayuda</span>
          </button>
        </>
      )}

      {/* Contenedor perfil usuario */}
      <div className={`flex items-center ${isOpen ? 'gap-3 py-2 px-3 bg-[#3F3F3F] border border-neutral-400' : 'justify-center'} rounded-[10px] hover:bg-neutral-700/50 transition-colors cursor-pointer`}>
        {/* Imagen del usuario */}
        <Image src="/alex-suprun-ZHvM3XIOHoE-unsplash.jpg" alt="User Image" width={45} height={45} className="rounded-full border-[1.5px] border-red-500" unoptimized />
        {isOpen && (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#FFFFFF] truncate">
                Juan Pérez
              </p>
              <p className="text-sm text-[#BDBDBD] truncate">
                U73828385
              </p>
            </div>
            <button className="p-1 rounded transition-colors">
              <ChevronRight size={18} className="text-[#BDBDBD]" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SidebarFooter;