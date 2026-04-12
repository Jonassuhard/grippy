import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged, type User } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import type { UserProfile, GripType, ExerciseLevel, Session, PatientData } from "@/types";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

// Initialize Firebase (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);

// ─── Auth ───────────────────────────────────────────────
export async function signInAnon(): Promise<User | null> {
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch {
    console.error("Anonymous sign-in failed");
    return null;
  }
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// ─── User Profile ───────────────────────────────────────
export async function saveProfile(uid: string, profile: UserProfile) {
  await setDoc(doc(db, "users", uid), {
    ...profile,
    createdAt: serverTimestamp(),
  }, { merge: true });
}

export async function getProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    lastname: data.lastname || "",
    name: data.name || "",
    age: data.age || "",
    dischargeDate: data.dischargeDate || "",
  };
}

// ─── Sessions ───────────────────────────────────────────
export async function saveSession(session: Omit<Session, "startedAt"> & { startedAt?: Date }) {
  await addDoc(collection(db, "sessions"), {
    ...session,
    startedAt: serverTimestamp(),
    completedAt: serverTimestamp(),
  });
}

// ─── Levels ─────────────────────────────────────────────
export async function saveLevels(uid: string, levels: Record<GripType, ExerciseLevel>) {
  await setDoc(doc(db, "users", uid), { currentLevels: levels }, { merge: true });
}

export async function getLevels(uid: string): Promise<Record<GripType, ExerciseLevel> | null> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return snap.data().currentLevels || null;
}

// ─── Dashboard queries ──────────────────────────────────
export async function getAllPatients(): Promise<PatientData[]> {
  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      uid: d.id,
      profile: {
        lastname: data.lastname || "",
        name: data.name || "",
        age: data.age || "",
        dischargeDate: data.dischargeDate || "",
      },
      currentLevels: data.currentLevels || { pressure: 0, rotation: 0, relaxation: 0 },
      sessionsCompleted: data.sessionsCompleted || 0,
      lastSessionAt: data.lastSessionAt?.toDate() || undefined,
    };
  });
}

export async function getPatientSessions(uid: string): Promise<Session[]> {
  const q = query(
    collection(db, "sessions"),
    where("userId", "==", uid),
    orderBy("startedAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      userId: data.userId,
      gripType: data.gripType,
      level: data.level,
      durationMinutes: data.durationMinutes,
      exercises: data.exercises || [],
      startedAt: data.startedAt?.toDate() || new Date(),
      completedAt: data.completedAt?.toDate(),
      score: data.score,
    };
  });
}
