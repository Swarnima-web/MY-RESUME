import React from "react";
import { motion } from "framer-motion";

export function SectionKicker({ value, title }: { value: string; title: string }) {
  return (
    <div className="max-w-4xl">
      <motion.p
        className="font-mono text-xs uppercase tracking-[0.26em] text-cyan/70"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {value}
      </motion.p>
      <motion.h2
        className="mt-4 text-[clamp(2.3rem,5vw,5.5rem)] font-black leading-[0.94] text-white"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.08 }}
      >
        {title}
      </motion.h2>
    </div>
  );
}

export function MagneticLink({
  href,
  label,
  icon,
  variant,
  download
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  variant?: "primary";
  download?: boolean;
}) {
  return (
    <motion.a
      href={href}
      download={download}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition ${
        variant === "primary"
          ? "bg-white text-[#060711] hover:bg-cyan"
          : "border border-white/10 bg-white/[0.055] text-white/76 backdrop-blur-xl hover:border-cyan/40 hover:text-white"
      }`}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
      {icon}
    </motion.a>
  );
}

export function StatPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3 text-center">
      <p className="font-mono text-sm font-bold text-white">{value}</p>
      <p className="mt-1 text-[0.65rem] text-white/42">{label}</p>
    </div>
  );
}

export function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-4">
      <p className="text-2xl font-black text-white">{value}</p>
      <p className="mt-1 text-sm text-white/48">{label}</p>
    </div>
  );
}

export function DetailBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] p-5">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan/70">{title}</p>
      <div className="mt-4 grid gap-3">
        {items.map((item) => (
          <p key={item} className="text-sm leading-7 text-white/64">
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}

export function IconButton({
  label,
  onClick,
  icon,
  className = ""
}: {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.08] text-white shadow-2xl backdrop-blur-xl transition hover:border-cyan/40 hover:text-cyan ${className}`}
    >
      {icon}
    </button>
  );
}

export function Field({
  name,
  label,
  placeholder,
  type = "text"
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-white/68">{label}</span>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="h-12 w-full rounded-full border border-white/10 bg-white/[0.055] px-4 text-white outline-none transition placeholder:text-white/32 focus:border-cyan/40"
      />
    </label>
  );
}
