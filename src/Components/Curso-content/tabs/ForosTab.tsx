'use client';

export default function ForosTab() {
  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-200px)]">
      <div className="bg-(--card-bg) border border-(--card-border) rounded-xl p-6">
        <h2 className="text-xl font-semibold text-(--text) mb-4">Foros de Discusión</h2>
        <p className="text-(--text-secondary)">
          Participa en los foros de discusión del curso e interactúa con tus compañeros.
        </p>
      </div>
      
      <div className="bg-(--card-bg) border border-(--card-border) rounded-xl p-6 flex-1 overflow-y-auto">
        <div className="flex items-center justify-center h-full text-(--text-secondary)">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
            <p>No hay foros activos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
