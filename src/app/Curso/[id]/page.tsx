'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/Data/SupaBaseClient';
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
        const { data: courseData, error: courseError } = await supabase
          .from('cursos')
          .select('id, nombre, seccion')
          .eq('id', id)
          .single();

        if (courseError) throw courseError;
        setCourse(courseData);

        // Fetch weeks
        const { data: weeksData, error: weeksError } = await supabase
          .from('semanas')
          .select('id, nombre')
          .eq('curso_id', id)
          .order('id', { ascending: true });

        if (weeksError) throw weeksError;

        // Fetch contents for all weeks
        const weekIds = weeksData.map(w => w.id);
        let contentsData: any[] = [];
        
        if (weekIds.length > 0) {
            const { data, error: contentsError } = await supabase
            .from('contenidos')
            .select('id, semana_id, titulo, estado')
            .in('semana_id', weekIds);
            
            if (contentsError) throw contentsError;
            contentsData = data || [];
        }

        // Organize data
        const organizedWeeks: Week[] = weeksData.map(week => ({
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
    // Mark as completed if not already
    if (!content.completed) {
      try {
        const { error } = await supabase
          .from('contenidos')
          .update({ estado: true })
          .eq('id', content.id);

        if (error) throw error;

        // Update local state for weeks
        setWeeks(prevWeeks => prevWeeks.map(week => ({
          ...week,
          items: week.items.map(item =>
            item.id === content.id ? { ...item, completed: true } : item
          )
        })));

        // Update selectedContent if it's the same
        if (selectedContent && selectedContent.id === content.id) {
          setSelectedContent({ ...selectedContent, completed: true });
        }
      } catch (error) {
        console.error('Error updating content status:', error);
      }
    }

    // Set selected content and update active state
    setSelectedContent(content.completed ? content : { ...content, completed: true });
    setWeeks(prevWeeks => prevWeeks.map(week => ({
      ...week,
      items: week.items.map(item => ({
        ...item,
        active: item.id === content.id
      }))
    })));
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
