import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Code2, Maximize2, Mail, Zap, Terminal, Sparkles, Cpu, Code } from "lucide-react";
import { profile } from "../data/profile";
import { MagneticLink } from "./ui/Shared";

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring settings for buttery smooth mouse movement lag (parallax)
  const springX = useSpring(x, { stiffness: 70, damping: 28 });
  const springY = useSpring(y, { stiffness: 70, damping: 28 });
  
  const graphicX = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const graphicY = useTransform(springY, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  // Name split for staggered character reveals
  const fullName = "Swarnima Singh".split("");

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative z-10 grid min-h-screen items-center overflow-hidden px-5 pb-16 pt-32 sm:px-8 lg:px-10"
    >
      {/* Interactive Canvas Particle Constellation System */}
      <InteractiveParticles />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] relative z-10">
        
        {/* Profile Details Block */}
        <div className="relative text-left">
          {/* Tag badge with subtle entrance slide */}
          <motion.div 
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-[#00D9FF]/[0.03] px-4.5 py-2 text-xs font-semibold uppercase tracking-wider text-cyan shadow-[0_0_20px_rgba(0,217,255,0.15)] backdrop-blur-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Zap size={14} className="animate-pulse" />
            {profile.product} Active Systems
          </motion.div>
          
          {/* Jump-from-above Heading - SWARNIMA SINGH */}
          <h1 className="max-w-5xl text-[clamp(2.3rem,6.8vw,5.4rem)] font-black leading-[1.05] tracking-tight select-none pb-2">
            <motion.span 
              className="bg-gradient-to-r from-white via-cyan to-aura bg-clip-text text-transparent inline-block"
              initial={{ y: -220, opacity: 0, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ 
                type: "spring", 
                stiffness: 110, 
                damping: 11, 
                delay: 0.25 
              }}
            >
              SWARNIMA SINGH
            </motion.span>
          </h1>
          
          <motion.p 
            className="mt-8 max-w-2xl text-lg font-bold text-white/80 sm:text-xl md:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {profile.role}
          </motion.p>
          
          <motion.p 
            className="mt-5 max-w-2xl text-sm leading-7 text-white/50 sm:text-base md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {profile.careerGoal}
          </motion.p>
          
          {/* Main Action Links */}
          <motion.div 
            className="mt-10 flex flex-wrap gap-3.5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <MagneticLink href="#about" label="Explore Portfolio" icon={null} variant="primary" />
            <MagneticLink href="/Swarnima_Singh_Resume.html" label="Resume" icon={<Maximize2 size={15} />} download />
            <MagneticLink href="#contact" label="Contact" icon={<Mail size={17} />} />
          </motion.div>
        </div>

        {/* Floating Graphic Layout Column with Parallax */}
        <motion.div 
          className="relative min-h-[460px] lg:min-h-[620px] w-full grid place-items-center"
          style={{ x: graphicX, y: graphicY }}
        >
          {/* Interactive Background Glow Panel */}
          <div className="absolute inset-x-8 top-16 bottom-20 rounded-full bg-gradient-to-br from-violet/10 via-cyan/5 to-aura/5 blur-[120px]" />

          {/* Centerpiece: Floating Circular Profile Photo */}
          <motion.div
            className="absolute z-20 w-40 h-40 sm:w-48 sm:h-48 rounded-full flex items-center justify-center cursor-pointer group"
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Rotating gradient ring */}
            <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-cyan via-violet to-aura animate-spin-gradient shadow-[0_0_30px_rgba(0,217,255,0.35)] opacity-80 transition duration-500 group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(124,92,255,0.5)]" />
            {/* Photo container */}
            <div className="relative w-full h-full rounded-full border-[4px] border-void overflow-hidden bg-[#0A0D1A] transition-transform duration-500 group-hover:scale-[1.03]">
              <img 
                src="/swarnima.jpeg" 
                alt="Swarnima Singh" 
                className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-110" 
              />
            </div>
          </motion.div>

          {/* Floating Element 1: Creative Qualifications Card */}
          <motion.div
            className="absolute left-[2%] top-[5%] w-[84%] sm:w-[72%] lg:w-[80%] rounded-[2rem] border border-white/10 bg-[#090B13]/75 p-6 shadow-2xl backdrop-blur-2xl text-left z-0"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-cyan/80 animate-pulse" />
              </div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-cyan/70 font-black">Academic Core</p>
            </div>
            
            <div className="mt-4 text-left">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 font-bold">Qualification</p>
              <h3 className="mt-2 text-lg font-black tracking-tight text-white leading-snug">
                B.Tech in Artificial Intelligence & Machine Learning
              </h3>
              <div className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/50 font-medium">
                <span className="text-white/80 font-bold">Bennett University</span>
                <span className="text-white/30">&bull;</span>
                <span className="font-mono text-cyan/80 font-bold">2025–2029</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Element 2: Creative Hobbies Card */}
          <motion.div
            className="absolute right-[2%] bottom-[5%] w-[80%] sm:w-[68%] lg:w-[76%] rounded-[2rem] border border-white/10 bg-[#0A0E23]/65 p-6 shadow-2xl backdrop-blur-xl text-left z-0"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-3.5">
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-violet" />
                <p className="font-mono text-[9px] uppercase tracking-widest text-violet/85 font-black">System Hobbies</p>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            </div>
            
            <div className="mt-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 font-bold mb-3">Interests</p>
              <div className="flex flex-wrap gap-1.5">
                {["Robotics", "Coding", "Game Dev", "Gaming", "Problem Solving"].map((hobby) => (
                  <span 
                    key={hobby}
                    className="rounded-xl border border-white/5 bg-white/[0.04] px-3 py-1.5 text-xs font-bold text-white/70 hover:border-cyan/30 hover:text-white transition duration-300"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Floating Element 3: Floating Micro Vector Icons */}
          <motion.div
            className="absolute left-[5%] bottom-[18%] grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-cyan backdrop-blur-xl shadow-glow"
            animate={{ 
              rotate: [0, 360],
              y: [0, -10, 0]
            }}
            transition={{ 
              rotate: { duration: 18, repeat: Infinity, ease: "linear" },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Sparkles size={20} />
          </motion.div>


        </motion.div>
      </div>

      {/* Fade bottom edge */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent z-10" />
    </section>
  );
}

function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce bounds
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 217, 255, 0.25)";
        ctx.fill();
      }
    }

    const particles: Particle[] = Array.from({ length: 42 }, () => new Particle());

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect particles with thin glowing lines
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 217, 255, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
