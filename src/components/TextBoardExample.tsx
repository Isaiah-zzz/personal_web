import React, { useState, useEffect, useRef } from 'react';

interface TextItem {
  id: string;
  text: string;
  x: number;
  y: number;
  rotation: number;
  size: 'small' | 'medium' | 'large';
  opacity: number;
}

const TextBoardExample: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMouseOver, setIsMouseOver] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sample text content scattered across the board
  const textItems: TextItem[] = [
    { id: '1', text: 'React', x: 15, y: 20, rotation: -15, size: 'large', opacity: 0.8 },
    { id: '2', text: 'TypeScript', x: 75, y: 15, rotation: 10, size: 'medium', opacity: 0.7 },
    { id: '3', text: 'UI/UX Design', x: 25, y: 45, rotation: 5, size: 'medium', opacity: 0.6 },
    { id: '4', text: 'Full-Stack', x: 60, y: 35, rotation: -8, size: 'large', opacity: 0.9 },
    { id: '5', text: 'JavaScript', x: 85, y: 60, rotation: 12, size: 'medium', opacity: 0.7 },
    { id: '6', text: 'Node.js', x: 10, y: 70, rotation: -20, size: 'small', opacity: 0.5 },
    { id: '7', text: 'CSS', x: 45, y: 80, rotation: 15, size: 'small', opacity: 0.6 },
    { id: '8', text: 'HTML', x: 70, y: 85, rotation: -5, size: 'small', opacity: 0.5 },
    { id: '9', text: 'Git', x: 20, y: 90, rotation: 8, size: 'small', opacity: 0.4 },
    { id: '10', text: 'API Design', x: 80, y: 25, rotation: -12, size: 'medium', opacity: 0.8 },
    { id: '11', text: 'Database', x: 35, y: 10, rotation: 18, size: 'medium', opacity: 0.6 },
    { id: '12', text: 'Mobile Apps', x: 90, y: 45, rotation: -18, size: 'medium', opacity: 0.7 },
    { id: '13', text: 'Cloud', x: 5, y: 50, rotation: 25, size: 'small', opacity: 0.5 },
    { id: '14', text: 'DevOps', x: 55, y: 95, rotation: -10, size: 'small', opacity: 0.4 },
    { id: '15', text: 'Testing', x: 30, y: 65, rotation: 7, size: 'small', opacity: 0.6 },
    { id: '16', text: 'Performance', x: 65, y: 5, rotation: -25, size: 'medium', opacity: 0.7 },
    { id: '17', text: 'Security', x: 15, y: 40, rotation: 20, size: 'small', opacity: 0.5 },
    { id: '18', text: 'Scalability', x: 75, y: 75, rotation: -15, size: 'medium', opacity: 0.6 },
    { id: '19', text: 'Innovation', x: 40, y: 30, rotation: 12, size: 'large', opacity: 0.8 },
    { id: '20', text: 'Creativity', x: 85, y: 10, rotation: -8, size: 'medium', opacity: 0.7 },
  ];

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setCursorPosition({ x, y });
    }
  };

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  // Get size classes
  const getSizeClass = (size: string) => {
    switch (size) {
      case 'small': return 'text-xs';
      case 'medium': return 'text-sm';
      case 'large': return 'text-base';
      default: return 'text-sm';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Hidden Text Board Example</h1>
        <p className="text-gray-300 text-lg">Move your cursor around to reveal the hidden text!</p>
      </div>
      
      <div
        ref={containerRef}
        className="relative w-full max-w-4xl h-96 bg-white rounded-lg shadow-2xl overflow-hidden cursor-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        }}
      >
        {/* Hidden text layer with mask */}
        <div 
          className="absolute inset-0"
          style={{
            mask: isMouseOver 
              ? `radial-gradient(circle 100px at ${cursorPosition.x}% ${cursorPosition.y}%, black 0%, black 40%, transparent 70%)`
              : 'radial-gradient(circle 0px at 50% 50%, black 0%, transparent 0%)',
            WebkitMask: isMouseOver 
              ? `radial-gradient(circle 100px at ${cursorPosition.x}% ${cursorPosition.y}%, black 0%, black 40%, transparent 70%)`
              : 'radial-gradient(circle 0px at 50% 50%, black 0%, transparent 0%)',
            transition: 'mask 0.2s ease-out, -webkit-mask 0.2s ease-out',
          }}
        >
          {textItems.map((item) => (
            <div
              key={item.id}
              className={`absolute select-none pointer-events-none font-medium text-gray-800 ${getSizeClass(item.size)}`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: `rotate(${item.rotation}deg)`,
                opacity: item.opacity,
              }}
            >
              {item.text}
            </div>
          ))}
        </div>

        {/* Revealer effect indicator */}
        {isMouseOver && (
          <div
            className="absolute pointer-events-none border-2 border-red-500 rounded-full"
            style={{
              left: `${cursorPosition.x}%`,
              top: `${cursorPosition.y}%`,
              transform: 'translate(-50%, -50%)',
              width: '200px',
              height: '200px',
              transition: 'all 0.1s ease-out',
            }}
          />
        )}

        {/* Cursor indicator */}
        {isMouseOver && (
          <div
            className="absolute pointer-events-none w-2 h-2 bg-red-500 rounded-full"
            style={{
              left: `${cursorPosition.x}%`,
              top: `${cursorPosition.y}%`,
              transform: 'translate(-50%, -50%)',
              transition: 'all 0.1s ease-out',
            }}
          />
        )}

        {/* Instructions overlay */}
        <div className="absolute top-4 left-4 right-4 text-center">
          <div className="inline-block bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm">
            Move your cursor around to reveal hidden text
          </div>
        </div>
      </div>

      {/* Additional info */}
      <div className="mt-8 text-center">
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-white mb-3">How it works:</h2>
          <ul className="text-gray-300 text-left space-y-2">
            <li>• Text is scattered across a white background</li>
            <li>• A circular revealer follows your cursor</li>
            <li>• Text becomes visible when the revealer passes over it</li>
            <li>• Uses CSS blend modes and transforms for smooth effects</li>
            <li>• Performance optimized with React hooks and event handling</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TextBoardExample;
