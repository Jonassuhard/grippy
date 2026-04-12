"use client";

import { motion } from "framer-motion";
import { ScreenWrapper, PillButton, GrippyLogo } from "@/components/ui";

export function ComeBackScreen({
  onHome,
  lang,
}: {
  onHome: () => void;
  lang: "en" | "fr";
}) {
  const t = lang === "fr"
    ? { title: "À demain !", btn: "retour à l'accueil" }
    : { title: "Come back tomorrow !", btn: "return to home page" };

  return (
    <ScreenWrapper>
      <motion.div
        className="bg-[rgba(226,192,184,0.5)] rounded-3xl p-8 w-full max-w-sm flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <PillButton onClick={onHome}>{t.btn}</PillButton>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <GrippyLogo size={100} />
        </motion.div>

        <motion.h2
          className="text-3xl font-bold text-[#7A4A3F] mt-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {t.title}
        </motion.h2>
      </motion.div>
    </ScreenWrapper>
  );
}
