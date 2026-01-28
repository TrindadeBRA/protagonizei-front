"use client";

import { QrCode, Loader2, Copy, Check, CreditCard } from "lucide-react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { useState } from "react";
import Timer from "@/src/components/Timer";
import { twMerge } from "tailwind-merge";
import { useFormColors } from "../useFormColors";
import PaymentCardForm from "../PaymentCardForm";

type Props = {
  orderId: string | null;
  isLoadingPix: boolean;
  qrCodeImage: string | null;
  pixCode: string | null;
  price: number | null;
  onBack: () => void;
  childGender: string;
  paymentMethod: "pix" | "card";
};

const Step6Pix = ({ isLoadingPix, qrCodeImage, pixCode, price, onBack, childGender, paymentMethod }: Props) => {
  const colors = useFormColors(childGender);
  const [copied, setCopied] = useState(false);
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
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center border-2 border-dashed border-purple-200">
          {/* Timer */}
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

            {/* Botão Copiar PIX */}
            {pixCode && !isLoadingPix && (
              <Button
                onClick={handleCopyPix}
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
      ) : (
        <div className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-2xl p-6 sm:p-8 border-2 border-dashed border-blue-200">
          <div className="text-left mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-1">Dados do cartão</h4>
            <p className="text-sm text-gray-600">Preencha os dados para concluir o pagamento.</p>
          </div>

          <PaymentCardForm childGender={childGender} />

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 mb-1">Valor do pagamento</p>
            <div className="text-2xl font-bold text-green-600">
              {price ? `R$ ${price.toFixed(2).replace(".", ",")}` : "Carregando..."}
            </div>
          </div>
        </div>
      )}

      <div className="flex space-x-4">
        <Button onClick={onBack} variant="outline" className={twMerge("flex-1", colors.buttonSecondaryClass, "py-4 rounded-xl font-semibold")}>
          Voltar
        </Button>
        <Button
          onClick={paymentMethod === "pix" ? handleCopyPix : undefined}
          disabled={paymentMethod === "pix" ? !pixCode || isLoadingPix : false}
          className={twMerge(
            `flex-1 ${colors.buttonPrimaryClass} font-bold py-4 rounded-xl shadow-lg relative`,
            paymentMethod === "pix" && (!pixCode || isLoadingPix) ? "opacity-50 !cursor-not-allowed !pointer-events-auto" : ""
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
          ) : (
            "Finalizar pagamento"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Step6Pix;
