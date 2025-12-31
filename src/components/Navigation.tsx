"use client"

import { useState, useEffect, useMemo } from "react";
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
import { FaFacebook, FaInstagram } from "react-icons/fa";

type NavLink = {
  label: string;
  href: string;
  cta?: boolean;
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navLinks: NavLink[] = useMemo(() => ([
    { label: "Início", href: "/#hero" },
    { label: "Benefícios", href: "/#beneficios" },
    { label: "Como funciona", href: "/#como-funciona" },
    { label: "Exemplos", href: "/#exemplos" },
    { label: "Depoimentos", href: "/#depoimentos" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/#faq" },
    { label: "Crie sua história!", href: "/#criar-historia", cta: true },
  ]), []);

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
  }, [navLinks]);

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
            <Image src="/assets/images/navigation-logo.png" alt="Protagonizei" width={200} height={200} className="w-full sm:max-w-[200px] sm:h-auto" style={{ height: "auto" }} />
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
            {/* Social Media Links */}
            <div className="flex items-center gap-x-4 ml-4">
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
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Abrir menu de navegação">
                  <Menu className="h-6 w-6 text-pink-main" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <Link href="/" className="flex items-center space-x-2 cursor-pointer w-full relative h-full py-2">
                      <Image src="/assets/images/navigation-logo.png" alt="Protagonizei" width={500} height={500} className="w-[200px] h-auto" style={{ height: "auto" }} />
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
                  {/* Social Media Links - Mobile */}
                  <div className="flex items-center justify-center gap-x-6 mt-4 pt-4 border-t border-gray-200">
                    <Link
                      href="https://www.facebook.com/profile.php?id=61584693167182"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-blue-600 transition-colors duration-200"
                      aria-label="Facebook"
                      onClick={() => setIsOpen(false)}
                    >
                      <FaFacebook className="h-7 w-7" />
                    </Link>
                    <Link
                      href="https://www.instagram.com/protagonizei.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-pink-600 transition-colors duration-200"
                      aria-label="Instagram"
                      onClick={() => setIsOpen(false)}
                    >
                      <FaInstagram className="h-7 w-7" />
                    </Link>
                  </div>
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
