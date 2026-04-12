"use client";

import { motion } from "framer-motion";
import { ScreenWrapper } from "@/components/ui";
import type { GripType, ExerciseLevel } from "@/types";
import { GRIP_LABELS, LEVEL_COLORS } from "@/types";

export function PickGripScreen({
  onSelect,
  currentLevels,
  lang,
}: {
  onSelect: (grip: GripType) => void;
  currentLevels: Record<GripType, ExerciseLevel>;
  lang: "en" | "fr";
}) {
  const grips: GripType[] = ["pressure", "rotation", "relaxation"];
  const t = lang === "fr" ? { title: "Choisis ta pince !" } : { title: "Pick your grip !" };

  return (
    <ScreenWrapper>
      <motion.h2
        className="text-3xl font-bold text-[#7A4A3F] text-center mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {t.title}
      </motion.h2>

      <div className="space-y-4 w-full max-w-sm">
        {grips.map((grip, i) => (
          <motion.button
            key={grip}
            className="w-full bg-[rgba(226,192,184,0.6)] rounded-3xl p-5 flex items-center gap-4 cursor-pointer hover:bg-[rgba(226,192,184,0.8)] transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(grip)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={grip === "pressure" ? "/grip-pressure-object.png" : grip === "rotation" ? "/grip-rotation-object.png" : "/grip-relaxation-object.png"}
              alt={grip}
              width={80}
              height={80}
              style={{ objectFit: "contain" }}
            />
            <div className="flex-1 text-left">
              <h3 className="text-xl font-bold text-[#7A4A3F]">
                {GRIP_LABELS[grip][lang]}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-[#7A4A3F] opacity-60">
                  {lang === "fr" ? "Niveau" : "Level"} {currentLevels[grip]}
                </span>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((lvl) => (
                    <div
                      key={lvl}
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: lvl <= currentLevels[grip]
                          ? LEVEL_COLORS[lvl as ExerciseLevel]
                          : "rgba(122,74,63,0.15)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A4A3F" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        ))}
      </div>
    </ScreenWrapper>
  );
}
