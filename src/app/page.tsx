'use client';

import SitebarMain from '@/Components/Sitebar/sitebarMain';
import { CursoCard } from '@/Components/Cursos-page/cursoCard';
import SearchInput from '@/Components/System-UI/searchInput';
import { useEffect, useMemo, useState } from 'react';
import { AdvancedSelect, type Option } from '@/Components/System-UI/Select';
import { Tabs, TabItem } from '@/Components/System-UI/Tabs';
import { ActividadesSemanales } from '@/Components/Cursos-page/ActividadesSemanales';
import BannerSlide from '@/Components/Cursos-page/bannerSlide';
import { Notificaciones } from '@/Components/Cursos-page/Notificaciones';
import { supabase } from '@/Data/SupaBaseClient';

// Tipo de curso esperado por la UI
type Curso = {
  nombre: string;
  profesor: string;
  progreso: number;
  modalidad: 'Presencial' | 'Virtual 24/7' | string;
  seccion: string;
};

// Opciones para el selector de período
const Periodo: Option[] = [
  { value: 'periodoActual', label: 'Ciclo 2 - Periodo Actual' },
  { value: '1er Ciclo', label: 'Ciclo - 1' },
  { value: 'preciclo', label: 'Pre - ciclo' },
];

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'onsite' | 'remote'>('all');
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar cursos desde Supabase (tabla: cursos)
  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('cursos')
        .select('nombre, profesor, progreso, modalidad, seccion');
      if (!active) return;
      if (error) {
        console.error('Error obteniendo cursos:', error);
        setError('No se pudieron cargar los cursos.');
        setCursos([]);
      } else {
        // Asegurar el mapeo de los campos esperados por la UI
        const mapped = (data ?? []).map((c: any) => ({
          nombre: String(c.nombre ?? ''),
          profesor: String(c.profesor ?? ''),
          progreso: Number(c.progreso ?? 0),
          modalidad: String(c.modalidad ?? ''),
          seccion: String(c.seccion ?? ''),
        })) as Curso[];
        setCursos(mapped);
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  // Filtrar por búsqueda y modalidad
  const filteredCursos = useMemo(() => {
    const term = searchValue.trim().toLowerCase();
    return cursos.filter((curso) => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'onsite' && curso.modalidad === 'Presencial') ||
        (filter === 'remote' && curso.modalidad === 'Virtual 24/7');
      if (!matchesFilter) return false;
      if (!term) return true;
      return (
        curso.nombre.toLowerCase().includes(term) ||
        curso.profesor.toLowerCase().includes(term) ||
        curso.seccion.toLowerCase().includes(term)
      );
    });
  }, [cursos, filter, searchValue]);

  // Calcular counts dinámicamente para las pestañas
  const onsiteCount = useMemo(
    () => cursos.filter((c) => c.modalidad === 'Presencial').length,
    [cursos]
  );
  const remoteCount = useMemo(
    () => cursos.filter((c) => c.modalidad === 'Virtual 24/7').length,
    [cursos]
  );

  const items: TabItem[] = useMemo(
    () => [
      { id: 'all', label: 'Todos', count: cursos.length },
      { id: 'onsite', label: 'Presenciales', count: onsiteCount },
      { id: 'remote', label: 'Virtuales', count: remoteCount },
    ],
    [cursos.length, onsiteCount, remoteCount]
  );

  return (
    <div className="flex min-h-screen bg-[var(--background)] font-sans">
      {/* Sidebar principal */}
      <SitebarMain />

      {/* Contenido principal dividido en paneles */}
      <main className="flex flex-row p-4 bg-[var(--background)] w-full gap-4 h-[calc(100vh-2rem)]">
        {/* Panel principal: Cursos y anuncios (mayor proporción de ancho) */}
        <section className="flex-3 flex flex-col h-full overflow-hidden">
          {/* Banner de anuncios */}
          <BannerSlide />

          {/* Sección de cursos */}
          <div className="flex flex-col flex-1 min-h-0">
            {/* Título de la sección */}
            <h1 className="text-xl font-bold mb-4 text-[var(--foreground)]">Mis Cursos</h1>

            {/* Barra de búsqueda y filtros */}
            <div className="flex flex-row gap-4 mb-4">
              <SearchInput
                placeholder="Buscar cursos..."
                value={searchValue}
                onChange={setSearchValue}
                className="flex-1"
              />
              <AdvancedSelect
                id="periodo"
                options={Periodo}
                onValueChange={(value) => console.log(value)}
                className="flex-1"
              />
            </div>

            {/* Pestañas para filtrar por modalidad */}
            <Tabs
              items={items}
              value={filter}
              onChange={(id) => setFilter(id as 'all' | 'onsite' | 'remote')}
            />

            {/* Grid de tarjetas de cursos */}
            <div className="mt-4 w-full flex-1 overflow-y-auto custom-scrollbar">
              {loading ? (
                <div className="text-sm text-zinc-500 dark:text-zinc-400">Cargando cursos...</div>
              ) : error ? (
                <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
              ) : (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                  {filteredCursos.map((curso, index) => (
                    <CursoCard key={index} curso={curso} />
                  ))}
                  {filteredCursos.length === 0 && (
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      No se encontraron cursos con los filtros aplicados.
                    </p>
                  )}
                </div>
              )}
            </div>

          </div>
        </section>

        {/* Panel lateral: Notificaciones y actividades (menor proporción de ancho) */}
        <aside className="flex-1 flex flex-col gap-3 min-w-0 h-full">
          {/* Notificaciones */}
          <Notificaciones />

          {/* Actividades semanales */}
          <ActividadesSemanales />
        </aside>
      </main>
    </div>
  );
}