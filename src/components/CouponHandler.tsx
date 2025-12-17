"use client";

import { useCouponFromUrl } from "@/src/hooks/useCouponFromUrl";

/**
 * Componente responsável por detectar o cupom na URL
 * e salvá-lo no sessionStorage quando a página carrega
 */
const CouponHandler = () => {
  useCouponFromUrl();
  
  // Este componente não renderiza nada
  return null;
};

export default CouponHandler;

