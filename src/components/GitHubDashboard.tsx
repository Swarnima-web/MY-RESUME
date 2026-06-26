import { motion } from "framer-motion";
import { Github, BarChart3, Sparkles, ExternalLink, Star } from "lucide-react";
import { profile } from "../data/profile";
import type { useGitHubDashboard } from "../hooks/useGitHubDashboard";
import type { ProjectCardData } from "../lib/github";
import { SectionKicker, Metric } from "./ui/Shared";

export default function GitHubDashboard({ 
  dashboard 
}: { 
  dashboard: ReturnType<typeof useGitHubDashboard> 
}) {
  const totalRepos = dashboard.user?.public_repos ?? dashboard.repos.length;

  return (
    <section id="github" className="relative z-10 px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionKicker 
          value="GitHub Analytics" 
          title="A live development snapshot from Swarnima's public repositories." 
        />
        
        <div className="mt-14 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          
          {/* Developer Profile Overview Card */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6.5 backdrop-blur-xl flex flex-col justify-between">
            <div className="flex items-center gap-4 text-left">
              <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05]">
                {dashboard.user?.avatar_url ? (
                  <img src={dashboard.user.avatar_url} alt={profile.name} className="h-full w-full object-cover" />
                ) : (
                  <Github size={28} className="text-cyan" />
                )}
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-cyan/70 font-bold">Developer profile</p>
                <h3 className="mt-1.5 text-2xl font-black text-white tracking-tight">@{profile.githubUser}</h3>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-3.5">
              <Metric label="Repositories" value={totalRepos} />
              <Metric label="Stars earned" value={dashboard.totalStars} />
              <Metric label="Forks count" value={dashboard.totalForks} />
              <Metric label="Followers" value={dashboard.user?.followers ?? 0} />
            </div>
            
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex h-12 items-center justify-center gap-2 rounded-full bg-white text-xs font-bold uppercase tracking-wider text-[#070814] transition hover:bg-cyan hover:shadow-[0_0_15px_rgba(0,217,255,0.4)]"
            >
              Explore Profile
              <ExternalLink size={15} />
            </a>
          </div>

          <div className="grid gap-5">
            {/* Most Used Languages Card */}
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6.5 backdrop-blur-xl text-left">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-white tracking-tight uppercase">Most Used Languages</h3>
                <BarChart3 size={20} className="text-cyan" />
              </div>
              
              <div className="mt-6 grid gap-4">
                {dashboard.mostUsedLanguages.map((language) => {
                  const maxVal = Math.max(...dashboard.mostUsedLanguages.map((item) => item.value), 1);
                  return (
                    <div key={language.name}>
                      <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide">
                        <span className="text-white/70">{language.name}</span>
                        <span className="font-mono text-white/40">{language.value} repo(s)</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/5 border border-white/5">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: language.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(language.value / maxVal) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* GitHub Contribution Calendar Grid Card */}
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6.5 backdrop-blur-xl text-left">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-white tracking-tight uppercase">Contribution Timeline</h3>
                <Sparkles size={18} className="text-cyan animate-pulse" />
              </div>
              <div className="mt-6 overflow-hidden rounded-[1.25rem] border border-white/10 bg-void p-4">
                <img
                  src={`https://ghchart.rshah.org/00D9FF/${profile.githubUser}`}
                  alt={`${profile.name} GitHub contribution graph`}
                  className="min-h-[110px] w-full object-contain opacity-85 transition-opacity hover:opacity-100 duration-350"
                  onError={(e) => {
                    // Hide graph if offline or blocks
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pinned & Latest Repos sub-columns */}
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <RepoList title="Pinned repositories" projects={dashboard.pinnedRepos} />
          <RepoList 
            title="Latest repositories" 
            projects={dashboard.latestRepos.length ? dashboard.latestRepos : dashboard.repos.slice(0, 5)} 
          />
        </div>
      </div>
    </section>
  );
}

function RepoList({ title, projects }: { title: string; projects: ProjectCardData[] }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6.5 backdrop-blur-xl text-left">
      <h3 className="text-lg font-bold text-white tracking-tight uppercase border-b border-white/5 pb-4">{title}</h3>
      <div className="mt-5 grid gap-3">
        {projects.slice(0, 5).map((project) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between gap-4 rounded-[1.25rem] border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:border-cyan/35 hover:bg-white/[0.05]"
          >
            <div>
              <p className="font-extrabold capitalize text-white group-hover:text-cyan transition-colors">{project.title}</p>
              <p className="mt-1 line-clamp-1 text-xs text-white/40 leading-normal">{project.description}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1 text-xs font-mono text-white/40 group-hover:text-white transition-colors">
              <Star size={13} className="text-amber-400 shadow-glow" />
              {project.stars}
            </div>
          </a>
        ))}
        {projects.length === 0 && (
          <p className="text-xs text-white/30 py-4">No logged repositories found in this classification.</p>
        )}
      </div>
    </div>
  );
}
