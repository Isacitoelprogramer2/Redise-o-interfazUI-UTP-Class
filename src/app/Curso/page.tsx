import CourseHeader from '@/Components/Curso-content/CourseHeader';
import CourseTabs from '@/Components/Curso-content/CourseTabs';
import WeekAccordion from '@/Components/Curso-content/WeekAccordion';
import ContentViewer from '@/Components/Curso-content/ContentViewer';
import SitebarMain from '@/Components/Sitebar/sitebarMain';

export default function CursoPage() {
  return (
    <div className="flex min-h-screen bg-background font-sans">
      <SitebarMain />
      <main className="flex-1 p-6 overflow-y-auto h-screen">
        <div className="max-w-[1600px] mx-auto">
          <CourseHeader title="Curso de Ejemplo" section="Sección 00" />
          <CourseTabs />
          
          <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)]">
            <WeekAccordion />
            <ContentViewer content={null} />
          </div>
        </div>
      </main>
    </div>
  );
}
