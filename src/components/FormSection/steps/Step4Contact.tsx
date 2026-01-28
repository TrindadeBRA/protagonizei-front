"use client";

import { Mail, Loader2, CreditCard, QrCode } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { twMerge } from "tailwind-merge";
import { FormDataState } from "../useFormSection";
import CouponDiscount from "../CouponDiscount";
import PriceSummary from "../PriceSummary";
import { useFormColors } from "../useFormColors";
import Image from "next/image";
import Link from "next/link";
import { AlertBox } from "@/src/components/ui/alert-box";

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
  price?: number | null;
  isLoadingPrice?: boolean;
  originalPrice?: number | null;
  orderId?: string | null;
  bookId?: number | null;
  onUpdatePrice?: (newPrice: number) => void;
  couponCode?: string;
  setCouponCode?: (value: string) => void;
  onChangePhoto?: () => void;
  isCouponFromUrl?: boolean;
  setIsCouponFromUrl?: (value: boolean) => void;
  paymentMethod?: "pix" | "card";
  setPaymentMethod?: (value: "pix" | "card") => void;
};

const Step4Contact = ({ formData, skinTones, isSubmitting, handleInputChange, prevStep, handleSubmit, isValid, errors = {}, onBlurField, touched = {}, photoPreviewUrl, croppedPreviewUrl, price, isLoadingPrice, orderId, bookId, onUpdatePrice, couponCode, setCouponCode, originalPrice, onChangePhoto, isCouponFromUrl, setIsCouponFromUrl, paymentMethod = "pix", setPaymentMethod }: Props) => {
  const colors = useFormColors(formData.childGender);
  const selectedCardClass =
    formData.childGender === "boy"
      ? "bg-[color:rgba(53,126,255,0.08)] border-[var(--color-blue-main)]"
      : "bg-[color:rgba(245,52,155,0.08)] border-[var(--color-pink-main)]";
  const selectedBadgeClass =
    formData.childGender === "boy"
      ? "bg-[color:rgba(53,126,255,0.08)] text-[var(--color-blue-main)] border-[var(--color-blue-main)]"
      : "bg-[color:rgba(245,52,155,0.08)] text-[var(--color-pink-main)] border-[var(--color-pink-main)]";

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

      <div className={twMerge(colors.summaryBackgroundClass, "rounded-xl p-6")}>
        <h4 className={twMerge("font-heading font-bold mb-4 flex items-center", colors.summaryTitleColorClass)}>
          Forma de pagamento
        </h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setPaymentMethod?.("pix")}
            className={twMerge(
              "text-left rounded-2xl p-4 border-2 transition-all relative outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-pink-main)] focus-visible:ring-offset-2",
              paymentMethod === "pix"
                ? `${selectedCardClass} shadow-sm`
                : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
            )}
          >
            {paymentMethod === "pix" && (
              <span className={twMerge("absolute top-3 right-3 text-[10px] uppercase tracking-wide font-semibold border px-2 py-1 rounded-full", selectedBadgeClass)}>
                selecionado
              </span>
            )}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Pix</p>
              <p className="text-sm text-gray-600">Pagamento instantâneo</p>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod?.("card")}
            className={twMerge(
              "text-left rounded-2xl p-4 border-2 transition-all relative outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-pink-main)] focus-visible:ring-offset-2",
              paymentMethod === "card"
                ? `${selectedCardClass} shadow-sm`
                : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
            )}
          >
            {paymentMethod === "card" && (
              <span className={twMerge("absolute top-3 right-3 text-[10px] uppercase tracking-wide font-semibold border px-2 py-1 rounded-full", selectedBadgeClass)}>
                selecionado
              </span>
            )}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Cartão de crédito</p>
              <p className="text-sm text-gray-600">Aprovação imediata</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className={twMerge(colors.summaryBackgroundClass, "rounded-xl p-6")}>
        <h4 className={twMerge("font-heading font-bold mb-3 flex items-center", colors.summaryTitleColorClass)}>
          Resumo do seu pedido
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
            <span className="font-semibold">{formData.childGender === "girl" ? "Menina" : "Menino"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tom de pele:</span>
            <span className="font-semibold">{skinTones.find((tone) => tone.value === formData.skinTone)?.label || "Selecionado"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Foto:</span>
            <div className="flex items-center gap-3">
              {croppedPreviewUrl || photoPreviewUrl ? (
                <Image
                  src={croppedPreviewUrl || photoPreviewUrl || ""}
                  alt={`Foto de ${formData.childName || "criança"}`}
                  onClick={onChangePhoto}
                  width={48}
                  height={48}
                  className={twMerge(
                    "w-12 h-12 rounded-lg object-cover ring-2 ring-pink-200 shadow-sm",
                    onChangePhoto ? "cursor-pointer hover:ring-4 hover:ring-pink-300 transition-all" : ""
                  )}
                  title={onChangePhoto ? "Clique para alterar a foto" : ""}
                />
              ) : (
                <span className="font-semibold text-pink-main">✓ Enviada</span>
              )}
            </div>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-3">
            <PriceSummary originalPrice={originalPrice ?? null} currentPrice={price ?? null} isLoading={!!isLoadingPrice} priceColorClass={colors.priceColorClass} />
            {/* Cupom de desconto */}
            <div className="mt-4">
              <CouponDiscount
                orderId={orderId || null}
                bookId={bookId || null}
                currentPrice={price ?? null}
                originalPrice={originalPrice ?? null}
                onPriceUpdate={(newPrice) => onUpdatePrice && onUpdatePrice(newPrice)}
                couponValue={couponCode || ""}
                onCouponChange={(v) => setCouponCode && setCouponCode(v)}
                disabled={isSubmitting}
                childGender={formData.childGender}
                isCouponFromUrl={isCouponFromUrl}
                setIsCouponFromUrl={setIsCouponFromUrl}
              />
            </div>
          </div>
        </div>
      </div>

      <AlertBox className="rounded-lg mb-4">
        <p className="text-xs text-gray-700 leading-relaxed">
          Ao continuar, você concorda com nossa{" "}
          <Link 
            href="/politica-de-privacidade" 
            target="_blank"
            className="text-pink-main hover:text-pink-700 underline font-semibold"
          >
            Política de Privacidade
          </Link>
          {" "}e autoriza o uso de seus dados para envio de comunicações promocionais, automações de marketing e publicidade direcionada.
        </p>
      </AlertBox>

      <div className="flex space-x-4">
        <Button onClick={prevStep} variant="outline" className={twMerge("flex-1", colors.buttonSecondaryClass, "py-4 rounded-xl font-semibold")}>
          Voltar
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!isValid || isSubmitting}
          className={twMerge(
            `flex-1 ${colors.buttonPrimaryClass} font-bold py-4 rounded-xl shadow-lg relative`,
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
