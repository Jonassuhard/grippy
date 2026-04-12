"use client";

import { motion } from "framer-motion";
import { ScreenWrapper, PillButton, GrippyLogo } from "@/components/ui";

export function SplashScreen({ onNext }: { onNext: () => void }) {
  return (
    <ScreenWrapper>
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <GrippyLogo size={220} />
        <motion.h1
          className="text-5xl font-bold text-[#A06B5F] tracking-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Grippy
        </motion.h1>
        <motion.p
          className="text-[#7A4A3F] opacity-60 text-center text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.5 }}
        >
          Project Handful
        </motion.p>
      </motion.div>

      <motion.div
        className="w-full mt-12"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <PillButton onClick={onNext}>connexion</PillButton>
      </motion.div>

      <motion.p
        className="text-xs text-[#7A4A3F] opacity-40 mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.8 }}
      >
        Zarina IBRAGIMOVA &middot; Daphné VALLUIS
      </motion.p>
    </ScreenWrapper>
  );
}
