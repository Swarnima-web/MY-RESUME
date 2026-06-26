import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";

// Core Layout & Background Components
import LoadingScreen from "./components/LoadingScreen";
import CustomCursor from "./components/CustomCursor";
import AmbientBackground from "./components/AmbientBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Section Components
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import GitHubDashboard from "./components/GitHubDashboard";
import Contact from "./components/Contact";

import { profile } from "./data/profile";
import { useGitHubDashboard } from "./hooks/useGitHubDashboard";

const sectionIds = ["home", "about", "education", "skills", "certifications", "github", "contact"];

function App() {
  return (
    <Routes>
      <Route path="*" element={<Portfolio />} />
    </Routes>
  );
}

function Portfolio() {
  const dashboard = useGitHubDashboard(profile.githubUser);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  // Scroll Progress indicator setup
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05,             // Buttery smooth glide scroll
      wheelMultiplier: 1.0,    // Responsive mouse scroll
      touchMultiplier: 1.5,    // Sliding inertia glide on mobile
      syncTouch: true          // Apply glide scrolling on touch screen mobile devices
    });

    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);
    
    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  // Set up Viewport Intersection Observer for Navbar active links updating
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        threshold: [0.2, 0.4, 0.6],
        rootMargin: "-20% 0px -40% 0px"
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-void text-ink selection:bg-cyan/30 selection:text-white">
      {/* Cinematic Top Scroll Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet via-cyan to-aura origin-left z-[100] shadow-[0_0_12px_rgba(0,217,255,0.5)]" 
        style={{ scaleX }} 
      />

      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <CustomCursor />
      <AmbientBackground />
      {!loading && <Navbar activeSection={activeSection} />}

      <main className="relative z-10">
        {!loading && (
          <>
            <Hero />
            <About />
            <Education />
            <Skills />
            <Certifications />
            <GitHubDashboard dashboard={dashboard} />
            <Contact />
          </>
        )}
      </main>

      {!loading && <Footer />}
    </div>
  );
}

export default App;
