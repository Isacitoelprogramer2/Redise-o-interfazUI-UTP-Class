"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Sun, Moon, Settings, LogOut } from "lucide-react";

type MenuUserProps = {
	/** Controla la apertura del menú */
	open: boolean;
	/** Ref del contenedor ancla (el "Contenedor perfil usuario" en el sidebar) */
	anchorRef: React.RefObject<HTMLElement | null>;
	/** Cerrar menú */
	onClose: () => void;
	/** Opcional: callback para ir a configuración */
	onOpenSettings?: () => void;
	/** Opcional: callback para cerrar sesión */
	onLogout?: () => void;
};

// Utilidad: obtiene tema actual desde DOM o sistema
function getInitialTheme(): "light" | "dark" {
	if (typeof window === "undefined") return "dark";
	const stored = localStorage.getItem("theme");
	if (stored === "light" || stored === "dark") return stored;
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	return prefersDark ? "dark" : "light";
}

const MenuUser: React.FC<MenuUserProps> = ({ open, anchorRef, onClose, onOpenSettings, onLogout }) => {
	const [mounted, setMounted] = useState(false);
	const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme());
	const panelRef = useRef<HTMLDivElement | null>(null);
	const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [shouldRender, setShouldRender] = useState<boolean>(open);
  const [visible, setVisible] = useState<boolean>(false);

	// Montaje para portal en cliente
	useEffect(() => setMounted(true), []);

	// Sincroniza clase .dark en el <html>
	useEffect(() => {
		if (typeof document === "undefined") return;
		const root = document.documentElement;
		if (theme === "dark") root.classList.add("dark");
		else root.classList.remove("dark");
		localStorage.setItem("theme", theme);
	}, [theme]);

	// Calcula posición con base al ancla
	const updatePosition = useCallback(() => {
		const anchor = anchorRef.current;
		if (!anchor) return;
		const rect = anchor.getBoundingClientRect();
		const GAP = 23; // separación del sidebar
		const estimatedMenuHeight = 180; // para mantener en viewport
		const verticalOffset = 35;
		const maxTop = Math.max(16, Math.min(rect.top + verticalOffset , window.innerHeight - estimatedMenuHeight - 16));
		setPosition({ top: maxTop, left: rect.right + GAP });
	}, [anchorRef]);

	useEffect(() => {
		if (!open) return;
		updatePosition();
		const onResize = () => updatePosition();
		window.addEventListener("resize", onResize);
		window.addEventListener("scroll", onResize, true);
		return () => {
			window.removeEventListener("resize", onResize);
			window.removeEventListener("scroll", onResize, true);
		};
	}, [open, updatePosition]);

	// Mantener montado para animación de salida y animar entrada
	useEffect(() => {
		if (open) {
			setShouldRender(true);
			const id = setTimeout(() => setVisible(true), 10);
			return () => clearTimeout(id);
		}
		setVisible(false);
		const t = setTimeout(() => setShouldRender(false), 300);
		return () => clearTimeout(t);
	}, [open]);

	// Cierra con ESC
	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);

	const overlay = shouldRender && (
			<div
			role="dialog"
			aria-modal="true"
			aria-labelledby="menu-user-title"
				className="fixed inset-0 z-100"
		>
			{/* Fondo para capturar clicks fuera */}
			<button
				aria-label="Cerrar menú"
				onClick={onClose}
				className={`absolute inset-0 bg-black/30 backdrop-blur-[1px] focus:outline-none transition-opacity duration-300 ease-out ${visible ? 'opacity-100' : 'opacity-0'}`}
			/>

			{/* Panel */}
			<div
				ref={panelRef}
				style={{ top: position.top, left: position.left }}
				className={`absolute w-[280px] rounded-2xl border border-neutral-700 bg-[#1F1F1F] text-white shadow-2xl transform transition-all duration-200 ease-out origin-top-left ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
			>
				<div className="p-3">
					<h3 id="menu-user-title" className="px-2 pb-2 text-sm font-semibold text-neutral-200">
						Tema
					</h3>
					{/* Toggle claro/oscuro */}
					<div className="grid grid-cols-2 gap-2 rounded-2xl bg-[#2B2B2B] p-1">
						<button
							onClick={() => setTheme("light")}
							className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-sm transition-colors ${
								theme === "light"
									? "bg-white text-black"
									: "text-neutral-400 hover:text-white"
							}`}
							aria-pressed={theme === "light"}
						>
							<Sun size={16} /> Claro
						</button>
						<button
							onClick={() => setTheme("dark")}
							className={`flex items-center justify-center gap-2 rounded-2xl px-3 py-2 text-sm transition-colors ${
								theme === "dark"
									? "bg-white text-black"
									: "text-neutral-400 hover:text-white"
							}`}
							aria-pressed={theme === "dark"}
						>
							<Moon size={16} /> Oscuro
						</button>
					</div>
				</div>

				<div className="mx-3 h-px bg-neutral-800" />

				<div className="p-1">
					<button
						onClick={onOpenSettings}
						className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[15px] text-neutral-300 hover:bg-neutral-800/70 hover:text-white"
					>
						<Settings size={18} className="text-neutral-400" />
						Configuración
					</button>
					<button
						onClick={onLogout}
						className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[15px] text-neutral-300 hover:bg-neutral-800/70 hover:text-white"
					>
						<LogOut size={18} className="text-neutral-400" />
						Cerrar Sesión
					</button>
				</div>
			</div>
		</div>
	);

	if (!mounted) return null;
	return createPortal(overlay, document.body);
};

export default MenuUser;

