"use client"

import Link from "next/link";

const Footer = () => {

  const footerLinks = [
    { label: "Início", href: "/#hero" },
    { label: "Benefícios", href: "/#beneficios" },
    { label: "Exemplos", href: "/#exemplos" },
    { label: "Depoimentos", href: "/#depoimentos" },
    { label: "FAQ", href: "/#faq" },
    { label: "Blog", href: "/#blog" },
    { label: "Crie sua história!", href: "/#criar-historia", cta: true },
  ];

  return (
    <footer className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 border-t-4 border-pink-200">
      <div className="container mx-auto px-4 py-8">
        {/* Links de navegação */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
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
        </div>

        {/* Separador */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent mb-6"></div>

        {/* Copyright */}
        <div className="text-center space-y-2">
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
              The Trinity Web
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
