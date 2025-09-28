import React, { useState, useRef } from "react";
import { Button } from "./ui/button";
import { motion } from "motion/react";

interface TextItem {
  id: string;
  text: string;
  x: number;
  y: number;
  rotation: number;
  size: 'small' | 'medium' | 'large' | 'x-large' | 'xx-large';
  opacity: number;
}

export function Hero() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isMouseOver, setIsMouseOver] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Text content for the hidden board
  const textItems: TextItem[] = [
    { id: '1', text: 'React', x: 15, y: 20, rotation: -15, size: 'xx-large', opacity: 0.8 },
    { id: '2', text: 'TypeScript', x: 75, y: 15, rotation: 10, size: 'xx-large', opacity: 0.7 },
    { id: '3', text: 'UI/UX Design', x: 25, y: 45, rotation: 5, size: 'xx-large', opacity: 0.6 },
    { id: '4', text: 'Full-Stack', x: 60, y: 35, rotation: -8, size: 'xx-large', opacity: 0.9 },
    { id: '5', text: 'JavaScript', x: 85, y: 60, rotation: 12, size: 'xx-large', opacity: 0.7 },
    { id: '6', text: 'Node.js', x: 10, y: 70, rotation: -20, size: 'xx-large', opacity: 0.5 },
    { id: '7', text: 'CSS', x: 45, y: 80, rotation: 15, size: 'xx-large', opacity: 0.6 },
    { id: '8', text: 'HTML', x: 70, y: 85, rotation: -5, size: 'xx-large', opacity: 0.5 },
    { id: '9', text: 'Git', x: 20, y: 90, rotation: 8, size: 'x-large', opacity: 0.4 },
    { id: '10', text: 'API Design', x: 80, y: 25, rotation: -12, size: 'x-large', opacity: 0.8 },
    { id: '11', text: 'Database', x: 35, y: 10, rotation: 18, size: 'medium', opacity: 0.6 },
    // { id: '12', text: 'Mobile Apps', x: 90, y: 45, rotation: -18, size: 'medium', opacity: 0.7 },
    // { id: '13', text: 'Cloud', x: 5, y: 50, rotation: 25, size: 'small', opacity: 0.5 },
    // { id: '14', text: 'DevOps', x: 55, y: 95, rotation: -10, size: 'small', opacity: 0.4 },
    // { id: '15', text: 'Testing', x: 30, y: 65, rotation: 7, size: 'small', opacity: 0.6 },
    { id: '16', text: 'Performance', x: 65, y: 5, rotation: -25, size: 'medium', opacity: 0.7 },
    { id: '17', text: 'Security', x: 15, y: 40, rotation: 20, size: 'small', opacity: 0.5 },
    { id: '18', text: 'Scalability', x: 75, y: 75, rotation: -15, size: 'medium', opacity: 0.6 },
    { id: '19', text: 'Innovation', x: 40, y: 30, rotation: 12, size: 'large', opacity: 0.8 },
    { id: '20', text: 'Creativity', x: 85, y: 10, rotation: -8, size: 'medium', opacity: 0.7 },
    { id: '21', text: 'Problem Solving', x: 50, y: 55, rotation: 22, size: 'medium', opacity: 0.6 },
    { id: '22', text: 'Team Work', x: 25, y: 75, rotation: -18, size: 'small', opacity: 0.5 },
    { id: '23', text: 'Leadership', x: 70, y: 40, rotation: 15, size: 'medium', opacity: 0.7 },
    { id: '24', text: 'Communication', x: 45, y: 15, rotation: -22, size: 'small', opacity: 0.6 },
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
      case 'x-large': return 'text-2xl';
      case 'xx-large': return 'text-3xl';
      default: return 'text-sm';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hidden text board background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.1) 0%, rgba(226, 232, 240, 0.1) 100%)',
          mask: isMouseOver 
            ? `radial-gradient(circle 150px at ${cursorPosition.x}% ${cursorPosition.y}%, black 0%, black 40%, transparent 70%)`
            : 'radial-gradient(circle 0px at 50% 50%, black 0%, transparent 0%)',
          WebkitMask: isMouseOver 
            ? `radial-gradient(circle 150px at ${cursorPosition.x}% ${cursorPosition.y}%, black 0%, black 40%, transparent 70%)`
            : 'radial-gradient(circle 0px at 50% 50%, black 0%, transparent 0%)',
          transition: 'mask 0.3s ease-out, -webkit-mask 0.3s ease-out',
        }}
      >
        {textItems.map((item) => (
          <div
            key={item.id}
            className={`absolute select-none pointer-events-none font-medium text-foreground/20 ${getSizeClass(item.size)}`}
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

      {/* Liquid background layers */}
      <div className="absolute inset-0 liquid-gradient opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="mb-8"
            variants={itemVariants}
          >
            <motion.div
              className="relative cursor-pointer"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="glass-strong rounded-full p-2 inline-block">
                <img
                  src="src/image/pfp1.JPG"
                  alt="Isaiah Zhou"
                  className="w-32 h-32 rounded-full object-cover"
                />
              </div>
              {/* Subtle floating particles around avatar */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-slate-300 to-slate-400 rounded-full floating-element opacity-30" />
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-gray-300 to-slate-300 rounded-full floating-element opacity-30" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 -right-4 w-2 h-2 bg-gradient-to-r from-slate-400 to-gray-400 rounded-full floating-element opacity-30" style={{ animationDelay: '2s' }} />
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl mb-6 font-bold"
            variants={itemVariants}
          >
            Hi, I'm{' '}
            <motion.span 
              className="glass-text"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8, type: "spring" }}
              style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #dc2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                filter: 'brightness(1.1)'
              }}
            >
             Isaiah Zhou
            </motion.span>
          </motion.h1>
          
          <motion.div 
            className="glass rounded-3xl p-8 mb-8 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
              Full-Stack Developer & UI/UX Designer passionate about creating 
              beautiful, functional digital experiences that make a difference.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="glass-strong liquid-hover rounded-2xl px-8 py-4 text-lg"
                onClick={() => {
                  const element = document.getElementById('projects');
                  if (element) {
                    const headerOffset = 80;
                    window.scrollTo({
                      top: element.offsetTop - headerOffset,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                View My Work
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline" 
                size="lg"
                className="glass liquid-hover rounded-2xl px-8 py-4 text-lg liquid-border"
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    const headerOffset = 80;
                    window.scrollTo({
                      top: element.offsetTop - headerOffset,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Subtle floating decorative elements */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-gradient-to-r from-slate-400 to-gray-400 rounded-full"
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-3 h-3 bg-gradient-to-r from-gray-300 to-slate-400 rounded-full"
            animate={{ 
              y: [0, -15, 0],
              opacity: [0.15, 0.35, 0.15],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}