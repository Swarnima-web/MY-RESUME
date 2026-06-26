import { motion } from "framer-motion";
import { skills } from "../data/profile";
import { SectionKicker } from "./ui/Shared";

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionKicker 
          value="Technical Skills" 
          title="Core systems and technologies driving AI & Game development." 
        />
        
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.article
                key={skill.name}
                className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6.5 backdrop-blur-xl transition duration-300 hover:border-white/20"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                whileHover={{ y: -6 }}
              >
                {/* Radial glow background on card hover */}
                <div 
                  className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" 
                  style={{ 
                    background: `radial-gradient(circle_at_20%_0%, ${skill.accent}24, transparent 40%)` 
                  }} 
                />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    {/* Glowing Skill icon */}
                    <div 
                      className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.05]" 
                      style={{ color: skill.accent }}
                    >
                      <Icon size={24} />
                    </div>
                    {/* Skill Rating percent badge */}
                    <span className="font-mono text-xs font-semibold text-white/40 tracking-wider">
                      {skill.level}%
                    </span>
                  </div>

                  <h3 className="mt-7 text-2xl font-bold tracking-tight text-white">{skill.name}</h3>
                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/50">{skill.summary}</p>
                  
                  {/* Progress bar tracks */}
                  <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/5 border border-white/5">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${skill.accent}, #FFFFFF)` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.02 }}
                    />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
