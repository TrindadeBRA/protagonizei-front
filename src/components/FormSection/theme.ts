export type GenderValue = "menina" | "menino" | string | undefined | null;

export type GenderTheme = {
  // Títulos e barra de progresso do container principal
  titleClass: string;
  progressBarClass: string;

  // Passo 1
  headerBg: string;
  borderBase: string;
  dropdownBorder: string;
  itemHover: string;
  continueBtn: string;

  // Passo 4
  iconBg: string;
  summaryBox: string;
  summaryTitle: string;
  backBtn: string;
  ringClass: string;
};

const girlTheme: GenderTheme = {
  titleClass: "text-pink-main",
  progressBarClass: "bg-pink-main",
  headerBg: "bg-gradient-to-br from-pink-main to-rose-400",
  borderBase: "border-pink-200 focus:border-pink-400",
  dropdownBorder: "bg-white border-2 border-pink-200 rounded-xl",
  itemHover: "hover:bg-pink-50",
  continueBtn: "bg-gradient-to-r from-pink-main to-rose-500 hover:from-pink-main hover:to-rose-600",
  iconBg: "bg-gradient-to-br from-pink-main to-rose-400",
  summaryBox: "bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200",
  summaryTitle: "text-pink-main",
  backBtn: "border-pink-300 text-pink-600 hover:bg-pink-50",
  ringClass: "ring-pink-200",
};

const boyTheme: GenderTheme = {
  titleClass: "text-blue-main",
  progressBarClass: "bg-blue-main",
  headerBg: "bg-gradient-to-br from-blue-main to-cyan-500",
  borderBase: "border-blue-200 focus:border-blue-400",
  dropdownBorder: "bg-white border-2 border-blue-200 rounded-xl",
  itemHover: "hover:bg-blue-50",
  continueBtn: "bg-gradient-to-r from-blue-main to-cyan-500 hover:from-blue-600 hover:to-cyan-600",
  iconBg: "bg-gradient-to-br from-blue-main to-cyan-500",
  summaryBox: "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200",
  summaryTitle: "text-blue-main",
  backBtn: "border-blue-300 text-blue-600 hover:bg-blue-50",
  ringClass: "ring-blue-200",
};

const defaultTheme: GenderTheme = {
  titleClass: "bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent",
  progressBarClass: "bg-gradient-to-r from-pink-main  to-blue-main",
  headerBg: "bg-gradient-to-br from-pink-main to-blue-main",
  borderBase: "border-pink-200 focus:border-pink-400",
  dropdownBorder: "bg-white border-2 border-pink-200 rounded-xl",
  itemHover: "hover:bg-pink-50",
  continueBtn: "bg-gradient-to-r from-pink-main to-purple-500 hover:from-pink-600 hover:to-purple-600",
  iconBg: "bg-gradient-to-br from-green-400 to-emerald-400",
  summaryBox: "bg-gradient-to-r from-pink-50 to-blue-50 border-pink-200",
  summaryTitle: "text-pink-main",
  backBtn: "border-pink-300 text-pink-600 hover:bg-pink-50",
  ringClass: "ring-pink-200",
};

export function getGenderTheme(gender: GenderValue): GenderTheme {
  if (gender === "menina") return girlTheme;
  if (gender === "menino") return boyTheme;
  return defaultTheme;
}


