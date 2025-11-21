"use client";

import * as React from "react";

type Size = "sm" | "md" | "lg";

export type TabItem = {
  id: string;
  label: string;
  /** Número opcional (ej. badge) */
  count?: number;
  /** Deshabilitar tab */
  disabled?: boolean;
};

export interface TabsProps {
  items: TabItem[];
  /** id seleccionado */
  value: string;
  /** callback al cambiar */
  onChange: (id: string) => void;
  /** tamaños predefinidos */
  size?: Size;
  /** estira cada tab a ancho equitativo */
  fullWidth?: boolean;
  /** clase extra para el contenedor */
  className?: string;
  /** aria-label para accesibilidad */
  "aria-label"?: string;
}

const sizeMap: Record<Size, { px: string; py: string; gap: string; text: string; radius: string }> = {
  sm: { px: "px-3", py: "py-1.5", gap: "gap-2", text: "text-sm", radius: "rounded-2xl" },
  md: { px: "px-4", py: "py-2", gap: "gap-3", text: "text-base", radius: "rounded-2xl" },
  lg: { px: "px-5", py: "py-2.5", gap: "gap-3", text: "text-lg", radius: "rounded-3xl" },
};

export const Tabs: React.FC<TabsProps> = ({
  items,
  value,
  onChange,
  size = "md",
  fullWidth = false,
  className = "",
  "aria-label": ariaLabel = "Tabs",
}) => {
  const listRef = React.useRef<HTMLDivElement>(null);
  const { px, py, gap, text, radius } = sizeMap[size];

  // manejo de flechas izquierda/derecha
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();

    const enabled = items.filter((t) => !t.disabled);
    const idx = enabled.findIndex((t) => t.id === value);
    if (idx === -1) return;

    const nextIdx =
      e.key === "ArrowRight"
        ? (idx + 1) % enabled.length
        : (idx - 1 + enabled.length) % enabled.length;

    onChange(enabled[nextIdx].id);
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={ariaLabel}
      className={[
        "inline-flex",
        gap,
        className,
      ].join(" ")}
      onKeyDown={onKeyDown}
    >
      {items.map((item) => {
        const isSelected = item.id === value;
        const base =
          "relative isolate " +
          `${px} ${py} ${radius} ` +
          "font-medium transition-colors duration-200 " +
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 " +
          "disabled:opacity-50 disabled:cursor-not-allowed";

        const active = "bg-[var(--accent-primary)] text-[var(--sidebar-text)] border border-[var(--sidebar-border)]";
        const inactive =
          "bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--input-hover-bg)] hover:text-[var(--sidebar-text)] border border-[var(--input-border)]";

        const width = fullWidth ? "flex-1" : "w-auto";

        return (
          <button
            key={item.id}
            role="tab"
            type="button"
            aria-selected={isSelected}
            aria-controls={`panel-${item.id}`}
            tabIndex={item.disabled ? -1 : isSelected ? 0 : -1}
            disabled={item.disabled}
            onClick={() => !item.disabled && onChange(item.id)}
            className={[base, width, text, isSelected ? active : inactive].join(" ")}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <span>{item.label}</span>
              {typeof item.count === "number" && (
                <span
                  className={
                    "min-w-6 px-2 py-0.5 text-xs leading-none " +
                    "rounded-full bg-white/20 text-white"
                  }
                  aria-hidden="true"
                >
                  {item.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
