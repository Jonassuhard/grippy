"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ScreenWrapper, TimerDisplay, PillButton } from "@/components/ui";
import type { GripType, ExerciseLevel } from "@/types";

const STEPS = [
  { img: "/ex-pression1.png", titleFr: "Pression 1", titleEn: "Pressure 1", descFr: "Serrez la pince avec tous les doigts", descEn: "Squeeze the grip with all fingers" },
  { img: "/ex-pression2.png", titleFr: "Pression 2", titleEn: "Pressure 2", descFr: "Appuyez sur les embouts de la pince", descEn: "Press on the grip tips" },
  { img: "/ex-pression3.png", titleFr: "Pression 3", titleEn: "Pressure 3", descFr: "Pressez la pince à pleine main", descEn: "Full hand pressure on the grip" },
];

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
  const [step, setStep] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);
  const [stepTimer, setStepTimer] = useState(0);
  const [paused, setPaused] = useState(false);

  const currentStep = STEPS[step];
  const stepDuration = Math.floor((durationMinutes * 60) / 3);

  // Main countdown
  useEffect(() => {
    if (paused || secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [paused, secondsLeft]);

  // Step timer
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setStepTimer((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [paused]);

  // Auto-advance step when step timer reaches stepDuration
  useEffect(() => {
    if (stepTimer >= stepDuration && step < 2) {
      setStep((s) => s + 1);
      setStepTimer(0);
    }
  }, [stepTimer, stepDuration, step]);

  // Complete when all time runs out or step 3 timer ends
  useEffect(() => {
    if (secondsLeft <= 0 || (step === 2 && stepTimer >= stepDuration)) {
      onComplete();
    }
  }, [secondsLeft, step, stepTimer, stepDuration, onComplete]);

  const nextStep = () => {
    if (step < 2) {
      setStep((s) => s + 1);
      setStepTimer(0);
    } else {
      onComplete();
    }
  };

  const t = lang === "fr"
    ? { next: "Suivant", pause: "Pause", resume: "Reprendre", timeLeft: "Temps restant" }
    : { next: "Next", pause: "Pause", resume: "Resume", timeLeft: "Time left" };

  return (
    <ScreenWrapper>
      <div className="bg-[rgba(226,192,184,0.5)] rounded-3xl p-6 w-full max-w-sm flex flex-col items-center animate-fadeIn">
        {/* Step indicator */}
        <div className="flex gap-2 mb-3">
          {STEPS.map((_, idx) => (
            <div key={idx} className={`w-3 h-3 rounded-full transition-colors ${idx <= step ? "bg-[#A26057]" : "bg-[rgba(122,74,63,0.2)]"}`} />
          ))}
        </div>
        <p className="text-xs text-[#7A4A3F] opacity-50 mb-2">
          {step + 1}/3
        </p>

        <h2 className="text-xl font-bold text-[#7A4A3F] mb-4 text-center">
          {lang === "fr" ? currentStep.titleFr : currentStep.titleEn}
        </h2>

        {/* Exercise illustration */}
        <motion.div
          key={step}
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentStep.img}
            alt={`step ${step + 1}`}
            width={200}
            height={140}
            style={{ objectFit: "contain" }}
          />
        </motion.div>

        <p className="text-sm text-[#7A4A3F] opacity-60 mt-4 text-center px-4">
          {lang === "fr" ? currentStep.descFr : currentStep.descEn}
        </p>

        {/* Timer circle */}
        <div className="flex items-center gap-2 mt-6">
          <div className="w-3 h-3 rounded-full bg-[rgba(122,74,63,0.2)]" />
          <div className="w-20 h-20 rounded-full bg-[rgba(122,74,63,0.15)] flex items-center justify-center">
            <TimerDisplay seconds={stepTimer} />
          </div>
          <div className="w-2 h-2 rounded-full bg-[rgba(122,74,63,0.15)]" />
        </div>

        <div className="flex gap-3 mt-6 w-full">
          <PillButton onClick={() => setPaused(!paused)} variant="ghost" className="flex-1">
            {paused ? t.resume : t.pause}
          </PillButton>
          <PillButton onClick={nextStep} className="flex-1">
            {t.next} &rarr;
          </PillButton>
        </div>

        {/* Progress bar */}
        <div className="w-full mt-4 bg-[rgba(122,74,63,0.15)] rounded-full h-2">
          <div
            className="bg-[#A26057] h-2 rounded-full transition-all duration-1000"
            style={{ width: `${((durationMinutes * 60 - secondsLeft) / (durationMinutes * 60)) * 100}%` }}
          />
        </div>
        <p className="text-xs text-[#7A4A3F] opacity-40 mt-1">
          {t.timeLeft}: {Math.floor(secondsLeft / 60)}:{(secondsLeft % 60).toString().padStart(2, "0")}
        </p>
      </div>
    </ScreenWrapper>
  );
}
