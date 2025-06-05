"use client"

import { useState, useEffect, useRef } from "react";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function DiscoverOurProducts() {
  const [offset, setOffset] = useState(0);
  const parallaxRef = useRef(null);
  
  useEffect(() => {
    // Verificar se estamos no navegador (não no servidor)
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        // Verifica se o elemento está visível na viewport
        if (parallaxRef.current) {
          const rect = (parallaxRef.current as HTMLElement).getBoundingClientRect();
          const isVisible = 
            rect.top < window.innerHeight && 
            rect.bottom > 0;
          
          if (isVisible) {
            // Calcula o offset com base na posição de rolagem
            const scrollPosition = window.scrollY;
            const elementPosition = rect.top + scrollPosition;
            // Ajusta a velocidade do parallax baseado no tamanho da tela
            const isDesktop = window.innerWidth >= 1024; // lg breakpoint do Tailwind
            const parallaxSpeed = isDesktop ? 0.8 : 0.4;
            const newOffset = (scrollPosition - elementPosition) * parallaxSpeed;
            setOffset(newOffset);
          }
        }
      };
      
      window.addEventListener("scroll", handleScroll);
      // Executa uma vez para inicializar o estado
      handleScroll();
      
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div ref={parallaxRef} className="relative isolate overflow-hidden overflow-x-hidden h-[600px]">
      {/* Background com efeito parallax */}
      <div
        className="absolute inset-0"
        style={{ 
          backgroundImage: `url('/assets/images/our-products-bg.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${offset}px)`,
          height: "200%", // Aumentei a altura para garantir cobertura
          top: "-25%", // Ajustei o posicionamento para compensar a altura extra
          width: "100%"
        }}
      />
      
      {/* Overlay para melhorar legibilidade */}
      <div className="absolute inset-0 bg-black/10" />
      
      {/* Conteúdo */}
      <div className="relative px-6 py-24 sm:px-6 sm:py-32 lg:px-8 h-full flex items-center">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl" data-aos="zoom-in">
            Descubra nossos produtos
          </h2>
          <p className="mx-auto mt-6 w-full max-w-4xl text-lg/8 text-pretty text-white font-semibold drop-shadow-2xl" data-aos="zoom-in">
            A Tiken tem se diferenciado cada vez mais, oferecendo soluções que atendam as exigências e necessidades de mercado, através de produtos com alta qualidade e performance
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/produtos"
              className="flex items-center gap-x-2 rounded-md bg-white text-[#0399c4] px-4 py-2.5 font-bold font-inter"
              data-aos="zoom-in"
            >
              saiba mais <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}