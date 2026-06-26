import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile, signatureStats } from "../data/profile";
import { SectionKicker } from "./ui/Shared";

function PuzzleCard() {
  const [assembled, setAssembled] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  // SVG Paths for 4 interlocking puzzle pieces (viewbox 0 0 360 560)
  const piecePaths = [
    // Piece 1 (Top / Photo) - y: 0 to 160 (tab down to 192)
    "M 0 40 A 40 40 0 0 1 40 0 H 320 A 40 40 0 0 1 360 40 V 160 H 205 C 201 160, 196 166, 200 173 C 205 182, 195 192, 180 192 C 165 192, 155 182, 160 173 C 164 166, 159 160, 155 160 H 0 Z",
    // Piece 2 (Middle-Top / Name) - y: 160 to 290 (tab down to 322, slot up to 192)
    "M 0 160 H 155 C 159 160, 164 166, 160 173 C 155 182, 165 192, 180 192 C 195 192, 205 182, 200 173 C 196 166, 201 160, 205 160 H 360 V 290 H 145 C 141 290, 136 296, 140 303 C 145 312, 135 322, 120 322 C 105 322, 95 312, 100 303 C 104 296, 99 290, 95 290 H 0 Z",
    // Piece 3 (Middle-Bottom / Specialization) - y: 290 to 420 (tab down to 452, slot up to 322)
    "M 0 290 H 95 C 99 290, 104 296, 100 303 C 95 312, 105 322, 120 322 C 135 322, 145 312, 140 303 C 136 296, 141 290, 145 290 H 360 V 420 H 265 C 261 420, 256 426, 260 433 C 265 442, 255 452, 240 452 C 225 452, 215 442, 220 433 C 224 426, 219 420, 215 420 H 0 Z",
    // Piece 4 (Bottom / Institution) - y: 420 to 560 (slot up to 452)
    "M 0 420 H 215 C 219 420, 224 426, 220 433 C 215 442, 225 452, 240 452 C 255 452, 265 442, 260 433 C 256 426, 261 420, 265 420 H 360 V 520 A 40 40 0 0 1 320 560 H 40 A 40 40 0 0 1 0 520 Z"
  ];

  // Animation values for each of the 4 pieces
  const animations = [
    {
      initial: { y: -600, rotate: -15, opacity: 0, scale: 0.9 },
      animate: { y: 0, rotate: 0, opacity: 1, scale: 1 },
      transition: { type: "spring", stiffness: 90, damping: 14, delay: 0.1 }
    },
    {
      initial: { y: -650, rotate: 12, opacity: 0, scale: 0.9 },
      animate: { y: 0, rotate: 0, opacity: 1, scale: 1 },
      transition: { type: "spring", stiffness: 90, damping: 14, delay: 0.4 }
    },
    {
      initial: { y: -700, rotate: -10, opacity: 0, scale: 0.9 },
      animate: { y: 0, rotate: 0, opacity: 1, scale: 1 },
      transition: { type: "spring", stiffness: 90, damping: 14, delay: 0.7 }
    },
    {
      initial: { y: -750, rotate: 8, opacity: 0, scale: 0.9 },
      animate: { y: 0, rotate: 0, opacity: 1, scale: 1 },
      transition: { type: "spring", stiffness: 90, damping: 14, delay: 1.0 }
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = container.clientWidth || 360;
    let height = canvas.height = container.clientHeight || 560;

    const colors = [
      "rgba(168, 85, 247, ",  // Glowing Purple/Violet
      "rgba(192, 132, 252, ", // Light Cyber Purple
      "rgba(124, 58, 237, "   // Darker Tech Indigo
    ];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      color: string;
    }

    const particles: Particle[] = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.5 + 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    let animId = 0;

    const draw = () => {
      width = canvas.width = container.clientWidth || 360;
      height = canvas.height = container.clientHeight || 560;
      ctx.clearRect(0, 0, width, height);

      // Draw connecting lines and update particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.r, 0, Math.PI * 2);
        ctx.fillStyle = p1.color + "0.6)";
        ctx.fill();

        // Connect to other particles with colorful lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            const alpha = (1 - dist / 90) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p1.color + `${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Pull and connect to mouse cursor
        const dxMouse = p1.x - mouseRef.current.x;
        const dyMouse = p1.y - mouseRef.current.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 100) {
          const alpha = (1 - distMouse / 100) * 0.55;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = p1.color + `${alpha})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = container.clientWidth || 360;
      height = canvas.height = container.clientHeight || 560;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-[360px] mx-auto h-[560px] flex flex-col justify-start">
      <style>{`
        @keyframes shine-sweep {
          0% { stroke-dashoffset: 1400; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-shine-sweep {
          stroke-dasharray: 250 500;
          animation: shine-sweep 7s linear infinite;
        }
      `}</style>

      {/* Global Clip Path Definitions for Browser Clipping (viewbox 0 0 360 560) */}
      <svg className="absolute w-0 h-0" width="0" height="0">
        <defs>
          <clipPath id="piece1-clip">
            <path d={piecePaths[0]} />
          </clipPath>
          <clipPath id="piece2-clip">
            <path d={piecePaths[1]} />
          </clipPath>
          <clipPath id="piece3-clip">
            <path d={piecePaths[2]} />
          </clipPath>
          <clipPath id="piece4-clip">
            <path d={piecePaths[3]} />
          </clipPath>
          
          {/* Glowing Purple Cyber / Computer themed Stroke Gradients */}
          <linearGradient id="purple-chrome-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d8b4fe" stopOpacity="0.85" />
            <stop offset="25%" stopColor="#7e22ce" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#c084fc" stopOpacity="0.9" />
            <stop offset="75%" stopColor="#4c1d95" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="purple-shine-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Interactive, purple network connections background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none rounded-[2.5rem]" />

      {/* Card backing glow - fades in when assembled */}
      {assembled && (
        <motion.div
          className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-[#a855f7]/10 to-transparent blur-[35px] opacity-45 z-0 pointer-events-none"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.2 }}
        />
      )}

      {/* Piece 1: Top (Photo) - y: 0 to 160 */}
      <motion.div
        className="absolute inset-0 w-full h-full z-40"
        initial={animations[0].initial}
        animate={animations[0].animate}
        transition={animations[0].transition}
        style={{ clipPath: "url(#piece1-clip)" }}
        whileHover={assembled ? { scale: 1.025, y: -5, filter: "brightness(1.1)" } : {}}
      >
        {/* Obsidian Glass Background */}
        <div className="absolute inset-0 bg-[#07090e]/85 backdrop-blur-2xl" />
        
        {/* Specular Glare overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_55%)] pointer-events-none" />

        {/* Circular profile photo frame */}
        <div className="absolute top-[24px] left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="relative w-28 h-28 rounded-full p-[3px] shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white via-[#a855f7]/20 to-white/75 animate-spin-gradient opacity-85" />
            <div className="relative w-full h-full rounded-full border border-black/80 overflow-hidden bg-black">
              <img src="/swarnima.jpeg" alt="Swarnima Singh" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Outer Stroke Outline */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 360 560">
          <path d={piecePaths[0]} fill="none" stroke="url(#purple-chrome-gradient)" strokeWidth="2.2" />
          {assembled && (
            <path d={piecePaths[0]} fill="none" stroke="url(#purple-shine-gradient)" strokeWidth="2.5" className="animate-shine-sweep" />
          )}
        </svg>
      </motion.div>

      {/* Piece 2: Middle-Top (Name) - y: 160 to 290 */}
      <motion.div
        className="absolute inset-0 w-full h-full z-30"
        initial={animations[1].initial}
        animate={animations[1].animate}
        transition={animations[1].transition}
        style={{ clipPath: "url(#piece2-clip)" }}
        whileHover={assembled ? { scale: 1.025, y: -3, filter: "brightness(1.1)" } : {}}
      >
        {/* Obsidian Glass Background */}
        <div className="absolute inset-0 bg-[#07090e]/85 backdrop-blur-2xl" />
        
        {/* Specular Glare overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0)_55%)] pointer-events-none" />

        {/* Identity & Name Details */}
        <div className="absolute top-[208px] left-0 right-0 flex flex-col items-center text-center px-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/50 font-black">Identity Node</span>
          <h2 className="mt-2 text-[24px] font-black tracking-[0.08em] text-white leading-tight select-text drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
            SWARNIMA SINGH
          </h2>
          <span className="mt-3 block h-1.5 w-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_#FFF]" />
        </div>

        {/* Outer Stroke Outline */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 360 560">
          <path d={piecePaths[1]} fill="none" stroke="url(#purple-chrome-gradient)" strokeWidth="2.2" />
          {assembled && (
            <path d={piecePaths[1]} fill="none" stroke="url(#purple-shine-gradient)" strokeWidth="2.5" className="animate-shine-sweep" />
          )}
        </svg>
      </motion.div>

      {/* Piece 3: Middle-Bottom (Specialization) - y: 290 to 420 */}
      <motion.div
        className="absolute inset-0 w-full h-full z-20"
        initial={animations[2].initial}
        animate={animations[2].animate}
        transition={animations[2].transition}
        style={{ clipPath: "url(#piece3-clip)" }}
        whileHover={assembled ? { scale: 1.025, y: 1, filter: "brightness(1.1)" } : {}}
      >
        {/* Obsidian Glass Background */}
        <div className="absolute inset-0 bg-[#07090e]/85 backdrop-blur-2xl" />
        
        {/* Specular Glare overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_55%)] pointer-events-none" />

        {/* Specialization Details */}
        <div className="absolute top-[338px] left-0 right-0 px-6 text-center">
          <p className="font-mono text-[9px] text-white/50 uppercase tracking-widest font-black">Specialization</p>
          <p className="mt-1.5 text-xs font-black text-white select-text leading-snug">{profile.fullRole}</p>
        </div>

        {/* Outer Stroke Outline */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 360 560">
          <path d={piecePaths[2]} fill="none" stroke="url(#purple-chrome-gradient)" strokeWidth="2.2" />
          {assembled && (
            <path d={piecePaths[2]} fill="none" stroke="url(#purple-shine-gradient)" strokeWidth="2.5" className="animate-shine-sweep" />
          )}
        </svg>
      </motion.div>

      {/* Piece 4: Bottom (Institution) - y: 420 to 560 */}
      <motion.div
        className="absolute inset-0 w-full h-full z-10"
        initial={animations[3].initial}
        animate={animations[3].animate}
        transition={animations[3].transition}
        style={{ clipPath: "url(#piece4-clip)" }}
        whileHover={assembled ? { scale: 1.025, y: 4, filter: "brightness(1.1)" } : {}}
        onAnimationComplete={() => {
          setAssembled(true);
        }}
      >
        {/* Obsidian Glass Background */}
        <div className="absolute inset-0 bg-[#07090e]/85 backdrop-blur-2xl" />
        
        {/* Specular Glare overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_55%)] pointer-events-none" />

        {/* Institution Details */}
        <div className="absolute top-[468px] left-0 right-0 px-6 text-center">
          <p className="font-mono text-[9px] text-white/50 uppercase tracking-widest font-black">Institution</p>
          <p className="mt-1 text-xs font-bold text-white/90 select-text">{profile.university}</p>
          <p className="mt-1 text-[10px] text-white/50 font-bold font-mono select-text">{profile.duration}</p>
        </div>

        {/* Outer Stroke Outline */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 360 560">
          <path d={piecePaths[3]} fill="none" stroke="url(#purple-chrome-gradient)" strokeWidth="2.2" />
          {assembled && (
            <path d={piecePaths[3]} fill="none" stroke="url(#purple-shine-gradient)" strokeWidth="2.5" className="animate-shine-sweep" />
          )}
        </svg>
      </motion.div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative z-10 px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionKicker 
          value="About Identity" 
          title="A builder learning at the intersection of intelligence, robotics, and play." 
        />
        
        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          
          {/* Creative Colliding & Bouncing Circles Box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full flex items-center justify-center min-h-[580px]"
          >
            <PuzzleCard />
          </motion.div>

          {/* Description Copy & Stats Block */}
          <div className="grid content-start gap-6">
            <motion.p
              className="max-w-4xl text-xl leading-relaxed text-white/80 sm:text-2xl md:text-3xl font-medium tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              {profile.about}
            </motion.p>
            
            {/* Signature stats grid */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {signatureStats.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    className="group relative rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5.5 backdrop-blur-xl transition duration-300 hover:border-cyan/35 hover:bg-white/[0.05]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    whileHover={{ y: -6 }}
                  >
                    <div className="inline-grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-cyan transition duration-300 group-hover:bg-cyan/10 group-hover:scale-110">
                      <Icon size={20} />
                    </div>
                    <p className="mt-6 font-mono text-[9px] uppercase tracking-wider text-white/40">{item.label}</p>
                    <p className="mt-1.5 text-lg font-bold text-white tracking-wide">{item.value}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Sub-Clusters */}
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCluster title="Core Interests & Hobbies" items={profile.hobbies} />
              <InfoCluster title="Spoken Languages" items={profile.languages} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoCluster({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
      <p className="font-mono text-[9px] uppercase tracking-widest text-cyan/70">{title}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span 
            key={item} 
            className="rounded-full border border-white/5 bg-white/[0.05] px-3.5 py-2 text-xs font-semibold text-white/70 hover:border-cyan/30 hover:text-white transition duration-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

