'use client';

import  SitebarMain from '@/Components/Sitebar/sitebarMain';
import { CursoCard } from '@/Components/Cursos/cursoCard';
import {cursos} from '@/Data/cursosData';
import SearchInput from '@/Components/System/searchInput';
import { useState } from 'react';
import { AdvancedSelect, type Option } from '@/Components/System/Select';


const Periodo: Option[] = [
    { value: 'periodoActual', label: 'Ciclo 2 - Periodo Actual' },
    { value: '1er Ciclo', label: 'Ciclo - 1' },
    { value: 'preciclo', label: 'Pre - ciclo' },
  ];


export default function Home() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <SitebarMain />
      <main className="flex-1 p-4 bg-white dark:bg-black">

        

        {/* Sección de cursos */}
        <h1 className="text-xl font-bold mb-4 text-black dark:text-white">Mis Cursos</h1>  
        <div className='flex flex-row gap-4 mb-4'>
          <SearchInput
              placeholder="Buscar cursos..."
              value={searchValue}
              onChange={setSearchValue}
              className="w-full flex" // Opcional, para ancho personalizado
            />
            
            <AdvancedSelect
                  id="periodo"
                  options={Periodo}
                  onValueChange={(value) => console.log(value)}
                />    
        </div>
        
        {/* Grid de cursos */}
        <div className="mt-4 w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
      {cursos.map((cursos, index) => (
        <CursoCard key={index} curso={cursos} />
      ))}
    </div>
      </main>
    </div>
  );
}