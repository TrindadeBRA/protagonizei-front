"use client";

import type { FC } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { twMerge } from "tailwind-merge";
import { FormDataState } from "../useFormSection";
import { useFormColors } from "../useFormColors";

export type Step1ChildInfoProps = {
  formData: FormDataState;
  skinTones: { value: string; label: string; color: string }[];
  handleInputChange: (field: keyof FormDataState, value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  isValid: boolean;
  errors: Record<string, string[] | undefined>;
  onBlurField: (field: keyof FormDataState) => void;
  touched: Partial<Record<keyof FormDataState, boolean>>;
};

const Step1ChildInfo: FC<Step1ChildInfoProps> = ({ formData, handleInputChange, skinTones, nextStep, prevStep, isValid, errors, onBlurField, touched }) => {
  const colors = useFormColors(formData.childGender);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-main to-blue-main rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-gray-800 mb-2">Conte sobre seu pequeno</h3>
        <p className="text-gray-600">
          Vamos usar o nome, idade e tom de pele da criança para criar ilustrações ainda mais parecidas e textos totalmente personalizados na sua história.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="childName" className="text-gray-700 font-semibold mb-2 block">
            Nome da criança *
          </Label>
          <Input
            id="childName"
            value={formData.childName}
            onChange={(e) => handleInputChange("childName", e.target.value)}
            onBlur={() => onBlurField("childName")}
            placeholder="Ex: Luna"
            className={twMerge(colors.inputBorderClass, colors.inputFocusBorderClass)}
            style={colors.inputBorderStyle}
          />
          {!!touched.childName && !!errors.childName?.length && (
            <p className="text-xs text-red-500 mt-1">{errors.childName[0]}</p>
          )}
        </div>

        <div>
          <Label htmlFor="childAge" className="text-gray-700 font-semibold mb-2 block">
            Idade *
          </Label>
          <Select onValueChange={(value) => handleInputChange("childAge", value)}>
            <SelectTrigger 
              className={twMerge(colors.selectTriggerBorderClass, colors.selectTriggerFocusBorderClass)}
              style={colors.selectTriggerBorderStyle}
              aria-label="Selecione a idade da criança"
            >
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className={twMerge("bg-white", colors.selectContentBorderClass)} style={colors.selectContentBorderStyle}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((age) => (
                <SelectItem key={age} value={age.toString()} className="hover:bg-pink-50 cursor-pointer">
                  {age} anos
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-gray-700 font-semibold mb-2 block">Tom de pele *</Label>
        <Select onValueChange={(value) => handleInputChange("skinTone", value)}>
          <SelectTrigger 
            className={twMerge(colors.selectTriggerBorderClass, colors.selectTriggerFocusBorderClass)}
            style={colors.selectTriggerBorderStyle}
            aria-label="Selecione o tom de pele da criança"
          >
            <SelectValue placeholder="Selecione o tom de pele" />
          </SelectTrigger>
          <SelectContent className={twMerge("bg-white", colors.selectContentBorderClass)} style={colors.selectContentBorderStyle}>
            {skinTones.map((tone) => (
              <SelectItem key={tone.value} value={tone.value} className="hover:bg-pink-50 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full border border-gray-200" style={{ backgroundColor: tone.color }} />
                  <span>{tone.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex space-x-4">
        <Button onClick={prevStep} variant="outline" className="flex-1 border-2 bg-white border-pink-300 text-pink-600 hover:bg-pink-50 py-4 rounded-xl font-semibold">
          Voltar
        </Button>
        <Button
          onClick={nextStep}
          disabled={!isValid}
          className={twMerge(
            "flex-1 bg-gradient-to-r from-pink-main to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg",
            !isValid ? "opacity-50 !cursor-not-allowed !pointer-events-auto" : ""
          )}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default Step1ChildInfo;


