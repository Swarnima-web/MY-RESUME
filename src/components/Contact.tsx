import { useState, useRef, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Copy, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { profile } from "../data/profile";
import { SectionKicker, Field } from "./ui/Shared";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const service = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID;
    const template = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID;
    const key = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      if (service && template && key) {
        // Send email via EmailJS API
        await emailjs.sendForm(service, template, form, { publicKey: key });
      } else {
        // Fallback: Copy form text details to user clipboard
        const formData = new FormData(form);
        const copyContent = `Contact Request details:\n\nName: ${formData.get("from_name")}\nEmail: ${formData.get("reply_to")}\nSubject: ${formData.get("subject")}\n\nMessage:\n${formData.get("message")}`;
        await navigator.clipboard?.writeText(copyContent);
        
        // Open local email client with pre-filled details
        window.open(
          `mailto:${profile.email}?subject=${encodeURIComponent(
            (formData.get("subject") as string) || "Portfolio Contact"
          )}&body=${encodeURIComponent(copyContent)}`
        );
      }
      form.reset();
      setStatus("success");
      window.setTimeout(() => setStatus("idle"), 3500);
    } catch {
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 3500);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard?.writeText(profile.email);
      setStatus("success");
      window.setTimeout(() => setStatus("idle"), 2400);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative z-10 px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionKicker 
          value="Get In Touch" 
          title="Ready for collaborations, projects, and learning opportunities." 
        />
        
        <div className="mt-14 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Quick Details Column */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7.5 backdrop-blur-xl flex flex-col justify-between text-left">
            <div>
              <p className="text-base leading-7 text-white/60">
                Reach out for project collaborations, ML research proposals, game prototyping, or general academic inquiries.
              </p>
              
              <div className="mt-10 grid gap-3.5">
                <a 
                  href={`mailto:${profile.email}`} 
                  className="flex items-center gap-4.5 rounded-2xl border border-white/15 bg-white/[0.04] p-4 text-white/70 transition-all duration-300 hover:border-cyan/40 hover:bg-white/[0.06] hover:text-white"
                >
                  <Mail size={18} className="text-cyan shadow-cyan" />
                  <span className="text-sm font-semibold tracking-wide">{profile.email}</span>
                </a>
                
                <a 
                  href={profile.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-4.5 rounded-2xl border border-white/15 bg-white/[0.04] p-4 text-white/70 transition-all duration-300 hover:border-cyan/40 hover:bg-white/[0.06] hover:text-white"
                >
                  <Github size={18} className="text-cyan" />
                  <span className="text-sm font-semibold tracking-wide">github.com/Swarnima-web</span>
                </a>
                
                <button 
                  type="button" 
                  onClick={copyEmail} 
                  className="flex items-center gap-4.5 rounded-2xl border border-white/15 bg-white/[0.04] p-4 text-left text-white/70 transition-all duration-300 hover:border-cyan/40 hover:bg-white/[0.06] hover:text-white cursor-pointer"
                >
                  <Copy size={18} className="text-cyan" />
                  <span className="text-sm font-semibold tracking-wide">Copy Direct Email</span>
                </button>
              </div>
            </div>
            
            <p className="mt-8 font-mono text-[9px] uppercase tracking-widest text-cyan/50 font-semibold border-t border-white/5 pt-5">
              Available Response: Within 24 Hours
            </p>
          </div>

          {/* Form Fields Card */}
          <form 
            ref={formRef}
            onSubmit={submit} 
            className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6.5 backdrop-blur-xl sm:p-8 text-left"
          >
            <div className="grid gap-4.5 sm:grid-cols-2">
              <Field name="from_name" label="Full Name" placeholder="Your name" />
              <Field name="reply_to" label="Email Address" placeholder="you@example.com" type="email" />
            </div>
            
            <div className="mt-4.5">
              <Field name="subject" label="Subject" placeholder="Project collaboration proposal" />
            </div>
            
            <label className="mt-4.5 block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/60">Message Content</span>
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Details of your request or collaboration..."
                className="w-full resize-none rounded-[1.25rem] border border-white/10 bg-white/[0.05] px-4.5 py-3.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-cyan/40 focus:bg-white/[0.08]"
              />
            </label>
            
            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white text-xs font-bold uppercase tracking-wider text-[#070814] transition hover:bg-cyan hover:shadow-[0_0_15px_rgba(0,217,255,0.4)] disabled:cursor-wait disabled:opacity-60 cursor-pointer"
            >
              {status === "sending" ? "Processing..." : "Send Message"}
              <Send size={15} />
            </button>
            
            {/* Status alerts */}
            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  className="mt-4 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-xs font-semibold text-emerald-300"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                >
                  Success! If EmailJS tokens are not setup, your system email client is launched.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  className="mt-4 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-xs font-semibold text-rose-300"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                >
                  Error sending message. Please use the copy email button to contact directly.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}
