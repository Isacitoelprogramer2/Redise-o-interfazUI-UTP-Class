'use client';
import { useState } from 'react';
import { ChevronDown, ChevronRight, Check, FileText, CheckCircle2, Circle } from 'lucide-react';

// Interfaces para definir la estructura de los datos
interface ContentItem {
  id: number;
  title: string;
  type: string;
  completed: boolean;
  active: boolean;
}

interface Week {
  id: string | number;
  title: string;
  items: ContentItem[];
}

interface WeekAccordionProps {
  weeks?: Week[];
  onSelectContent?: (content: ContentItem) => void;
  expandedWeek: string | number | null;
  onToggleWeek: (weekId: string | number) => void;
}

// Componente principal: WeekAccordion
// Renderiza un acordeón de semanas con elementos de contenido expandibles
export default function WeekAccordion({ weeks = [], onSelectContent, expandedWeek, onToggleWeek }: WeekAccordionProps) {

  // Función para alternar la expansión de una semana
  const toggleWeek = (weekId: string | number) => {
    onToggleWeek(weekId);
  };

  // Renderizado del componente
  return (
    <div className="w-full lg:w-80 shrink-0 flex flex-col gap-2 h-full overflow-y-auto pr-2 pb-4 custom-scrollbar min-h-0">
      {weeks.map((week) => (
        <div key={week.id} className="border border-(--card-border) rounded-lg overflow-hidden bg-(--card-bg) shrink-0">
          {/* Botón para expandir/colapsar la semana */}
          <button
            onClick={() => toggleWeek(week.id)}
            className="w-full flex items-center justify-between p-3 text-left hover:bg-(--sidebar-hover) transition-colors cursor-pointer"
          >
            <span className="font-medium text-(--text)">{week.title}</span>
            <ChevronDown
              size={18}
              className={`text-(--text) transition-transform duration-300 ${expandedWeek === week.id ? 'rotate-180' : ''
                }`}
            />
          </button>

          {/* Contenedor expandible para los elementos de la semana */}
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${expandedWeek === week.id ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
          >
            <div className="overflow-hidden">
              <div className="bg-background border-t border-(--card-border)">
                {week.items.length > 0 ? (
                  // Mapeo de los elementos de contenido
                  week.items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onSelectContent?.(item)}
                      className={`p-3 flex items-start gap-3 cursor-pointer transition-colors ${item.active ? 'bg-(--sidebar-hover)' : 'hover:bg-(--sidebar-hover)'
                        }`}
                    >
                      {/* Icono del elemento */}
                      <FileText size={18} className="text-(--text) mt-0.5 shrink-0" />
                      {/* Título del elemento */}
                      <span className="text-sm text-(--text) grow">{item.title}</span>
                      {/* Icono de estado: completado o pendiente */}
                      {item.completed ? (
                        <div className="relative flex items-center justify-center w-5 h-5">
                          <Circle size={18} className="text-red-500 fill-current" />
                          <Check size={12} className="absolute text-white" />
                        </div>
                      ) : (
                        <Circle size={18} className="text-(--sidebar-border) shrink-0" />
                      )}
                    </div>
                  ))
                ) : (
                  // Mensaje cuando no hay contenido
                  <div className="p-3 text-sm text-(--sidebar-text-muted)">
                    No hay contenido disponible
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
