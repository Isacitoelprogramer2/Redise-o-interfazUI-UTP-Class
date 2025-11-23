import { Check, Circle, Download, ChevronLeft, ChevronRight } from 'lucide-react';

interface ContentItem {
  id: number;
  title: string;
  type: string;
  completed: boolean;
  active: boolean;
}

interface ContentViewerProps {
  content: ContentItem | null;
  onNext: () => void;
}

export default function ContentViewer({ content, onNext }: ContentViewerProps) {
  if (!content) {
    return (
      <div className="grow border border-(--card-border) rounded-lg bg-(--card-bg) p-6 flex flex-col h-full items-center justify-center">
        <span className="text-gray-400">Selecciona un contenido para ver</span>
      </div>
    );
  }

  return (
    <div className="grow border border-(--card-border) rounded-lg bg-(--card-bg) p-6 flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-(--text) mb-2">{content.title}</h2>
        <div className="flex items-center gap-2">
          {content.completed ? (
            <>
              <div className="relative flex items-center justify-center w-5 h-5">
                <Circle size={18} className="text-red-500 fill-current" />
                <Check size={12} className="absolute text-white" />
              </div>
              <span className="text-sm font-medium text-(--text)">Revisado</span>
            </>
          ) : (
            <span className="text-sm font-medium text-(--text)">Pendiente</span>
          )}
        </div>
      </div>

      <div className="grow bg-[#2d2d2d] rounded-lg flex items-center justify-center min-h-[500px] mb-4 relative">
        <span className="text-gray-400">Contenido PDF</span>
      </div>

      <div className="flex justify-end mb-6">
        <button className="flex items-center gap-2 px-4 py-2 border border-[#ff4545] text-[#ff4545] rounded-lg hover:bg-[#ff4545] hover:text-white transition-colors cursor-pointer">
          <Download size={18} />
          Descargar archivo
        </button>
      </div>

      <div className="flex justify-between mt-auto">
        <button className="flex items-center gap-2 px-4 py-2 border border-(--card-border) rounded-lg text-(--text) hover:bg-(--foreground) transition-colors cursor-pointer">
          <ChevronLeft size={18} />
          Anterior
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-4 py-2 bg-(--card-bg) border border-(--card-border) rounded-lg text-(--text) hover:bg-(--foreground) transition-colors cursor-pointer"
        >
          Siguiente
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
