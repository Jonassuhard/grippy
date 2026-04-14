"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ScreenWrapper, TimerDisplay, PillButton } from "@/components/ui";
import type { GripType, ExerciseLevel } from "@/types";

// Each exercise has a pre-drawn zone image (hand with pink zone baked in)
const GRIP_EXERCISES: Record<GripType, { img: string; zoneImg: string; titleFr: string; titleEn: string; descFr: string; descEn: string }[]> = {
  pressure: [
    { img: "/ex-pression1.png", zoneImg: "/training-pressure.png",  titleFr: "Pression 1", titleEn: "Pressure 1", descFr: "Serrez la pince avec tous les doigts", descEn: "Squeeze the grip with all fingers" },
    { img: "/ex-pression2.png", zoneImg: "/training-pressure2.png", titleFr: "Pression 2", titleEn: "Pressure 2", descFr: "Appuyez sur les embouts de la pince", descEn: "Press on the grip tips" },
    { img: "/ex-pression3.png", zoneImg: "/training-pressure3.png", titleFr: "Pression 3", titleEn: "Pressure 3", descFr: "Pressez la pince à pleine main", descEn: "Full hand pressure on the grip" },
  ],
  rotation: [
    { img: "/ex-rotation1.png", zoneImg: "/training-rotation.png", titleFr: "Rotation 1", titleEn: "Rotation 1", descFr: "Tournez la pince entre le pouce et l'index", descEn: "Rotate the grip between thumb and index" },
    { img: "/ex-rotation2.png", zoneImg: "/training-rotation.png", titleFr: "Rotation 2", titleEn: "Rotation 2", descFr: "Faites pivoter la pince dans la paume", descEn: "Pivot the grip in your palm" },
  ],
  relaxation: [
    { img: "/ex-relaxation.png", zoneImg: "/training-relaxation.png", titleFr: "Détente", titleEn: "Relaxation", descFr: "Paume contre paume, détendez vos mains", descEn: "Palm to palm, relax your hands" },
  ],
};

// Zone hand component: shows pre-drawn training image with zone baked in
function ZoneHand({ src, size = 120 }: { src: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="training zone" style={{ width: size, height: "auto", objectFit: "contain" }} />
  );
}

