// app/actividades/page.tsx
import React from "react";
import { Menu, AlertCircle, XCircle, FilePen, MessageCircle, FileText } from "lucide-react";

type ChipVariant = "tarea" | "foro" | "evaluacion";
type StatusKind = "pendiente" | "vencida";

type Activity = {
  id: string;
  chip: { variant: ChipVariant; label: string };
  topLabel: string; // "TA semana 10" / "(AC-S12)..."
  course: string; // "INGLÉS II"
  duePrefix: "Vence el" | "Caducó el";
  dueDate: string; // "20 de octubre 2025"
  dueTime: string; // "11:00 PM"
  status: { kind: StatusKind; label: string };
};

const DATA: Activity[] = [
  {
    id: "1",
    chip: { variant: "tarea", label: "Tarea Calificada" },
    topLabel: "TA semana 10",
    course: "INGLÉS II",
    duePrefix: "Vence el",
    dueDate: "20 de octubre 2025",
    dueTime: "11:00 PM",
    status: { kind: "pendiente", label: "Pendiente" },
  },
  {
    id: "2",
    chip: { variant: "foro", label: "Foro no calificado" },
    topLabel: "Foro semana 10",
    course: "MATEMÁTICA II",
    duePrefix: "Vence el",
    dueDate: "20 de octubre 2025",
    dueTime: "11:00 PM",
    status: { kind: "pendiente", label: "Pendiente" },
  },
  {
    id: "3",
    chip: { variant: "evaluacion", label: "Evaluación calificada" },
    topLabel:
      "(AC-S12) Week 12 - Pre-Task: Quiz - Listening Week 12 (PA)",
    course: "MATEMÁTICA II",
    duePrefix: "Caducó el",
    dueDate: "20 de octubre 2025",
    dueTime: "11:00 PM",
    status: { kind: "vencida", label: "Vencida" },
  },
];

/* ---------- UI helpers ---------- */
function Chip({ variant, children }: { variant: ChipVariant; children: React.ReactNode }) {
  const styles: Record<ChipVariant, string> = {
    tarea:      "bg-yellow-100 dark:bg-[#4a4b2a] text-yellow-800 dark:text-[#d7db9d]",      // oliva
    foro:       "bg-teal-100 dark:bg-[#2d5f59] text-teal-800 dark:text-[#c7efe7]",      // teal verdoso
    evaluacion: "bg-indigo-100 dark:bg-[#2f3e6b] text-indigo-800 dark:text-[#c7d7ff]",      // índigo
  };
  const icons: Record<ChipVariant, React.ComponentType<any>> = {
    tarea: FilePen,
    foro: MessageCircle,
    evaluacion: FileText,
  };
  const Icon = icons[variant];
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[13px] font-medium ${styles[variant]}`}
    >
      <Icon className="w-4 h-4 opacity-90" />
      {children}
    </span>
  );
}

function StatusRow({ kind, label }: { kind: StatusKind; label: string }) {
  const cfg =
    kind === "pendiente"
      ? { Icon: AlertCircle, text: "text-yellow-600 dark:text-[#f5c84b]" } // amarillo
      : { Icon: XCircle, text: "text-red-600 dark:text-[#f06262]" };    // rojo
  const { Icon, text } = cfg;
  return (
    <div className="flex items-center gap-2">
      <Icon className={`w-5 h-5 ${text}`} />
      <span className={`text-sm font-medium ${text}`}>{label}</span>
    </div>
  );
}

function ActivityCard({ a }: { a: Activity }) {
  const topLabelColor = "text-blue-600 dark:text-[#94D8FF]"; 
  const dueMuted = "text-zinc-600 dark:text-[#a3a3a3]";

  return (
    <article className="rounded-[22px] bg-white dark:bg-[#2a2a2a] p-5 shadow-sm border border-zinc-200 dark:border-transparent dark:shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      {/* Chip */}
      <div className="mb-4">
        <Chip variant={a.chip.variant}>{a.chip.label}</Chip>
      </div>

      {/* Top pink label */}
      <div className={`text-sm font-light ${topLabelColor} mb-1`}>{a.topLabel}</div>

      {/* Course */}
      <h3 className="text-md leading-tight tracking-wide text-zinc-900 dark:text-white font-semibold mb-4 uppercase">
        {a.course}
      </h3>

      {/* Due + status */}
      <div className="flex flex-col gap-3">
        {/*status */}
        <div className="min-w-[120px]">
          <StatusRow kind={a.status.kind} label={a.status.label} />
        </div>
        {/* Due*/}
        <div className="flex-1">
          <p className={`${dueMuted} text-sm`}>
            {a.duePrefix} <span className="whitespace-nowrap">{a.dueDate}</span>
          </p>
          <p className={`${dueMuted} text-sm`}>a las {a.dueTime}</p>
        </div>
      </div>
    </article>
  );
}

export const ActividadesSemanales = () => {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl h-full text-zinc-900 dark:text-white max-h-[calc(100vh-2rem)] overflow-y-auto custom-scrollbar border border-zinc-200 dark:border-transparent">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-neutral-900">
        <div className="mx-auto px-4 py-4 flex items-center gap-3">
          <button
            aria-label="Abrir menú"
            className="grid place-items-center w-9 h-9 rounded-xl bg-zinc-100 dark:bg-[#1a1a1a] text-zinc-700 dark:text-white/80"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Actividades semanales</h1>
        </div>
      </header>

      {/* Content */}
      <section className="mx-auto  px-4 pb-8">
        <div className="flex flex-col gap-5">
          {DATA.map((a) => (
            <ActivityCard key={a.id} a={a} />
          ))}
        </div>
      </section>
    </div>
  );
}
