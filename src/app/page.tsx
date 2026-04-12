"use client";

import { AnimatePresence } from "framer-motion";
import { useAppState } from "@/lib/store";
import { SplashScreen } from "@/components/screens/SplashScreen";
import { ProfileScreen } from "@/components/screens/ProfileScreen";
import { BluetoothScreen } from "@/components/screens/BluetoothScreen";
import { DurationScreen } from "@/components/screens/DurationScreen";
import { PickGripScreen } from "@/components/screens/PickGripScreen";
import { ExerciseScreen } from "@/components/screens/ExerciseScreen";
import { CooldownScreen } from "@/components/screens/CooldownScreen";
import { BravoScreen } from "@/components/screens/BravoScreen";
import { ComeBackScreen } from "@/components/screens/ComeBackScreen";

export default function Home() {
  const { state, goTo, setProfile, setGrip, setDuration, setLang, levelUp } = useAppState();

  const screenOrder: Record<string, string> = {
    profile: "splash",
    bluetooth: "profile",
    duration: "bluetooth",
    pickGrip: "duration",
    exercise: "pickGrip",
  };
  const prevScreen = screenOrder[state.screen];

  return (
    <main className="w-full min-h-dvh relative">
      {/* Back button */}
      {prevScreen && (
        <button
          onClick={() => goTo(prevScreen as typeof state.screen)}
          className="fixed top-4 left-4 z-50 bg-[rgba(226,192,184,0.6)] backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center text-[#7A4A3F] cursor-pointer hover:bg-[rgba(226,192,184,0.9)] transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Language toggle */}
      <button
        onClick={() => setLang(state.lang === "en" ? "fr" : "en")}
        className="fixed top-4 right-4 z-50 bg-[rgba(226,192,184,0.6)] backdrop-blur-sm rounded-full px-3 py-1.5 text-sm font-semibold text-[#7A4A3F] cursor-pointer hover:bg-[rgba(226,192,184,0.9)] transition-colors"
      >
        {state.lang === "fr" ? "FR" : "ENG"}
      </button>

      <AnimatePresence mode="wait">
        {state.screen === "splash" && (
          <SplashScreen key="splash" onNext={() => goTo("profile")} />
        )}

        {state.screen === "profile" && (
          <ProfileScreen
            key="profile"
            lang={state.lang}
            onNext={(profile) => {
              setProfile(profile);
              goTo("bluetooth");
            }}
          />
        )}

        {state.screen === "bluetooth" && (
          <BluetoothScreen
            key="bluetooth"
            lang={state.lang}
            onNext={() => goTo("duration")}
          />
        )}

        {state.screen === "duration" && (
          <DurationScreen
            key="duration"
            lang={state.lang}
            onSelect={(min) => {
              setDuration(min);
              goTo("pickGrip");
            }}
          />
        )}

        {state.screen === "pickGrip" && (
          <PickGripScreen
            key="pickGrip"
            lang={state.lang}
            currentLevels={state.currentLevel}
            onSelect={(grip) => {
              setGrip(grip);
              goTo("exercise");
            }}
          />
        )}

        {state.screen === "exercise" && state.selectedGrip && (
          <ExerciseScreen
            key="exercise"
            gripType={state.selectedGrip}
            level={state.currentLevel[state.selectedGrip]}
            durationMinutes={state.selectedDuration}
            lang={state.lang}
            onComplete={() => {
              levelUp(state.selectedGrip!);
              goTo("cooldown");
            }}
          />
        )}

        {state.screen === "cooldown" && (
          <CooldownScreen
            key="cooldown"
            lang={state.lang}
            onComplete={() => goTo("bravo")}
          />
        )}

        {state.screen === "bravo" && (
          <BravoScreen
            key="bravo"
            lang={state.lang}
            onNext={() => goTo("comeBack")}
          />
        )}

        {state.screen === "comeBack" && (
          <ComeBackScreen
            key="comeBack"
            lang={state.lang}
            onHome={() => goTo("splash")}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
