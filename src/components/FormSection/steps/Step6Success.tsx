"use client";

import { Button } from "@/src/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const Step6Success = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-gray-800 mb-2">Pagamento Confirmado!</h3>
        <p className="text-gray-600">Sua história mágica está sendo criada com muito carinho</p>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center border-2 border-dashed border-green-200">
        <div className="max-w-xs mx-auto">
          <h4 className="font-heading text-xl font-bold text-green-800 mb-4">Próximos Passos</h4>
          <div className="space-y-4 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 text-sm">1</span>
              </div>
              <p className="text-gray-600 text-sm">Você receberá um e-mail com o PDF da história em até 24h</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 text-sm">2</span>
              </div>
              <p className="text-gray-600 text-sm">Imprima a história e veja a magia acontecer no rosto do seu filho</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 text-sm">3</span>
              </div>
              <p className="text-gray-600 text-sm">Compartilhe esse momento especial com quem você ama</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button onClick={() => (window.location.href = "/")} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg">
          Voltar para Home
        </Button>
      </div>
    </div>
  );
};

export default Step6Success;


