export type TabName = 'Contenido' | 'Silabo' | 'Evaluaciones' | 'Tareas' | 'Foros' | 'Notas' | 'Anuncios' | 'Zoom';

interface CourseTabsProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
}

export default function CourseTabs({ activeTab, onTabChange }: CourseTabsProps) {
  const tabs: TabName[] = [
    'Contenido',
    'Silabo',
    'Evaluaciones',
    'Tareas',
    'Foros',
    'Notas',
    'Anuncios',
    'Zoom',
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            activeTab === tab
              ? 'bg-[#ff4545] text-white'
              : 'bg-(--card-bg) text-(--text) border border-(--card-border) hover:bg-(--sidebar-hover)'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
