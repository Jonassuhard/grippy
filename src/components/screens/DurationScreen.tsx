"use client";

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
      <div className="bg-[rgba(226,192,184,0.5)] rounded-3xl p-6 w-full max-w-sm animate-fadeIn">
        <h2 className="text-2xl font-bold text-[#7A4A3F] text-center mb-8">
          {t.title}
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {DURATION_OPTIONS.map((min, i) => (
            <div
              key={min}
              className={`animate-fadeIn-delay-${Math.min(i + 1, 3) as 1 | 2 | 3}`}
            >
              <PillButton
                onClick={() => onSelect(min)}
                variant="primary"
                className="text-xl"
              >
                {min} min
              </PillButton>
            </div>
          ))}
        </div>

        {/* Hand illustration — like Figma slide 4 */}
        <div className="flex justify-center mt-6 opacity-40 animate-fadeIn-delay-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hand-outline.png" alt="" width={120} height={120} style={{ objectFit: "contain" }} />
        </div>
      </div>
    </ScreenWrapper>
  );
}
