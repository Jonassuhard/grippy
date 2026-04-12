"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ScreenWrapper, PillButton, AnimatedCheck, BluetoothIcon } from "@/components/ui";
import type { GripDevice } from "@/types";

const FAKE_DEVICES: GripDevice[] = [
  { id: "grip_1", name: "grip_1..", connected: false },
  { id: "grip_2", name: "grip_2..", connected: false },
  { id: "grip_3", name: "grip_3..", connected: false },
];

export function BluetoothScreen({
  onNext,
  lang,
}: {
  onNext: () => void;
  lang: "en" | "fr";
}) {
  const [devices, setDevices] = useState<GripDevice[]>(FAKE_DEVICES);
  const [scanning, setScanning] = useState(true);

  // Simulate Bluetooth discovery & auto-connect
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    timers.push(
      setTimeout(() => {
        setDevices((d) => d.map((dev, i) => (i === 0 ? { ...dev, connected: true } : dev)));
      }, 1200)
    );

    timers.push(
      setTimeout(() => {
        setDevices((d) => d.map((dev, i) => (i <= 1 ? { ...dev, connected: true } : dev)));
      }, 2000)
    );

    timers.push(
      setTimeout(() => {
        setDevices((d) => d.map((dev) => ({ ...dev, connected: true })));
        setScanning(false);
      }, 2800)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  const allConnected = devices.every((d) => d.connected);
  const t = lang === "fr"
    ? { title: "Connexion Bluetooth", btn: "connecter vos pinces", scanning: "Recherche..." }
    : { title: "Bluetooth Connection", btn: "connect your grip", scanning: "Scanning..." };

  return (
    <ScreenWrapper>
      <motion.div
        className="bg-[rgba(226,192,184,0.5)] rounded-3xl p-6 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header icons */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <motion.div
            animate={{ rotate: scanning ? [0, 15, -15, 0] : 0 }}
            transition={{ repeat: scanning ? Infinity : 0, duration: 1.5 }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="#7A4A3F">
              <circle cx="20" cy="20" r="15" fill="none" stroke="#7A4A3F" strokeWidth="2" />
              <circle cx="20" cy="15" r="4" />
              <path d="M12 28 Q20 22 28 28" stroke="#7A4A3F" strokeWidth="2" fill="none" />
            </svg>
          </motion.div>
          {/* Signal waves */}
          <motion.div
            animate={{ opacity: scanning ? [0.3, 1, 0.3] : 1 }}
            transition={{ repeat: scanning ? Infinity : 0, duration: 1 }}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" stroke="#7A4A3F" strokeWidth="2">
              <path d="M10 15 Q15 5 20 15" />
              <path d="M7 15 Q15 0 23 15" opacity="0.5" />
            </svg>
          </motion.div>
          <BluetoothIcon size={35} />
        </div>

        {/* Device list */}
        <div className="bg-[rgba(160,107,95,0.2)] rounded-2xl p-4 space-y-3">
          {devices.map((device, i) => (
            <motion.div
              key={device.id}
              className="flex items-center justify-between px-4 py-3 bg-[rgba(160,107,95,0.3)] rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <span className="font-medium text-[#7A4A3F]">{device.name}</span>
              {device.connected && <AnimatedCheck delay={0} />}
            </motion.div>
          ))}
        </div>

        {scanning && (
          <motion.p
            className="text-center text-sm text-[#7A4A3F] opacity-50 mt-3"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            {t.scanning}
          </motion.p>
        )}
      </motion.div>

      <motion.div
        className="w-full mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: allConnected ? 1 : 0.4 }}
        transition={{ duration: 0.3 }}
      >
        <PillButton onClick={onNext} disabled={!allConnected}>
          {t.btn}
        </PillButton>
      </motion.div>
    </ScreenWrapper>
  );
}
