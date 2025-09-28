import React, { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ProjectApp } from "./ProjectApp";
import { ProjectModal } from "./ProjectModal";

function DesktopArea({ projects, onPositionChange, onProjectClick, isInView }: {
  projects: any[];
  onPositionChange: (projectId: string, newPosition: { x: number; y: number }) => void;
  onProjectClick: (project: any) => void;
  isInView: boolean;
}) {
  const [{ isOver }, drop] = useDrop({
    accept: 'project',
    drop: (item: any, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        const clientOffset = monitor.getClientOffset();
        const dropTargetRect = monitor.getDropTargetRect();
        
        if (clientOffset && dropTargetRect) {
          // Calculate position relative to the drop target
          const x = clientOffset.x - dropTargetRect.left;
          const y = clientOffset.y - dropTargetRect.top;
          
          // Item dimensions
          const itemWidth = 80;
          const itemHeight = 100;
          
          // Calculate bounds within the container
          const containerWidth = dropTargetRect.width;
          const containerHeight = dropTargetRect.height;
          
          // Center the item on the drop point and ensure it stays within bounds
          const newPosition = {
            x: Math.max(10, Math.min(x - itemWidth / 2, containerWidth - itemWidth - 10)),
            y: Math.max(10, Math.min(y - itemHeight / 2, containerHeight - itemHeight - 10))
          };
          
          onPositionChange(item.id, newPosition);
        }
      }
      return { moved: true };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <motion.div 
      ref={drop}
      className={`relative glass-strong rounded-3xl min-h-[400px] overflow-hidden depth-shadow transition-all duration-300 ${isOver ? 'ring-2 ring-primary/50 scale-[1.02]' : ''}`}
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 50 }}
      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      style={{
        background: isOver 
          ? 'rgba(255,255,255,0.15)' 
          : 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(30px)',
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: isOver 
          ? '0 20px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)' 
          : '0 12px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
      }}
    >
      {/* Liquid wallpaper effect */}
      <div className="absolute inset-0 liquid-gradient opacity-20" />
      
      {/* Drag overlay indicator */}
      {isOver && (
        <motion.div
          className="absolute inset-0 bg-primary/5 border-2 border-dashed border-primary/40 rounded-3xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="glass-strong rounded-xl px-8 py-4"
              initial={{ scale: 0.8, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-lg font-semibold text-primary/90 text-center">
                🎯 Drop here to place the app
              </p>
              <p className="text-sm text-primary/70 text-center mt-1">
                Position it anywhere you want
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
      
      {/* App icons */}
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, scale: 0, rotate: 180 }}
          animate={isInView ? { 
            opacity: 1, 
            scale: isOver ? 1.02 : 1, 
            rotate: 0,
            y: isOver ? -2 : 0
          } : { opacity: 0, scale: 0, rotate: 180 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.5 + index * 0.2,
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
        >
          <ProjectApp
            project={project}
            position={project.position}
            onPositionChange={(newPosition) => onPositionChange(project.id, newPosition)}
            onClick={() => onProjectClick(project)}
          />
        </motion.div>
      ))}

      {/* Enhanced dock hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 glass-strong rounded-2xl px-6 py-3"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        style={{
          background: 'rgba(255,255,255,0.2)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.3)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4)'
        }}
      >
        <p className="text-sm font-medium text-foreground/90 text-center" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
          🖱️ Double-click apps to launch • ✋ Drag to customize layout
        </p>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialProjects = [
    {
      id: "ecommerce",
      title: "ShopFlow",
      description: "A comprehensive e-commerce platform built with modern web technologies. Features include real-time inventory management, advanced search capabilities, secure payment processing with Stripe, user authentication, admin dashboard, and responsive design. The platform supports multiple product categories, customer reviews, wishlist functionality, and detailed analytics.",
      image: "https://images.unsplash.com/photo-1593720213681-e9a8778330a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NTg4NzIzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      appIcon: "https://images.unsplash.com/photo-1644984875410-e11486d2b94f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMGNhcnQlMjBpY29uJTIwYXBwfGVufDF8fHx8MTc1ODk4NDE1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "TypeScript", "Tailwind CSS"],
      github: "#",
      demo: "#",
      category: "ecommerce",
      features: [
        "Real-time inventory management",
        "Advanced search and filtering",
        "Secure payment processing",
        "Admin dashboard with analytics",
        "Responsive mobile design",
        "Customer review system"
      ],
      launchDate: "March 2024",
      position: { x: 50, y: 50 }
    },
    {
      id: "taskmanager",
      title: "TaskFlow",
      description: "A powerful collaborative task management application designed for modern teams. Features real-time synchronization, drag-and-drop interface, team collaboration tools, project timelines, file attachments, and comprehensive reporting. Built with Vue.js and Socket.io for seamless real-time updates.",
      image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzU4OTM5NzU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      appIcon: "https://images.unsplash.com/photo-1758876201729-e60eaf5f9194?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXNrJTIwbWFuYWdlbWVudCUyMGFwcCUyMGljb258ZW58MXx8fHwxNzU4OTg0MTU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["Vue.js", "Express", "Socket.io", "PostgreSQL", "Node.js", "Redis"],
      github: "#",
      demo: "#",
      category: "productivity",
      features: [
        "Real-time collaboration",
        "Drag-and-drop task management",
        "Project timeline visualization",
        "Team performance analytics",
        "File attachments and comments",
        "Mobile-responsive design"
      ],
      launchDate: "January 2024",
      position: { x: 200, y: 50 }
    },
    {
      id: "weather",
      title: "WeatherPro",
      description: "An elegant weather application providing detailed forecasts and atmospheric insights. Features include interactive weather maps, severe weather alerts, location-based forecasts, historical weather data, and beautiful visualizations. Built with React and integrated with multiple weather APIs for accuracy.",
      image: "https://images.unsplash.com/photo-1700619663145-34b53a04d940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNrJTIwc2V0dXB8ZW58MXx8fHwxNzU4ODczNDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      appIcon: "https://images.unsplash.com/photo-1705077826486-84ab2c1ba78a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWF0aGVyJTIwYXBwJTIwaWNvbiUyMGNsb3VkfGVufDF8fHx8MTc1ODk4NDE1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      technologies: ["React", "TypeScript", "Weather API", "Charts.js", "Mapbox", "PWA"],
      github: "#",
      demo: "#",
      category: "weather",
      features: [
        "7-day detailed forecasts",
        "Interactive weather maps",
        "Severe weather notifications",
        "Historical weather data",
        "Location-based services",
        "Offline capability (PWA)"
      ],
      launchDate: "February 2024",
      position: { x: 350, y: 50 }
    }
  ];

  const [projects, setProjects] = useState(initialProjects);

  const handlePositionChange = (projectId: string, newPosition: { x: number; y: number }) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId 
          ? { ...project, position: newPosition }
          : project
      )
    );
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <section id="projects" className="py-20 relative overflow-hidden">
        {/* Liquid glass background pattern */}
        <div className="absolute inset-0 liquid-gradient opacity-10" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            ref={ref}
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl mb-8 text-center glass-text"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Featured Applications
            </motion.h2>

            <motion.p
              className="text-center text-foreground/80 mb-12 max-w-2xl mx-auto text-lg font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
            >
              Double-click to explore • Drag to rearrange • Each app represents a unique project
            </motion.p>
            
            {/* Liquid glass desktop with drag & drop */}
            <DesktopArea
              projects={projects}
              onPositionChange={handlePositionChange}
              onProjectClick={handleProjectClick}
              isInView={isInView}
            />
          </motion.div>
        </div>

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProject(null);
          }}
        />
      </section>
    </DndProvider>
  );
}