"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScreenWrapper, TimerDisplay, PillButton, HandIllustration } from "@/components/ui";
import type { GripType, ExerciseLevel, Exercise } from "@/types";
import { EXERCISES_DATA, GRIP_LABELS } from "@/types";

export function ExerciseScreen({
  gripType,
  level,
  durationMinutes,
  onComplete,
  lang,
}: {
  gripType: GripType;
  level: ExerciseLevel;
  durationMinutes: number;
  onComplete: () => void;
  lang: "en" | "fr";
}) {
  const exercises = EXERCISES_DATA.filter(
    (e) => e.gripType === gripType && e.level <= level
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);
  const [exerciseTimer, setExerciseTimer] = useState(0);
  const [paused, setPaused] = useState(false);
  const [phase, setPhase] = useState<"training" | "exercise" | "relax">("training");

  const currentExercise: Exercise | undefined = exercises[currentIdx % exercises.length];

  // Main countdown
  useEffect(() => {
    if (paused || secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [paused, secondsLeft]);

  // Exercise timer
  useEffect(() => {
    if (paused || phase !== "exercise") return;
    const interval = setInterval(() => {
      setExerciseTimer((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [paused, phase]);

  // Auto-complete when time runs out
  useEffect(() => {
    if (secondsLeft <= 0) onComplete();
  }, [secondsLeft, onComplete]);

  const nextExercise = useCallback(() => {
    if (currentIdx < exercises.length - 1) {
      setCurrentIdx((i) => i + 1);
      setExerciseTimer(0);
      // Alternate between exercise and relax
      setPhase((p) => (p === "exercise" ? "relax" : "exercise"));
    } else {
      onComplete();
    }
  }, [currentIdx, exercises.length, onComplete]);

  const startExercise = () => {
    setPhase("exercise");
    setExerciseTimer(0);
  };

  const t = lang === "fr"
    ? {
        training: "Zone d'entraînement",
        start: "Commencer",
        next: "Suivant",
        pause: "Pause",
        resume: "Reprendre",
        relax: "Temps de repos !",
        palmToPalm: "Paume contre paume",
        timeLeft: "Temps restant",
      }
    : {
        training: "training area",
        start: "Start",
        next: "Next",
        pause: "Pause",
        resume: "Resume",
        relax: "It's time for the rest !",
        palmToPalm: "palm to palm",
        timeLeft: "Time left",
      };

  return (
    <ScreenWrapper>
      <AnimatePresence mode="wait">
        {phase === "training" && (
          <motion.div
            key="training"
            className="bg-[rgba(226,192,184,0.5)] rounded-3xl p-6 w-full max-w-sm flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-2xl font-bold text-[#7A4A3F] mb-6">{t.training}</h2>
            {/* Hand outline with grip zone overlay — matches Figma slide 5 */}
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hand-outline.png" alt="training zone" width={200} height={200} style={{ objectFit: "contain" }} />
              {/* Grip zone overlay on palm */}
              <div className="absolute bottom-8 right-4 w-24 h-16 rounded-2xl bg-[rgba(162,96,87,0.2)]" />
            </div>
            {/* Duration circle — like Figma "10'" */}
            <div className="flex items-center gap-2 mt-6">
              <div className="w-3 h-3 rounded-full bg-[rgba(122,74,63,0.2)]" />
              <div className="w-16 h-16 rounded-full bg-[rgba(122,74,63,0.15)] flex items-center justify-center">
                <span className="text-lg font-bold text-[#7A4A3F]">{durationMinutes}&apos;</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-[rgba(122,74,63,0.15)]" />
            </div>
            <p className="text-sm text-[#7A4A3F] opacity-50 mt-2">
              {GRIP_LABELS[gripType][lang]} &middot; Level {level}
            </p>
            <div className="mt-6 w-full">
              <PillButton onClick={startExercise}>{t.start}</PillButton>
            </div>
          </motion.div>
        )}

        {phase === "exercise" && currentExercise && (
          <motion.div
            key={`exercise-${currentIdx}`}
            className="bg-[rgba(226,192,184,0.5)] rounded-3xl p-6 w-full max-w-sm flex flex-col items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <h2 className="text-xl font-bold text-[#7A4A3F] mb-4 text-center">
              {lang === "fr" ? currentExercise.titleFr : currentExercise.title}
            </h2>

            {/* Animated exercise illustration from Figma */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gripType === "pressure" ? "/exercise-pressure.png" : gripType === "rotation" ? "/exercise-rotation.png" : "/exercise-relaxation.png"}
                alt={`${gripType} exercise`}
                width={200}
                height={140}
                style={{ objectFit: "contain" }}
              />
            </motion.div>

            <p className="text-sm text-[#7A4A3F] opacity-60 mt-4 text-center px-4">
              {lang === "fr" ? currentExercise.descriptionFr : currentExercise.description}
            </p>

            {/* Timer circle — matches Figma style */}
            <div className="flex items-center gap-2 mt-6">
              <div className="w-3 h-3 rounded-full bg-[rgba(122,74,63,0.2)]" />
              <div className="w-20 h-20 rounded-full bg-[rgba(122,74,63,0.15)] flex items-center justify-center">
                <TimerDisplay seconds={exerciseTimer} />
              </div>
              <div className="w-2 h-2 rounded-full bg-[rgba(122,74,63,0.15)]" />
            </div>

            <div className="flex gap-3 mt-6 w-full">
              <PillButton onClick={() => setPaused(!paused)} variant="ghost" className="flex-1">
                {paused ? t.resume : t.pause}
              </PillButton>
              <PillButton onClick={nextExercise} className="flex-1">
                {t.next} &rarr;
              </PillButton>
            </div>

            {/* Progress bar */}
            <div className="w-full mt-4 bg-[rgba(122,74,63,0.15)] rounded-full h-2">
              <motion.div
                className="bg-[#A26057] h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{
                  width: `${((durationMinutes * 60 - secondsLeft) / (durationMinutes * 60)) * 100}%`,
                }}
              />
            </div>
            <p className="text-xs text-[#7A4A3F] opacity-40 mt-1">
              {t.timeLeft}: {Math.floor(secondsLeft / 60)}:{(secondsLeft % 60).toString().padStart(2, "0")}
            </p>
          </motion.div>
        )}

        {phase === "relax" && (
          <motion.div
            key="relax"
            className="bg-[rgba(226,192,184,0.5)] rounded-3xl p-6 w-full max-w-sm flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-2xl font-bold text-[#7A4A3F] mb-2">{t.relax}</h2>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/relax-palms.png" alt="palm to palm rest" width={200} height={140} style={{ objectFit: "contain" }} />
            <h3 className="text-lg font-semibold text-[#7A4A3F] mt-4">{t.palmToPalm}</h3>
            <div className="mt-4">
              <TimerDisplay seconds={exerciseTimer} />
            </div>
            <div className="mt-6 w-full">
              <PillButton onClick={nextExercise}>{t.next} &rarr;</PillButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenWrapper>
  );
}
