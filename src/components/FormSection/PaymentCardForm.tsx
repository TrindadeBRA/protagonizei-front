"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { twMerge } from "tailwind-merge";
import { useFormColors } from "./useFormColors";
import { CreditCard, ShieldCheck, Sparkles } from "lucide-react";

export type CardFormData = {
  holderName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  document: string;
  installments: string;
};

type PaymentCardFormProps = {
  childGender: string;
  onChange?: (data: CardFormData) => void;
  installmentOptions?: { value: string; label: string }[];
};

const PaymentCardForm = ({ childGender, onChange, installmentOptions }: PaymentCardFormProps) => {
  const colors = useFormColors(childGender);
  const [cardData, setCardData] = useState<CardFormData>({
    holderName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    document: "",
    installments: "",
  });

  const maskCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const maskExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const maskCpf = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  };

  const updateField = useCallback((field: keyof CardFormData, value: string) => {
    setCardData((prev) => ({ ...prev, [field]: value }));
  }, []);

  useEffect(() => {
    onChange?.(cardData);
  }, [cardData, onChange]);

  const cardGradientClass = useMemo(() => {
    if (childGender === "boy") return "from-blue-600 via-blue-500 to-sky-400";
    if (childGender === "girl") return "from-pink-600 via-fuchsia-500 to-rose-400";
    return "from-pink-500 via-purple-500 to-blue-500";
  }, [childGender]);

  return (
    <div className="space-y-6">
      <div className="relative max-w-md mx-auto">
        <div className={twMerge(
          "rounded-2xl p-5 sm:p-6 text-white shadow-2xl relative overflow-hidden aspect-[85.6/53.98] w-full",
          "transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl",
          "border border-white/20",
          `bg-gradient-to-br ${cardGradientClass}`
        )}>
          {/* Efeitos de brilho de fundo */}
          <div className="absolute -top-12 -right-10 w-32 h-32 rounded-full bg-white/15 blur-3xl animate-pulse" />
          <div className="absolute -bottom-12 -left-10 w-36 h-36 rounded-full bg-white/15 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-white/5 blur-3xl" />
          
          {/* Padrão decorativo de linhas */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          </div>

          {/* Conteúdo do cartão */}
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between mb-auto">
              <div className="flex items-center gap-3 text-white/95">
                <img 
                  src="/assets/images/logo white.svg" 
                  alt="Logo Protagonizei" 
                  className="h-10 sm:h-14 drop-shadow-lg"
                />
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30 shadow-lg">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-medium">Pagamento seguro</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-base sm:text-lg md:text-xl tracking-[0.1em] font-bold mb-6 font-mono drop-shadow-lg whitespace-nowrap">
                {cardData.cardNumber || "0000 0000 0000 0000"}
              </div>
              
              <div className="flex items-end justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-white/70 text-[10px] sm:text-xs mb-1 uppercase tracking-wider">Titular</p>
                  <p className="font-bold text-sm sm:text-base truncate drop-shadow-md">
                    {cardData.holderName || "Seu nome"}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-white/70 text-[10px] sm:text-xs mb-1 uppercase tracking-wider">Validade</p>
                  <p className="font-bold text-sm sm:text-base drop-shadow-md">
                    {cardData.expiry || "MM/AA"}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-white/70 text-[10px] sm:text-xs mb-1 uppercase tracking-wider">CPF</p>
                <p className="font-bold text-sm sm:text-base drop-shadow-md">
                  {cardData.document ? maskCpf(cardData.document) : "000.000.000-00"}
                </p>
              </div>
            </div>
          </div>

          {/* Brilho superior */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="card-holder" className="text-gray-700 font-semibold mb-2 block">
            Nome no cartão
          </Label>
          <Input
            id="card-holder"
            value={cardData.holderName}
            onChange={(e) => updateField("holderName", e.target.value)}
            placeholder="Como impresso no cartão"
            autoComplete="cc-name"
            className={twMerge(colors.inputBorderClass, colors.inputFocusBorderClass)}
            style={colors.inputBorderStyle}
          />
        </div>

        <div>
          <Label htmlFor="card-document" className="text-gray-700 font-semibold mb-2 block">
            CPF do titular
          </Label>
          <Input
            id="card-document"
            value={cardData.document}
            onChange={(e) => updateField("document", maskCpf(e.target.value))}
            placeholder="000.000.000-00"
            inputMode="numeric"
            autoComplete="off"
            maxLength={14}
            className={twMerge(colors.inputBorderClass, colors.inputFocusBorderClass)}
            style={colors.inputBorderStyle}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="card-number" className="text-gray-700 font-semibold mb-2 block">
          Número do cartão
        </Label>
        <Input
          id="card-number"
          value={cardData.cardNumber}
          onChange={(e) => updateField("cardNumber", maskCardNumber(e.target.value))}
          placeholder="0000 0000 0000 0000"
          inputMode="numeric"
          autoComplete="cc-number"
          maxLength={19}
          className={twMerge(colors.inputBorderClass, colors.inputFocusBorderClass)}
          style={colors.inputBorderStyle}
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="card-expiry" className="text-gray-700 font-semibold mb-2 block">
            Validade
          </Label>
          <Input
            id="card-expiry"
            value={cardData.expiry}
            onChange={(e) => updateField("expiry", maskExpiry(e.target.value))}
            placeholder="MM/AA"
            inputMode="numeric"
            autoComplete="cc-exp"
            maxLength={5}
            className={twMerge(colors.inputBorderClass, colors.inputFocusBorderClass)}
            style={colors.inputBorderStyle}
          />
        </div>

        <div>
          <Label htmlFor="card-cvc" className="text-gray-700 font-semibold mb-2 block">
            CVV
          </Label>
          <Input
            id="card-cvc"
            value={cardData.cvc}
            onChange={(e) => updateField("cvc", e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="123"
            inputMode="numeric"
            autoComplete="cc-csc"
            maxLength={4}
            className={twMerge(colors.inputBorderClass, colors.inputFocusBorderClass)}
            style={colors.inputBorderStyle}
          />
        </div>

        <div>
          <Label className="text-gray-700 font-semibold mb-2 block">Parcelamento</Label>
          <Select value={cardData.installments} onValueChange={(value) => updateField("installments", value)}>
            <SelectTrigger
              className={twMerge(colors.selectTriggerBorderClass, colors.selectTriggerFocusBorderClass)}
              style={colors.selectTriggerBorderStyle}
              aria-label="Selecione as parcelas"
            >
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent className={twMerge("bg-white", colors.selectContentBorderClass)} style={colors.selectContentBorderStyle}>
              {(installmentOptions ?? [
                { value: "1", label: "1x" },
                { value: "2", label: "2x" },
                { value: "3", label: "3x" },
              ]).map((option) => (
                <SelectItem key={option.value} value={option.value} className={twMerge(colors.selectItemHoverClass, "cursor-pointer")}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-pink-200 bg-gradient-to-r from-pink-50/80 to-purple-50/80 px-4 py-3.5 text-xs text-gray-700 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-2 font-medium">
          <ShieldCheck className="w-4 h-4 text-pink-500 flex-shrink-0" />
          <span>Seus dados são criptografados e protegidos.</span>
        </div>
        <div className="flex items-center gap-2 font-medium">
          <Sparkles className="w-4 h-4 text-pink-500 flex-shrink-0" />
          <span>Pagamento rápido e sem complicações.</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentCardForm;
