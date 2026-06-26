import { Github, Mail } from "lucide-react";
import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-5 py-12 sm:px-8 lg:px-10 bg-void/50 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-xs font-semibold uppercase tracking-wider text-white/40 sm:flex-row sm:items-center">
        
        {/* Brand Copyright */}
        <p className="tracking-widest">
          {profile.product} &copy; {new Date().getFullYear()} &bull; Built by {profile.name}
        </p>
        
        {/* Footer social icons & links */}
        <div className="flex items-center gap-3">
          <a 
            href={profile.github} 
            target="_blank" 
            rel="noreferrer" 
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 hover:border-cyan/40 hover:bg-cyan hover:text-[#060711] transition duration-300" 
            aria-label="Open GitHub Profile"
          >
            <Github size={16} />
          </a>
          
          <a 
            href={`mailto:${profile.email}`} 
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 hover:border-cyan/40 hover:bg-cyan hover:text-[#060711] transition duration-300" 
            aria-label="Send direct Email"
          >
            <Mail size={16} />
          </a>
          
          <a 
            href="#home" 
            className="rounded-full border border-white/10 bg-white/[0.03] px-4.5 py-2.5 text-[10px] font-bold tracking-widest text-white/50 hover:border-cyan/40 hover:text-cyan transition duration-300"
          >
            Back to Top
          </a>
        </div>
      </div>
    </footer>
  );
}
