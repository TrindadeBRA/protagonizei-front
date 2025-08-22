"use client"

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

const faqs = [
  {
    question: "Preciso instalar algum aplicativo ou programa?",
    answer: "Não! Tudo funciona online. Você só precisa preencher o formulário e receberá o PDF pronto por e-mail. Simples assim!"
  },
  {
    question: "Quanto tempo demora para receber o livro?",
    answer: "Normalmente em até 2 horas você recebe o PDF personalizado no seu e-mail. Em períodos de alta demanda, pode levar até 48 horas."
  },
  {
    question: "Posso imprimir o livro em casa?",
    answer: "Sim! O PDF vem otimizado para impressão caseira ou em gráficas. Recomendamos papel de gramatura mais alta para melhor qualidade."
  },
  {
    question: "A foto do meu filho fica igual nas ilustrações?",
    answer: "Nossa IA cria ilustrações artísticas baseadas na foto, mantendo as características principais da criança de forma encantadora e respeitosa."
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
          {/* <div className="inline-flex items-center bg-gradient-to-r from-pink-100 to-purple-100 rounded-full px-6 py-2 mb-6">
            <HelpCircle className="w-5 h-5 text-purple-600 mr-2" />
            <span className="text-purple-700 font-semibold">Dúvidas Frequentes</span>
          </div> */}

          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-800 mb-6" data-aos="fade-up">
            Tire suas
            <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent"> dúvidas</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-aos="fade-up">
            Respostas para as perguntas mais comuns dos papais e mamães sobre nossos livros personalizados.
          </p>
        </div>

        <div className="space-y-4" data-aos="fade-up">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-white/50 transition-colors duration-200"
                aria-label={`${openIndex === index ? 'Fechar' : 'Abrir'} pergunta: ${faq.question}`}
                aria-expanded={openIndex === index}
              >
                <h3 className="font-heading font-semibold text-gray-800 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-pink-main" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-pink-main" />
                  )}
                </div>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-5">
                  <div className={twMerge("bg-white rounded-xl p-4 border-l-4", index % 2 === 0 ? "border-pink-main" : "border-blue-main")}>
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* <div className="text-center mt-12">
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
        </div> */}

        <div className="flex justify-center mt-12">
          <Link
            href="/#criar-historia"
            key="/#criar-historia"
            className="magical-border border-4 border-transparent text-white font-bold py-2 px-6 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300 font-englebert"
            data-aos="fade-up"
          >
            Crie sua história!
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
