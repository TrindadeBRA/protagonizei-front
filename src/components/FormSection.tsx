"use client"

import { useState, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Sparkles, Heart, Gift, Star, Camera, Mail } from "lucide-react";

const FormSection = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    childName: '',
    childAge: '',
    childGender: '',
    skinTone: '',
    parentName: '',
    email: '',
    photo: null as File | null
  });

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
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log('Enviando dados:', formData);
    // Aqui seria a integração com o backend
    alert('História personalizada criada! Você receberá o PDF em até 24h no seu e-mail. 📚✨');
  };

  const skinTones = [
    { value: 'claro', label: 'Claro', color: '#EDBD88' },
    { value: 'medio', label: 'Médio', color: '#C4956A' },
    { value: 'escuro', label: 'Escuro', color: '#8D5524' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 float-animation">
          <Star className="w-12 h-12 text-yellow-400 fill-current opacity-30" />
        </div>
        <div className="absolute bottom-40 right-20 float-animation" style={{ animationDelay: '1s' }}>
          <Heart className="w-10 h-10 text-pink-400 fill-current opacity-30" />
        </div>
        <div className="absolute top-1/2 right-10 float-animation" style={{ animationDelay: '2s' }}>
          <Sparkles className="w-8 h-8 text-purple-400 fill-current opacity-30" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            Crie agora a história
            <span className="block bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              do seu pequeno herói!
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Em apenas alguns cliques, você criará uma lembrança que durará para sempre. Vamos começar?
          </p>
          
          {/* Price highlight */}
          <div className="inline-flex items-center bg-white rounded-2xl p-4 shadow-lg border-2 border-dashed border-pink-300 mb-8">
            <Gift className="w-8 h-8 text-pink-500 mr-3" />
            <div className="text-left">
              <div className="text-sm text-gray-500 line-through">De R$ 49,90</div>
              <div className="text-2xl font-bold text-green-600">R$ 29,90</div>
              <div className="text-xs text-pink-600 font-semibold">Promoção por tempo limitado!</div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Progress bar */}
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 h-2">
              <div 
                className="bg-white h-full transition-all duration-500 ease-out"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>

            <div className="p-8">
              {/* Step 1: Child Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg"
                  >
                    Continuar
                    <Sparkles className="w-5 h-5 ml-2" />
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
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 rounded-xl"
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
                          <span className="text-2xl font-bold text-green-600">R$ 29,90</span>
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
                      disabled={!formData.parentName || !formData.email}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg"
                    >
                      Criar História! 🎉
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Security badges */}
          <div className="text-center mt-8">
            <div className="flex flex-wrap items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="text-green-500 mr-1">🔒</span>
                Pagamento Seguro
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 mr-1">📧</span>
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
