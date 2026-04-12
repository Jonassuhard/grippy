"use client";

import { motion } from "framer-motion";
import { ScreenWrapper, GrippyLogo, PillButton } from "@/components/ui";

export function BravoScreen({
  onNext,
  lang,
}: {
  onNext: () => void;
  lang: "en" | "fr";
}) {
  // Generate confetti particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 300 - 150,
    y: Math.random() * -200 - 50,
    size: Math.random() * 8 + 4,
    color: ["#C4877A", "#A06B5F", "#E8C5BD", "#7A4A3F", "#D4988C"][i % 5],
    delay: Math.random() * 0.5,
  }));

  const t = lang === "fr"
    ? { bravo: "BRAVO !", sub: "Exercice terminé", next: "Continuer" }
    : { bravo: "BRAVO!", sub: "Exercise complete", next: "Continue" };

  return (
    <ScreenWrapper>
      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              left: "50%",
              top: "50%",
            }}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{
              x: p.x,
              y: p.y,
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 1, 0.5],
            }}
            transition={{
              duration: 2,
              delay: p.delay,
              ease: "easeOut",
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
