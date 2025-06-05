"use client"

import { Heart, Star, Gift, Users, HelpCircle, Sparkles } from "lucide-react";

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = [
    { label: "Início", id: "hero", icon: Star },
    { label: "Benefícios", id: "benefits", icon: Heart },
    { label: "Como Funciona", id: "how-it-works", icon: Sparkles },
    { label: "Exemplos", id: "examples", icon: Gift },
    { label: "Depoimentos", id: "testimonials", icon: Users },
    { label: "FAQ", id: "faq", icon: HelpCircle },
  ];

  return (
    <footer className="bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 border-t-4 border-pink-200">
      <div className="container mx-auto px-4 py-8">
        {/* Links de navegação */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {footerLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="flex items-center space-x-2 text-purple-700 hover:text-pink-600 transition-colors duration-200 font-medium"
              >
                <IconComponent className="h-4 w-4" />
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>

        {/* Separador */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent mb-6"></div>

        {/* Copyright */}
        <div className="text-center space-y-2">
          <p className="text-purple-700 font-medium">
            © 2025 Protagonizei - Todos os direitos reservados
          </p>
          <p className="text-sm text-purple-600">
            Desenvolvido por{" "}
            <a 
              href="https://thetrinityweb.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold hover:text-pink-600 transition-colors duration-200"
            >
              thetrinityweb.com.br
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
