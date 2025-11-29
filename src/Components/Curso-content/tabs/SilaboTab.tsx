'use client';

export default function SilaboTab() {
  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-200px)]">
      <div className="bg-(--card-bg) border border-(--card-border) rounded-xl p-6">
        <h2 className="text-xl font-semibold text-(--text) mb-4">Silabo del Curso</h2>
        <p className="text-(--text-secondary)">
          Aquí encontrarás el silabo completo del curso con los objetivos, competencias y contenidos programados.
        </p>
      </div>
      
      <div className="bg-(--card-bg) border border-(--card-border) rounded-xl p-6 flex-1">
        <div className="flex items-center justify-center h-full text-(--text-secondary)">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>No hay silabo disponible</p>
          </div>
        </div>
      </div>
    </div>
  );
}
