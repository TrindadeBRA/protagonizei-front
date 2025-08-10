"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { twMerge } from "tailwind-merge";
import { FormDataState } from "../useFormSection";

type Props = {
  formData: FormDataState;
  skinTones: { value: string; label: string; color: string }[];
  handleInputChange: (field: keyof FormDataState, value: string) => void;
  nextStep: () => void;
  isValid: boolean;
};

const Step1ChildInfo = ({ formData, handleInputChange, skinTones, nextStep, isValid }: Props) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-main to-blue-main rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-gray-800 mb-2">Conte sobre seu pequeno</h3>
        <p className="text-gray-600">Essas informações nos ajudam a personalizar a história</p>
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
            placeholder="Ex: Sofia"
            className="border-2 border-pink-200 rounded-xl focus:border-pink-400 bg-white transition-colors"
          />
        </div>

        <div>
          <Label htmlFor="childAge" className="text-gray-700 font-semibold mb-2 block">
            Idade *
          </Label>
          <Select onValueChange={(value) => handleInputChange("childAge", value)}>
            <SelectTrigger className="border-2 border-pink-200 rounded-xl focus:border-pink-400 bg-white transition-colors">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className="bg-white border-2 border-pink-200 rounded-xl">
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
        <Label className="text-gray-700 font-semibold mb-2 block">Gênero *</Label>
        <Select onValueChange={(value) => handleInputChange("childGender", value)}>
          <SelectTrigger className="border-2 border-pink-200 rounded-xl focus:border-pink-400 bg-white transition-colors">
            <SelectValue placeholder="Selecione o gênero" />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-pink-200 rounded-xl">
            <SelectItem value="menina" className="hover:bg-pink-50 cursor-pointer">
              Menina
            </SelectItem>
            <SelectItem value="menino" className="hover:bg-pink-50 cursor-pointer">
              Menino
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-gray-700 font-semibold mb-2 block">Tom de pele *</Label>
        <Select onValueChange={(value) => handleInputChange("skinTone", value)}>
          <SelectTrigger className="border-2 border-pink-200 rounded-xl focus:border-pink-400 bg-white transition-colors">
            <SelectValue placeholder="Selecione o tom de pele" />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-pink-200 rounded-xl">
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

      <Button
        onClick={nextStep}
        disabled={!isValid}
        className={twMerge(
          "w-full bg-gradient-to-r from-pink-main to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg",
          !isValid ? "opacity-50 !cursor-not-allowed !pointer-events-auto" : ""
        )}
      >
        Continuar
      </Button>
    </div>
  );
};

export default Step1ChildInfo;


