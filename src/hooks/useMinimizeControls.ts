'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'protagonizei_controls_minimized';

export const useMinimizeControls = () => {
	// Inicializar com false para evitar problemas de hidratação
	// O valor real será carregado do localStorage após o mount
	const [isMinimized, setIsMinimized] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	// Carregar do localStorage na inicialização (apenas no cliente)
	useEffect(() => {
		setIsMounted(true);
		if (typeof window === 'undefined') return;

		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored !== null) {
				// Se existe valor salvo, usar ele (true ou false)
				setIsMinimized(stored === 'true');
			}
		} catch (error) {
			console.warn('Erro ao ler preferência de minimização do localStorage:', error);
		}
	}, []);

	// Salvar no localStorage sempre que o estado mudar (apenas no cliente e após montagem)
	useEffect(() => {
		if (!isMounted || typeof window === 'undefined') return;

		try {
			localStorage.setItem(STORAGE_KEY, isMinimized.toString());
		} catch (error) {
			console.warn('Erro ao salvar preferência de minimização no localStorage:', error);
		}
	}, [isMinimized, isMounted]);

	const toggleMinimize = () => {
		setIsMinimized((prev) => !prev);
	};

	return {
		isMinimized,
		toggleMinimize,
	};
};

