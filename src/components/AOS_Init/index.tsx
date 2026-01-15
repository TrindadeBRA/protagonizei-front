"use client"

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

export default function AOS_Init() {

  useEffect(() => {
    // Adiar a inicialização do AOS para evitar reflow forçado
    const initAOS = () => {
      AOS.init({
        // Configurações otimizadas para reduzir reflows
        once: true, // Anima apenas uma vez
        offset: 100,
        duration: 600,
        easing: 'ease-out-cubic',
      });
    };

    // Aguardar o próximo frame antes de inicializar
    const rafId = requestAnimationFrame(initAOS);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}