'use client';

import WeekAccordion from '../WeekAccordion';
import ContentViewer from '../ContentViewer';

interface ContentItem {
  id: number;
  title: string;
  type: string;
  completed: boolean;
  active: boolean;
}

interface Week {
  id: number;
  title: string;
  items: ContentItem[];
}

interface ContenidoTabProps {
  weeks: Week[];
  selectedContent: ContentItem | null;
  expandedWeek: string | number | null;
  onSelectContent: (content: ContentItem) => void;
  onToggleWeek: (id: string | number) => void;
  onNext: () => void;
}

export default function ContenidoTab({
  weeks,
  selectedContent,
  expandedWeek,
  onSelectContent,
  onToggleWeek,
  onNext,
}: ContenidoTabProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)]">
      <WeekAccordion
        weeks={weeks}
        onSelectContent={onSelectContent}
        expandedWeek={expandedWeek}
        onToggleWeek={onToggleWeek}
      />
      <ContentViewer content={selectedContent} onNext={onNext} />
    </div>
  );
}
