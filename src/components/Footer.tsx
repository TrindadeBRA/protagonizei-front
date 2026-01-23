"use client"

import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 border-t-4 border-pink-200 overflow-x-hidden">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8" id="footer-logo" data-aos="fade-left">
          <Link href="/" className="block">
            <Image 
              src="/assets/images/navigation-logo.png" 
              alt="Protagonizei" 
              width={200} 
              height={41} 
              className="max-w-[150px] sm:max-w-[200px] h-auto"
              sizes="(max-width: 640px) 150px, 200px"
            />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-x-6 mb-6" data-aos="fade-up" data-aos-delay={50} data-aos-anchor="#footer-logo">
          <Link
            href="https://www.facebook.com/profile.php?id=61584693167182"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-blue-600 transition-colors duration-200"
            aria-label="Facebook"
          >
            <FaFacebook className="h-6 w-6" />
          </Link>
          <Link
            href="https://www.instagram.com/protagonizei.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-pink-600 transition-colors duration-200"
            aria-label="Instagram"
          >
            <FaInstagram className="h-6 w-6" />
          </Link>
          <Link
            href="https://www.tiktok.com/@protagonizei.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-black transition-colors duration-200"
            aria-label="TikTok"
          >
            <FaTiktok className="h-6 w-6" />
          </Link>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent mb-6"></div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-4" data-aos="fade-up" data-aos-delay={75} data-aos-anchor="#footer-logo">
          <Link
            href="/politica-de-privacidade"
            className="text-black hover:text-pink-main hover:underline transition-all duration-200 font-medium text-sm"
          >
            Política de Privacidade
          </Link>
          <span className="text-gray-400">•</span>
          <Link
            href="https://play.protagonizei.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-pink-main hover:underline transition-all duration-200 font-medium text-sm"
          >
            Modo Interativo
          </Link>
          <span className="text-gray-400">•</span>
          <Link
            href="/sorteio"
            className="text-black hover:text-pink-main hover:underline transition-all duration-200 font-medium text-sm"
          >
            Sorteio Mensal
          </Link>
        </div>

        <div className="text-center space-y-2" data-aos="fade-left" data-aos-delay={100} data-aos-anchor="#footer-logo">
          <p className="text-black font-medium">
            © 2025 Protagonizei - Todos os direitos reservados
          </p>
          <p className="text-black">
            Desenvolvido por{" "}
            <Link
              href="https://thetrinityweb.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold hover:text-pink-main transition-colors duration-200"
            >
              Trinity Web
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
