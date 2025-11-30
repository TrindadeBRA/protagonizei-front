"use client";

import { Camera } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { FormDataState } from "../useFormSection";
import { twMerge } from "tailwind-merge";
import { useFormColors } from "../useFormColors";

type Props = {
  formData: FormDataState;
  handlePhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
  isValid: boolean;
};

const Step2PhotoUpload = ({ formData, handlePhotoChange, nextStep, prevStep, isValid }: Props) => {
  const colors = useFormColors(formData.childGender);
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Camera className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-gray-800 mb-2">Foto do(a) {formData.childName}</h3>
        <p className="text-gray-600">Uma foto clara do rosto ajuda nossa IA a criar ilustrações perfeitas</p>
      </div>

      <div className="border-2 border-dashed border-pink-300 rounded-xl p-8 text-center bg-gradient-to-br from-pink-50 to-purple-50 h-[250px] flex items-center justify-center">
        <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" id="photo-upload" />
        <label htmlFor="photo-upload" className="cursor-pointer block">
          {formData.photo ? (
            <div className="w-32 h-32 rounded-xl overflow-hidden bg-white mx-auto mb-4 border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={URL.createObjectURL(formData.photo)}
                alt="Pré-visualização"
                className="w-full h-full object-cover"
                onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
              />
            </div>
          ) : (
            <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-10 h-10 text-white" />
            </div>
          )}
          <h4 className="font-heading font-bold text-gray-800 mb-2">{formData.photo ? "Foto selecionada" : "Clique para enviar a foto"}</h4>
          <p className="text-gray-600 text-sm">{formData.photo ? formData.photo.name : "JPG, PNG ou JPEG (máximo 5MB)"}</p>
        </label>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <h5 className="font-semibold text-yellow-800 mb-2">💡 Dica importante:</h5>
        <p className="text-yellow-700 text-sm">Para melhores resultados, use uma foto onde o rosto da criança esteja bem visível, com boa iluminação e sem óculos escuros.</p>
      </div>

      <div className="flex space-x-4">
        <Button onClick={prevStep} variant="outline" className={twMerge("flex-1", colors.buttonSecondaryClass, "py-4 rounded-xl font-semibold")}>
          Voltar
        </Button>
        <Button
          onClick={nextStep}
          disabled={!isValid}
          className={twMerge(
            `flex-1 ${colors.buttonPrimaryClass} font-bold py-4 rounded-xl`,
            !isValid ? "opacity-50 !cursor-not-allowed !pointer-events-auto" : ""
          )}
        >
          Continuar
          <Camera className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Step2PhotoUpload;


