import React, { useState, useRef, useEffect } from 'react';

const DraggableToast = ({ popCount, countryCount, regionCount, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const toastRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - toastRef.current.getBoundingClientRect().left,
      y: e.clientY - toastRef.current.getBoundingClientRect().top,
    });
    e.stopPropagation(); // Prevent event from reaching the map
    e.preventDefault(); // Prevent text selection
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const x = e.clientX - offset.x;
      const y = e.clientY - offset.y;
      toastRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Attach mousemove and mouseup events to the window
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
        zIndex: 10000, // Ensure this is higher than the map
      }}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseUp} // End dragging when mouse leaves
    >
      <div className= "text-cf-gray">
        <strong>{popCount} POPs</strong>
      </div>
      <div className= "text-cf-gray">
        <strong>{countryCount} Countries</strong>
        </div>
      <div className= "text-cf-gray">
        <strong>{regionCount} Regions</strong>
        </div>
      <button
        onClick={onClose}
        className="mt-2 text-red-500 hover:underline"
      >
        Close
      </button>
    </div>
  );
};

export default DraggableToast;
