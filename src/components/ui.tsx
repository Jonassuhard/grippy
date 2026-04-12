"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

// ─── Card ───────────────────────────────────────────────
export function Card({
  children,
  className = "",
  ...props
}: { children: ReactNode; className?: string } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={`bg-[rgba(226,192,184,0.7)] backdrop-blur-sm rounded-3xl p-6 w-full max-w-sm mx-auto ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ─── Pill Button ────────────────────────────────────────
export function PillButton({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  className?: string;
}) {
  const base = "rounded-full px-8 py-4 font-semibold text-lg transition-all duration-200 w-full";
  const variants = {
    primary: "bg-[#A26057] text-[#F5E6E1] hover:bg-[#8A5A50] active:scale-95",
    secondary: "bg-[rgba(226,192,184,0.5)] text-[#7A4A3F] hover:bg-[rgba(226,192,184,0.8)]",
    ghost: "bg-transparent text-[#7A4A3F] border-2 border-[#A26057] hover:bg-[rgba(160,107,95,0.1)]",
  };

  return (
    <motion.button
      className={`${base} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? undefined : { scale: 1.03, boxShadow: "0 8px 25px rgba(122,74,63,0.25)" }}
      whileTap={disabled ? undefined : { scale: 0.93 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}

// ─── Screen Wrapper ─────────────────────────────────────
export function ScreenWrapper({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`w-full max-w-sm mx-auto min-h-dvh flex flex-col items-center justify-center px-4 py-8 ${className}`}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Input Field ────────────────────────────────────────
export function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-[#7A4A3F] mb-1 opacity-70">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#A26057] text-[#F5E6E1] placeholder-[rgba(245,230,225,0.5)] rounded-full px-6 py-4 font-medium text-center text-lg outline-none focus:ring-2 focus:ring-[#7A4A3F] transition-all"
      />
    </div>
  );
}

// ─── Timer Display ──────────────────────────────────────
export function TimerDisplay({ seconds }: { seconds: number }) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return (
    <div className="flex items-center justify-center">
      <div className="bg-[rgba(122,74,63,0.3)] rounded-full w-24 h-24 flex items-center justify-center">
        <span className="text-2xl font-bold text-[#7A4A3F]">
          {m}:{s.toString().padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

// ─── Checkmark ──────────────────────────────────────────
export function AnimatedCheck({ delay = 0 }: { delay?: number }) {
  return (
    <motion.svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
    >
      <circle cx="14" cy="14" r="14" fill="#6B8E6B" />
      <motion.path
        d="M8 14l4 4 8-8"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: delay + 0.2, duration: 0.4 }}
      />
    </motion.svg>
  );
}

// ─── Logo (real image from Figma) ────────────────────────
export function GrippyLogo({ size = 200 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-grippy.png"
      alt="Grippy logo"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
    />
  );
}

// ─── Hand Illustration (real Figma assets) ─────────────
export function HandIllustration({
  type,
  size = 150,
}: {
  type: "pressure" | "rotation" | "relaxation";
  size?: number;
}) {
  const images = {
    pressure: "/grip-pressure.png",
    rotation: "/grip-rotation.png",
    relaxation: "/hand-open.png",
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={images[type]}
      alt={`${type} grip`}
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
    />
  );
}

// ─── Bluetooth Icon ─────────────────────────────────────
export function BluetoothIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="#7A4A3F" strokeWidth="2.5">
      <path d="M15 10 L25 20 L15 30" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 20 L25 20" strokeLinecap="round" />
      <path d="M20 5 L20 35" strokeLinecap="round" />
      {/* Signal waves */}
      <path d="M30 15 Q35 20 30 25" strokeLinecap="round" fill="none" />
      <path d="M33 12 Q40 20 33 28" strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  );
}
