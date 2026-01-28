"use client"

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
  FaCreditCard,
  FaHeadset,
  FaLink,
  FaShareAlt,
  FaWhatsapp
} from "react-icons/fa";

const Footer = () => {
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
        <div className="flex flex-wrap gap-6 md:gap-8 mb-8 items-start justify-start">
          {/* Links Rápidos */}
          <div className="w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(25%-1.5rem)] flex flex-col">
            <h3 className="text-black font-bold text-sm mb-4 uppercase tracking-wide flex items-center gap-2">
              <FaLink className="h-4 w-4 text-pink-main" />
              Links Rápidos
            </h3>
            <ul className="flex flex-col space-y-2 mb-6">
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

          {/* Atendimento */}
          <div className="w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(25%-1.5rem)] flex flex-col">
            <h3 className="text-black font-bold text-sm mb-4 uppercase tracking-wide flex items-center gap-2">
              <FaHeadset className="h-4 w-4 text-pink-main" />
              Atendimento
            </h3>
            <ul className="flex flex-col space-y-2">
              <li className="text-gray-700 text-sm">
                <span className="font-semibold">Horário:</span> 24/7
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

          {/* Formas de Pagamento */}
          <div className="w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(25%-1.5rem)] flex flex-col">
            <h3 className="text-black font-bold text-sm mb-4 uppercase tracking-wide flex items-center gap-2">
              <FaCreditCard className="h-4 w-4 text-pink-main" />
              Pagamento
            </h3>
            <div className="flex flex-col space-y-2">
              <p className="text-gray-700 text-sm mb-2">Aceitamos:</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white px-3 py-1 rounded text-xs font-semibold text-gray-700 shadow-sm border border-gray-200">
                  PIX
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Pagamento 100% seguro e criptografado
              </p>
            </div>
          </div>

          {/* Redes Sociais */}
          <div className="w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(25%-1.5rem)] flex flex-col">
            <h3 className="text-black font-bold text-sm mb-4 uppercase tracking-wide flex items-center gap-2">
              <FaShareAlt className="h-4 w-4 text-pink-main" />
              Redes Sociais
            </h3>
            <div className="flex flex-col space-y-2">
              <Link
                href="https://www.facebook.com/profile.php?id=61584693167182"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 text-sm hover:text-pink-main transition-colors duration-200"
              >
                <FaFacebook className="h-4 w-4 text-black" />
                <span>@protagonizei</span>
              </Link>
              <Link
                href="https://www.instagram.com/protagonizei.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 text-sm hover:text-pink-main transition-colors duration-200"
              >
                <FaInstagram className="h-4 w-4 text-black" />
                <span>@protagonizei.app</span>
              </Link>
              <Link
                href="https://www.tiktok.com/@protagonizei.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 text-sm hover:text-pink-main transition-colors duration-200"
              >
                <FaTiktok className="h-4 w-4 text-black" />
                <span>@protagonizei.app</span>
              </Link>
              <a 
                href="https://wa.me/5511945670747" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 text-sm hover:text-pink-main transition-colors duration-200"
              >
                <FaWhatsapp className="h-4 w-4 text-black" />
                <span>11 94567-0747</span>
              </a>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent mb-6"></div>

        {/* Copyright e Desenvolvimento */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-0">
          {/* Logo */}
          <div className="flex-shrink-0" id="footer-logo">
            <Link href="/" className="block">
              <Image 
                src="/assets/images/navigation-logo.png" 
                alt="Protagonizei" 
                width={200} 
                height={41} 
                className="max-w-[120px] sm:max-w-[140px] h-auto"
                sizes="(max-width: 640px) 120px, 140px"
              />
            </Link>
          </div>
          
          {/* Informações */}
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p className="text-black font-medium text-sm text-center">
              © 2025 Protagonizei - Todos os direitos reservados
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center md:justify-start gap-1 sm:gap-2 text-gray-600 text-xs">
              <span>CNPJ: 59.055.891/0001-26</span>
              <span className="hidden sm:inline">|</span>
              <span>São Paulo, SP - Brasil</span>
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
