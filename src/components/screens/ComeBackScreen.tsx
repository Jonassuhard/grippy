"use client";

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
      <div className="bg-[rgba(226,192,184,0.5)] rounded-3xl p-8 w-full max-w-sm flex flex-col items-center animate-fadeIn">
        <PillButton onClick={onHome}>{t.btn}</PillButton>

        <div className="mt-12 animate-fadeIn-delay-1">
          <GrippyLogo size={100} />
        </div>

        <h2 className="text-3xl font-bold text-[#7A4A3F] mt-8 text-center opacity-50 animate-fadeIn-delay-2">
          {t.title}
        </h2>
      </div>
    </ScreenWrapper>
  );
}
