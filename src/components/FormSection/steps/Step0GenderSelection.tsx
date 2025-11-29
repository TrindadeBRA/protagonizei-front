"use client";

import type { FC } from "react";
import { Sparkles, Heart, Star } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { twMerge } from "tailwind-merge";
import { FormDataState } from "../useFormSection";
import { useFormColors } from "../useFormColors";

export type Step0GenderSelectionProps = {
  formData: FormDataState;
  handleInputChange: (field: keyof FormDataState, value: string) => void;
  nextStep: () => void;
};

const Step0GenderSelection: FC<Step0GenderSelectionProps> = ({ formData, handleInputChange, nextStep }) => {
  const colors = useFormColors(formData.childGender);

  const handleGenderSelect = (gender: "girl" | "boy") => {
    handleInputChange("childGender", gender);
  };

  const isValid = !!formData.childGender;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
          !formData.childGender 
            ? "bg-gradient-to-br from-pink-main to-blue-main" 
            : formData.childGender === "girl" 
              ? "bg-pink-main" 
              : "bg-blue-main"
        }`}>
          {!formData.childGender ? (
            <Sparkles className="w-8 h-8 text-white" />
          ) : formData.childGender === "girl" ? (
            <Heart className="w-8 h-8 text-white fill-white" />
          ) : (
            <Star className="w-8 h-8 text-white fill-white" />
          )}
        </div>
        <h3 className="font-heading text-2xl font-bold text-gray-800 mb-2">Vamos começar!</h3>
        <p className="text-gray-600">Selecione o gênero da criança para personalizarmos a história</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Opção Menina */}
        <button
          onClick={() => handleGenderSelect("girl")}
          className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${
            formData.childGender === "girl"
              ? "border-pink-400 bg-pink-50 shadow-lg"
              : formData.childGender === ""
                ? "border-pink-200 bg-white hover:border-pink-300 hover:bg-pink-50"
                : "border-gray-200 bg-gray-50 opacity-50"
          }`}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
              formData.childGender === "girl"
                ? "bg-pink-main"
                : "bg-pink-200 group-hover:bg-pink-300"
            }`}>
              <Heart className={`w-8 h-8 transition-all duration-300 ${
                formData.childGender === "girl"
                  ? "text-white fill-white"
                  : "text-pink-main fill-pink-main"
              }`} />
            </div>
            <span className={`font-heading text-xl font-bold transition-colors ${
              formData.childGender === "girl"
                ? "text-pink-main"
                : "text-gray-700"
            }`}>
              Menina
            </span>
          </div>
        </button>

        {/* Opção Menino */}
        <button
          onClick={() => handleGenderSelect("boy")}
          className={`group relative p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${
            formData.childGender === "boy"
              ? "border-blue-400 bg-blue-50 shadow-lg"
              : formData.childGender === ""
                ? "border-blue-200 bg-white hover:border-blue-300 hover:bg-blue-50"
                : "border-gray-200 bg-gray-50 opacity-50"
          }`}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
              formData.childGender === "boy"
                ? "bg-blue-main"
                : "bg-blue-200 group-hover:bg-blue-300"
            }`}>
              <Star className={`w-8 h-8 transition-all duration-300 ${
                formData.childGender === "boy"
                  ? "text-white fill-white"
                  : "text-blue-main fill-blue-main"
              }`} />
            </div>
            <span className={`font-heading text-xl font-bold transition-colors ${
              formData.childGender === "boy"
                ? "text-blue-main"
                : "text-gray-700"
            }`}>
              Menino
            </span>
          </div>
        </button>
      </div>

      <Button
        onClick={nextStep}
        disabled={!isValid}
        className={twMerge(
          "w-full bg-gradient-to-r from-pink-main to-blue-main hover:from-pink-600 hover:to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg",
          !isValid ? "opacity-50 !cursor-not-allowed !pointer-events-auto" : ""
        )}
      >
        Continuar
      </Button>
    </div>
  );
};

export default Step0GenderSelection;

