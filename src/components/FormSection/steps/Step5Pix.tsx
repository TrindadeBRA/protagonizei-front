"use client";

import { QrCode, Loader2, Copy, Check } from "lucide-react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { useState, useEffect } from "react";

type Props = {
  orderId: string | null;
  isLoadingPix: boolean;
  qrCodeImage: string | null;
  pixCode: string | null;
  onBack: () => void;
};

const Step5Pix = ({ orderId, isLoadingPix, qrCodeImage, pixCode, onBack }: Props) => {
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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
          <QrCode className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-gray-800 mb-2">Último passo: Pagamento</h3>
        <p className="text-gray-600">Escaneie o QR Code do Pix para finalizar sua história mágica</p>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center border-2 border-dashed border-purple-200">
        {/* Timer */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-red-600 mb-2">Validade do pagamento</p>
          <div className="inline-flex items-center justify-center px-4 py-2 bg-red-100 border border-red-300 rounded-full">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-red-700 font-mono font-bold text-lg">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>



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
            {/* <div className="text-2xl font-bold text-green-600">R$ 49,99</div> */}
            <div className="text-2xl font-bold text-green-600">R$ 5,00</div>

          </div>
          
        </div>
          <p className="text-sm font-bold text-black">Após o pagamento, você receberá a confirmação por e-mail.</p>
      </div>

      <div className="flex space-x-4">
        <Button onClick={onBack} variant="outline" className="flex-1 border-2 bg-white border-pink-300 text-pink-600 hover:bg-pink-50 py-4 rounded-xl font-semibold">
          Voltar
        </Button>
        <Button
          onClick={handleCopyPix}
          disabled={!pixCode || isLoadingPix}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-main hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 rounded-xl shadow-lg relative disabled:cursor-not-allowed"
        >
          {isLoadingPix ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin inline-block" /> Gerando PIX...
            </>
          ) : (
            "Copiar Código Pix"
          )}
        </Button>
      </div>
    </div>
  );
};

export default Step5Pix;


