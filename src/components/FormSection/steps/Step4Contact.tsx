"use client";

import { Heart, Mail, Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { twMerge } from "tailwind-merge";
import { FormDataState } from "../useFormSection";
import { getGenderTheme } from "../theme";

type Props = {
  formData: FormDataState;
  skinTones: { value: string; label: string; color: string }[];
  isSubmitting: boolean;
  handleInputChange: (field: keyof FormDataState, value: string) => void;
  prevStep: () => void;
  handleSubmit: () => Promise<void> | void;
  isValid: boolean;
  errors?: Record<string, string[] | undefined>;
  onBlurField?: (field: keyof FormDataState) => void;
  touched?: Partial<Record<keyof FormDataState, boolean>>;
  photoPreviewUrl?: string | null;
  croppedPreviewUrl?: string | null;
};

const Step4Contact = ({ formData, skinTones, isSubmitting, handleInputChange, prevStep, handleSubmit, isValid, errors = {}, onBlurField, touched = {}, photoPreviewUrl, croppedPreviewUrl }: Props) => {
  const theme = getGenderTheme(formData.childGender);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className={`w-16 h-16 ${theme.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
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
            className={twMerge("border-2 rounded-xl bg-white transition-colors", theme.borderBase)}
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
            className={twMerge("border-2 rounded-xl bg-white transition-colors", theme.borderBase)}
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
            className={twMerge("border-2 rounded-xl bg-white transition-colors", theme.borderBase)}
          />
          {!!touched.email && !!errors.email?.length && (
            <p className="text-xs text-red-500 mt-1">{errors.email[0]}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">📧 O PDF será enviado para este e-mail em até 24h</p>
        </div>
      </div>

      <div className={twMerge("border rounded-xl p-6", theme.summaryBox)}>
        <h4 className={twMerge("font-heading font-bold mb-3 flex items-center", theme.summaryTitle)}>
          <Heart className={twMerge("w-5 h-5 mr-2 fill-current", theme.summaryTitle)} /> Resumo do seu pedido
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Criança:</span>
            <span className="font-semibold">
              {formData.childName}, {formData.childAge} anos
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Gênero:</span>
            <span className="font-semibold">{formData.childGender}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tom de pele:</span>
            <span className="font-semibold">{skinTones.find((tone) => tone.value === formData.skinTone)?.label || "Selecionado"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Foto:</span>
            <div className="flex items-center gap-3">
              {croppedPreviewUrl || photoPreviewUrl ? (
                <img
                  src={croppedPreviewUrl || photoPreviewUrl || ""}
                  alt={`Foto de ${formData.childName || "criança"}`}
                  className={twMerge("w-12 h-12 rounded-lg object-cover ring-2 shadow-sm", theme.ringClass)}
                />
              ) : (
                <span className={twMerge("font-semibold", theme.summaryTitle)}>✓ Enviada</span>
              )}
            </div>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-800">Total:</span>
              <span className={twMerge("text-2xl font-bold", theme.summaryTitle)}>R$ 49,99</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button onClick={prevStep} variant="outline" className={twMerge("flex-1 border-2 bg-white py-4 rounded-xl font-semibold", theme.backBtn)}>
          Voltar
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className={twMerge(
            "flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg relative",
            !isValid || isSubmitting ? "opacity-50 !cursor-not-allowed !pointer-events-auto" : ""
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin inline-block" /> Criando sua história...
            </>
          ) : (
            "Criar História! 🎉"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Step4Contact;


