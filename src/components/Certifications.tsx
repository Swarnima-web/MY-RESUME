import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, Maximize2, Minus, Plus, X, ChevronLeft, ChevronRight } from "lucide-react";
import { certificates, profile } from "../data/profile";
import type { Certificate } from "../data/profile";
import { SectionKicker, IconButton } from "./ui/Shared";

export default function Certifications() {
  const [index, setIndex] = useState<number | null>(null);
  const active = index === null ? null : certificates[index];

  const move = (direction: number) => {
    setIndex((value) => {
      if (value === null) return value;
      return (value + direction + certificates.length) % certificates.length;
    });
  };

  return (
    <section id="certifications" className="relative z-10 px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionKicker 
          value="Certifications & Coursework" 
          title="Verified academic qualifications across AI, statistics, and mathematics." 
        />
        
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {certificates.map((certificate, certificateIndex) => (
            <motion.button
              type="button"
              key={certificate.title}
              onClick={() => setIndex(certificateIndex)}
              className="group relative min-h-[260px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 text-left backdrop-blur-xl transition duration-300 hover:border-white/20 focus:outline-none"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: Math.min(certificateIndex * 0.05, 0.25), duration: 0.6 }}
              whileHover={{ y: -6 }}
            >
              {/* Colored light glow based on accent color */}
              <div 
                className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" 
                style={{ 
                  background: `radial-gradient(circle at 20% 0%, ${certificate.accent}24, transparent 40%)` 
                }} 
              />
              
              <div className="relative z-10 flex flex-col justify-between h-full min-h-[200px]">
                <div className="flex items-center justify-between gap-4">
                  <div 
                    className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.05]" 
                    style={{ color: certificate.accent }}
                  >
                    <BadgeCheck size={24} />
                  </div>
                  
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-white/5 border border-white/10 text-white/40 transition group-hover:text-white group-hover:bg-white/10">
                    <Maximize2 size={15} />
                  </div>
                </div>
                
                <div>
                  <p 
                    className="font-mono text-[9px] uppercase tracking-wider font-bold" 
                    style={{ color: certificate.accent }}
                  >
                    {certificate.category}
                  </p>
                  
                  <h3 className="mt-3.5 text-xl font-bold leading-snug tracking-tight text-white group-hover:text-cyan transition-colors">
                    {certificate.title}
                  </h3>
                  
                  <p className="mt-2 text-xs font-semibold text-white/45 uppercase tracking-wide">
                    {certificate.issuer}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <CertificateViewer 
        certificate={active} 
        index={index} 
        onClose={() => setIndex(null)} 
        onMove={move} 
      />
    </section>
  );
}

function CertificateViewer({
  certificate,
  index,
  onClose,
  onMove
}: {
  certificate: Certificate | null;
  index: number | null;
  onClose: () => void;
  onMove: (direction: number) => void;
}) {
  const [zoom, setZoom] = useState(1);

  // Reset zoom on document page switches
  useEffect(() => {
    setZoom(1);
  }, [index]);

  return (
    <AnimatePresence>
      {certificate ? (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center overflow-hidden bg-black/85 p-4 backdrop-blur-2xl cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Top header navigation details */}
          <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between gap-3" onClick={(e) => e.stopPropagation()}>
            <div className="rounded-full border border-white/10 bg-[#090B13]/80 px-4 py-2 text-xs font-mono font-bold text-white/70 uppercase tracking-widest backdrop-blur-xl">
              Log {index !== null ? index + 1 : 1} / {certificates.length}
            </div>
            
            <div className="flex items-center gap-2">
              <IconButton 
                label="Zoom out" 
                onClick={() => setZoom((value) => Math.max(0.75, value - 0.1))} 
                icon={<Minus size={18} />} 
              />
              <IconButton 
                label="Zoom in" 
                onClick={() => setZoom((value) => Math.min(1.45, value + 0.1))} 
                icon={<Plus size={18} />} 
              />
              <IconButton 
                label="Close certificate" 
                onClick={onClose} 
                icon={<X size={18} />} 
              />
            </div>
          </div>



          {/* Certificate Layout Document Page Sheet */}
          <motion.div
            className="w-[min(92vw,860px)] max-h-[78vh] overflow-y-auto origin-center rounded-[2rem] border border-white/15 bg-white p-8 text-[#111827] shadow-2xl transition-transform duration-200 ease-out sm:p-12 cursor-default"
            style={{ scale: zoom }}
            initial={{ y: 30, scale: 0.92 }}
            animate={{ y: 0, scale: zoom }}
            exit={{ y: 30, scale: 0.92 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-[1.25rem] border border-[#111827]/10 p-6 sm:p-10">
              <div className="flex items-start justify-between gap-5 text-left">
                <div>
                  <p 
                    className="font-mono text-xs uppercase tracking-widest font-bold" 
                    style={{ color: certificate.accent }}
                  >
                    Statement of Accomplishment
                  </p>
                  <h3 className="mt-8 max-w-xl text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                    {certificate.title}
                  </h3>
                </div>
                
                <div 
                  className="grid h-14 w-14 place-items-center rounded-full text-white shadow-lg shrink-0" 
                  style={{ background: certificate.accent }}
                >
                  <BadgeCheck size={28} />
                </div>
              </div>

              <p className="mt-10 text-left text-sm font-semibold uppercase tracking-wider text-slate-400">Awarded to</p>
              <p className="mt-2 text-left text-3xl font-black tracking-tight">{profile.name}</p>
              <p className="mt-8 text-left text-sm leading-6 text-slate-500 font-medium">{certificate.credential}</p>
              
              <div className="mt-14 flex flex-col justify-between gap-6 border-t border-slate-200 pt-8 sm:flex-row sm:items-end">
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Authorized Issuer</p>
                  <p className="mt-2 text-lg font-extrabold text-slate-800">{certificate.issuer}</p>
                </div>
                
                <div className="text-left sm:text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Technical Category</p>
                  <p className="mt-2 text-lg font-extrabold text-slate-800">{certificate.category}</p>
                </div>
              </div>
            </div>
          </motion.div>


        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
