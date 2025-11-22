export default function CourseTabs() {
  const tabs = [
    { name: 'Contenido', active: true },
    { name: 'Silabo', active: false },
    { name: 'Evaluaciones', active: false },
    { name: 'Tareas', active: false },
    { name: 'Foros', active: false },
    { name: 'Notas', active: false },
    { name: 'Anuncios', active: false },
    { name: 'Zoom', active: false },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            tab.active
              ? 'bg-[#ff4545] text-white'
              : 'bg-(--card-bg) text-(--text) border border-(--card-border) hover:bg-(--sidebar-hover)'
          }`}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
}
