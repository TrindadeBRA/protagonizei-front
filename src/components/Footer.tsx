"use client"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaLock,
  FaHeadset,
  FaLink,
  FaWhatsapp,
  FaEnvelope,
  FaSpinner
} from "react-icons/fa";
import { getPostContactFormSubmitUrl, postContactFormSubmitResponse } from "@/src/services/api";
import customFetch from "@/src/services/custom-fetch";
import { errorToast, successToast } from "@/src/hooks/useToastify";

const Footer = () => {
  const [newsletterName, setNewsletterName] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('name', newsletterName);
      formData.append('email', newsletterEmail);
      formData.append('phone', 'N/A');
      formData.append('tag', 'Newsletter');
      formData.append('message', `
        Página origem: ${window.location.href}
        Nome: ${newsletterName}
        Email: ${newsletterEmail}
        Origem: Newsletter Footer
      `);

      const response: any = await customFetch<postContactFormSubmitResponse>(getPostContactFormSubmitUrl(), {
        method: 'POST',
        body: formData,
      });

      if (response.success) {
        successToast("Inscrição realizada com sucesso! Você receberá nossas novidades em breve.");
        setNewsletterName("");
        setNewsletterEmail("");
      } else {
        throw new Error("Erro ao enviar formulário");
      }
    } catch (e) {
      console.error("Erro ao enviar newsletter.", e);
      errorToast("Ocorreu um erro ao se inscrever. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 border-t-4 border-pink-200 w-full relative">
      {/* Seção de Confiança - Badges de Garantia */}
      <div className="bg-white/50 border-b border-pink-200/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center items-stretch gap-4 md:gap-6">
            <div className="flex flex-col items-center text-center flex-1 min-w-[140px] max-w-[200px]">
              <div className="bg-gradient-to-br from-pink-main to-purple-600 rounded-full p-3 mb-2 shadow-md">
                <FaShieldAlt className="h-5 w-5 text-white" />
              </div>
              <p className="text-xs font-semibold text-gray-800">Site Seguro</p>
              <p className="text-xs text-gray-600">SSL Certificado</p>
            </div>
            <div className="flex flex-col items-center text-center flex-1 min-w-[140px] max-w-[200px]">
              <div className="bg-gradient-to-br from-pink-main to-purple-600 rounded-full p-3 mb-2 shadow-md">
                <FaTruck className="h-5 w-5 text-white" />
              </div>
              <p className="text-xs font-semibold text-gray-800">Entrega Rápida</p>
              <p className="text-xs text-gray-600">Envio Digital</p>
            </div>
            <div className="flex flex-col items-center text-center flex-1 min-w-[140px] max-w-[200px]">
              <div className="bg-gradient-to-br from-pink-main to-purple-600 rounded-full p-3 mb-2 shadow-md">
                <FaUndo className="h-5 w-5 text-white" />
              </div>
              <p className="text-xs font-semibold text-gray-800">Garantia</p>
              <p className="text-xs text-gray-600">Satisfação Total</p>
            </div>
            <div className="flex flex-col items-center text-center flex-1 min-w-[140px] max-w-[200px]">
              <div className="bg-gradient-to-br from-pink-main to-purple-600 rounded-full p-3 mb-2 shadow-md">
                <FaLock className="h-5 w-5 text-white" />
              </div>
              <p className="text-xs font-semibold text-gray-800">Pagamento</p>
              <p className="text-xs text-gray-600">100% Seguro</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 pb-8 overflow-visible">
        {/* Links e Informações Organizados */}
        <div className="flex flex-wrap gap-12 md:gap-6 mb-8 items-start justify-start">
          {/* Links Rápidos */}
          <div className="w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(25%-1.5rem)] flex flex-col">

            {/* Logo */}
            <Link href="/" className="block">
              <Image
                src="/assets/images/navigation-logo.png"
                alt="Protagonizei"
                width={200}
                height={41}
                className="max-w-[120px] sm:max-w-[180px] h-auto mb-4"
                sizes="(max-width: 640px) 120px, 140px"
              />
            </Link>


            {/* Texto descritivo */}
            <p className="text-gray-700 text-sm mb-4 leading-relaxed">
              Crie histórias personalizadas que transformam seu filho no herói, com customização rápida e entrega digital instantânea!
            </p>

            {/* Redes Sociais */}
            <div className="flex items-center gap-3">
              <Link
                href="https://www.facebook.com/profile.php?id=61584693167182"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                aria-label="Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/protagonizei.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-pink-600 transition-colors duration-200"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.tiktok.com/@protagonizei.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-black transition-colors duration-200"
                aria-label="TikTok"
              >
                <FaTiktok className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Atendimento */}
          <div className="w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(25%-1.5rem)] flex flex-col">
            <h3 className="text-black font-bold text-sm mb-4 uppercase tracking-wide flex items-center gap-2">
              <FaHeadset className="h-4 w-4 text-pink-main" />
              Atendimento
            </h3>
            <ul className="flex flex-col space-y-2">
              <li className="text-gray-700 text-sm">
                <span className="font-semibold">Horário:</span> Todos os dias, 24 horas por dia
              </li>
              <li className="text-gray-700 text-sm">
                <span className="font-semibold">WhatsApp:</span>{" "}
                <a
                  href="https://wa.me/5511945670747"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-main transition-colors duration-200"
                >
                  11 94567-0747
                </a>
              </li>
              <li className="text-gray-700 text-sm">
                <span className="font-semibold">Email:</span> contato@protagonizei.com
              </li>
            </ul>
          </div>

          {/* Informações */}
          <div className="w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(25%-1.5rem)] flex flex-col">
            <h3 className="text-black font-bold text-sm mb-4 uppercase tracking-wide flex items-center gap-2">
              <FaLink className="h-4 w-4 text-pink-main" />
              Links Rápidos
            </h3>
            <ul className="flex flex-col space-y-2 mb-4">
              <li>
                <Link
                  href="/politica-de-privacidade"
                  className="text-gray-700 hover:text-pink-main hover:underline transition-all duration-200 text-sm"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/sorteio"
                  className="text-gray-700 hover:text-pink-main hover:underline transition-all duration-200 text-sm"
                >
                  Sorteio Mensal
                </Link>
              </li>
              <li>
                <Link
                  href="https://play.protagonizei.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-pink-main hover:underline transition-all duration-200 text-sm"
                >
                  Modo Interativo
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(25%-1.5rem)] flex flex-col">
            <h3 className="text-black font-bold text-sm mb-2 uppercase tracking-wide flex items-center gap-2">
              <FaEnvelope className="h-4 w-4 text-pink-main" />
              Newsletter
            </h3>
            <p className="text-gray-600 text-xs mb-4">
              Não perca as novidades e novos livros
            </p>
            <form 
              onSubmit={handleNewsletterSubmit} 
              className="flex flex-col gap-2"
            >
              {/* Primeira linha - Nome e Email */}
              <div className="flex gap-2 bg-gradient-to-br from-purple-200/60 via-pink-200/50 to-blue-200/60 rounded-xl overflow-hidden border-2 border-pink-300/40 shadow-md">
                <div className="flex-1 flex items-center">
                  <input
                    type="text"
                    placeholder="Nome"
                    value={newsletterName}
                    onChange={(e) => setNewsletterName(e.target.value)}
                    required
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-sm border-0 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="w-px bg-pink-300/60 self-stretch my-2"></div>
                <div className="flex-1 flex items-center">
                  <input
                    type="email"
                    placeholder="Email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    disabled={isLoading}
                    className="flex-1 px-4 py-3 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-sm border-0 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
              
              {/* Segunda linha - Botão */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-main to-purple-600 text-white font-bold py-3 px-6 hover:from-pink-600 hover:to-purple-700 transition-all duration-200 text-sm rounded-xl shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin h-4 w-4" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  "Inscrever-se"
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent mb-6"></div>

        {/* Copyright e Desenvolvimento */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-0">

          {/* Informações */}
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p className="text-black font-medium text-sm text-center">
              © 2025 Protagonizei - Todos os direitos reservados
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center md:justify-start gap-1 sm:gap-2 text-gray-600 text-xs">
              <span>CNPJ: 59.055.891/0001-26</span>
              <span className="hidden sm:inline">|</span>
              <span>
                Desenvolvido por{" "}
                <Link
                  href="https://thetrinityweb.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold hover:text-pink-main transition-colors duration-200"
                >
                  Trinity Web
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
