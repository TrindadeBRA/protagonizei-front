"use client";

import { useMemo } from "react";

export const useFormColors = (childGender: string) => {
  const colors = useMemo(() => {
    // Cores principais
    const pinkMain = "#f5349b";
    const blueMain = "#357eff";

    // Quando não há seleção, usar gradiente
    if (!childGender) {
      return {
        inputBorderClass: "border-2 rounded-xl bg-white transition-colors",
        inputBorderStyle: {
          background: "linear-gradient(white, white) padding-box, linear-gradient(to right, #f5349b, #357eff) border-box",
          border: "2px solid transparent",
        },
        inputFocusBorderClass: "focus:border-pink-main",
        selectTriggerBorderClass: "border-2 rounded-xl bg-white transition-colors",
        selectTriggerBorderStyle: {
          background: "linear-gradient(white, white) padding-box, linear-gradient(to right, #f5349b, #357eff) border-box",
          border: "2px solid transparent",
        },
        selectTriggerFocusBorderClass: "focus:border-pink-main",
        selectContentBorderClass: "border-2 rounded-xl",
        selectContentBorderStyle: {
          background: "linear-gradient(white, white) padding-box, linear-gradient(to right, #f5349b, #357eff) border-box",
          border: "2px solid transparent",
        },
        pinkMain,
        blueMain,
      };
    }

    // Quando seleciona "girl" (menina)
    if (childGender === "girl") {
      return {
        inputBorderClass: "border-2 border-pink-main rounded-xl bg-white transition-colors",
        inputBorderStyle: undefined,
        inputFocusBorderClass: "focus:border-pink-600",
        selectTriggerBorderClass: "border-2 border-pink-main rounded-xl bg-white transition-colors",
        selectTriggerBorderStyle: undefined,
        selectTriggerFocusBorderClass: "focus:border-pink-600",
        selectContentBorderClass: "border-2 border-pink-main rounded-xl",
        selectContentBorderStyle: undefined,
        pinkMain,
        blueMain,
      };
    }

    // Quando seleciona "boy" (menino)
    if (childGender === "boy") {
      return {
        inputBorderClass: "border-2 border-blue-main rounded-xl bg-white transition-colors",
        inputBorderStyle: undefined,
        inputFocusBorderClass: "focus:border-blue-600",
        selectTriggerBorderClass: "border-2 border-blue-main rounded-xl bg-white transition-colors",
        selectTriggerBorderStyle: undefined,
        selectTriggerFocusBorderClass: "focus:border-blue-600",
        selectContentBorderClass: "border-2 border-blue-main rounded-xl",
        selectContentBorderStyle: undefined,
        pinkMain,
        blueMain,
      };
    }

    // Fallback (gradiente)
    return {
      inputBorderClass: "border-2 rounded-xl bg-white transition-colors",
      inputBorderStyle: {
        background: "linear-gradient(white, white) padding-box, linear-gradient(to right, #f5349b, #357eff) border-box",
        border: "2px solid transparent",
      },
      inputFocusBorderClass: "focus:border-pink-main",
      selectTriggerBorderClass: "border-2 rounded-xl bg-white transition-colors",
      selectTriggerBorderStyle: {
        background: "linear-gradient(white, white) padding-box, linear-gradient(to right, #f5349b, #357eff) border-box",
        border: "2px solid transparent",
      },
      selectTriggerFocusBorderClass: "focus:border-pink-main",
      selectContentBorderClass: "border-2 rounded-xl",
      selectContentBorderStyle: {
        background: "linear-gradient(white, white) padding-box, linear-gradient(to right, #f5349b, #357eff) border-box",
        border: "2px solid transparent",
      },
      pinkMain,
      blueMain,
    };
  }, [childGender]);

  return colors;
};

