"use client"

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import Image from "next/image";

type NavLink = {
  label: string;
  href: string;
  cta?: boolean;
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navLinks: NavLink[] = [
    { label: "Início", href: "/#hero" },
    { label: "Benefícios", href: "/#beneficios" },
    { label: "Como funciona", href: "/#como-funciona" },
    { label: "Exemplos", href: "/#exemplos" },
    { label: "Depoimentos", href: "/#depoimentos" },
    { label: "Blog", href: "/#blog" },
    { label: "FAQ", href: "/#faq" },
    { label: "Crie sua história!", href: "/#criar-historia", cta: true },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Observe all sections
    navLinks.forEach((link) => {
      const sectionId = link.href.replace("/#", "");
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-pink-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 cursor-pointer relative h-full py-2 w-1/2 sm:w-1/5"
          >
            {/* <Sparkles className="h-8 w-8 text-pink-main" />
            <span className="text-xl font-bold font-heading text-purple-700">
              Protagonizei
            </span> */}
            <Image src="/assets/images/navigation-logo.png" alt="Protagonizei" width={500} height={500} className="w-full sm:max-w-[200px] sm:h-auto" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center gap-x-6 w-4/5 justify-end">
            {navLinks.map((link) => {
              const sectionId = link.href.replace("/#", "");
              const isActive = activeSection === sectionId;
              
              return link.cta ? (
                <Link
                  href={link.href}
                  key={link.href}
                  className="magical-border border-4 border-transparent text-white font-bold py-2 px-4 rounded-full text-[1.2rem] shadow-xl hover:scale-105 transition-all duration-300 font-englebert"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-black xl:hover:text-pink-main transition-colors duration-200 font-semibold font-englebert text-[1.2rem] ${
                    isActive ? "text-pink-main border-b-2 border-pink-main" : ""
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-pink-main" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <Link href="/" className="flex items-center space-x-2 cursor-pointer w-full relative h-full py-2">
                      <Image src="/assets/images/navigation-logo.png" alt="Protagonizei" width={500} height={500} className="w-[200px] h-auto" />
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => {
                    const sectionId = link.href.replace("/#", "");
                    const isActive = activeSection === sectionId;
                    
                    return link.cta ? (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="magical-border border-4 border-transparent text-white font-bold py-2 px-4 rounded-full text-[1.2rem] shadow-xl hover:scale-105 transition-all duration-300 font-englebert w-fit mx-auto"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`text-black transition-colors duration-200 font-semibold font-englebert text-[1.2rem] ${
                          isActive ? "text-pink-main border-b-2 border-pink-main" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
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
