import React, { useState, useEffect, useRef } from 'react';

const BannerSlide: React.FC = () => {
  // Array de imágenes para el banner (puedes reemplazar con tus propias URLs)
  const images = [
    '/banners/Banner Class_Beca Pariente_RDVYEO.jpg',
    '/banners/Banner Class_ELZPYZ.jpg',
    '/banners/Banner-phising-alumno_YAYEVF.png',
    '/banners/NUEVO-BANNER-NUEVAS-FILIALES-CLASS_SCDVQP.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Obtener el ancho del slide
  useEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current) {
        setSlideWidth(sliderRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Cambio automático cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Función para cambiar al siguiente slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Función para cambiar al slide anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Manejo de eventos de mouse/touch para swipe
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartPos(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const currentPosition = clientX;
    const diff = startPos - currentPosition;
    setCurrentTranslate(diff);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 50; // Umbral para considerar swipe
    if (Math.abs(currentTranslate) > threshold) {
      if (currentTranslate > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    setCurrentTranslate(0);
  };

  // Eventos de mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Eventos de touch
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  return (
    <div className="relative rounded-2xl w-full h-40 aspect-video overflow-hidden">
      {/* Contenedor del slider */}
      <div
        ref={sliderRef}
        className="flex h-full transition-transform duration-500 ease-in-out cursor-grab active:cursor-grabbing"
        style={{
          transform: `translateX(${-currentIndex * slideWidth + currentTranslate}px)`,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Para soltar si sale del contenedor
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, index) => (
          <div key={index} className="shrink-0 w-full h-full">
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Dots indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlide;
