'use client';

import { createContext, useContext, useState, useLayoutEffect, useCallback, ReactNode } from 'react';

const STORAGE_KEY = 'protagonizei_dark_mode';

interface DarkModeContextType {
	isDark: boolean;
	toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

/**
 * Função para inicializar o estado do dark mode de forma síncrona
 * Deve ser chamada antes do primeiro render para evitar flash
 */
function getInitialDarkMode(): boolean {
	if (typeof window === 'undefined') return false;
	
	try {
		const saved = localStorage.getItem(STORAGE_KEY);
		return saved === 'true';
	} catch (error) {
		console.warn('Erro ao carregar preferência de dark mode:', error);
		return false;
	}
}

/**
 * Provider de Dark Mode para o layout do play
 * Gerencia o estado de dark mode e aplica a classe no HTML
 */
export function DarkModeProvider({ children }: { children: ReactNode }) {
	// Inicializa com o valor do localStorage de forma síncrona
	const [isDark, setIsDark] = useState(() => getInitialDarkMode());

	// Aplicar classe no HTML de forma síncrona antes do paint
	useLayoutEffect(() => {
		if (typeof window === 'undefined') return;
		
		try {
			// Aplicar/remover classe dark no html
			if (isDark) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
			
			// Salvar preferência
			localStorage.setItem(STORAGE_KEY, isDark.toString());
		} catch (error) {
			console.warn('Erro ao aplicar dark mode:', error);
		}
	}, [isDark]);

	/**
	 * Toggle dark mode
	 */
	const toggleDarkMode = useCallback(() => {
		setIsDark(prev => !prev);
	}, []);

	return (
		<DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
}

/**
 * Hook para usar o contexto de dark mode
 */
export function useDarkModeContext() {
	const context = useContext(DarkModeContext);
	if (context === undefined) {
		throw new Error('useDarkModeContext must be used within a DarkModeProvider');
	}
	return context;
}
