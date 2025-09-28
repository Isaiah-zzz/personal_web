import React, { ReactNode, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "motion/react";

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Create spring-damped scroll values
  const smoothScrollY = useSpring(scrollY, {
    damping: 30,
    stiffness: 300,
    restDelta: 0.001,
  });

  const y = useTransform(smoothScrollY, (value) => -value);

  useEffect(() => {
    // Set up the scroll container height
    const updateHeight = () => {
      if (containerRef.current) {
        document.body.style.height = `${containerRef.current.scrollHeight}px`;
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    // Disable default scroll behavior
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.height = 'auto';
      document.body.style.overflow = 'auto';
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div className="fixed inset-0">
      <motion.div
        ref={containerRef}
        style={{ y }}
        className="absolute inset-0 will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}