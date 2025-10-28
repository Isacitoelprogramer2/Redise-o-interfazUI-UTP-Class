'use client';

import SitebarMain from '@/Components/Sitebar/sitebarMain';
import { CursoCard } from '@/Components/Cursos-page/cursoCard';
import { cursos } from '@/Data/cursosData';
import SearchInput from '@/Components/System-UI/searchInput';
import { useState } from 'react';
import { AdvancedSelect, type Option } from '@/Components/System-UI/Select';
import { Tabs, TabItem } from '@/Components/System-UI/Tabs';
import { ActividadesSemanales } from '@/Components/Cursos-page/ActividadesSemanales';
import BannerSlide from '@/Components/Cursos-page/bannerSlide';
import { Notificaciones } from '@/Components/Cursos-page/Notificaciones';

// Opciones para el selector de período
const Periodo: Option[] = [
  { value: 'periodoActual', label: 'Ciclo 2 - Periodo Actual' },
  { value: '1er Ciclo', label: 'Ciclo - 1' },
  { value: 'preciclo', label: 'Pre - ciclo' },
];

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState('all');

  // Filtrar cursos por modalidad
  const filteredCursos = cursos.filter(curso => {
    if (filter === 'all') return true;
    if (filter === 'onsite') return curso.modalidad === 'Presencial';
    if (filter === 'remote') return curso.modalidad === 'Virtual 24/7';
    return true;
  });

  // Calcular counts dinámicamente para las pestañas
  const onsiteCount = cursos.filter(c => c.modalidad === 'Presencial').length;
  const remoteCount = cursos.filter(c => c.modalidad === 'Virtual 24/7').length;

  const items: TabItem[] = [
    { id: "all", label: "Todos", count: cursos.length },
    { id: "onsite", label: "Presenciales", count: onsiteCount },
    { id: "remote", label: "Virtuales", count: remoteCount },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
      {/* Sidebar principal */}
      <SitebarMain />

      {/* Contenido principal dividido en paneles */}
      <main className="flex flex-row p-4 bg-white dark:bg-black w-full gap-4 h-[calc(100vh-2rem)]">
        {/* Panel principal: Cursos y anuncios (mayor proporción de ancho) */}
        <section className="flex-3 flex flex-col h-full overflow-hidden">
          {/* Banner de anuncios */}
          <BannerSlide />

          {/* Sección de cursos */}
          <div className="flex flex-col flex-1 min-h-0">
            {/* Título de la sección */}
            <h1 className="text-xl font-bold mb-4 text-black dark:text-white">Mis Cursos</h1>

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
              onChange={setFilter}
            />

            {/* Grid de tarjetas de cursos */}
            <div className="mt-4 w-full flex-1 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                {filteredCursos.map((curso, index) => (
                  <CursoCard key={index} curso={curso} />
                ))}
              </div>
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