"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ScreenWrapper, PillButton, TimerDisplay } from "@/components/ui";

const COOLDOWN_SECONDS = 5 * 60; // 5 minutes

export function CooldownScreen({
  onComplete,
  lang,
}: {
  onComplete: () => void;
  lang: "en" | "fr";
}) {
  const [secondsLeft, setSecondsLeft] = useState(COOLDOWN_SECONDS);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onComplete();
      return;
    }
    const interval = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft, onComplete]);

  const t = lang === "fr"
    ? { title: "Relaxation", subtitle: "Détendez vos mains", skip: "Passer" }
    : { title: "Relaxation", subtitle: "Relax your hands", skip: "Skip" };

  return (
    <ScreenWrapper>
      <motion.div
        className="bg-[rgba(226,192,184,0.5)] rounded-3xl p-6 w-full max-w-sm flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-[#7A4A3F] mb-2">{t.title}</h2>
        <p className="text-[#7A4A3F] opacity-60 mb-6">{t.subtitle}</p>

        {/* Relaxation grip illustration */}
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/grip-relaxation-object.png" alt="relaxation grip" width={120} height={120} style={{ objectFit: "contain" }} />
        </motion.div>

        {/* Relax hands illustration */}
        <motion.div
          className="mt-4"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/relax-palms.png" alt="palm to palm" width={180} height={120} style={{ objectFit: "contain" }} />
        </motion.div>

        <div className="mt-6">
          <TimerDisplay seconds={secondsLeft} />
        </div>

        {/* Progress bar */}
        <div className="w-full mt-4 bg-[rgba(122,74,63,0.15)] rounded-full h-2">
          <motion.div
            className="bg-[#A26057] h-2 rounded-full"
            animate={{
              width: `${((COOLDOWN_SECONDS - secondsLeft) / COOLDOWN_SECONDS) * 100}%`,
            }}
          />
        </div>
      </motion.div>

      <motion.div
        className="w-full mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <PillButton onClick={onComplete} variant="ghost">
          {t.skip}
        </PillButton>
      </motion.div>
    </ScreenWrapper>
  );
}
