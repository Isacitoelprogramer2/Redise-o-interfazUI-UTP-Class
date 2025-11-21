'use client';

// Importaciones necesarias para el componente
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Bell, X, ChevronDown } from 'lucide-react';

// Definición del componente Notificaciones
export const Notificaciones: React.FC = () => {
  // Estado para controlar si el modal de notificaciones está abierto
  const [isOpen, setIsOpen] = useState(false);
  // Estado para controlar si el modal debe estar visible (animación)
  const [isVisible, setIsVisible] = useState(false);
  // Estado para el número de notificaciones no leídas
  const [unreadCount, setUnreadCount] = useState(4);
  // Ref del botón disparador para calcular el espacio disponible
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [modalMaxH, setModalMaxH] = useState<number | undefined>(undefined);

  // Efecto para manejar la animación de entrada
  useEffect(() => {
    if (isOpen) {
      // Pequeño delay para asegurar que el elemento esté en el DOM antes de animar
      const timer = setTimeout(() => setIsVisible(true), 10);
      // Calcular la altura máxima disponible desde la parte inferior del trigger hasta el viewport
      const computeMaxH = () => {
        if (triggerRef.current) {
          const rect = triggerRef.current.getBoundingClientRect();
          const margin = 16; // margen inferior para respirar (1rem)
          const available = Math.max(160, window.innerHeight - rect.bottom - margin);
          setModalMaxH(available);
        }
      };
      computeMaxH();
      const onResizeOrScroll = () => computeMaxH();
      window.addEventListener('resize', onResizeOrScroll);
      window.addEventListener('scroll', onResizeOrScroll, true);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Función para alternar el estado del modal (abrir/cerrar)
  const toggle = () => {
    const willOpen = !isOpen;
    setIsOpen(willOpen);
    if (willOpen) {
      setUnreadCount(0); // Marcar como leídas al abrir
    }
  };

  // Función para cerrar el modal con animación
  const close = () => {
    setIsVisible(false); // Primero desactiva la visibilidad (inicia animación de salida)
    setTimeout(() => setIsOpen(false), 300); // Después de 300ms desmonta el modal
  };

  // Datos de ejemplo para las notificaciones (maquetado como la imagen)
  type TipoNotif = 'anuncio' | 'foro' | 'tarea' | 'evaluacion';
  type Notif = {
    tipo: TipoNotif;
    curso: string;
    mensaje: string;
    haceHoras: number;
    semana: number; // Semana a la que pertenece la notificación
  };

  const notificaciones: Notif[] = [
    {
      tipo: 'anuncio',
      curso: 'INGLÉS II',
      mensaje: 'Tu docente ha publicado un anuncio',
      haceHoras: 14,
      semana: 15,
    },
    {
      tipo: 'foro',
      curso: 'Estadística Descriptiva y Probabilidades',
      mensaje: 'Te quedan 3 días para comentar un foro',
      haceHoras: 10,
      semana: 15,
    },
    {
      tipo: 'tarea',
      curso: 'Estadística Descriptiva y Probabilidades',
      mensaje: 'Te quedan 3 días para comentar un foro',
      haceHoras: 10,
      semana: 15,
    },
    {
      tipo: 'evaluacion',
      curso: 'Estadística Descriptiva y Probabilidades',
      mensaje: 'Te quedan 3 días para comentar un foro',
      haceHoras: 10,
      semana: 15,
    },
    // Semana anterior como ejemplo
    {
      tipo: 'tarea',
      curso: 'Programación Orientada a Objetos',
      mensaje: 'Entrega del laboratorio 4 disponible',
      haceHoras: 36,
      semana: 14,
    },
    {
      tipo: 'foro',
      curso: 'Redes de Computadoras',
      mensaje: 'Comparte tu opinión sobre IPv6',
      haceHoras: 40,
      semana: 14,
    },
  ];

  // Agrupar por semana, orden descendente (semana más reciente primero)
  const gruposPorSemana = useMemo(() => {
    const mapa = new Map<number, Notif[]>();
    for (const n of notificaciones) {
      const arr = mapa.get(n.semana) ?? [];
      arr.push(n);
      mapa.set(n.semana, arr);
    }
    return Array.from(mapa.entries())
      .sort((a, b) => b[0] - a[0]) // semanas 15, 14, ...
      .map(([semana, items]) => ({ semana, items }));
  }, [notificaciones]);

  // Control de colapsado por semana (no afecta al contenedor padre)
  const [colapsadas, setColapsadas] = useState<Record<number, boolean>>({});
  const toggleSemana = (semana: number) =>
    setColapsadas((prev) => ({ ...prev, [semana]: !prev[semana] }));

  // Renderizado del componente
  return (
    <div className="relative custom-scrollbar">
      {/* Botón para abrir las notificaciones */}
      <button
        ref={triggerRef}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-label="Ver notificaciones"
        className="p-3 w-full justify-start flex items-center gap-2 font-semibold bg-zinc-200 dark:bg-neutral-800 rounded-xl hover:bg-zinc-300 dark:hover:bg-neutral-700 transition-colors text-zinc-900 dark:text-white"
      >
        <div className="relative">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </div>
        Notificaciones
      </button>

      {/* Modal de notificaciones */}
      {isOpen && (
        <>
          {/* Overlay para cerrar el modal al hacer clic fuera */}
          <div
            className={`fixed inset-0 bg-black/70 transition-opacity duration-300 z-40 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={close}
          ></div>

          {/* Contenedor del modal de notificaciones con animación de escala */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-notificaciones"
            className={`absolute top-full left-0 w-full bg-white dark:bg-neutral-800 px-4 pb-4 rounded-lg shadow-lg z-50 transition-all duration-300 ease-out origin-top overflow-y-auto overscroll-contain ${
              isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
            style={{ maxHeight: modalMaxH ? `${modalMaxH}px` : undefined }}
          >
            {/* Encabezado del modal con título y botón de cerrar */}
            <div className="sticky top-0 z-20 -mx-4 p-4 bg-white/90 dark:bg-neutral-800/90 supports-backdrop-filter:bg-white/70 dark:supports-backdrop-filter:bg-neutral-800/70 backdrop-blur border-b border-zinc-300 dark:border-neutral-700 flex justify-between items-center">
              <h3 id="titulo-notificaciones" className="text-lg font-semibold text-zinc-900 dark:text-white">Notificaciones</h3>
              <button
                onClick={close}
                className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-neutral-700 text-zinc-600 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-gray-200"
                aria-label="Cerrar notificaciones"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lista de notificaciones agrupadas por semana */}
            <div className="space-y-5 mt-4">
              {gruposPorSemana.map(({ semana, items }) => {
                const isClosed = colapsadas[semana];
                const chip: Record<TipoNotif, { label: string; className: string }> = {
                  anuncio: {
                    label: 'Anuncio',
                    className:
                      'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 border border-yellow-300 dark:border-yellow-700/40',
                  },
                  foro: {
                    label: 'Foro',
                    className: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700/40',
                  },
                  tarea: {
                    label: 'Tarea',
                    className: 'bg-fuchsia-100 dark:bg-fuchsia-900/40 text-fuchsia-800 dark:text-fuchsia-200 border border-fuchsia-300 dark:border-fuchsia-700/40',
                  },
                  evaluacion: {
                    label: 'Evaluación',
                    className: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-700/40',
                  },
                };
                return (
                  <section key={semana} className="space-y-3">
                    {/* Encabezado de semana */}
                    <button
                      type="button"
                      onClick={() => toggleSemana(semana)}
                      className="w-full flex items-center justify-between text-left"
                      aria-expanded={!isClosed}
                      aria-controls={`lista-semana-${semana}`}
                    >
                      <h4 className="text-xl font-semibold text-zinc-900 dark:text-white">Semana {semana}</h4>
                      <ChevronDown
                        className={`transition-transform text-zinc-700 dark:text-white ${isClosed ? 'rotate-180' : ''}`}
                        aria-hidden
                      />
                    </button>

                    {/* Lista de ítems de la semana */}
                    <ul
                      id={`lista-semana-${semana}`}
                      className={`space-y-3 ${isClosed ? 'hidden' : ''}`}
                    >
                      {items.map((n, index) => (
                        <li
                          key={`${semana}-${index}`}
                          className="rounded-2xl border border-zinc-300 dark:border-neutral-700 bg-zinc-50 dark:bg-neutral-900/70 p-4 shadow-sm"
                        >
                          {/* Fila superior: chip y tiempo */}
                          <div className="flex items-center justify-between">
                            <span
                              className={`px-3 py-1 text-xs font-regular rounded-full ${chip[n.tipo].className}`}
                            >
                              {chip[n.tipo].label}
                            </span>
                            <span className="text-sm text-zinc-600 dark:text-neutral-400">{`Hace ${n.haceHoras} horas`}</span>
                          </div>

                          {/* Curso */}
                          <div className="mt-3 text-[#3b82f6] dark:text-[#94D8FF] font-regular leading-tight">
                            {n.curso}
                          </div>

                          {/* Mensaje */}
                          <p className="mt-2 text-zinc-800 dark:text-neutral-100 text-sm leading-snug">
                            {n.mensaje}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

