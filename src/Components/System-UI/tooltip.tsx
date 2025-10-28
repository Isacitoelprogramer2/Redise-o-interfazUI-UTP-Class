import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + rect.height / 2,
        left: rect.right + 8, // 8px margin
      });
    }
  }, [isVisible]);

  return (
    <>
      <div
        ref={triggerRef}
        className="relative"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      <TooltipPortal isVisible={isVisible} position={position} content={content} />
    </>
  );
};

interface TooltipPortalProps {
  isVisible: boolean;
  position: { top: number; left: number };
  content: string;
}

const TooltipPortal: React.FC<TooltipPortalProps> = ({ isVisible, position, content }) => {
  return ReactDOM.createPortal(
    <div
      className={`fixed bg-black text-white text-sm px-2 py-1 rounded shadow-lg z-50 whitespace-nowrap pointer-events-none transition-all duration-200 ease-out ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}
      style={{ top: position.top, left: position.left, transform: 'translateY(-50%)' }}
    >
      {content}
    </div>,
    document.body
  );
};

export default Tooltip;