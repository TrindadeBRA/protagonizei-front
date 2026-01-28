"use client";

import { useCallback, useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { twMerge } from "tailwind-merge";
import { useFormColors } from "./useFormColors";

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
};

const PaymentCardForm = ({ childGender, onChange }: PaymentCardFormProps) => {
  const colors = useFormColors(childGender);
  const [cardData, setCardData] = useState<CardFormData>({
    holderName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    document: "",
    installments: "",
  });

  const updateField = useCallback(
    (field: keyof CardFormData, value: string) => {
      setCardData((prev) => {
        const next = { ...prev, [field]: value };
        onChange?.(next);
        return next;
      });
    },
    [onChange]
  );

  return (
    <div className="space-y-4">
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
        <Label htmlFor="card-number" className="text-gray-700 font-semibold mb-2 block">
          Número do cartão
        </Label>
        <Input
          id="card-number"
          value={cardData.cardNumber}
          onChange={(e) => updateField("cardNumber", e.target.value)}
          placeholder="0000 0000 0000 0000"
          inputMode="numeric"
          autoComplete="cc-number"
          maxLength={19}
          className={twMerge(colors.inputBorderClass, colors.inputFocusBorderClass)}
          style={colors.inputBorderStyle}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="card-expiry" className="text-gray-700 font-semibold mb-2 block">
            Validade
          </Label>
          <Input
            id="card-expiry"
            value={cardData.expiry}
            onChange={(e) => updateField("expiry", e.target.value)}
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
            onChange={(e) => updateField("cvc", e.target.value)}
            placeholder="123"
            inputMode="numeric"
            autoComplete="cc-csc"
            maxLength={4}
            className={twMerge(colors.inputBorderClass, colors.inputFocusBorderClass)}
            style={colors.inputBorderStyle}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="card-document" className="text-gray-700 font-semibold mb-2 block">
            CPF do titular
          </Label>
          <Input
            id="card-document"
            value={cardData.document}
            onChange={(e) => updateField("document", e.target.value)}
            placeholder="000.000.000-00"
            inputMode="numeric"
            autoComplete="off"
            maxLength={14}
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
              {["1", "2", "3", "4", "5", "6"].map((count) => (
                <SelectItem key={count} value={count} className={twMerge(colors.selectItemHoverClass, "cursor-pointer")}>
                  {count}x sem juros
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Seus dados de pagamento serão tratados com segurança e confidencialidade.
      </p>
    </div>
  );
};

export default PaymentCardForm;
