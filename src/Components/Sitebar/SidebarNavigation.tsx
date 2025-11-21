'use client';

import React from 'react';
import { Book, MessageCircle, BookOpen, Calendar, Mail } from 'lucide-react';
import Tooltip from '@/Components/System-UI/tooltip';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

interface SidebarNavigationProps {
  navigationItems: NavigationItem[];
  activeItem: string;
  onItemClick: (id: string) => void;
  isOpen: boolean;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ navigationItems, activeItem, onItemClick, isOpen }) => {
  return (
    <nav className="flex-1 py-4 px-3 space-y-3 overflow-y-auto">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.id;

        const button = (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={`w-full flex items-center ${isOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-lg transition-all ${
              isActive
                ? 'bg-[var(--sidebar-active)] text-[var(--sidebar-text)] border border-[var(--sidebar-border)]'
                : 'text-zinc-600 dark:text-[#BDBDBD] hover:bg-zinc-100 dark:hover:bg-neutral-700/50 hover:text-zinc-900 dark:hover:text-[#FFFFFF]'
            }`}
          >
            <Icon size={20} />
            {isOpen && <span className="font-medium">{item.label}</span>}
          </button>
        );

        return isOpen ? (
          button
        ) : (
          <Tooltip key={item.id} content={item.label}>
            {button}
          </Tooltip>
        );
      })}
    </nav>
  );
};

export default SidebarNavigation;