export function ExerciseScreen({
  gripType,
  level,
  durationMinutes,
  onComplete,
  onBackToMenu,
  lang,
}: {
  gripType: GripType;
  level: ExerciseLevel;
  durationMinutes: number;
  onComplete: () => void;
  onBackToMenu: () => void;
  lang: "en" | "fr";
}) {
  const exercises = GRIP_EXERCISES[gripType];
  const totalExercises = exercises.length;
  const totalSeconds = durationMinutes * 60;
  const restCount = totalExercises - 1;
  const restDuration = Math.floor(totalSeconds / (totalExercises * 10));
  const exerciseDuration = Math.floor((totalSeconds - restDuration * restCount) / totalExercises);

  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"training" | "exercise" | "rest">("training");
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [phaseTimer, setPhaseTimer] = useState(0);
  const [paused, setPaused] = useState(false);

  const currentExercise = exercises[step];

  // Main countdown
  useEffect(() => {
    if (paused || secondsLeft <= 0 || phase === "training") return;
    const interval = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(interval);
  }, [paused, secondsLeft, phase]);

  // Phase timer
  useEffect(() => {
    if (paused || phase === "training") return;
    const interval = setInterval(() => setPhaseTimer((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [paused, phase]);

  // Auto-advance
  useEffect(() => {
    if (phase === "exercise" && phaseTimer >= exerciseDuration) {
      if (step < totalExercises - 1) {
        setPhase("rest");
        setPhaseTimer(0);
      } else {
        onComplete();
      }
    }
    if (phase === "rest" && phaseTimer >= restDuration) {
      setStep((s) => s + 1);
      setPhase("exercise");
      setPhaseTimer(0);
    }
  }, [phase, phaseTimer, exerciseDuration, restDuration, step, totalExercises, onComplete]);

  useEffect(() => {
    if (secondsLeft <= 0 && phase !== "training") onComplete();
  }, [secondsLeft, phase, onComplete]);

  const startExercise = () => {
    setPhase("exercise");
    setPhaseTimer(0);
  };

  const skipToNext = () => {
    if (phase === "rest") {
      setStep((s) => s + 1);
      setPhase("exercise");
      setPhaseTimer(0);
    } else if (step < totalExercises - 1) {
      setPhase("rest");
      setPhaseTimer(0);
    } else {
      onComplete();
    }
  };

  const t = lang === "fr"
    ? { training: "Zone d'entraînement", start: "Commencer", next: "Suivant", pause: "Pause", resume: "Reprendre", rest: "Temps de repos", timeLeft: "Temps restant", back: "Changer de pince" }
    : { training: "Training area", start: "Start", next: "Next", pause: "Pause", resume: "Resume", rest: "Rest time", timeLeft: "Time left", back: "Change grip" };

  // ─── Training area ───────────────────────────────────────
  if (phase === "training") {
    return (
      <ScreenWrapper>
        <div className="bg-[rgba(226,192,184,0.5)] rounded-3xl p-6 w-full max-w-sm flex flex-col items-center animate-fadeIn">
          <h2 className="text-2xl font-bold text-[#7A4A3F] mb-6">{t.training}</h2>
          {/* Hand with pink training zone — uses first exercise's zone */}
          <ZoneHand src={exercises[0].zoneImg} size={180} />
          <div className="flex items-center gap-2 mt-6">
            <div className="w-3 h-3 rounded-full bg-[rgba(122,74,63,0.2)]" />
            <div className="w-16 h-16 rounded-full bg-[rgba(122,74,63,0.15)] flex items-center justify-center">
              <span className="text-lg font-bold text-[#7A4A3F]">{durationMinutes}&apos;</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-[rgba(122,74,63,0.15)]" />
          </div>
          <p className="text-sm text-[#7A4A3F] opacity-50 mt-2">
            {totalExercises} {lang === "fr" ? "exercices" : "exercises"}
          </p>
          <div className="mt-6 w-full">
            <PillButton onClick={startExercise}>{t.start}</PillButton>
          </div>
          <button onClick={onBackToMenu} className="mt-4 text-sm text-[#7A4A3F] opacity-50 underline cursor-pointer">
            {t.back}
          </button>
        </div>
      </ScreenWrapper>
    );
  }

  // ─── Rest phase — show NEXT exercise image to prepare ───
  if (phase === "rest") {
    const nextExercise = exercises[step + 1];
    return (
      <ScreenWrapper>
        <div className="bg-[rgba(226,192,184,0.5)] rounded-3xl p-6 w-full max-w-sm flex flex-col items-center animate-fadeIn">
          <h2 className="text-2xl font-bold text-[#7A4A3F] mb-4">{t.rest}</h2>
          {/* Show next exercise image to prepare the patient */}
          {nextExercise && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={nextExercise.img} alt="next exercise" width={160} height={100} style={{ objectFit: "contain", opacity: 0.7 }} />
              <ZoneHand src={nextExercise.zoneImg} size={100} />
              <p className="text-xs text-[#7A4A3F] opacity-40 mt-2">
                {lang === "fr" ? `Prochain : ${nextExercise.titleFr}` : `Next: ${nextExercise.titleEn}`}
              </p>
            </>
          )}
          <div className="mt-4">
            <TimerDisplay seconds={restDuration - phaseTimer} />
          </div>
          <p className="text-xs text-[#7A4A3F] opacity-40 mt-2">
            {lang === "fr" ? `Exercice ${step + 2}/${totalExercises} dans` : `Exercise ${step + 2}/${totalExercises} in`} {Math.max(0, restDuration - phaseTimer)}s
          </p>
          <div className="mt-6 w-full">
            <PillButton onClick={skipToNext} variant="ghost">{t.next} &rarr;</PillButton>
          </div>
        </div>
      </ScreenWrapper>
    );
  }

  // ─── Exercise phase ──────────────────────────────────────
  return (
    <ScreenWrapper>
      <div className="bg-[rgba(226,192,184,0.5)] rounded-3xl p-6 w-full max-w-sm flex flex-col items-center animate-fadeIn">
        {/* Step indicator */}
        <div className="flex gap-2 mb-3">
          {exercises.map((_, idx) => (
            <div key={idx} className={`w-3 h-3 rounded-full transition-colors ${idx <= step ? "bg-[#A26057]" : "bg-[rgba(122,74,63,0.2)]"}`} />
          ))}
        </div>
        <p className="text-xs text-[#7A4A3F] opacity-50 mb-2">
          {step + 1}/{totalExercises}
        </p>

        <h2 className="text-xl font-bold text-[#7A4A3F] mb-4 text-center">
          {lang === "fr" ? currentExercise.titleFr : currentExercise.titleEn}
        </h2>

        <motion.div
          key={step}
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={currentExercise.img} alt={`step ${step + 1}`} width={200} height={140} style={{ objectFit: "contain" }} />
        </motion.div>

        {/* Zone indicator: hand with pink overlay showing target area */}
        <div className="mt-3">
          <ZoneHand src={currentExercise.zoneImg} size={120} />
        </div>

        <p className="text-sm text-[#7A4A3F] opacity-60 mt-2 text-center px-4">
          {lang === "fr" ? currentExercise.descFr : currentExercise.descEn}
        </p>

        <div className="flex items-center gap-2 mt-6">
          <div className="w-3 h-3 rounded-full bg-[rgba(122,74,63,0.2)]" />
          <div className="w-20 h-20 rounded-full bg-[rgba(122,74,63,0.15)] flex items-center justify-center">
            <TimerDisplay seconds={phaseTimer} />
          </div>
          <div className="w-2 h-2 rounded-full bg-[rgba(122,74,63,0.15)]" />
        </div>

        <div className="flex gap-3 mt-6 w-full">
          <PillButton onClick={() => setPaused(!paused)} variant="ghost" className="flex-1">
            {paused ? t.resume : t.pause}
          </PillButton>
          <PillButton onClick={skipToNext} className="flex-1">
            {t.next} &rarr;
          </PillButton>
        </div>

        <div className="w-full mt-4 bg-[rgba(122,74,63,0.15)] rounded-full h-2">
          <div className="bg-[#A26057] h-2 rounded-full transition-all duration-1000" style={{ width: `${((totalSeconds - secondsLeft) / totalSeconds) * 100}%` }} />
        </div>
        <p className="text-xs text-[#7A4A3F] opacity-40 mt-1">
          {t.timeLeft}: {Math.floor(secondsLeft / 60)}:{(secondsLeft % 60).toString().padStart(2, "0")}
        </p>
      </div>
    </ScreenWrapper>
  );
}
