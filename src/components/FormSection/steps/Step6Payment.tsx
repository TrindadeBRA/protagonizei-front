"use client";

import { QrCode, Loader2, Copy, Check, CreditCard } from "lucide-react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { useMemo, useState } from "react";
import Timer from "@/src/components/Timer";
import { twMerge } from "tailwind-merge";
import { useFormColors } from "../useFormColors";
import PaymentCardForm, { CardFormData } from "../PaymentCardForm";
import customFetch from "@/src/services/custom-fetch";
import { getPostOrdersOrderIdCreditCardUrl } from "@/src/services/api";

type Props = {
  orderId: string | null;
  isLoadingPix: boolean;
  qrCodeImage: string | null;
  pixCode: string | null;
  price: number | null;
  onBack: () => void;
  onSuccess: () => void;
  childGender: string;
  paymentMethod: "pix" | "card";
};

type PixPaymentPanelProps = {
  isLoadingPix: boolean;
  qrCodeImage: string | null;
  pixCode: string | null;
  price: number | null;
  copied: boolean;
  onCopy: () => void;
};

const PixPaymentPanel = ({ isLoadingPix, qrCodeImage, pixCode, price, copied, onCopy }: PixPaymentPanelProps) => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center border-2 border-dashed border-purple-200">
      <Timer initialTime={10 * 60} className="mb-6" />

      <div className="max-w-2xs mx-auto">
        {isLoadingPix ? (
          <div className="w-48 h-48 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
          </div>
        ) : qrCodeImage ? (
          <Image src={`data:image/png;base64,${qrCodeImage}`} alt="QR Code PIX" className="w-48 h-48 mx-auto mb-4" width={192} height={192} />
        ) : (
          <div className="w-48 h-48 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center">
            <QrCode className="w-32 h-32 text-purple-400" />
          </div>
        )}

        {pixCode && !isLoadingPix && (
          <Button
            onClick={onCopy}
            variant="outline"
            className="w-full mb-4 border-2 border-green-300 bg-green-50 text-green-700 hover:bg-green-100 py-3 rounded-xl font-semibold transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Código PIX copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copiar código PIX
              </>
            )}
          </Button>
        )}

        <div className="text-center mb-4">
          <p className="text-sm text-gray-500 mb-1">Valor do pagamento</p>
          <div className="text-2xl font-bold text-green-600">
            {price ? `R$ ${price.toFixed(2).replace(".", ",")}` : "Carregando..."}
          </div>
        </div>
      </div>
      <p className="text-sm font-bold text-black">Após o pagamento, você receberá a confirmação por e-mail.</p>
    </div>
  );
};

