"use client";

import { ScreenWrapper, PillButton, GrippyLogo } from "@/components/ui";

export function SplashScreen({ onNext }: { onNext: () => void }) {
  return (
    <ScreenWrapper>
      <div className="flex flex-col items-center gap-6 animate-fadeIn">
        <GrippyLogo size={220} />
        <h1 className="text-5xl font-bold text-[#A26057] tracking-tight animate-fadeIn-delay-1">
          Grippy
        </h1>
        <p className="text-[#7A4A3F] opacity-60 text-center text-sm animate-fadeIn-delay-2">
          Project Handful
        </p>
      </div>

      <div className="w-full mt-12 animate-fadeIn-delay-3">
        <PillButton onClick={onNext}>connexion</PillButton>
      </div>

      <p className="text-xs text-[#7A4A3F] opacity-40 mt-8 text-center animate-fadeIn-delay-3">
        Zarina IBRAGIMOVA &middot; Daphné VALLUIS
      </p>
    </ScreenWrapper>
  );
}
