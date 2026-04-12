"use client";

import { AnimatePresence } from "framer-motion";
import { useAppState } from "@/lib/store";
import { SplashScreen } from "@/components/screens/SplashScreen";
import { ProfileScreen } from "@/components/screens/ProfileScreen";
import { BluetoothScreen } from "@/components/screens/BluetoothScreen";
import { DurationScreen } from "@/components/screens/DurationScreen";
import { PickGripScreen } from "@/components/screens/PickGripScreen";
import { ExerciseScreen } from "@/components/screens/ExerciseScreen";
import { BravoScreen } from "@/components/screens/BravoScreen";
import { ComeBackScreen } from "@/components/screens/ComeBackScreen";

export default function Home() {
  const { state, goTo, setProfile, setGrip, setDuration, setLang, levelUp } = useAppState();

  return (
    <main className="w-full min-h-dvh relative">
      {/* Language toggle */}
      <button
        onClick={() => setLang(state.lang === "en" ? "fr" : "en")}
        className="fixed top-4 right-4 z-50 bg-[rgba(226,192,184,0.6)] backdrop-blur-sm rounded-full px-3 py-1.5 text-sm font-semibold text-[#7A4A3F] cursor-pointer hover:bg-[rgba(226,192,184,0.9)] transition-colors"
      >
        {state.lang === "en" ? "FR" : "EN"}
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
              goTo("bravo");
            }}
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