const Step6Payment = ({ orderId, isLoadingPix, qrCodeImage, pixCode, price, onBack, onSuccess, childGender, paymentMethod }: Props) => {
  const colors = useFormColors(childGender);
  const [copied, setCopied] = useState(false);
  const [isCardSubmitting, setIsCardSubmitting] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const [cardData, setCardData] = useState<CardFormData>({
    holderName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    document: "",
    installments: "",
  });
  const cardFormWrapperClass =
    childGender === "boy"
      ? "from-blue-50 to-sky-50 border-blue-200"
      : childGender === "girl"
        ? "from-pink-50 to-rose-50 border-pink-200"
        : "from-blue-50 to-pink-50 border-blue-200";
  const calculateInstallments = (amount: number, installments: number) => {
    const rateConfig = { jurosPorParcelaPercent: 1.5 }; // 1.5% por parcela adicional
    const additional = Math.max(installments - 1, 0);
    const totalValue = Number((amount * (1 + (rateConfig.jurosPorParcelaPercent / 100) * additional)).toFixed(2));
    const installmentValue = Number((totalValue / installments).toFixed(2));
    const lastInstallmentValue = Number((totalValue - installmentValue * (installments - 1)).toFixed(2));
    return { totalValue, installmentValue, lastInstallmentValue };
  };

  const installmentOptions = useMemo(() => {
    if (!price) {
      return [
        { value: "1", label: "1x" },
        { value: "2", label: "2x" },
        { value: "3", label: "3x" },
      ];
    }
    return [1, 2, 3].map((count) => {
      const { totalValue, installmentValue } = calculateInstallments(price, count);
      const label = `${count}x de R$ ${installmentValue.toFixed(2).replace(".", ",")} (total R$ ${totalValue.toFixed(2).replace(".", ",")})`;
      return { value: String(count), label };
    });
  }, [price]);

  const handleCopyPix = async () => {
    if (pixCode) {
      try {
        await navigator.clipboard.writeText(pixCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Erro ao copiar código PIX:', err);
      }
    }
  };

  const handleCardPayment = async () => {
    if (!orderId) {
      setCardError("Pedido não encontrado. Volte e tente novamente.");
      return;
    }

    const cardNumber = cardData.cardNumber.replace(/\D/g, "");
    const expiryDigits = cardData.expiry.replace(/\D/g, "");
    const expiry = expiryDigits.length === 4 ? expiryDigits : "";
    const cvc = cardData.cvc.replace(/\D/g, "");
    const document = cardData.document.replace(/\D/g, "");
    const installments = parseInt(cardData.installments || "0", 10);

    setCardError(null);
    setIsCardSubmitting(true);
    try {
      const payload = {
        holderName: cardData.holderName.trim(),
        cardNumber,
        expiry,
        cvc,
        document,
        installments,
      };

      const response: any = await customFetch(getPostOrdersOrderIdCreditCardUrl(Number(orderId)), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response || response.message !== "Pagamento cartão criado com sucesso") {
        const message = response?.message || "Erro ao processar pagamento no cartão.";
        setCardError(message);
        return;
      }
      const status = response?.status;
      if (status === "CONFIRMED" || status === "RECEIVED") {
        onSuccess();
      }
    } catch (error: any) {
      setCardError(error?.message || "Erro ao processar pagamento no cartão.");
    } finally {
      setIsCardSubmitting(false);
    }
  };

  const isCardFormComplete = !!(
    cardData.holderName.trim() &&
    cardData.cardNumber.trim() &&
    cardData.expiry.trim() &&
    cardData.cvc.trim() &&
    cardData.document.trim() &&
    cardData.installments
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
          {paymentMethod === "pix" ? (
            <QrCode className="w-8 h-8 text-white" />
          ) : (
            <CreditCard className="w-8 h-8 text-white" />
          )}
        </div>
        <h3 className="font-heading text-2xl font-bold text-gray-800 mb-2">Último passo: Pagamento</h3>
        <p className="text-gray-600">
          {paymentMethod === "pix"
            ? "Escaneie o QR Code do Pix para finalizar sua história mágica"
            : "Preencha os dados do cartão para finalizar sua história mágica"}
        </p>
      </div>

      {paymentMethod === "pix" ? (
        <PixPaymentPanel
          isLoadingPix={isLoadingPix}
          qrCodeImage={qrCodeImage}
          pixCode={pixCode}
          price={price}
          copied={copied}
          onCopy={handleCopyPix}
        />
      ) : (
        <div className={twMerge("bg-gradient-to-br rounded-2xl p-6 sm:p-8 border-2 border-dashed", cardFormWrapperClass)}>
          <div className="text-left mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-1">Dados do cartão</h4>
            <p className="text-sm text-gray-600">Preencha os dados para concluir o pagamento.</p>
          </div>

          <PaymentCardForm childGender={childGender} onChange={setCardData} installmentOptions={installmentOptions} />

          <div className="mt-6">
            <div className="rounded-xl border border-dashed border-gray-200 bg-white/80 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Total a pagar</p>
                <div className="text-2xl font-bold text-green-600">
                  {price ? `R$ ${price.toFixed(2).replace(".", ",")}` : "Carregando..."}
                </div>
              </div>
              {cardData.installments ? (
                <div className="text-xs text-gray-500">
                  <span className="inline-flex items-center rounded-full bg-green-50 text-green-700 border border-green-200 px-3 py-1 font-semibold">
                    {cardData.installments === "1"
                      ? "Pagamento único"
                      : `${cardData.installments}x no cartão`}
                  </span>
                </div>
              ) : null}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Após a confirmação, você receberá o PDF por e-mail.
            </p>
          </div>
        </div>
      )}

      <div className="flex space-x-4">
        <Button onClick={onBack} variant="outline" className={twMerge("flex-1", colors.buttonSecondaryClass, "py-4 rounded-xl font-semibold")}>
          Voltar
        </Button>
        <Button
          onClick={paymentMethod === "pix" ? handleCopyPix : handleCardPayment}
          disabled={paymentMethod === "pix" ? !pixCode || isLoadingPix : !isCardFormComplete || isCardSubmitting}
          className={twMerge(
            `flex-1 ${colors.buttonPrimaryClass} font-bold py-4 rounded-xl shadow-lg relative`,
            (paymentMethod === "pix" && (!pixCode || isLoadingPix)) ||
              (paymentMethod === "card" && (!isCardFormComplete || isCardSubmitting))
              ? "opacity-50 !cursor-not-allowed !pointer-events-auto"
              : ""
          )}
        >
          {paymentMethod === "pix" ? (
            isLoadingPix ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin inline-block" /> Gerando PIX...
              </>
            ) : (
              "Copiar Código Pix"
            )
          ) : isCardSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin inline-block" /> Processando pagamento...
            </>
          ) : (
            "Finalizar pagamento"
          )}
        </Button>
      </div>
      {paymentMethod === "card" && cardError && (
        <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm p-3">
          {cardError}
        </div>
      )}
    </div>
  );
};

export default Step6Payment;
