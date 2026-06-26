import { motion } from "framer-motion";

export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-void">
      {/* Cinematic Base Ambient Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(124,92,255,0.22),transparent_32%),radial-gradient(circle_at_72%_12%,rgba(0,217,255,0.16),transparent_28%),radial-gradient(circle_at_86%_78%,rgba(244,114,182,0.12),transparent_34%),linear-gradient(180deg,#05060A,#080A12_42%,#05060A)]" />

      {/* Floating Glowing Sphere 1 (Cyan) */}
      <motion.div
        className="absolute left-[8%] top-[14%] h-[32rem] w-[32rem] rounded-full bg-cyan/10 blur-[130px] opacity-40"
        animate={{ 
          x: [0, 80, -40, 0], 
          y: [0, 60, -20, 0], 
          scale: [1, 1.15, 0.9, 1] 
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      {/* Floating Glowing Sphere 2 (Purple/Aura) */}
      <motion.div
        className="absolute bottom-[8%] right-[6%] h-[38rem] w-[38rem] rounded-full bg-aura/10 blur-[140px] opacity-35"
        animate={{ 
          x: [0, -90, 50, 0], 
          y: [0, -70, 30, 0], 
          scale: [1, 0.9, 1.1, 1] 
        }}
        transition={{ 
          duration: 24, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      {/* Floating Glowing Sphere 3 (Violet - Central ambient) */}
      <motion.div
        className="absolute left-[40%] top-[45%] h-[24rem] w-[24rem] rounded-full bg-violet/5 blur-[110px] opacity-30"
        animate={{ 
          x: [0, 50, -60, 0], 
          y: [0, -50, 40, 0],
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      {/* Fine Film Grain Noise Layer */}
      <div className="noise-layer absolute inset-0 opacity-[0.11]" />

      {/* Modern Developer Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.022)_1px,transparent_1px)] bg-[size:64px_64px] opacity-80" />
      
      {/* Subtle radial spotlight overlay to darken grid edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#05060A_95%)] opacity-70" />
    </div>
  );
}
