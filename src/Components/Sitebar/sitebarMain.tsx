'use client';

import React, { useState } from 'react';
import { Book, MessageCircle, BookOpen, Calendar, Mail } from 'lucide-react';
import SidebarHeader from './SidebarHeader';
import SidebarNavigation from './SidebarNavigation';
import SidebarFooter from './SidebarFooter';

const SitebarMain: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [activeItem, setActiveItem] = useState<string>('home');

  const navigationItems = [
    { id: 'home', label: 'Cursos', icon: Book },
    { id: 'analytics', label: 'Chat', icon: MessageCircle },
    { id: 'users', label: 'Calendario', icon: Calendar },
    { id: 'documents', label: 'Correo UTP', icon: Mail },
    { id: 'settings', label: 'UTP+biblio', icon: BookOpen },
  ];

  return (
    <div
      className={`h-screen flex flex-col bg-[#191917] text-white transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-22'
      } overflow-hidden`}
    >
      <SidebarHeader isOpen={isOpen} onToggle={() => setIsOpen(prev => !prev)} />
      <SidebarNavigation
        navigationItems={navigationItems}
        activeItem={activeItem}
        onItemClick={setActiveItem}
        isOpen={isOpen}
      />
      <SidebarFooter isOpen={isOpen} />
    </div>
  );
};

export default SitebarMain;