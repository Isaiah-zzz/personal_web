import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useTransform } from "motion/react";
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

interface ProjectAppProps {
  project: {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    github: string;
    demo: string;
    appIcon: string;
    category: string;
  };
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
  onClick: () => void;
}

export function ProjectApp({ project, position, onPositionChange, onClick }: ProjectAppProps) {
  const [isDragging, setIsDragging] = useState(false);

  // Smooth spring animations for position changes
  const springX = useSpring(position.x, { stiffness: 300, damping: 30 });
  const springY = useSpring(position.y, { stiffness: 300, damping: 30 });

  const [{ isDrag }, drag, preview] = useDrag({
    type: 'project',
    item: () => {
      setIsDragging(true);
      return { 
        id: project.id, 
        position,
        type: 'project'
      };
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      setIsDragging(false);
      // The drop target handles position updates
    },
    options: {
      dropEffect: 'move',
    },
  });

  // Set up drag preview
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <motion.div
      ref={drag}
      className={`absolute select-none ${isDrag ? 'cursor-grabbing z-50' : 'cursor-grab'}`}
      style={{
        left: springX,
        top: springY,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isDrag ? 1.15 : 1,
        opacity: isDrag ? 0.8 : 1,
        rotate: isDrag ? 8 : 0,
        y: isDrag ? -8 : 0,
        zIndex: isDrag ? 1000 : 1
      }}
      whileHover={{ 
        scale: isDrag ? 1.1 : 1.05,
        y: isDrag ? -5 : -2,
        transition: { type: "spring", stiffness: 400, damping: 15 }
      }}
      whileTap={{ scale: 0.95 }}
      onDoubleClick={onClick}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }}
    >
      <div className={`flex flex-col items-center space-y-2 p-2 transition-all duration-300 ${isDrag ? 'drop-shadow-2xl' : 'drop-shadow-lg'} ${isDrag ? 'pointer-events-none' : ''}`}>
        {/* Liquid Glass App Icon */}
        <motion.div
          className="relative w-16 h-16 rounded-xl overflow-hidden glass-strong"
          style={{
            background: `linear-gradient(135deg, ${getGradientForCategory(project.category)})`,
            boxShadow: isDrag 
              ? '0 25px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.2)' 
              : '0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1)',
          }}
          whileHover={{ 
            scale: isDrag ? 1.1 : 1.05,
            y: isDrag ? -2 : -1,
            transition: { type: "spring", stiffness: 400, damping: 15 }
          }}
          animate={{
            boxShadow: isDrag 
              ? '0 25px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.2)' 
              : '0 8px 32px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.1)'
          }}
        >
          <img
            src={project.appIcon}
            alt={project.title}
            className="w-full h-full object-cover rounded-xl"
          />
          
          {/* Liquid glass reflection */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent via-transparent to-white/30" />
          
          {/* Enhanced running indicator */}
          <motion.div
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-lg"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              background: `linear-gradient(135deg, ${getGradientForCategory(project.category)})`,
              boxShadow: '0 0 8px rgba(255,255,255,0.8)'
            }}
          />
          
          {/* Floating particles */}
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 rounded-full opacity-60"
            style={{
              background: `linear-gradient(135deg, ${getGradientForCategory(project.category)})`,
            }}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.9, 0.6]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        </motion.div>

        {/* App Name with Enhanced Glass Effect */}
        <motion.div
          className="text-xs text-center max-w-[80px] truncate font-semibold glass-strong rounded-lg px-3 py-1.5 text-foreground/90"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            background: isDrag 
              ? 'rgba(255,255,255,0.25)' 
              : 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: isDrag 
              ? '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)' 
              : '0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
          }}
        >
          {project.title}
        </motion.div>
      </div>


    </motion.div>
  );
}

function getGradientForCategory(category: string): string {
  const gradients: Record<string, string> = {
    'ecommerce': '#e2e8f0, #cbd5e1',
    'productivity': '#f1f5f9, #e2e8f0',
    'weather': '#f8fafc, #e2e8f0',
    'default': '#e2e8f0, #cbd5e1'
  };
  
  return gradients[category] || gradients.default;
}