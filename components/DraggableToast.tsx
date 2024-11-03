import React, { useState, useRef, useEffect } from 'react';

// Define the props interface
interface DraggableToastProps {
  popCount: number;
  countryCount: number;
  regionCount: number;
  onClose: () => void; // Assuming onClose is a function that takes no arguments and returns void
}

const DraggableToast: React.FC<DraggableToastProps> = ({ popCount, countryCount, regionCount, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const toastRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - toastRef.current!.getBoundingClientRect().left,
      y: e.clientY - toastRef.current!.getBoundingClientRect().top,
    });
    e.stopPropagation();
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const x = e.clientX - offset.x;
      const y = e.clientY - offset.y;
      if (toastRef.current) {
        toastRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={toastRef}
      className="fixed bg-white shadow-lg p-4 rounded border border-gray-300"
      style={{
        top: '20px',
        right: '20px',
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: 10000,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="text-cf-gray">
        <strong>{popCount} POPs</strong>
      </div>
      <div className="text-cf-gray">
        <strong>{countryCount} Countries</strong>
      </div>
      <div className="text-cf-gray">
        <strong>{regionCount} Regions</strong>
      </div>
      <button onClick={onClose} className="mt-2 text-red-500 hover:underline">
        Close
      </button>
    </div>
  );
};

export default DraggableToast;
