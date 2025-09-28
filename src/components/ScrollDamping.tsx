import React, { ReactNode, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";

interface ScrollDampingProps {
  children: ReactNode;
}

export function ScrollDamping({ children }: ScrollDampingProps) {
  const { scrollYProgress } = useScroll();
  
  // Create a spring-damped scroll progress for smooth indicators
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 200,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Add CSS for enhanced scroll damping
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
        scroll-padding-top: 80px; /* Account for fixed header */
      }
      
      @media (prefers-reduced-motion: no-preference) {
        html {
          scroll-behavior: smooth;
        }
        
        /* Enhanced smooth scrolling with CSS */
        * {
          scroll-behavior: smooth;
          scroll-snap-type: none;
        }
      }
      
      /* Scroll damping effect */
      body {
        scrollbar-width: thin;
        scrollbar-color: rgba(0,0,0,0.2) transparent;
      }
      
      /* Webkit scrollbar styling */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      
      ::-webkit-scrollbar-thumb {
        background: rgba(0,0,0,0.2);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(0,0,0,0.3);
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {/* Liquid Glass Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 glass-strong z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      >
        <div className="absolute inset-0 liquid-gradient" />
      </motion.div>
      
      {children}
    </>
  );
}