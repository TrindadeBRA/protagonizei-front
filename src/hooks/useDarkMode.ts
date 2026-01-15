'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'protagonizei_dark_mode';

/**
 * Hook para gerenciar dark mode
 * Salva preferência no localStorage
 */
export function useDarkMode() {
	const [isDark, setIsDark] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	// Carregar preferência salva
	useEffect(() => {
		setIsMounted(true);
		
		if (typeof window === 'undefined') return;
		
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved === 'true') {
				setIsDark(true);
				document.documentElement.classList.add('dark');
			}
		} catch (error) {
			console.warn('Erro ao carregar preferência de dark mode:', error);
		}
	}, []);

	// Salvar preferência quando mudar
	useEffect(() => {
		if (!isMounted || typeof window === 'undefined') return;
		
		try {
			localStorage.setItem(STORAGE_KEY, isDark.toString());
			
			// Aplicar/remover classe dark no html
			if (isDark) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		} catch (error) {
			console.warn('Erro ao salvar preferência de dark mode:', error);
		}
	}, [isDark, isMounted]);

	/**
	 * Toggle dark mode
	 */
	const toggleDarkMode = useCallback(() => {
		setIsDark(prev => !prev);
	}, []);

	return {
		isDark,
		toggleDarkMode,
	};
}


