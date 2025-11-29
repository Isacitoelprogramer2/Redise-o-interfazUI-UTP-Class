'use client';

export default function TareasTab() {
  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-200px)]">
      <div className="bg-(--card-bg) border border-(--card-border) rounded-xl p-6">
        <h2 className="text-xl font-semibold text-(--text) mb-4">Tareas</h2>
        <p className="text-(--text-secondary)">
          Visualiza y entrega las tareas asignadas del curso.
        </p>
      </div>
      
      <div className="bg-(--card-bg) border border-(--card-border) rounded-xl p-6 flex-1 overflow-y-auto">
        <div className="flex items-center justify-center h-full text-(--text-secondary)">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p>No hay tareas pendientes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
