import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [merged, setMerged] = useState(false);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (merged) {
      // Short delay after fusion completes before fading out the screen
      const exitTimer = window.setTimeout(() => {
        if (screenRef.current) {
          gsap.to(screenRef.current, {
            opacity: 0,
            scale: 1.04,
            filter: "blur(12px)",
            duration: 0.75,
            ease: "power2.inOut",
            onComplete
          });
        } else {
          onComplete();
        }
      }, 600);

      return () => clearTimeout(exitTimer);
    }
  }, [merged, onComplete]);

  return (
    <motion.div
      ref={screenRef}
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#02030A]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(124,92,255,0.25),transparent_40%),radial-gradient(circle_at_20%_80%,rgba(0,217,255,0.15),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.15),transparent_35%)]" />
      <div className="loader-grid absolute inset-0 opacity-[0.12]" />

      <div className="relative text-center z-10 flex flex-col items-center select-none cursor-default">
        
        {/* Glowing aura backing - triggers on fusion */}
        <AnimatePresence>
          {merged && (
            <motion.div 
              className="absolute h-64 w-64 rounded-full blur-3xl opacity-40 bg-gradient-to-r from-violet via-cyan to-aura z-0"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>

        {/* Ping-Pong merging text elements */}
        <div className="relative z-10 flex items-center justify-center font-mono text-8xl font-black tracking-widest text-white h-32 w-80">
          
          {/* Left Letter S (flies from Top-Left) */}
          <motion.span
            className="absolute bg-gradient-to-br from-white via-cyan to-[#7C5CFF] bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{
              x: ["-50vw", "35vw", "-40vw", "30vw", "-20vw", -28],
              y: ["-50vh", "40vh", "-35vh", "25vh", "-15vh", 0],
              rotate: [-180, -45, 90, 225, 360, 0],
              opacity: [0, 1, 1, 1, 1, 1]
            }}
            transition={{ 
              duration: 2.6,
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
              ease: "easeInOut"
            }}
            onAnimationComplete={() => {
              setMerged(true);
            }}
          >
            S
          </motion.span>

          {/* Right Letter S (flies from Bottom-Right) */}
          <motion.span
            className="absolute bg-gradient-to-br from-[#7C5CFF] via-aura to-white bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{
              x: ["50vw", "-35vw", "40vw", "-30vw", "20vw", 28],
              y: ["50vh", "-40vh", "35vh", "-25vh", "15vh", 0],
              rotate: [180, 45, -90, -225, -360, 0],
              opacity: [0, 1, 1, 1, 1, 1]
            }}
            transition={{ 
              duration: 2.6,
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
              ease: "easeInOut"
            }}
          >
            S
          </motion.span>

          {/* Glowing Fusion Spark Effect */}
          {merged && (
            <motion.div
              className="absolute h-1 w-1 bg-white rounded-full z-20 shadow-[0_0_20px_#FFF,0_0_40px_#00D9FF]"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [1, 20, 0], opacity: [1, 0.8, 0] }}
              transition={{ duration: 0.6 }}
            />
          )}
        </div>

        {/* Minimal creative status label */}
        <div className="mt-8 overflow-hidden h-6">
          <motion.p
            className="font-mono text-[9px] uppercase tracking-[0.35em] text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.8 }}
          >
            {merged ? "FUSION STABLE / LAUNCHING" : "ALIGNING CORES..."}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
