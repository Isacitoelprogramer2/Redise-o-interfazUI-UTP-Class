'use client';

import  SitebarMain from '@/Components/Sitebar/sitebarMain';
import { CursoCard } from '@/Components/Cursos/cursoCard';
import {cursos} from '@/Data/cursosData';
import SearchInput from '@/Components/System-UI/searchInput';
import { useState } from 'react';
import { AdvancedSelect, type Option } from '@/Components/System-UI/Select';
import { Tabs, TabItem } from '@/Components/System-UI/Tabs';
import { ActividadesSemanales } from '@/Components/Cursos/ActividadesSemanales';
import BannerSlide from '@/Components/Cursos/bannerSlide';

const Periodo: Option[] = [
    { value: 'periodoActual', label: 'Ciclo 2 - Periodo Actual' },
    { value: '1er Ciclo', label: 'Ciclo - 1' },
    { value: 'preciclo', label: 'Pre - ciclo' },
  ];

  const items: TabItem[] = [
    { id: "all", label: "Todos" },
    { id: "onsite", label: "Presenciales", count: 3 },
    { id: "remote", label: "Virtuales" },
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

  // Calcular counts dinámicamente
  const onsiteCount = cursos.filter(c => c.modalidad === 'Presencial').length;
  const remoteCount = cursos.filter(c => c.modalidad === 'Virtual 24/7').length;

  const items: TabItem[] = [
    { id: "all", label: "Todos", count: cursos.length },
    { id: "onsite", label: "Presenciales", count: onsiteCount },
    { id: "remote", label: "Virtuales", count: remoteCount },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <SitebarMain />
      <main className="flex flex-row p-4 bg-white dark:bg-black w-full">

      {/* Sección 1 */}
      <div className="flex-1 flex flex-col">
      <BannerSlide />
        {/* Sección de cursos */}
        <h1 className="text-xl font-bold mb-4 text-black dark:text-white">Mis Cursos</h1>  
        <div className='flex flex-row gap-4 mb-4'>
          <SearchInput
              placeholder="Buscar cursos..."
              value={searchValue}
              onChange={setSearchValue}
              className="w-full flex" 
            />
            
            <AdvancedSelect
                  id="periodo"
                  options={Periodo}
                  onValueChange={(value) => console.log(value)}
                />    
        </div>
        {/* Tabs con estilo del diseño */}
        <Tabs
          items={items}
          value={filter}
          onChange={setFilter}
        />
        {/* Grid de cursos */}
        <div className="mt-4 w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          {filteredCursos.map((curso, index) => (
            <CursoCard key={index} curso={curso} />
          ))}
        </div>
      </div>
        
       <div className="ml-8 w-64 flex flex-col gap-6">


        {/* Sección 2-Notificaciónes y actividades de la semana */}
        <div className="grid grid-cols-1">
          <ActividadesSemanales />
        </div>
       </div>
        

      </main>
    </div>
  );
}