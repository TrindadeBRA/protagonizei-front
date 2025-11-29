"use client";

import { useMemo } from "react";

export const useFormColors = (childGender: string) => {
  const colors = useMemo(() => {
    // Cores principais
    const pinkMain = "#f5349b";
    const blueMain = "#357eff";

    // Quando não há seleção, usar gradiente suavizado
    if (!childGender) {
      return {
        inputBorderClass: "border-2 rounded-xl bg-white transition-colors",
        inputBorderStyle: {
          background: "linear-gradient(white, white) padding-box, linear-gradient(to right, rgba(245, 52, 155, 0.4), rgba(53, 126, 255, 0.4)) border-box",
          border: "2px solid transparent",
        },
        inputFocusBorderClass: "focus:border-pink-300",
        selectTriggerBorderClass: "border-2 rounded-xl bg-white transition-colors select-gradient-open",
        selectTriggerBorderStyle: {
          background: "linear-gradient(white, white) padding-box, linear-gradient(to right, rgba(245, 52, 155, 0.4), rgba(53, 126, 255, 0.4)) border-box",
          border: "2px solid transparent",
        },
        selectTriggerFocusBorderClass: "focus:border-pink-300 data-[state=open]:border-pink-400",
        selectContentBorderClass: "border-2 rounded-xl",
        selectContentBorderStyle: {
          background: "linear-gradient(white, white) padding-box, linear-gradient(to right, rgba(245, 52, 155, 0.4), rgba(53, 126, 255, 0.4)) border-box",
          border: "2px solid transparent",
        },
        pinkMain,
        blueMain,
      };
    }

    // Quando seleciona "girl" (menina)
    if (childGender === "girl") {
      return {
        inputBorderClass: "border-2 border-pink-300 rounded-xl bg-white transition-colors",
        inputBorderStyle: undefined,
        inputFocusBorderClass: "focus:border-pink-400",
        selectTriggerBorderClass: "border-2 border-pink-300 rounded-xl bg-white transition-colors",
        selectTriggerBorderStyle: undefined,
        selectTriggerFocusBorderClass: "focus:border-pink-400 data-[state=open]:border-pink-500",
        selectContentBorderClass: "border-2 border-pink-300 rounded-xl",
        selectContentBorderStyle: undefined,
        pinkMain,
        blueMain,
      };
    }

    // Quando seleciona "boy" (menino)
    if (childGender === "boy") {
      return {
        inputBorderClass: "border-2 border-blue-300 rounded-xl bg-white transition-colors",
        inputBorderStyle: undefined,
        inputFocusBorderClass: "focus:border-blue-400",
        selectTriggerBorderClass: "border-2 border-blue-300 rounded-xl bg-white transition-colors",
        selectTriggerBorderStyle: undefined,
        selectTriggerFocusBorderClass: "focus:border-blue-400 data-[state=open]:border-blue-500",
        selectContentBorderClass: "border-2 border-blue-300 rounded-xl",
        selectContentBorderStyle: undefined,
        pinkMain,
        blueMain,
      };
    }

    // Fallback (gradiente suavizado)
    return {
      inputBorderClass: "border-2 rounded-xl bg-white transition-colors",
      inputBorderStyle: {
        background: "linear-gradient(white, white) padding-box, linear-gradient(to right, rgba(245, 52, 155, 0.4), rgba(53, 126, 255, 0.4)) border-box",
        border: "2px solid transparent",
      },
      inputFocusBorderClass: "focus:border-pink-300",
      selectTriggerBorderClass: "border-2 rounded-xl bg-white transition-colors select-gradient-open",
      selectTriggerBorderStyle: {
        background: "linear-gradient(white, white) padding-box, linear-gradient(to right, rgba(245, 52, 155, 0.4), rgba(53, 126, 255, 0.4)) border-box",
        border: "2px solid transparent",
      },
      selectTriggerFocusBorderClass: "focus:border-pink-300 data-[state=open]:border-pink-400",
      selectContentBorderClass: "border-2 rounded-xl",
      selectContentBorderStyle: {
        background: "linear-gradient(white, white) padding-box, linear-gradient(to right, rgba(245, 52, 155, 0.4), rgba(53, 126, 255, 0.4)) border-box",
        border: "2px solid transparent",
      },
      pinkMain,
      blueMain,
    };
  }, [childGender]);

  return colors;
};

