"use client";

import { motion } from "framer-motion";
import { ScreenWrapper, PillButton } from "@/components/ui";
import { DURATION_OPTIONS } from "@/types";

export function DurationScreen({
  onSelect,
  lang,
}: {
  onSelect: (minutes: number) => void;
  lang: "en" | "fr";
}) {
  const t = lang === "fr"
    ? { title: "Durée d'entraînement aujourd'hui ?" }
    : { title: "Training duration today ?" };

  return (
    <ScreenWrapper>
      <motion.div
        className="bg-[rgba(226,192,184,0.5)] rounded-3xl p-6 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-[#7A4A3F] text-center mb-8">
          {t.title}
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {DURATION_OPTIONS.map((min, i) => (
            <motion.div
              key={min}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <PillButton
                onClick={() => onSelect(min)}
                variant="primary"
                className="text-xl"
              >
                {min} min
              </PillButton>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </ScreenWrapper>
  );
}
