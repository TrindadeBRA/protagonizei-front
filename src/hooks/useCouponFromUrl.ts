"use client";

import { useEffect } from "react";

const COUPON_STORAGE_KEY = "protagonizei_coupon_code";

/**
 * Hook que detecta cupom na URL quando o site carrega 
 * e salva no sessionStorage para uso posterior
 */
export const useCouponFromUrl = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const urlCoupon = params.get('coupon');

    if (urlCoupon && urlCoupon.trim()) {
      const couponCode = urlCoupon.toUpperCase().trim();
      
      // Salvar no sessionStorage
      sessionStorage.setItem(COUPON_STORAGE_KEY, couponCode);
    }
  }, []);
};

/**
 * Função helper para obter o cupom do sessionStorage
 */
export const getCouponFromStorage = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  return sessionStorage.getItem(COUPON_STORAGE_KEY);
};

/**
 * Função helper para limpar o cupom do sessionStorage
 */
export const clearCouponFromStorage = (): void => {
  if (typeof window === 'undefined') return;
  
  sessionStorage.removeItem(COUPON_STORAGE_KEY);
};

