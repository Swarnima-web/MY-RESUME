import { useState, useMemo } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { Search, Github, ArrowRight, X, ExternalLink } from "lucide-react";
import type { ProjectCardData } from "../lib/github";
import { SectionKicker, StatPill, DetailBlock } from "./ui/Shared";

export default function Projects({ projects, status }: { projects: ProjectCardData[]; status: string }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<ProjectCardData | null>(null);

  // Extract unique languages and topics for dynamic filters
  const filters = useMemo(() => {
    const values = new Set<string>(["All"]);
    projects.forEach((project) => {
      project.techStack.forEach((tech) => values.add(tech));
      project.languages.forEach((lang) => values.add(lang));
    });
    return Array.from(values).slice(0, 10);
  }, [projects]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return projects.filter((project) => {
      const techMatch = 
        filter === "All" || 
        project.techStack.some(t => t.toLowerCase() === filter.toLowerCase()) || 
        project.languages.some(l => l.toLowerCase() === filter.toLowerCase());
        
      const queryMatch =
        !normalized ||
        [project.title, project.description, project.readmePreview, ...project.techStack, ...project.topics]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
          
      return techMatch && queryMatch;
    });
  }, [filter, projects, query]);

  return (
    <section id="projects" className="relative z-10 px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionKicker 
            value="GitHub Repositories" 
            title="Live GitHub-powered cards with automated project insights." 
          />
          
          {/* Search and Category Filter Controls */}
          <div className="flex max-w-xl flex-1 flex-col gap-3.5 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35" size={17} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects by stack, feature..."
                className="h-12 w-full rounded-full border border-white/10 bg-white/[0.05] pl-12 pr-4 text-sm text-white outline-none backdrop-blur-xl transition placeholder:text-white/35 focus:border-cyan/40 focus:bg-white/[0.08]"
              />
            </div>
            
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="h-12 rounded-full border border-white/10 bg-[#10131F] px-4.5 text-xs font-semibold uppercase tracking-wider text-white outline-none cursor-pointer focus:border-cyan/40"
            >
              {filters.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* GitHub integration state banner */}
        <div className="mt-6 flex items-center gap-2 text-xs font-semibold tracking-wider text-white/45 uppercase">
          <span 
            className={`h-2.5 w-2.5 rounded-full shadow-[0_0_8px_currentColor] ${
              status === "live" 
                ? "text-emerald-400 bg-emerald-400" 
                : status === "loading" 
                ? "text-amber-400 bg-amber-400 animate-pulse" 
                : "text-cyan bg-cyan"
            }`} 
          />
          {status === "live" 
            ? "Sync: Connected to GitHub API" 
            : status === "loading" 
            ? "Sync: Fetching live repository logs..." 
            : "Sync: Displaying pre-cached mock projects"}
        </div>

        {/* Projects cards grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onSelect={() => setSelected(project)} 
            />
          ))}
        </div>
        
        {filtered.length === 0 && (
          <div className="mt-20 text-center">
            <p className="text-lg text-white/40">No projects found matching current queries.</p>
          </div>
        )}
      </div>

      {/* Details modal overlay */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function ProjectCard({ project, index, onSelect }: { project: ProjectCardData; index: number; onSelect: () => void }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Smooth mouse-move hover card tilt
  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(py * -8);
    rotateY.set(px * 8);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      className="group relative flex flex-col justify-between min-h-[580px] rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 shadow-2xl backdrop-blur-xl transition hover:border-white/15 [transform-style:preserve-3d]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: Math.min(index * 0.05, 0.25), duration: 0.6 }}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <ProjectPoster project={project} />
        
        <div className="p-3 pt-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-2xl font-black capitalize text-white tracking-tight leading-none group-hover:text-cyan transition-colors">
              {project.title}
            </h3>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white/60 transition hover:border-cyan/40 hover:bg-cyan hover:text-[#060711]"
              aria-label={`Open ${project.title} on GitHub`}
            >
              <Github size={16} />
            </a>
          </div>
          
          <p className="mt-4 line-clamp-3 min-h-[72px] text-xs leading-5 text-white/50">
            {project.description}
          </p>
          
          {/* Tech pills row */}
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span 
                key={tech} 
                className="rounded-full border border-white/5 bg-white/[0.05] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3 pt-0">
        {/* Repo stats pills */}
        <div className="grid grid-cols-4 gap-2 border-t border-white/5 pt-4">
          <StatPill label="Stars" value={project.stars} />
          <StatPill label="Forks" value={project.forks} />
          <StatPill label="Watch" value={project.watchers} />
          <StatPill label="Issues" value={project.issues} />
        </div>
        
        {/* Readme details toggle button */}
        <button
          type="button"
          onClick={onSelect}
          className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white text-xs font-bold uppercase tracking-wider text-[#060711] transition hover:bg-cyan hover:shadow-[0_0_15px_rgba(0,217,255,0.4)] cursor-pointer"
        >
          Details & Readme
          <ArrowRight size={15} />
        </button>
      </div>
    </motion.article>
  );
}

function ProjectPoster({ project }: { project: ProjectCardData }) {
  // Deterministic theme color generation based on project name seed
  const hue = project.imageSeed.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) % 360;
  const primary = `hsl(${hue} 90% 64%)`;
  const secondary = `hsl(${(hue + 80) % 360} 85% 60%)`;
  const tertiary = `hsl(${(hue + 160) % 360} 80% 55%)`;

  return (
    <div
      className="relative h-52 overflow-hidden rounded-[1.5rem] border border-white/5"
      style={{
        background: `radial-gradient(circle at 20% 20%, ${primary}40, transparent 40%), radial-gradient(circle at 80% 80%, ${secondary}30, transparent 40%), linear-gradient(135deg, #0A0D21, ${tertiary}15)`
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
      
      {/* Decorative glass elements */}
      <motion.div
        className="absolute left-6 top-6 h-20 w-20 rounded-[1.75rem] border border-white/10 bg-white/5 backdrop-blur-xl"
        animate={{ rotate: [0, 10, -5, 0], y: [0, -6, 3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-6 right-6 h-24 w-24 rounded-full border border-white/10 bg-black/30 backdrop-blur-xl"
        animate={{ scale: [1, 1.06, 0.95, 1] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="absolute bottom-4.5 left-5.5 right-5.5 z-10 text-left">
        <p className="font-mono text-[9px] uppercase tracking-widest text-cyan/90 font-bold">Workspace</p>
        <p className="mt-1.5 text-2xl font-black capitalize text-white tracking-tight line-clamp-1">{project.title}</p>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: ProjectCardData | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/75 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="max-h-[85vh] w-[min(100%,940px)] overflow-y-auto rounded-[2rem] border border-white/10 bg-[#090B13] p-6 shadow-2xl"
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            onClick={(event) => event.stopPropagation()}
          >
            {/* Header info */}
            <div className="flex items-start justify-between gap-5 border-b border-white/5 pb-5">
              <div className="text-left">
                <p className="font-mono text-[9px] uppercase tracking-widest text-cyan/70 font-bold">Metadata logs</p>
                <h3 className="mt-2 text-3xl font-black capitalize text-white tracking-tight sm:text-4xl">
                  {project.title}
                </h3>
              </div>
              <button 
                type="button" 
                className="grid h-10 w-10 place-items-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition cursor-pointer" 
                onClick={onClose} 
                aria-label="Close project modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Poster & Summary Layout */}
            <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.1fr]">
              <ProjectPoster project={project} />
              
              <div className="flex flex-col justify-between rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-5 text-left">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/30 font-bold">Overview</p>
                  <p className="mt-3 text-sm leading-6 text-white/70">{project.description}</p>
                </div>
                
                <div className="mt-5 border-t border-white/5 pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider text-cyan/90">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-5 grid grid-cols-4 gap-2">
                    <StatPill label="Stars" value={project.stars} />
                    <StatPill label="Forks" value={project.forks} />
                    <StatPill label="Watch" value={project.watchers} />
                    <StatPill label="Issues" value={project.issues} />
                  </div>
                </div>
              </div>
            </div>

            {/* Documentation Details */}
            <div className="mt-5 grid gap-5 text-left lg:grid-cols-3">
              <DetailBlock title="README Preview" items={[project.readmePreview]} />
              <DetailBlock title="Key Features" items={project.features} />
              <DetailBlock title="Future Scope" items={project.futureScope} />
            </div>

            {/* Structural details & latest commit logs */}
            <div className="mt-5 grid gap-5 text-left lg:grid-cols-2">
              <DetailBlock title="Directory Structure" items={project.structure} />
              
              <div className="flex flex-col justify-between rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-5">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-cyan/70 font-bold">Latest Commit Message</p>
                  <p className="mt-4 text-xs font-mono bg-black/40 border border-white/5 rounded-xl p-4 text-white/70 leading-5">
                    "{project.latestCommit || "No recent commits logged."}"
                  </p>
                </div>
                
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 flex h-11 items-center justify-center gap-2 rounded-full bg-white text-xs font-bold uppercase tracking-wider text-[#070814] hover:bg-cyan hover:shadow-[0_0_15px_rgba(0,217,255,0.4)] transition"
                >
                  Open Repository
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
