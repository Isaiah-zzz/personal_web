import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    alert("Thank you for your message! I'll get back to you soon.");
  };

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const contactInfoVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="contact" className="py-20">
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
            Get In Touch
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div variants={itemVariants}>
              <motion.h3 
                className="mb-6"
                variants={itemVariants}
              >
                Let's Work Together
              </motion.h3>
              <motion.p 
                className="text-lg text-muted-foreground mb-8"
                variants={itemVariants}
              >
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </motion.p>
              
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
              >
                <motion.div 
                  className="flex items-center space-x-3"
                  variants={contactInfoVariants}
                  whileHover={{ x: 5, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                >
                  <Mail className="w-5 h-5 text-primary" />
                  <span>alex.johnson@example.com</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  variants={contactInfoVariants}
                  whileHover={{ x: 5, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                >
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  variants={contactInfoVariants}
                  whileHover={{ x: 5, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                >
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>San Francisco, CA</span>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="flex space-x-4 mt-8"
                variants={containerVariants}
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer"
                >
                  <Button variant="outline" size="icon">
                    <Github className="w-4 h-4" />
                  </Button>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer"
                >
                  <Button variant="outline" size="icon">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="cursor-pointer"
                >
                  <Button variant="outline" size="icon">
                    <Twitter className="w-4 h-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.form 
                    onSubmit={handleSubmit} 
                    className="space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  >
                    <motion.div 
                      className="grid grid-cols-2 gap-4"
                      variants={itemVariants}
                    >
                      <Input placeholder="First Name" required />
                      <Input placeholder="Last Name" required />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Input type="email" placeholder="Email Address" required />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Input placeholder="Subject" required />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Textarea 
                        placeholder="Your Message" 
                        className="min-h-[120px]" 
                        required 
                      />
                    </motion.div>
                    <motion.div 
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button type="submit" className="w-full">
                        Send Message
                      </Button>
                    </motion.div>
                  </motion.form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}