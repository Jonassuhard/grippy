"use client";

import { useState } from "react";
import { ScreenWrapper, InputField, PillButton } from "@/components/ui";
import type { UserProfile } from "@/types";

export function ProfileScreen({
  onNext,
  lang,
}: {
  onNext: (profile: UserProfile) => void;
  lang: "en" | "fr";
}) {
  const [profile, setProfile] = useState<UserProfile>({
    lastname: "",
    name: "",
    age: "",
    dischargeDate: "",
  });

  const isValid = profile.lastname && profile.name && profile.age;

  const labels = {
    en: { lastname: "lastname", name: "name", age: "age", date: "date of discharge from the hospital", next: "next" },
    fr: { lastname: "nom", name: "prénom", age: "âge", date: "date de sortie de l'hôpital", next: "suivant" },
  };
  const t = labels[lang];

  return (
    <ScreenWrapper>
      <div className="bg-[rgba(226,192,184,0.5)] rounded-[40px] p-6 w-full max-w-sm space-y-4 animate-fadeIn">
        {/* Decorative circle top */}
        <div className="flex justify-center mb-2">
          <div className="w-8 h-8 rounded-full bg-[rgba(160,107,95,0.3)]" />
        </div>

        <InputField
          label=""
          value={profile.lastname}
          onChange={(v) => setProfile({ ...profile, lastname: v })}
          placeholder={t.lastname}
        />
        <InputField
          label=""
          value={profile.name}
          onChange={(v) => setProfile({ ...profile, name: v })}
          placeholder={t.name}
        />
        <InputField
          label=""
          value={profile.age}
          onChange={(v) => setProfile({ ...profile, age: v })}
          type="number"
          placeholder={t.age}
        />
        <InputField
          label=""
          value={profile.dischargeDate}
          onChange={(v) => setProfile({ ...profile, dischargeDate: v })}
          type="date"
          placeholder={t.date}
        />
      </div>

      <div className="w-full mt-6 animate-fadeIn-delay-1">
        <PillButton onClick={() => onNext(profile)} disabled={!isValid}>
          {t.next}
        </PillButton>
      </div>
    </ScreenWrapper>
  );
}
