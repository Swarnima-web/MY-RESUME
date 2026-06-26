import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { education } from "../data/profile";
import { SectionKicker } from "./ui/Shared";

export default function Education() {
  return (
    <section id="education" className="relative z-10 px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionKicker 
          value="Education track" 
          title="A focused academic track in artificial intelligence and machine learning." 
        />
        
        <div className="mt-16">
          <div className="relative mx-auto max-w-3xl pl-16 sm:pl-24 text-left">
            {/* Timeline vertical line */}
            <div className="absolute bottom-0 left-6 sm:left-10 top-0 w-px bg-gradient-to-b from-cyan via-violet to-transparent" />
            
            {education.map((item, index) => {
              const Icon = item.icon || GraduationCap;
              return (
                <motion.div
                  key={item.school}
                  className="relative mb-12 last:mb-0"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  {/* Timeline pin badge */}
                  <div className="absolute -left-[58px] sm:-left-[74px] top-6 grid h-9 w-9 place-items-center rounded-full border border-cyan/40 bg-void text-cyan shadow-[0_0_15px_rgba(0,217,255,0.25)]">
                    <Icon size={16} />
                  </div>

                  {/* Card details */}
                  <motion.div 
                    className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 shadow-2xl backdrop-blur-xl transition duration-300 hover:border-cyan/35 hover:bg-white/[0.05]"
                    whileHover={{ y: -5 }}
                  >
                    <p className="text-xs font-mono tracking-widest text-cyan uppercase font-bold">{item.duration}</p>
                    
                    {/* Bold shiny and animated school name */}
                    <h3 className="mt-3.5 text-2xl font-black leading-tight tracking-tight text-shiny-animated inline-block">
                      {item.school}
                    </h3>
                    
                    <p className="mt-2 text-sm text-white/50 font-semibold">{item.degree}</p>
                    <p className="mt-1 text-base text-white/80 font-medium">{item.specialization}</p>
                    
                    {/* Address detail layout */}
                    {item.address && (
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-white/40 uppercase tracking-wider justify-start">
                        <MapPin size={12} className="text-cyan/70" />
                        <span>{item.address}</span>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
