"use client";

import { QrCode, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";

type Props = {
  orderId: string | null;
  isLoadingPix: boolean;
  qrCodeImage: string | null;
  pixCode: string | null;
  onBack: () => void;
};

const Step5Pix = ({ orderId, isLoadingPix, qrCodeImage, pixCode, onBack }: Props) => {
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
        <div className="max-w-xs mx-auto mb-6">
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
          <p className="text-sm text-gray-500 mb-4">Pedido #{orderId}</p>
          <div className="text-2xl font-bold text-green-600 mb-2">R$ 49,99</div>
          <p className="text-sm text-gray-600">Após o pagamento, você receberá a confirmação por e-mail</p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <h5 className="font-semibold text-yellow-800 mb-2">💡 Importante:</h5>
        <p className="text-yellow-700 text-sm">O QR Code expira em 30 minutos. Após o pagamento, você receberá a história em até 24h no seu e-mail.</p>
      </div>

      <div className="flex space-x-4">
        <Button onClick={onBack} variant="outline" className="flex-1 border-2 bg-white border-pink-300 text-pink-600 hover:bg-pink-50 py-4 rounded-xl font-semibold">
          Voltar
        </Button>
        <Button
          onClick={() => {
            if (pixCode) {
              navigator.clipboard.writeText(pixCode);
              alert("Código Pix copiado!");
            }
          }}
          disabled={!pixCode || isLoadingPix}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-main hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg relative disabled:cursor-not-allowed"
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


