export const allowedSkinTones = ["light", "dark"] as const;
export type SkinToneValue = (typeof allowedSkinTones)[number];

export const skinTones: { value: SkinToneValue; label: string; color: string }[] = [
  { value: "light", label: "Claro", color: "#EDBD88" },
  { value: "dark", label: "Escuro", color: "#8D5524" },
];


