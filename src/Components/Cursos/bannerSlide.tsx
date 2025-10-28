import React, { useEffect, useMemo, useRef, useState } from "react";

const images = [
  "/banners/Banner Class_Beca Pariente_RDVYEO.jpg",
  "/banners/Banner Class_ELZPYZ.jpg",
  "/banners/Banner-phising-alumno_YAYEVF.png",
  "/banners/NUEVO-BANNER-NUEVAS-FILIALES-CLASS_SCDVQP.jpg",
];

const AUTOPLAY_MS = 3000;
const SWIPE_THRESHOLD_RATIO = 0.15; // 15% del ancho

const BannerSlide: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [deltaX, setDeltaX] = useState(0); // desplazamiento relativo durante drag
  const [paused, setPaused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const widthRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Observa el ancho real del contenedor (cambia con resize o cargas)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      widthRef.current = w;
    });
    ro.observe(el);
    // set inicial
    widthRef.current = el.getBoundingClientRect().width;

    return () => ro.disconnect();
  }, []);

  // Autoplay (pausado si arrastras o si el mouse está encima)
  useEffect(() => {
    if (paused || isDragging) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, isDragging]);

  const goTo = (i: number) => {
    const n = images.length;
    setIndex(((i % n) + n) % n);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // Pointer events (mouse + touch unificados)
  const onPointerDown: React.PointerEventHandler = (e) => {
    // Solo botón principal
    if (e.pointerType === "mouse" && e.button !== 0) return;
    setIsDragging(true);
    startXRef.current = e.clientX;
    setDeltaX(0);

    // Capturamos para seguir recibiendo move/up aunque salga del elemento
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove: React.PointerEventHandler = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startXRef.current;
    // Animación sin transición: usa RAF para evitar demasiados re-renders
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setDeltaX(dx);
    });
  };

  const onPointerUp: React.PointerEventHandler = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    const w = widthRef.current || 1;
    const threshold = w * SWIPE_THRESHOLD_RATIO;

    if (Math.abs(deltaX) > threshold) {
      deltaX < 0 ? next() : prev();
    }
    setDeltaX(0);
  };

  // Limpieza si el componente se desmonta mientras se arrastra
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Transform calculado
  const transform = useMemo(() => {
    const w = widthRef.current || 0;
    return `translateX(${-(index * w) + (isDragging ? deltaX : 0)}px)`;
  }, [index, isDragging, deltaX]);

  // Transición solo cuando NO arrastras (snap/auto)
  const transitionClass = isDragging
    ? ""
    : "transition-transform duration-500 ease-in-out";

  return (
    <div
      ref={containerRef}
      className="flex flex-col rounded-2xl w-full h-[25vh] aspect-video overflow-hidden select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        className={`flex h-fit cursor-grab active:cursor-grabbing ${transitionClass}`}
        style={{ transform }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {images.map((src, i) => (
          <div key={i} className="shrink-0 w-full h-fit">
            <img
              src={src}
              alt={`Banner ${i + 1}`}
              className="w-full h-full object-cover" // cover para llenar sin bandas
              draggable={false}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-2">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir al slide ${i + 1}`}
            className={`h-1 w-6 rounded-2xl transition-colors ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlide;

