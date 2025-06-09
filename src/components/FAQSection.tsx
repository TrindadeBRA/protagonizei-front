"use client"

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Preciso instalar algum aplicativo ou programa?",
    answer: "Não! Tudo funciona online. Você só precisa preencher o formulário e receberá o PDF pronto por e-mail. Simples assim!"
  },
  {
    question: "Quanto tempo demora para receber o livro?",
    answer: "Normalmente em até 24 horas você recebe o PDF personalizado no seu e-mail. Em períodos de alta demanda, pode levar até 48 horas."
  },
  {
    question: "Posso imprimir o livro em casa?",
    answer: "Sim! O PDF vem otimizado para impressão caseira ou em gráficas. Recomendamos papel de gramatura mais alta para melhor qualidade."
  },
  {
    question: "A foto do meu filho fica igual nas ilustrações?",
    answer: "Nossa IA cria ilustrações artísticas baseadas na foto, mantendo as características principais da criança de forma encantadora e respeitosa."
  },
  {
    question: "Posso fazer histórias para irmãos gêmeos?",
    answer: "Claro! Cada criança receberá uma história única e personalizada. Para gêmeos, recomendamos histórias diferentes para cada um se sentir especial."
  },
  {
    question: "E se meu filho não gostar da história?",
    answer: "Oferecemos garantia de 30 dias. Se não ficarem satisfeitos, devolvemos 100% do valor pago, sem questionamentos."
  },
  {
    question: "As histórias são adequadas para que idade?",
    answer: "Nossas histórias são perfeitas para crianças de 2 a 8 anos, com linguagem e aventuras apropriadas para cada faixa etária."
  },
  {
    question: "Posso personalizar o nome e gênero?",
    answer: "Sim! Personalizamos nome, gênero, pronomes e até características físicas básicas. Cada história é única para sua criança."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-pink-100 to-purple-100 rounded-full px-6 py-2 mb-6">
            <HelpCircle className="w-5 h-5 text-purple-600 mr-2" />
            <span className="text-purple-700 font-semibold">Dúvidas Frequentes</span>
          </div>
          
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            Tire suas
            <span className="bg-gradient-to-r from-pink-main to-purple-500 bg-clip-text text-transparent"> dúvidas</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Respostas para as perguntas mais comuns dos papais e mamães sobre nossos livros personalizados.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/50 transition-colors duration-200"
              >
                <h3 className="font-heading font-semibold text-gray-800 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-purple-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-purple-600" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <div className="bg-white rounded-xl p-4 border-l-4 border-pink-300">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 max-w-md mx-auto">
            <h4 className="font-heading font-bold text-gray-800 mb-2">Ainda tem dúvidas?</h4>
            <p className="text-gray-600 text-sm mb-4">
              Nossa equipe está pronta para ajudar você!
            </p>
            <a 
              href="mailto:contato@historiaspersonalizadas.com"
              className="inline-flex items-center bg-gradient-to-r from-pink-main to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform duration-200"
            >
              💌 Fale conosco
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
