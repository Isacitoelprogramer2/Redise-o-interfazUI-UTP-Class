'use client';

export default function NotasTab() {
  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-200px)]">
      <div className="bg-(--card-bg) border border-(--card-border) rounded-xl p-6">
        <h2 className="text-xl font-semibold text-(--text) mb-4">Notas</h2>
        <p className="text-(--text-secondary)">
          Consulta tus calificaciones y el progreso en el curso.
        </p>
      </div>
      
      <div className="bg-(--card-bg) border border-(--card-border) rounded-xl p-6 flex-1 overflow-y-auto">
        <div className="flex items-center justify-center h-full text-(--text-secondary)">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p>No hay notas disponibles</p>
          </div>
        </div>
      </div>
    </div>
  );
}
