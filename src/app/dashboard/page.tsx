"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PatientData, GripType, ExerciseLevel } from "@/types";
import { GRIP_LABELS, LEVEL_COLORS } from "@/types";

// Mock data for demo (when Firebase is not configured)
const MOCK_PATIENTS: PatientData[] = [
  {
    uid: "1",
    profile: { lastname: "Dupont", name: "Marie", age: "52", dischargeDate: "2026-03-15" },
    currentLevels: { pressure: 2, rotation: 1, relaxation: 3 },
    sessionsCompleted: 14,
    lastSessionAt: new Date("2026-04-11"),
  },
  {
    uid: "2",
    profile: { lastname: "Martin", name: "Jean", age: "67", dischargeDate: "2026-02-28" },
    currentLevels: { pressure: 3, rotation: 2, relaxation: 2 },
    sessionsCompleted: 22,
    lastSessionAt: new Date("2026-04-12"),
  },
  {
    uid: "3",
    profile: { lastname: "Bernard", name: "Sophie", age: "45", dischargeDate: "2026-04-01" },
    currentLevels: { pressure: 1, rotation: 0, relaxation: 1 },
    sessionsCompleted: 5,
    lastSessionAt: new Date("2026-04-10"),
  },
];

function LevelDots({ levels }: { levels: Record<GripType, ExerciseLevel> }) {
  const grips: GripType[] = ["pressure", "rotation", "relaxation"];
  return (
    <div className="space-y-2">
      {grips.map((grip) => (
        <div key={grip} className="flex items-center gap-2">
          <span className="text-xs w-20 opacity-60">{GRIP_LABELS[grip].en}</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((lvl) => (
              <div
                key={lvl}
                className="w-4 h-4 rounded-full transition-all"
                style={{
                  backgroundColor:
                    lvl <= levels[grip]
                      ? LEVEL_COLORS[lvl as ExerciseLevel]
                      : "rgba(122,74,63,0.1)",
                  border: lvl === levels[grip] ? "2px solid #7A4A3F" : "none",
                }}
              />
            ))}
          </div>
          <span className="text-xs font-semibold">{levels[grip]}/4</span>
        </div>
      ))}
    </div>
  );
}

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div className="w-full bg-[rgba(122,74,63,0.1)] rounded-full h-3">
      <motion.div
        className="h-3 rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}

export default function DashboardPage() {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginCode, setLoginCode] = useState("");

  useEffect(() => {
    // Load mock data for demo
    setPatients(MOCK_PATIENTS);
  }, []);

  // Simple doctor login
  if (!isLoggedIn) {
    return (
      <div className="min-h-dvh flex items-center justify-center px-4">
        <motion.div
          className="bg-[rgba(226,192,184,0.7)] backdrop-blur-sm rounded-3xl p-8 w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-[#7A4A3F] text-center mb-2">Grippy</h1>
          <p className="text-center text-[#7A4A3F] opacity-60 mb-8">Doctor Dashboard</p>

          <input
            type="password"
            value={loginCode}
            onChange={(e) => setLoginCode(e.target.value)}
            placeholder="Access code"
            className="w-full bg-[#A26057] text-[#F5E6E1] placeholder-[rgba(245,230,225,0.5)] rounded-full px-6 py-4 font-medium text-center text-lg outline-none mb-4"
          />

          <button
            onClick={() => {
              // Demo: any code works
              if (loginCode.length > 0) setIsLoggedIn(true);
            }}
            className="w-full bg-[#7A4A3F] text-[#F5E6E1] rounded-full px-8 py-4 font-semibold text-lg cursor-pointer hover:bg-[#5E3830] transition-colors"
          >
            Login
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh px-4 py-8 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-[#7A4A3F]">Dashboard</h1>
          <p className="text-sm text-[#7A4A3F] opacity-50">
            {patients.length} patients &middot; Last update: today
          </p>
        </div>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="text-sm text-[#A26057] hover:underline cursor-pointer"
        >
          Logout
        </button>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total sessions", value: patients.reduce((a, p) => a + p.sessionsCompleted, 0).toString() },
          { label: "Avg level", value: (patients.reduce((a, p) => a + (p.currentLevels.pressure + p.currentLevels.rotation + p.currentLevels.relaxation) / 3, 0) / patients.length).toFixed(1) },
          { label: "Active today", value: patients.filter((p) => p.lastSessionAt && new Date().toDateString() === p.lastSessionAt.toDateString()).length.toString() },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="bg-[rgba(226,192,184,0.5)] rounded-2xl p-4 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="text-3xl font-bold text-[#7A4A3F]">{stat.value}</p>
            <p className="text-xs text-[#7A4A3F] opacity-50 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Patient List */}
      <div className="space-y-4">
        <AnimatePresence>
          {patients.map((patient, i) => (
            <motion.div
              key={patient.uid}
              className="bg-[rgba(226,192,184,0.5)] rounded-2xl p-5 cursor-pointer hover:bg-[rgba(226,192,184,0.7)] transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelectedPatient(selectedPatient?.uid === patient.uid ? null : patient)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#7A4A3F]">
                    {patient.profile.name} {patient.profile.lastname}
                  </h3>
                  <p className="text-sm text-[#7A4A3F] opacity-50">
                    Age: {patient.profile.age} &middot; {patient.sessionsCompleted} sessions
                    {patient.lastSessionAt && ` · Last: ${patient.lastSessionAt.toLocaleDateString()}`}
                  </p>
                </div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7A4A3F"
                  strokeWidth="2"
                  className={`transition-transform ${selectedPatient?.uid === patient.uid ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>

              {/* Expanded view */}
              <AnimatePresence>
                {selectedPatient?.uid === patient.uid && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-[rgba(122,74,63,0.15)]">
                      <h4 className="text-sm font-semibold text-[#7A4A3F] mb-3">Progress levels</h4>
                      <LevelDots levels={patient.currentLevels} />

                      <h4 className="text-sm font-semibold text-[#7A4A3F] mt-4 mb-2">Overall progress</h4>
                      <ProgressBar
                        value={
                          patient.currentLevels.pressure +
                          patient.currentLevels.rotation +
                          patient.currentLevels.relaxation
                        }
                        max={12}
                        color="#A26057"
                      />
                      <p className="text-xs text-[#7A4A3F] opacity-40 mt-1">
                        {Math.round(
                          ((patient.currentLevels.pressure +
                            patient.currentLevels.rotation +
                            patient.currentLevels.relaxation) /
                            12) *
                            100
                        )}
                        % of maximum level reached
                      </p>

                      <div className="mt-4 p-3 bg-[rgba(122,74,63,0.08)] rounded-xl">
                        <p className="text-xs text-[#7A4A3F] opacity-60">
                          Discharge: {patient.profile.dischargeDate} &middot;
                          Avg {(patient.sessionsCompleted / Math.max(1, Math.ceil((Date.now() - new Date(patient.profile.dischargeDate).getTime()) / 86400000 / 7))).toFixed(1)} sessions/week
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
