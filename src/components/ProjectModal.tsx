import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Github, ExternalLink, Calendar, Code } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ProjectModalProps {
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
    features?: string[];
    launchDate?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Liquid Glass Modal */}
          <motion.div
            className="fixed inset-4 md:inset-8 lg:inset-16 xl:inset-32 glass-strong rounded-3xl depth-shadow z-50 overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {/* Liquid Glass Header */}
            <div className="flex items-center justify-between p-6 glass border-b border-white/10">
              <div className="flex items-center space-x-4">
                <motion.div 
                  className="w-12 h-12 rounded-xl overflow-hidden glass-strong"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <img
                    src={project.appIcon}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div>
                  <h2 className="text-xl font-semibold glass-text">{project.title}</h2>
                  <p className="text-sm text-foreground/60 capitalize">{project.category}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="glass-strong liquid-hover rounded-xl font-medium cursor-pointer" 
                    asChild
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: 'rgba(255,255,255,0.9)',
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                    }}
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="sm" 
                    className="glass-strong liquid-hover rounded-xl font-medium cursor-pointer" 
                    asChild
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      border: '1px solid rgba(255,255,255,0.4)',
                      color: 'rgba(255,255,255,0.95)',
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                    }}
                  >
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={onClose}
                    className="glass-strong hover:glass-strong rounded-xl font-medium cursor-pointer"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'rgba(255,255,255,0.8)',
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Liquid Glass Content */}
            <div className="flex flex-col lg:flex-row h-full">
              {/* Left side - Image and details */}
              <div className="lg:w-2/3 p-6 space-y-6">
                <motion.div
                  className="aspect-video rounded-xl overflow-hidden glass-strong depth-shadow"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground/90" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>About This Project</h3>
                  <p className="text-foreground/80 leading-relaxed" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                    {project.description}
                  </p>
                </div>

                {project.features && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground/90" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>Key Features</h3>
                    <ul className="space-y-2">
                      {project.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start space-x-2 text-foreground/80"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0 shadow-sm" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right side - Technologies and metadata */}
              <div className="lg:w-1/3 p-6 glass-strong space-y-6" style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.3)'
              }}>
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center text-foreground/90" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                    <Code className="w-5 h-5 mr-2" />
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Badge variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {project.launchDate && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center text-foreground/90" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                      <Calendar className="w-5 h-5 mr-2" />
                      Launch Date
                    </h3>
                    <p className="text-foreground/80" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>{project.launchDate}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-white/20">
                  <div className="flex flex-col space-y-3">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        variant="outline" 
                        className="w-full glass-strong liquid-hover rounded-xl font-medium cursor-pointer" 
                        asChild
                        style={{
                          background: 'rgba(255,255,255,0.1)',
                          border: '1px solid rgba(255,255,255,0.3)',
                          color: 'rgba(255,255,255,0.9)',
                          textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                        }}
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          View Source Code
                        </a>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        className="w-full glass-strong liquid-hover rounded-xl font-medium cursor-pointer" 
                        asChild
                        style={{
                          background: 'rgba(255,255,255,0.2)',
                          border: '1px solid rgba(255,255,255,0.4)',
                          color: 'rgba(255,255,255,0.95)',
                          textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                        }}
                      >
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Launch Application
                        </a>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}