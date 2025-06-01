export const upperMuscleGroups = [
  "Poitrine",
  "Dos",
  "Épaules",
  "Bras",
  "Abdominaux",
  "Avant-bras",
  "Trapèzes",
  "Cervicaux",
  "Autre (Upper)",
] as const;

export const lowerMuscleGroups = [
  "Jambes",
  "Fessiers",
  "Mollets",
  "Adducteurs",
  "Ischio-jambiers",
  "Quadriceps",
  "Autre (Lower)",
] as const;

export const muscleGroups = [
  ...upperMuscleGroups,
  ...lowerMuscleGroups,
] as const;

export const gymEquipments = [
  "Barre",
  "Haltère",
  "Câble",
  "Machine",
  "Poids du corps",
  "Élastique de résistance",
  "Kettlebell",
  "Médecine ball",
  "Banc",
  "TRX / Sangles de suspension",
  "Roue abdominale",
  "Plyo Box",
  "Slam Ball",
  "Sacs de sable",
  "Corde ondulatoire",
  "Autre",
] as const;

export const degressiveTypes = ["Pourcentage"] as const;
