"use client"

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Sparkles, Heart, Camera, Mail, QrCode, CheckCircle2, Loader2, Settings } from "lucide-react";
import customFetch from "@/src/services/custom-fetch";
import { PostOrdersBody } from "@/src/services/model";
import { getPostOrdersUrl, getPostOrdersOrderIdPixUrl, getGetOrdersOrderIdPaymentStatusUrl } from "@/src/services/api";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

const FormSection = () => {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    childName: '',
    childAge: '',
    childGender: '',
    skinTone: '',
    parentName: '',
    email: '',
    phone: '',
    photo: null as File | null
  });
  const [orderId, setOrderId] = useState<string | null>(null);
  const [pixCode, setPixCode] = useState<string | null>(null);
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);
  const [isLoadingPix, setIsLoadingPix] = useState(false);
  const [isPixGenerated, setIsPixGenerated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [paymentStatus, setPaymentStatus] = useState<'pending' | 'confirmed' | 'failed'>('pending');
  const paymentCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Verifica se o formulário deve estar habilitado baseado no parâmetro da URL
  const isFormEnabled = searchParams.get('enable') === 'true';

  // Adicionar estilo global para remover outlines
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      *:focus {
        outline: none !important;
        box-shadow: none !important;
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
      }
      *:focus-visible {
        outline: none !important;
        box-shadow: none !important;
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleInputChange = (field: string, value: string) => {
    if (field === 'phone') {
      // Remove all non-numeric characters
      const numbers = value.replace(/\D/g, '');
      
      // Apply mask based on length
      let maskedValue = '';
      if (numbers.length <= 2) {
        maskedValue = numbers;
      } else if (numbers.length <= 7) {
        maskedValue = `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
      } else {
        maskedValue = `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
      }
      
      setFormData(prev => ({ ...prev, [field]: maskedValue }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Iniciar verificação do status do pagamento
  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const response: any = await customFetch(getGetOrdersOrderIdPaymentStatusUrl(Number(orderId)), {
          method: 'GET'
        });
        
        console.log('checkPaymentStatus', response);
        
        if (response.status === 'paid') {
          if (paymentCheckIntervalRef.current) {
            clearInterval(paymentCheckIntervalRef.current);
          }
          setStep(5); // Avança para o passo de sucesso
        }
      } catch (error) {
        console.error('Erro ao verificar status do pagamento:', error);
      }
    };

    if (orderId && step === 4 && isPixGenerated) {
      // Verifica a cada 5 segundos
      const interval = setInterval(checkPaymentStatus, 5000);
      paymentCheckIntervalRef.current = interval;

      // Limpa o intervalo quando o componente é desmontado
      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [orderId, step, isPixGenerated]);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const orderData: PostOrdersBody = {
        childName: formData.childName,
        childAge: parseInt(formData.childAge),
        childGender: formData.childGender as PostOrdersBody['childGender'],
        skinTone: formData.skinTone as PostOrdersBody['skinTone'],
        parentName: formData.parentName,
        email: formData.email,
        phone: formData.phone,
        photo: formData.photo as File
      };

      const formDataToSend = new FormData();
      formDataToSend.append('childName', orderData.childName);
      formDataToSend.append('childAge', orderData.childAge.toString());
      formDataToSend.append('childGender', orderData.childGender);
      formDataToSend.append('skinTone', orderData.skinTone);
      formDataToSend.append('parentName', orderData.parentName);
      formDataToSend.append('email', orderData.email);
      formDataToSend.append('phone', orderData.phone);
      formDataToSend.append('photo', orderData.photo);

      const response: any = await customFetch(getPostOrdersUrl(), {
        method: 'POST',
        body: formDataToSend,
      });
      
      if (response.status === 'created' && response.order_id) {
        setOrderId(response.order_id.toString());
        setStep(4);
        // Buscar dados do PIX
        await fetchPixData(Number(response.order_id));
      } else {
        throw new Error('Erro ao criar pedido');
      }
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      alert('Ops! Algo deu errado. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchPixData = async (orderId: number) => {
    try {
      setIsLoadingPix(true);
      const response: any = await customFetch(getPostOrdersOrderIdPixUrl(orderId), {
        method: 'POST'
      });
      
      if (response.message === 'Pix criado com sucesso' && response.qr_code_image) {
        setPixCode(response.qr_code_copypaste || null);
        setQrCodeImage(response.qr_code_image || null);
        setIsPixGenerated(true); // Marca que o PIX foi gerado com sucesso
      } else {
        throw new Error('Erro ao gerar PIX');
      }
    } catch (error) {
      console.error('Erro ao buscar dados do PIX:', error);
      alert('Erro ao gerar PIX. Por favor, tente novamente.');
    } finally {
      setIsLoadingPix(false);
    }
  };

  const skinTones = [
    { value: 'claro', label: 'Claro', color: '#EDBD88' },
    { value: 'medio', label: 'Médio', color: '#C4956A' },
    { value: 'escuro', label: 'Escuro', color: '#8D5524' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden" id="criar-historia">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 float-animation">
          <Image src="/assets/images/asset-star.png" alt="Star" width={100} height={100} className="w-12 h-12 opacity-30" />
        </div>
        <div className="absolute bottom-40 right-20 float-animation" style={{ animationDelay: '1s' }}>
          <Image src="/assets/images/asset-heart-2.png" alt="Heart" width={100} height={100} className="w-10 h-10 opacity-30" />
        </div>
        <div className="absolute top-1/2 right-10 float-animation" style={{ animationDelay: '2s' }}>
          <Image src="/assets/images/asset-star-2.png" alt="Star" width={100} height={100} className="w-8 h-8 opacity-30" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-800 mb-6" data-aos="fade-up">
            Crie agora a história{" "}
            <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent">
              do seu pequeno herói!
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8" data-aos="fade-up">
            Em apenas alguns cliques, você criará uma lembrança que durará para sempre. Vamos começar?
          </p>

          {/* Price highlight */}
          {/* <div className="inline-flex items-center bg-white rounded-2xl p-4 shadow-lg border-2 border-dashed border-pink-300 mb-8">
            <Gift className="w-8 h-8 text-pink-main mr-3" />
            <div className="text-left">
              <div className="text-sm text-gray-500 line-through">De R$ 49,90</div>
              <div className="text-2xl font-bold text-green-600">R$ 49,99</div>
              <div className="text-xs text-pink-600 font-semibold">Promoção por tempo limitado!</div>
            </div>
          </div> */}

        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative" data-aos="fade-up">
            {/* Overlay de desenvolvimento */}
            {!isFormEnabled && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center rounded-3xl">
                <div className="bg-white rounded-2xl p-8 mx-4 text-center shadow-2xl max-w-md">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-gray-800 mb-4">
                    Em Desenvolvimento
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    Estamos trabalhando para trazer a melhor experiência para você! 
                    Em breve, você poderá criar histórias mágicas e personalizadas para seu pequeno herói.
                  </p>
                </div>
              </div>
            )}
            
            {/* Progress bar */}
            <div className="bg-gray-300 h-3">
              <div
                className="bg-gradient-to-r from-pink-main  to-blue-main h-full transition-all duration-500 ease-out"
                style={{ width: `${(step / 5) * 100}%` }}
              ></div>
            </div>

            <div className="p-8">
              {/* Step 1: Child Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-main to-blue-main rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-gray-800 mb-2">
                      Conte sobre seu pequeno
                    </h3>
                    <p className="text-gray-600">Essas informações nos ajudam a personalizar a história</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="childName" className="text-gray-700 font-semibold mb-2 block">
                        Nome da criança *
                      </Label>
                      <Input
                        id="childName"
                        value={formData.childName}
                        onChange={(e) => handleInputChange('childName', e.target.value)}
                        placeholder="Ex: Sofia"
                        className="border-2 border-pink-200 rounded-xl focus:border-pink-400 bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <Label htmlFor="childAge" className="text-gray-700 font-semibold mb-2 block">
                        Idade *
                      </Label>
                      <Select onValueChange={(value) => handleInputChange('childAge', value)}>
                        <SelectTrigger className="border-2 border-pink-200 rounded-xl focus:border-pink-400 bg-white transition-colors">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-2 border-pink-200 rounded-xl">
                          {[2, 3, 4, 5, 6, 7, 8].map(age => (
                            <SelectItem key={age} value={age.toString()} className="hover:bg-pink-50 cursor-pointer">
                              {age} anos
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-700 font-semibold mb-2 block">
                      Gênero *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('childGender', value)}>
                      <SelectTrigger className="border-2 border-pink-200 rounded-xl focus:border-pink-400 bg-white transition-colors">
                        <SelectValue placeholder="Selecione o gênero" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-2 border-pink-200 rounded-xl">
                        <SelectItem value="menina" className="hover:bg-pink-50 cursor-pointer">Menina</SelectItem>
                        <SelectItem value="menino" className="hover:bg-pink-50 cursor-pointer">Menino</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-gray-700 font-semibold mb-2 block">
                      Tom de pele *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('skinTone', value)}>
                      <SelectTrigger className="border-2 border-pink-200 rounded-xl focus:border-pink-400 bg-white transition-colors">
                        <SelectValue placeholder="Selecione o tom de pele" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-2 border-pink-200 rounded-xl">
                        {skinTones.map((tone) => (
                          <SelectItem key={tone.value} value={tone.value} className="hover:bg-pink-50 cursor-pointer">
                            <div className="flex items-center space-x-3">
                              <div
                                className="w-5 h-5 rounded-full border border-gray-200"
                                style={{ backgroundColor: tone.color }}
                              />
                              <span>{tone.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={nextStep}
                    disabled={!formData.childName || !formData.childAge || !formData.childGender || !formData.skinTone}
                    className={twMerge("w-full bg-gradient-to-r from-pink-main to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg", (!formData.childName || !formData.childAge || !formData.childGender || !formData.skinTone) ? "opacity-50 !cursor-not-allowed !pointer-events-auto" : "")}                  >
                    Continuar
                  </Button>
                </div>
              )}

              {/* Step 2: Photo Upload */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-gray-800 mb-2">
                      Foto do(a) {formData.childName}
                    </h3>
                    <p className="text-gray-600">Uma foto clara do rosto ajuda nossa IA a criar ilustrações perfeitas</p>
                  </div>

                  <div className="border-2 border-dashed border-pink-300 rounded-xl p-8 text-center bg-gradient-to-br from-pink-50 to-purple-50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer block">
                      <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Camera className="w-10 h-10 text-white" />
                      </div>
                      <h4 className="font-heading font-bold text-gray-800 mb-2">
                        {formData.photo ? 'Foto enviada!' : 'Clique para enviar a foto'}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {formData.photo ? formData.photo.name : 'JPG, PNG ou JPEG (máximo 5MB)'}
                      </p>
                    </label>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <h5 className="font-semibold text-yellow-800 mb-2">💡 Dica importante:</h5>
                    <p className="text-yellow-700 text-sm">
                      Para melhores resultados, use uma foto onde o rosto da criança esteja bem visível,
                      com boa iluminação e sem óculos escuros.
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      onClick={prevStep}
                      variant="outline"
                      className="flex-1 border-2 bg-white border-pink-300 text-pink-600 hover:bg-pink-50 py-4 rounded-xl font-semibold"
                    >
                      Voltar
                    </Button>
                    <Button
                      onClick={nextStep}
                      disabled={!formData.photo}
                      className={twMerge("flex-1 bg-gradient-to-r from-blue-main to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 rounded-xl", (!formData.photo) ? "opacity-50 !cursor-not-allowed !pointer-events-auto" : "")}
                    >
                      Continuar
                      <Camera className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Information */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-gray-800 mb-2">
                      Quase pronto!
                    </h3>
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
                        onChange={(e) => handleInputChange('parentName', e.target.value)}
                        placeholder="Como você gostaria de ser chamado(a)?"
                        className="border-2 border-pink-200 rounded-xl focus:border-pink-400 bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-gray-700 font-semibold mb-2 block">
                        Telefone *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(00) 00000-0000"
                        maxLength={15}
                        className="border-2 border-pink-200 rounded-xl focus:border-pink-400 bg-white transition-colors"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        📱 Para contato em caso de dúvidas sobre sua história
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-700 font-semibold mb-2 block">
                        E-mail *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="seu@email.com"
                        className="border-2 border-pink-200 rounded-xl focus:border-pink-400 bg-white transition-colors"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        📧 O PDF será enviado para este e-mail em até 24h
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                    <h4 className="font-heading font-bold text-green-800 mb-3 flex items-center">
                      <Heart className="w-5 h-5 mr-2 fill-current" />
                      Resumo do seu pedido
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Criança:</span>
                        <span className="font-semibold">{formData.childName}, {formData.childAge} anos</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gênero:</span>
                        <span className="font-semibold">{formData.childGender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tom de pele:</span>
                        <span className="font-semibold">
                          {skinTones.find(tone => tone.value === formData.skinTone)?.label || 'Selecionado'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Foto:</span>
                        <span className="font-semibold text-green-600">✓ Enviada</span>
                      </div>
                      <div className="border-t border-green-200 pt-2 mt-3">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-800">Total:</span>
                          <span className="text-2xl font-bold text-green-600">R$ 49,99</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      onClick={prevStep}
                      variant="outline"
                      className="flex-1 border-2 bg-white border-pink-300 text-pink-600 hover:bg-pink-50 py-4 rounded-xl font-semibold"
                    >
                      Voltar
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={!formData.parentName || !formData.email || !formData.phone || isSubmitting}
                      className={twMerge("flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg relative", (!formData.parentName || !formData.email || !formData.phone || isSubmitting) ? "opacity-50 !cursor-not-allowed !pointer-events-auto" : "")}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin inline-block" />
                          Criando sua história...
                        </>
                      ) : (
                        'Criar História! 🎉'
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Pix Payment */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <QrCode className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-gray-800 mb-2">
                      Último passo: Pagamento
                    </h3>
                    <p className="text-gray-600">Escaneie o QR Code do Pix para finalizar sua história mágica</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 text-center border-2 border-dashed border-purple-200">
                    <div className="max-w-xs mx-auto mb-6">
                      {isLoadingPix ? (
                        <div className="w-48 h-48 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center">
                          <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
                        </div>
                      ) : qrCodeImage ? (
                        <Image 
                          src={`data:image/png;base64,${qrCodeImage}`} 
                          alt="QR Code PIX" 
                          className="w-48 h-48 mx-auto mb-4"
                          width={192}
                          height={192}
                        />
                      ) : (
                        <div className="w-48 h-48 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center">
                          <QrCode className="w-32 h-32 text-purple-400" />
                        </div>
                      )}
                      <p className="text-sm text-gray-500 mb-4">
                        Pedido #{orderId}
                      </p>
                      <div className="text-2xl font-bold text-green-600 mb-2">
                        R$ 49,99
                      </div>
                      <p className="text-sm text-gray-600">
                        Após o pagamento, você receberá a confirmação por e-mail
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <h5 className="font-semibold text-yellow-800 mb-2">💡 Importante:</h5>
                    <p className="text-yellow-700 text-sm">
                      O QR Code expira em 30 minutos. Após o pagamento, você receberá a história em até 24h no seu e-mail.
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      onClick={() => setStep(3)}
                      variant="outline"
                      className="flex-1 border-2 bg-white border-pink-300 text-pink-600 hover:bg-pink-50 py-4 rounded-xl font-semibold"
                    >
                      Voltar
                    </Button>
                    <Button
                      onClick={() => {
                        if (pixCode) {
                          navigator.clipboard.writeText(pixCode);
                          alert('Código Pix copiado!');
                        }
                      }}
                      disabled={!pixCode || isLoadingPix}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-main hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg relative disabled:cursor-not-allowed"
                    >
                      {isLoadingPix ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin inline-block" />
                          Gerando PIX...
                        </>
                      ) : (
                        'Copiar Código Pix'
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 5: Payment Confirmed */}
              {step === 5 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-gray-800 mb-2">
                      Pagamento Confirmado!
                    </h3>
                    <p className="text-gray-600">Sua história mágica está sendo criada com muito carinho</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center border-2 border-dashed border-green-200">
                    <div className="max-w-xs mx-auto">
                      <h4 className="font-heading text-xl font-bold text-green-800 mb-4">
                        Próximos Passos
                      </h4>
                      <div className="space-y-4 text-left">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-green-600 text-sm">1</span>
                          </div>
                          <p className="text-gray-600 text-sm">
                            Você receberá um e-mail com o PDF da história em até 24h
                          </p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-green-600 text-sm">2</span>
                          </div>
                          <p className="text-gray-600 text-sm">
                            Imprima a história e veja a magia acontecer no rosto do seu filho
                          </p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-green-600 text-sm">3</span>
                          </div>
                          <p className="text-gray-600 text-sm">
                            Compartilhe esse momento especial com quem você ama
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button
                      onClick={() => window.location.href = '/'}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg"
                    >
                      Voltar para Home
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Security badges */}
          <div className="text-center mt-8" data-aos="fade-left"> 
            <div className="flex flex-wrap items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="text-green-500 mr-1">🔒</span>
                Pagamento Seguro
              </div>
              <div className="flex items-center">
                <span className="text-blue-main mr-1">📧</span>
                Entrega Garantida
              </div>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">⭐</span>
                Satisfação 100%
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
