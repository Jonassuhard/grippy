"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ScreenWrapper, GrippyLogo, PillButton } from "@/components/ui";

export function BravoScreen({
  onNext,
  lang,
}: {
  onNext: () => void;
  lang: "en" | "fr";
}) {
  // Play bravo sound
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    audioRef.current = new Audio("/bravo.wav");
    audioRef.current.volume = 0.6;
    audioRef.current.play().catch(() => {});
    navigator?.vibrate?.([10, 30, 10]);
  }, []);

  // Generate confetti particles with gravity physics
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    startX: Math.random() * 400 - 200,
    peakY: -(Math.random() * 300 + 100),
    endY: 500,
    size: Math.random() * 10 + 4,
    rotation: Math.random() * 720 - 360,
    color: ["#C4877A", "#A26057", "#E8C5BD", "#7A4A3F", "#D4988C", "#F0C4B8", "#8B5E54"][i % 7],
    delay: Math.random() * 0.8,
    shape: i % 3 === 0 ? "circle" : i % 3 === 1 ? "square" : "rect",
  }));

  const t = lang === "fr"
    ? { bravo: "BRAVO !", sub: "Exercice terminé", next: "Continuer" }
    : { bravo: "BRAVO!", sub: "Exercise complete", next: "Continue" };

  return (
    <ScreenWrapper>
      {/* Confetti with gravity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{
              width: p.size,
              height: p.shape === "rect" ? p.size * 0.4 : p.size,
              backgroundColor: p.color,
              borderRadius: p.shape === "circle" ? "50%" : p.shape === "rect" ? "1px" : "2px",
              left: "50%",
              top: "40%",
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0, rotate: 0 }}
            animate={{
              x: p.startX,
              y: [0, p.peakY, p.endY],
              opacity: [0, 1, 1, 0],
              scale: [0, 1.3, 1, 0.8],
              rotate: p.rotation,
            }}
            transition={{
              duration: 2.5,
              delay: p.delay,
              ease: [0.22, 1, 0.36, 1],
              y: { duration: 2.5, delay: p.delay, ease: [0.22, 0.8, 0.36, 1] },
            }}
          />
        ))}
      </div>

      <motion.div
        className="bg-[rgba(226,192,184,0.5)] rounded-3xl p-8 w-full max-w-sm flex flex-col items-center relative z-10"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.h1
          className="text-5xl font-bold text-[#7A4A3F] mb-6"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          {t.bravo}
        </motion.h1>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <GrippyLogo size={180} />
        </motion.div>

        <motion.p
          className="text-[#7A4A3F] opacity-60 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.6 }}
        >
          {t.sub}
        </motion.p>
      </motion.div>

      <motion.div
        className="w-full mt-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <PillButton onClick={onNext}>{t.next}</PillButton>
      </motion.div>
    </ScreenWrapper>
  );
}
