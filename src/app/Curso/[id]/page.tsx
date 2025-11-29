'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSupabase } from '@/Data/SupaBaseClient';
import CourseHeader from '@/Components/Curso-content/CourseHeader';
import CourseTabs, { TabName } from '@/Components/Curso-content/CourseTabs';
import WeekAccordion from '@/Components/Curso-content/WeekAccordion';
import ContentViewer from '@/Components/Curso-content/ContentViewer';
import SitebarMain from '@/Components/Sitebar/sitebarMain';

// Tab components
import ContenidoTab from '@/Components/Curso-content/tabs/ContenidoTab';
import SilaboTab from '@/Components/Curso-content/tabs/SilaboTab';
import EvaluacionesTab from '@/Components/Curso-content/tabs/EvaluacionesTab';
import TareasTab from '@/Components/Curso-content/tabs/TareasTab';
import ForosTab from '@/Components/Curso-content/tabs/ForosTab';
import NotasTab from '@/Components/Curso-content/tabs/NotasTab';
import AnunciosTab from '@/Components/Curso-content/tabs/AnunciosTab';
import ZoomTab from '@/Components/Curso-content/tabs/ZoomTab';

// Types
interface ContentItem {
  id: number;
  title: string;
  type: string;
  completed: boolean;
  active: boolean;
}

interface Week {
  id: number;
  title: string;
  items: ContentItem[];
}

interface Course {
  id: number;
  nombre: string;
  seccion: string;
}

// Database types
interface CursoDB {
  id: number;
  nombre: string;
  seccion: string;
}

interface SemanaDB {
  id: number;
  nombre: string;
  curso_id: number;
}

interface ContenidoDB {
  id: number;
  semana_id: number;
  titulo: string;
  estado: boolean;
}

export default function CursoPage() {
  const params = useParams();
  const id = params.id;

  const [course, setCourse] = useState<Course | null>(null);
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [expandedWeek, setExpandedWeek] = useState<string | number | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabName>('Contenido');

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch course details
        const { data: courseData, error: courseError } = await getSupabase()
          .from('cursos')
          .select('id, nombre, seccion')
          .eq('id', id)
          .single();

        if (courseError) throw courseError;
        setCourse(courseData);

        // Fetch weeks
        const { data: weeksData, error: weeksError } = await getSupabase()
          .from('semanas')
          .select('id, nombre')
          .eq('curso_id', id)
          .order('id', { ascending: true });

        const weeks = (weeksData as SemanaDB[]) || [];

        if (weeksError) throw weeksError;

        // Fetch contents for all weeks
        const weekIds = weeks.map(w => w.id);
        let contentsData: ContenidoDB[] = [];

        if (weekIds.length > 0) {
          const { data, error: contentsError } = await getSupabase()
            .from('contenidos')
            .select('id, semana_id, titulo, estado')
            .in('semana_id', weekIds);

          if (contentsError) throw contentsError;
          contentsData = (data as ContenidoDB[]) || [];
        }

        // Organize data
        const organizedWeeks: Week[] = weeks.map(week => ({
          id: week.id,
          title: week.nombre,
          items: contentsData
            .filter(c => c.semana_id === week.id)
            .map(c => ({
              id: c.id,
              title: c.titulo,
              type: 'file', // Default type
              completed: c.estado,
              active: false
            }))
        }));

        setWeeks(organizedWeeks);
        if (organizedWeeks.length > 0) {
          setExpandedWeek(organizedWeeks[0].id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSelectContent = async (content: ContentItem) => {
    setSelectedContent(content);
    // Update active state in weeks
    setWeeks(prevWeeks => prevWeeks.map(week => ({
      ...week,
      items: week.items.map(item => ({
        ...item,
        active: item.id === content.id
      }))
    })));

    // Mark as completed if not already
    if (!content.completed) {
      try {
        const { error } = await getSupabase()
          .from('contenidos')
          // @ts-ignore
          .update({ estado: true })
          .eq('id', content.id);

        if (error) throw error;

        // Update local state
        setWeeks(prevWeeks => prevWeeks.map(week => ({
          ...week,
          items: week.items.map(item =>
            item.id === content.id ? { ...item, completed: true } : item
          )
        })));
      } catch (error) {
        console.error('Error updating content status:', error);
      }
    }
  };

  const handleNext = async () => {
    if (!selectedContent || !weeks.length) return;

    // Find current week and item index
    let currentWeekIndex = -1;
    let currentItemIndex = -1;

    for (let i = 0; i < weeks.length; i++) {
      const itemIndex = weeks[i].items.findIndex(item => item.id === selectedContent.id);
      if (itemIndex !== -1) {
        currentWeekIndex = i;
        currentItemIndex = itemIndex;
        break;
      }
    }

    if (currentWeekIndex === -1) return;

    const currentWeek = weeks[currentWeekIndex];
    let nextContent: ContentItem | null = null;
    let nextWeekId: string | number | null = null;

    // Check if there is a next item in the current week
    if (currentItemIndex < currentWeek.items.length - 1) {
      nextContent = currentWeek.items[currentItemIndex + 1];
    }
    // Check if there is a next week
    else if (currentWeekIndex < weeks.length - 1) {
      const nextWeek = weeks[currentWeekIndex + 1];
      if (nextWeek.items.length > 0) {
        nextContent = nextWeek.items[0];
        nextWeekId = nextWeek.id;
      }
    }

    if (nextContent) {
      await handleSelectContent(nextContent);
      if (nextWeekId) {
        setExpandedWeek(nextWeekId);
      }
    }
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-background text-foreground">Cargando...</div>;
  }

  if (!course) {
    return <div className="flex min-h-screen items-center justify-center bg-background text-foreground">Curso no encontrado</div>;
  }

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <SitebarMain />
      <main className="flex-1 p-6 overflow-y-auto h-screen">
        <div className="max-w-[1600px] mx-auto">
          <CourseHeader title={course.nombre} section={course.seccion} />
          <CourseTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {activeTab === 'Contenido' && (
            <ContenidoTab
              weeks={weeks}
              selectedContent={selectedContent}
              expandedWeek={expandedWeek}
              onSelectContent={handleSelectContent}
              onToggleWeek={(id) => setExpandedWeek(id === expandedWeek ? null : id)}
              onNext={handleNext}
            />
          )}
          {activeTab === 'Silabo' && <SilaboTab />}
          {activeTab === 'Evaluaciones' && <EvaluacionesTab />}
          {activeTab === 'Tareas' && <TareasTab />}
          {activeTab === 'Foros' && <ForosTab />}
          {activeTab === 'Notas' && <NotasTab />}
          {activeTab === 'Anuncios' && <AnunciosTab />}
          {activeTab === 'Zoom' && <ZoomTab />}
        </div>
      </main>
    </div>
  );
}
