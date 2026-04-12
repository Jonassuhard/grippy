export type GripType = "pressure" | "rotation" | "relaxation";

export type AppScreen =
  | "splash"
  | "profile"
  | "bluetooth"
  | "duration"
  | "pickGrip"
  | "training"
  | "exercise"
  | "relax"
  | "cooldown"
  | "bravo"
  | "comeBack";

export type ExerciseLevel = 0 | 1 | 2 | 3 | 4;

export interface UserProfile {
  lastname: string;
  name: string;
  age: string;
  dischargeDate: string;
}

export interface GripDevice {
  id: string;
  name: string;
  connected: boolean;
}

export interface Exercise {
  id: string;
  gripType: GripType;
  level: ExerciseLevel;
  title: string;
  titleFr: string;
  description: string;
  descriptionFr: string;
  durationSeconds: number;
}

export interface Session {
  userId: string;
  gripType: GripType;
  level: ExerciseLevel;
  durationMinutes: number;
  exercises: string[];
  startedAt: Date;
  completedAt?: Date;
  score?: number;
}

export interface PatientData {
  uid: string;
  profile: UserProfile;
  currentLevels: Record<GripType, ExerciseLevel>;
  sessionsCompleted: number;
  lastSessionAt?: Date;
}

export const GRIP_LABELS: Record<GripType, { en: string; fr: string }> = {
  pressure: { en: "Pressure", fr: "Pression" },
  rotation: { en: "Rotation", fr: "Rotation" },
  relaxation: { en: "Relaxation", fr: "Détente" },
};

export const LEVEL_COLORS: Record<ExerciseLevel, string> = {
  0: "var(--level-0)",
  1: "var(--level-1)",
  2: "var(--level-2)",
  3: "var(--level-3)",
  4: "var(--level-4)",
};

export const EXERCISES_DATA: Exercise[] = [
  // Pressure exercises
  { id: "p0a", gripType: "pressure", level: 0, title: "Tap a keyboard", titleFr: "Taper sur un clavier", description: "Tap keys on a keyboard or touchscreen", descriptionFr: "Taper sur un clavier ou un écran tactile", durationSeconds: 60 },
  { id: "p0b", gripType: "pressure", level: 0, title: "Flip a switch", titleFr: "Actionner un interrupteur", description: "Press a light switch up and down", descriptionFr: "Actionner un interrupteur", durationSeconds: 60 },
  { id: "p1a", gripType: "pressure", level: 1, title: "Squeeze toothpaste", titleFr: "Presser un tube de dentifrice", description: "Press a toothpaste tube", descriptionFr: "Presser un tube de dentifrice", durationSeconds: 90 },
  { id: "p1b", gripType: "pressure", level: 1, title: "Write with a pen", titleFr: "Écrire avec un stylo", description: "Hold and write with a pen", descriptionFr: "Écrire avec un stylo", durationSeconds: 90 },
  { id: "p2a", gripType: "pressure", level: 2, title: "Use a stapler", titleFr: "Utiliser une agrafeuse", description: "Press down on a desk stapler", descriptionFr: "Utiliser une agrafeuse de bureau", durationSeconds: 120 },
  { id: "p2b", gripType: "pressure", level: 2, title: "Open a bottle", titleFr: "Ouvrir une bouteille", description: "Open a new water bottle", descriptionFr: "Ouvrir une bouteille d'eau neuve", durationSeconds: 120 },
  { id: "p3a", gripType: "pressure", level: 3, title: "Use pruning shears", titleFr: "Utiliser un sécateur", description: "Cut with pruning shears", descriptionFr: "Utiliser un sécateur", durationSeconds: 150 },
  { id: "p3b", gripType: "pressure", level: 3, title: "Knead dough", titleFr: "Pétrir de la pâte", description: "Knead bread dough", descriptionFr: "Pétrir de la pâte à pain", durationSeconds: 150 },
  { id: "p4a", gripType: "pressure", level: 4, title: "Open heavy door", titleFr: "Ouvrir une porte lourde", description: "Open a heavy or stuck door", descriptionFr: "Ouvrir une porte blindée ou lourde coincée", durationSeconds: 180 },

  // Rotation exercises
  { id: "r0a", gripType: "rotation", level: 0, title: "Turn a ring", titleFr: "Tourner une bague", description: "Rotate a ring on your finger", descriptionFr: "Tourner une bague au doigt", durationSeconds: 60 },
  { id: "r0b", gripType: "rotation", level: 0, title: "Adjust a knob", titleFr: "Ajuster un bouton", description: "Turn a volume or oven knob", descriptionFr: "Ajuster un bouton de volume ou de four", durationSeconds: 60 },
  { id: "r1a", gripType: "rotation", level: 1, title: "Use a screwdriver", titleFr: "Utiliser un tournevis", description: "Drive a small screw", descriptionFr: "Utiliser un tournevis pour une petite vis", durationSeconds: 90 },
  { id: "r1b", gripType: "rotation", level: 1, title: "Turn a key", titleFr: "Tourner une clé", description: "Turn a key in a lock", descriptionFr: "Tourner une clé dans une serrure", durationSeconds: 90 },
  { id: "r2a", gripType: "rotation", level: 2, title: "Unscrew a cap", titleFr: "Dévisser un bouchon", description: "Unscrew a gas bottle cap", descriptionFr: "Dévisser un bouchon de bouteille de gaz", durationSeconds: 120 },
  { id: "r2b", gripType: "rotation", level: 2, title: "Wring a cloth", titleFr: "Essorer un tissu", description: "Wring out a wet cloth", descriptionFr: "Essorer une serpillière ou un vêtement", durationSeconds: 120 },
  { id: "r3a", gripType: "rotation", level: 3, title: "Turn a steering wheel", titleFr: "Tourner un volant", description: "Turn a wheel without power steering", descriptionFr: "Tourner un volant sans direction assistée", durationSeconds: 150 },
  { id: "r3b", gripType: "rotation", level: 3, title: "Open a sealed jar", titleFr: "Ouvrir un bocal scellé", description: "Open a sealed glass jar", descriptionFr: "Ouvrir un bocal de conserve scellé", durationSeconds: 150 },
  { id: "r4a", gripType: "rotation", level: 4, title: "Loosen a lug nut", titleFr: "Dévisser un écrou", description: "Loosen a stuck car lug nut", descriptionFr: "Dévisser un écrou de roue grippé", durationSeconds: 180 },

  // Relaxation exercises
  { id: "x0a", gripType: "relaxation", level: 0, title: "Massage your palm", titleFr: "Masser la paume", description: "Massage under the hand like dough", descriptionFr: "Masser sous la main comme la pâte à pain", durationSeconds: 60 },
  { id: "x1a", gripType: "relaxation", level: 1, title: "Thumb to fingers", titleFr: "Pouce et doigts", description: "Pinch between thumb and each finger", descriptionFr: "Pincer entre le pouce et chaque doigt", durationSeconds: 90 },
  { id: "x2a", gripType: "relaxation", level: 2, title: "Targeted palm press", titleFr: "Pression ciblée", description: "Press fingers against palm precisely", descriptionFr: "Presser les doigts contre la paume de façon ciblée", durationSeconds: 120 },
  { id: "x3a", gripType: "relaxation", level: 3, title: "Full fist press", titleFr: "Pression poing fermé", description: "Full hand pressure with closed fist", descriptionFr: "Une pression à pleine main, poing fermé", durationSeconds: 150 },
];

export const DURATION_OPTIONS = [5, 10, 15, 20, 25, 30] as const;
