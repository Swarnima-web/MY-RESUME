import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Github } from "lucide-react";
import { navItems, profile } from "../data/profile";

export default function Navbar({ activeSection }: { activeSection: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[#090B13]/70 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:px-5">
        
        {/* Brand logo */}
        <a href="#home" className="group flex items-center gap-3" aria-label="SwarnimaOS home">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-cyan/30 bg-white/[0.06] text-cyan shadow-cyan transition-all duration-300 group-hover:scale-110 group-hover:border-cyan/60 group-hover:shadow-[0_0_15px_rgba(0,217,255,0.4)]">
            <Sparkles size={17} className="animate-pulse" />
          </span>
          <span className="text-sm font-semibold tracking-wide text-white transition-colors duration-300 group-hover:text-cyan sm:text-base">
            {profile.product}
          </span>
        </a>

        {/* Desktop navigation links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isActive 
                    ? "bg-white text-[#070814]" 
                    : "text-white/60 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Action button & Mobile hamburger trigger */}
        <div className="flex items-center gap-2.5">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/80 transition-all duration-300 hover:border-cyan/40 hover:bg-cyan hover:text-[#060711] sm:inline-flex"
          >
            <Github size={14} />
            GitHub
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-white hover:bg-white/[0.1] lg:hidden transition-all duration-300"
            onClick={() => setOpen((value) => !value)}
            aria-label="Open navigation menu"
          >
            {open ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {open ? (
          <motion.div
            className="mx-auto mt-3 grid max-w-7xl gap-1.5 rounded-[1.5rem] border border-white/10 bg-[#090B13]/95 p-3 shadow-2xl backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-5 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                    isActive 
                      ? "bg-white/10 text-cyan border-l-2 border-cyan" 
                      : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
