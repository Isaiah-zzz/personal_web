import React, { useRef } from "react";
import { Badge } from "./ui/badge";
import { motion, useInView } from "motion/react";

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js", "HTML/CSS"]
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB", "REST APIs"]
    },
    {
      title: "Tools & Others",
      skills: ["Git", "Docker", "AWS", "Figma", "Jest", "Webpack"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div 
          ref={ref}
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-3xl md:text-4xl mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Skills & Technologies
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {skillCategories.map((category, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                variants={categoryVariants}
              >
                <h3 className="mb-6">{category.title}</h3>
                <motion.div 
                  className="flex flex-wrap gap-2 justify-center"
                  variants={containerVariants}
                >
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      variants={badgeVariants}
                      whileHover={{ 
                        scale: 1.1, 
                        transition: { type: "spring", stiffness: 400, damping: 10 } 
                      }}
                      whileTap={{ scale: 0.95 }}
                      custom={skillIndex}
                    >
                      <Badge 
                        variant="secondary" 
                        className="text-sm py-2 px-3 cursor-pointer hover:shadow-md transition-shadow"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}