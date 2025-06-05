"use client"

import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false); // Fecha o menu mobile após clicar
  };

  const navLinks = [
    { label: "Início", id: "hero" },
    { label: "Benefícios", id: "benefits" },
    { label: "Como Funciona", id: "how-it-works" },
    { label: "Exemplos", id: "examples" },
    { label: "Depoimentos", id: "testimonials" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-pink-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <Sparkles className="h-8 w-8 text-pink-500" />
            <span className="text-xl font-bold font-heading text-purple-700">
              Protagonizei
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-purple-700 hover:text-pink-600 transition-colors duration-200 font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-purple-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <Sparkles className="h-6 w-6 text-pink-500" />
                    <span className="font-heading text-purple-700">Protagonizei</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className="text-left py-3 px-4 text-purple-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors duration-200 font-medium"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
