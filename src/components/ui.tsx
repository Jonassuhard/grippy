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
    primary: "bg-[#A06B5F] text-[#F5E6E1] hover:bg-[#8A5A50] active:scale-95",
    secondary: "bg-[rgba(226,192,184,0.5)] text-[#7A4A3F] hover:bg-[rgba(226,192,184,0.8)]",
    ghost: "bg-transparent text-[#7A4A3F] border-2 border-[#A06B5F] hover:bg-[rgba(160,107,95,0.1)]",
  };

  return (
    <motion.button
      className={`${base} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
      onClick={disabled ? undefined : onClick}
      whileTap={disabled ? undefined : { scale: 0.95 }}
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
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
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
        className="w-full bg-[#A06B5F] text-[#F5E6E1] placeholder-[rgba(245,230,225,0.5)] rounded-full px-6 py-4 font-medium text-center text-lg outline-none focus:ring-2 focus:ring-[#7A4A3F] transition-all"
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

// ─── Logo SVG ───────────────────────────────────────────
export function GrippyLogo({ size = 200 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="90" fill="rgba(196,135,122,0.3)" />
      {/* Simplified abstract hand shapes */}
      <g fill="#A06B5F">
        <ellipse cx="70" cy="60" rx="15" ry="10" />
        <ellipse cx="100" cy="50" rx="12" ry="14" />
        <ellipse cx="130" cy="60" rx="15" ry="10" />
        <ellipse cx="60" cy="90" rx="10" ry="15" />
        <ellipse cx="90" cy="85" rx="14" ry="12" />
        <ellipse cx="120" cy="90" rx="12" ry="14" />
        <ellipse cx="140" cy="85" rx="10" ry="12" />
        <ellipse cx="75" cy="120" rx="14" ry="10" />
        <ellipse cx="105" cy="115" rx="12" ry="14" />
        <ellipse cx="130" cy="120" rx="15" ry="10" />
        <ellipse cx="85" cy="145" rx="10" ry="8" />
        <ellipse cx="115" cy="145" rx="10" ry="8" />
        <rect x="65" y="68" width="25" height="8" rx="4" />
        <rect x="110" y="68" width="25" height="8" rx="4" />
        <rect x="80" y="130" width="40" height="6" rx="3" />
        <circle cx="80" cy="100" r="6" />
        <circle cx="110" cy="100" r="6" />
        <circle cx="95" cy="75" r="5" />
        <circle cx="125" cy="105" r="5" />
      </g>
    </svg>
  );
}

// ─── Hand Illustration (simplified) ─────────────────────
export function HandIllustration({
  type,
  size = 150,
}: {
  type: "pressure" | "rotation" | "relaxation";
  size?: number;
}) {
  const colors = {
    pressure: "#C4877A",
    rotation: "#A06B5F",
    relaxation: "#D4988C",
  };

  return (
    <svg width={size} height={size} viewBox="0 0 150 150" fill="none">
      <circle cx="75" cy="75" r="65" fill={`${colors[type]}33`} />
      {type === "pressure" && (
        <g fill={colors[type]}>
          {/* Star/splash hand shape */}
          <path d="M75 20 L85 50 L115 45 L95 65 L120 85 L90 80 L75 110 L60 80 L30 85 L55 65 L35 45 L65 50 Z" />
          <circle cx="55" cy="105" r="12" fill="#7A4A3F" />
          <ellipse cx="55" cy="105" rx="12" ry="12" fill={colors[type]} opacity="0.8" />
        </g>
      )}
      {type === "rotation" && (
        <g>
          <circle cx="75" cy="70" r="30" fill="#7A4A3F" />
          <ellipse cx="70" cy="65" rx="18" ry="20" fill={colors[type]} />
        </g>
      )}
      {type === "relaxation" && (
        <g fill={colors[type]}>
          <ellipse cx="75" cy="60" rx="35" ry="25" />
          <ellipse cx="55" cy="90" rx="15" ry="20" />
          <ellipse cx="95" cy="90" rx="15" ry="20" />
          <circle cx="75" cy="95" r="8" fill="#7A4A3F" opacity="0.5" />
        </g>
      )}
    </svg>
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
