"use client"

import { EnvelopeIcon } from "@heroicons/react/24/outline"
import { MapPinIcon, PhoneIcon } from "lucide-react"
import { useState, useEffect, useRef } from "react";

export default function ContactItems() {
  const [offset, setOffset] = useState(0);
  const parallaxRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        if (parallaxRef.current) {
          const rect = (parallaxRef.current as HTMLElement).getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          if (isVisible) {
            const scrollPosition = window.scrollY;
            const elementPosition = rect.top + scrollPosition;
            const isDesktop = window.innerWidth >= 1024;
            const parallaxSpeed = isDesktop ? 0.8 : 0.4;
            const newOffset = (scrollPosition - elementPosition) * parallaxSpeed;
            setOffset(newOffset);
          }
        }
      };
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div ref={parallaxRef} className="relative isolate overflow-hidden overflow-x-hidden h-[100%] ">
      {/* Background com efeito parallax */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/assets/images/contact-itens-bg.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${offset}px)`,
          height: "200%",
          top: "-25%",
          width: "100%",
        }}
      />

      {/* Overlay para melhorar legibilidade */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Conteúdo */}
      <div className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-5xl font-semibold tracking-tight text-white" data-aos="fade-left">Esperamos seu contato</h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 mt-12">

            <div className="text-white border border-white/10 rounded-lg w-full bg-white/10 p-4" data-aos="fade-left">
              <div className="flex flex-row gap-2 items-center">
                <MapPinIcon className="w-6 h-6 text-[#0399c4]" />
                <h3 className="text-2xl font-light">Endereço</h3>
              </div>
              <div className="mt-6 notranslate">
                <p>R. Vicente de Paula Souza e Silva, 466</p>
                <p>Assunção, São Bernardo do Campo - SP</p>
                {/* <p>09861-690</p> */}
              </div>
            </div>

            <div className="text-white border border-white/10 rounded-lg w-full bg-white/10 p-4" data-aos="fade-in">
              <div className="flex flex-row gap-2 items-center">
                <EnvelopeIcon className="w-6 h-6 text-[#0399c4]" />
                <h3 className="text-2xl font-light">Email</h3>
              </div>
              <div className="mt-6 notranslate">
                <p>contato@tiken.com.br</p>
                <p>vendas@tiken.com.br</p>
              </div>
            </div>

            <div className="text-white border border-white/10 rounded-lg w-full bg-white/10 p-4" data-aos="fade-right">
              <div className="flex flex-row gap-2 items-center">
                <PhoneIcon className="w-6 h-6 text-[#0399c4]" />
                <h3 className="text-2xl font-light">Telefone & WhatsApp</h3>
              </div>
              <div className="mt-6 notranslate">
                <p>+55 11 5555-2080</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
