"use client";

import { Mail } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { twMerge } from "tailwind-merge";
import { FormDataState } from "../useFormSection";
import { useFormColors } from "../useFormColors";

type Props = {
  formData: FormDataState;
  isSubmitting: boolean;
  handleInputChange: (field: keyof FormDataState, value: string) => void;
  prevStep: () => void;
  isValid: boolean;
  errors?: Record<string, string[] | undefined>;
  onBlurField?: (field: keyof FormDataState) => void;
  touched?: Partial<Record<keyof FormDataState, boolean>>;
  nextStep: () => void;
};

const Step4Contact = ({ formData, isSubmitting, handleInputChange, prevStep, nextStep, isValid, errors = {}, onBlurField, touched = {} }: Props) => {
  const colors = useFormColors(formData.childGender);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-gray-800 mb-2">Quase pronto!</h3>
        <p className="text-gray-600">Só precisamos saber onde enviar a história do(a) {formData.childName}</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="parentName" className="text-gray-700 font-semibold mb-2 block">
            Seu nome *
          </Label>
          <Input
            id="parentName"
            value={formData.parentName}
            onChange={(e) => handleInputChange("parentName", e.target.value)}
            onBlur={() => onBlurField && onBlurField("parentName")}
            placeholder="Como você gostaria de ser chamado(a)?"
            className={twMerge(colors.inputBorderClass, colors.inputFocusBorderClass)}
            style={colors.inputBorderStyle}
          />
          {!!touched.parentName && !!errors.parentName?.length && (
            <p className="text-xs text-red-500 mt-1">{errors.parentName[0]}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-gray-700 font-semibold mb-2 block">
            Telefone *
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            onBlur={() => onBlurField && onBlurField("phone")}
            placeholder="(00) 00000-0000"
            maxLength={15}
            className={twMerge(colors.inputBorderClass, colors.inputFocusBorderClass)}
            style={colors.inputBorderStyle}
          />
          {!!touched.phone && !!errors.phone?.length && (
            <p className="text-xs text-red-500 mt-1">{errors.phone[0]}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">📱 Para contato em caso de dúvidas sobre sua história</p>
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-700 font-semibold mb-2 block">
            E-mail *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            onBlur={() => onBlurField && onBlurField("email")}
            placeholder="seu@email.com"
            className={twMerge(colors.inputBorderClass, colors.inputFocusBorderClass)}
            style={colors.inputBorderStyle}
          />
          {!!touched.email && !!errors.email?.length && (
            <p className="text-xs text-red-500 mt-1">{errors.email[0]}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">📧 O PDF será enviado para este e-mail em até 2h</p>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button onClick={prevStep} variant="outline" className={twMerge("flex-1", colors.buttonSecondaryClass, "py-4 rounded-xl font-semibold")}>
          Voltar
        </Button>
        <Button
          onClick={nextStep}
          disabled={!isValid || isSubmitting}
          className={twMerge(
            `flex-1 ${colors.buttonPrimaryClass} font-bold py-4 rounded-xl shadow-lg relative`,
            !isValid || isSubmitting ? "opacity-50 !cursor-not-allowed !pointer-events-auto" : ""
          )}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default Step4Contact;
