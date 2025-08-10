export const allowedSkinTones = ["claro", "escuro"] as const;
export type SkinToneValue = (typeof allowedSkinTones)[number];

export const skinTones: { value: SkinToneValue; label: string; color: string }[] = [
  { value: "claro", label: "Claro", color: "#EDBD88" },
  // { value: 'medio', label: 'Médio', color: '#C4956A' },
  { value: "escuro", label: "Escuro", color: "#8D5524" },
];


