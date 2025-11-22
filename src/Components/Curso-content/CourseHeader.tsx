import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface CourseHeaderProps {
  title: string;
  section: string;
}

export default function CourseHeader({ title, section }: CourseHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Link 
        href="/" 
        className="flex items-center gap-2 text-[#ff4545] hover:text-[#e63939] transition-colors font-medium"
      >
        <ArrowLeft size={20} />
        Volver a cursos
      </Link>
      <h1 className="text-xl font-semibold text-(--text)">
        {title} - {section}
      </h1>
    </div>
  );
}
