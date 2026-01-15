'use client';

import { useState, useEffect } from 'react';

/**
 * Hook para detectar se o dispositivo é mobile/tablet
 * Fullscreen não funciona bem em dispositivos móveis
 */
export function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			// Verifica user agent
			const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
			const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());

			// Verifica largura da tela (tablets geralmente têm até 1024px)
			const isSmallScreen = window.innerWidth <= 1024;

			// Verifica se é touch device
			const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

			// Considera mobile se: user agent mobile OU (tela pequena E touch device)
			const mobile = isMobileUserAgent || (isSmallScreen && isTouchDevice);

			setIsMobile(mobile);
		};

		// Verificar na montagem
		checkMobile();

		// Verificar no resize (caso o usuário redimensione a janela)
		window.addEventListener('resize', checkMobile);

		return () => {
			window.removeEventListener('resize', checkMobile);
		};
	}, []);

	return isMobile;
}

