'use client';

import React, { useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { HelpCircle, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';

// Carga perezosa del menú para no impactar el bundle inicial
const MenuUser = dynamic(() => import('./MenuUser'), { ssr: false });

const SidebarFooter: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = useCallback(() => setIsMenuOpen((v) => !v), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <div className="p-4 border-t border-zinc-300 dark:border-gray-800 space-y-3">
      {/* Botón de ayuda */}
      <button className={`w-full flex items-center ${isOpen ? 'gap-3 px-4 py-3' : 'justify-center px-2 py-3'} rounded-lg text-zinc-600 dark:text-[#BDBDBD] hover:bg-zinc-100 dark:hover:bg-neutral-700/50 hover:text-zinc-900 dark:hover:text-[#FFFFFF] transition-all`}>
        <HelpCircle size={20} />
        {isOpen && <span className="font-medium">Ayuda</span>}
      </button>

      {/* Contenedor perfil usuario */}
      <div
        ref={anchorRef}
        onClick={toggleMenu}
        className={`flex items-center ${isOpen ? 'gap-3 py-2 px-3 bg-zinc-100 dark:bg-[#3F3F3F] border border-zinc-400 dark:border-neutral-400' : 'justify-center'} rounded-[10px] hover:bg-zinc-200 dark:hover:bg-neutral-700/50 transition-colors cursor-pointer`}
      >
        {/* Imagen del usuario */}
        <Image src="/alex-suprun-ZHvM3XIOHoE-unsplash.jpg" alt="User Image" width={45} height={45} className="rounded-full border-[1.5px] border-red-500" unoptimized />
        {isOpen && (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-zinc-900 dark:text-[#FFFFFF] truncate">
                Juan Pérez
              </p>
              <p className="text-sm text-zinc-600 dark:text-[#BDBDBD] truncate">
                U73828385
              </p>
            </div>
            <button className="p-1 rounded transition-colors">
              <ChevronRight size={18} className="text-zinc-600 dark:text-[#BDBDBD]" />
            </button>
          </>
        )}
      </div>

      {/* Menú del usuario: se muestra fuera del sidebar, sobre toda la página */}
      {typeof window !== 'undefined' && (
        <MenuUser
          open={isMenuOpen}
          anchorRef={anchorRef}
          onClose={closeMenu}
          onOpenSettings={() => {
            // Aquí puedes navegar a /configuracion si existe
            closeMenu();
          }}
          onLogout={() => {
            // Aquí puedes disparar tu lógica de logout
            closeMenu();
          }}
        />
      )}
    </div>
  );
};

export default SidebarFooter;