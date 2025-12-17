"use client"

import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {

  // const footerLinks = [
  //   { label: "Início", href: "/#hero" },
  //   { label: "Benefícios", href: "/#beneficios" },
  //   { label: "Como funciona", href: "/#como-funciona" },
  //   { label: "Exemplos", href: "/#exemplos" },
  //   { label: "Depoimentos", href: "/#depoimentos" },
  //   { label: "Blog", href: "/blog" },
  //   { label: "FAQ", href: "/#faq" },
  //   { label: "Crie sua história!", href: "/#criar-historia", cta: true },
  // ];

  return (
    <footer className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 border-t-4 border-pink-200 overflow-x-hidden">
      <div className="container mx-auto px-4 py-8">


        {/* Links de navegação */}
        <div className="flex justify-center mb-8" id="footer-logo" data-aos="fade-left">
          <Link href="/" className="block">
            <Image src="/assets/images/navigation-logo.png" alt="Protagonizei" width={500} height={500} className="w-full sm:max-w-[200px] sm:h-auto" />
          </Link>
        </div>

        {/* <div className="flex flex-wrap justify-center gap-6 mb-8" data-aos="fade-left" data-aos-anchor="#footer-logo">
          {footerLinks.map((link) => {
            return (
              <Link 
                key={link.href}
                href={link.href}
                className="flex items-center space-x-2 text-black hover:text-pink-main transition-colors duration-200 font-semibold font-englebert text-lg cursor-pointer"
              >
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div> */}

        {/* Social Media Links */}
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
        </div>

        {/* Separador */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent mb-6"></div>

        {/* Copyright */}
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
