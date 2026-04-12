"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ScreenWrapper, PillButton, AnimatedCheck } from "@/components/ui";
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
      <div className="bg-[rgba(226,192,184,0.5)] rounded-3xl p-6 w-full max-w-sm animate-fadeIn">
        {/* Header — real Figma bluetooth illustration */}
        <div className="flex items-center justify-center mb-6">
          <motion.div
            animate={{ opacity: scanning ? [0.6, 1, 0.6] : 1 }}
            transition={{ repeat: scanning ? Infinity : 0, duration: 1.5 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/bluetooth-icon.png" alt="Bluetooth" width={200} height={140} style={{ objectFit: "contain" }} />
          </motion.div>
        </div>

        {/* Device list */}
        <div className="bg-[rgba(160,107,95,0.2)] rounded-2xl p-4 space-y-3">
          {devices.map((device, i) => (
            <div
              key={device.id}
              className={`flex items-center justify-between px-4 py-3 bg-[rgba(160,107,95,0.3)] rounded-xl animate-fadeIn-delay-${Math.min(i + 1, 3) as 1 | 2 | 3}`}
            >
              <span className="font-medium text-[#7A4A3F]">{device.name}</span>
              {device.connected && <AnimatedCheck delay={0} />}
            </div>
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
      </div>

      <motion.div
        className="w-full mt-6"
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
