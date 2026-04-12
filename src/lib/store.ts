"use client";

import { useState, useCallback } from "react";
import type { AppScreen, GripType, ExerciseLevel, UserProfile } from "@/types";

export interface AppState {
  screen: AppScreen;
  profile: UserProfile;
  selectedGrip: GripType | null;
  selectedDuration: number;
  currentLevel: Record<GripType, ExerciseLevel>;
  timerSeconds: number;
  lang: "en" | "fr";
}

const initialState: AppState = {
  screen: "splash",
  profile: { lastname: "", name: "", age: "", dischargeDate: "" },
  selectedGrip: null,
  selectedDuration: 10,
  currentLevel: { pressure: 0, rotation: 0, relaxation: 0 },
  timerSeconds: 0,
  lang: "fr",
};

export function useAppState() {
  const [state, setState] = useState<AppState>(initialState);

  const goTo = useCallback((screen: AppScreen) => {
    setState((s) => ({ ...s, screen }));
  }, []);

  const setProfile = useCallback((profile: UserProfile) => {
    setState((s) => ({ ...s, profile }));
  }, []);

  const setGrip = useCallback((grip: GripType) => {
    setState((s) => ({ ...s, selectedGrip: grip }));
  }, []);

  const setDuration = useCallback((minutes: number) => {
    setState((s) => ({ ...s, selectedDuration: minutes }));
  }, []);

  const setLang = useCallback((lang: "en" | "fr") => {
    setState((s) => ({ ...s, lang }));
  }, []);

  const levelUp = useCallback((grip: GripType) => {
    setState((s) => {
      const current = s.currentLevel[grip];
      if (current >= 4) return s;
      return {
        ...s,
        currentLevel: {
          ...s.currentLevel,
          [grip]: (current + 1) as ExerciseLevel,
        },
      };
    });
  }, []);

  const reset = useCallback(() => {
    setState((s) => ({ ...s, screen: "splash", selectedGrip: null, selectedDuration: 10 }));
  }, []);

  return { state, goTo, setProfile, setGrip, setDuration, setLang, levelUp, reset };
}
