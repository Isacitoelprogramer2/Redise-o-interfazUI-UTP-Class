'use client';

export default function ZoomTab() {
  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-200px)]">
      <div className="bg-(--card-bg) border border-(--card-border) rounded-xl p-6">
        <h2 className="text-xl font-semibold text-(--text) mb-4">Sesiones Zoom</h2>
        <p className="text-(--text-secondary)">
          Accede a las clases virtuales y grabaciones de sesiones anteriores.
        </p>
      </div>
      
      <div className="bg-(--card-bg) border border-(--card-border) rounded-xl p-6 flex-1 overflow-y-auto">
        <div className="flex items-center justify-center h-full text-(--text-secondary)">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p>No hay sesiones Zoom programadas</p>
          </div>
        </div>
      </div>
    </div>
  );
}
