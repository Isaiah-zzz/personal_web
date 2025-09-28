import React, { ReactNode, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const { scrollYProgress } = useScroll();
  
  // Create a spring-damped scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Disable native smooth scrolling since we're handling it with Motion
    document.documentElement.style.scrollBehavior = 'auto';
    
    return () => {
      // Restore native smooth scrolling on cleanup
      document.documentElement.style.scrollBehavior = 'smooth';
    };
  }, []);

  return (
    <>
      {/* Progress indicator (optional) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />
      
      {/* Smooth scroll container */}
      <motion.div
        style={{
          y: useTransform(smoothProgress, [0, 1], ["0%", "0%"]),
        }}
      >
        {children}
      </motion.div>
    </>
  );
}