import React, { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ScrollDamping } from "./components/ScrollDamping";
import TextBoardExample from "./components/TextBoardExample";

export default function App() {
  const [showDemo, setShowDemo] = useState(false);

  if (showDemo) {
    return (
      <div className="min-h-screen">
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setShowDemo(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Back to Main Site
          </button>
        </div>
        <TextBoardExample />
      </div>
    );
  }

  return (
    <ScrollDamping>
      <div className="min-h-screen relative">
        {/* Demo toggle button */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setShowDemo(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
          >
            View Text Board Demo
          </button>
        </div>

        {/* Subtle floating background elements for depth */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-slate-200/10 to-slate-300/10 rounded-full blur-3xl floating-element" 
               style={{ animationDelay: '0s' }} />
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-br from-gray-200/8 to-slate-200/8 rounded-full blur-3xl floating-element" 
               style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-slate-100/12 to-gray-200/12 rounded-full blur-3xl floating-element" 
               style={{ animationDelay: '4s' }} />
        </div>
        
        <div className="relative z-10">
          <Header />
          <main className="relative">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </ScrollDamping>
  );
}