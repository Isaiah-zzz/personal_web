import React, { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { motion, useInView } from "motion/react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="about" className="py-20 bg-muted/30">
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
            variants={itemVariants}
          >
            About Me
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <motion.p 
                className="text-lg mb-6"
                variants={itemVariants}
              >
                I'm a passionate full-stack developer with over 5 years of experience 
                creating digital solutions that combine beautiful design with robust 
                functionality. I specialize in React, Node.js, and modern web technologies.
              </motion.p>
              
              <motion.p 
                className="text-lg mb-6"
                variants={itemVariants}
              >
                When I'm not coding, you'll find me exploring new technologies, 
                contributing to open-source projects, or hiking in the mountains. 
                I believe in continuous learning and staying up-to-date with the 
                latest industry trends.
              </motion.p>
              
              <motion.p 
                className="text-lg"
                variants={itemVariants}
              >
                My goal is to create impactful solutions that solve real-world 
                problems while delivering exceptional user experiences.
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.div variants={cardVariants}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="mb-2">Experience</h3>
                    <p className="text-muted-foreground">5+ years in full-stack development</p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={cardVariants}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="mb-2">Projects</h3>
                    <p className="text-muted-foreground">50+ successful projects delivered</p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={cardVariants}>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="mb-2">Focus</h3>
                    <p className="text-muted-foreground">User-centered design & development</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}