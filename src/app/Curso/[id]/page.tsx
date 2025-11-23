'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSupabase } from '@/Data/SupaBaseClient';
import CourseHeader from '@/Components/Curso-content/CourseHeader';
import CourseTabs from '@/Components/Curso-content/CourseTabs';
import WeekAccordion from '@/Components/Curso-content/WeekAccordion';
import ContentViewer from '@/Components/Curso-content/ContentViewer';
import SitebarMain from '@/Components/Sitebar/sitebarMain';

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
  const [loading, setLoading] = useState(true);

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
          <CourseTabs />
          
          <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)]">
            <WeekAccordion weeks={weeks} onSelectContent={handleSelectContent} />
            <ContentViewer content={selectedContent} />
          </div>
        </div>
      </main>
    </div>
  );
}
