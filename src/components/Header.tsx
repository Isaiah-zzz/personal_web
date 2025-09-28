import React from "react";
import { Button } from "./ui/button";
import { motion, useScroll, useTransform } from "motion/react";

export function Header() {
  const { scrollY } = useScroll();
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0.1, 0.2]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = element.offsetTop - headerOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header 
      className="fixed top-0 w-full glass z-50 rounded-b-3xl mx-4 mt-2"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ width: 'calc(100% - 2rem)' }}
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span 
              className="text-xl font-semibold"
              style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #dc2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                filter: 'brightness(1.1)'
              }}
            >
              Isaiah Zhou
            </span>
          </motion.div>
          
          <motion.div 
            className="hidden md:flex space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button 
              onClick={() => scrollToSection('about')}
              className="hover:text-primary transition-all duration-300 px-3 py-2 rounded-xl hover:glass cursor-pointer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              About
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('skills')}
              className="hover:text-primary transition-all duration-300 px-3 py-2 rounded-xl hover:glass cursor-pointer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Skills
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('projects')}
              className="hover:text-primary transition-all duration-300 px-3 py-2 rounded-xl hover:glass cursor-pointer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Projects
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('contact')}
              className="hover:text-primary transition-all duration-300 px-3 py-2 rounded-xl hover:glass cursor-pointer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={() => scrollToSection('contact')}
              className="hidden md:block glass-strong liquid-hover rounded-2xl"
            >
              Get In Touch
            </Button>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
}