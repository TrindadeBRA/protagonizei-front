'use client';

import { useState, useEffect, useCallback } from 'react';

// =================================================================
// TAMANHOS DISPONÍVEIS
// =================================================================

export type BookSize = 'small' | 'medium' | 'large';

interface BookSizeConfig {
	label: string;
	viewportUsage: number; // Porcentagem da viewport (0.0 a 1.0)
	padding: number; // Padding em pixels
}

export const BOOK_SIZES: Record<BookSize, BookSizeConfig> = {
	small: {
		label: 'Pequeno',
		viewportUsage: 0.70,
		padding: 60,
	},
	medium: {
		label: 'Médio',
		viewportUsage: 0.85,
		padding: 40,
	},
	large: {
		label: 'Grande',
		viewportUsage: 0.95,
		padding: 20,
	},
};

const STORAGE_KEY = 'protagonizei_book_size';
const DEFAULT_SIZE: BookSize = 'medium';

// =================================================================
// HOOK
// =================================================================

/**
 * Hook para gerenciar o tamanho do livro escolhido pelo usuário
 * Salva a preferência no localStorage
 * 
 * @returns {Object} Estado e funções para gerenciar o tamanho do livro
 */
export function useBookSize() {
	const [size, setSize] = useState<BookSize>(DEFAULT_SIZE);
	const [isMounted, setIsMounted] = useState(false);

	// Carregar preferência salva
	useEffect(() => {
		setIsMounted(true);
		
		if (typeof window === 'undefined') return;
		
		try {
			const saved = localStorage.getItem(STORAGE_KEY) as BookSize | null;
			if (saved && BOOK_SIZES[saved]) {
				setSize(saved);
			}
		} catch (error) {
			console.warn('Erro ao carregar preferência de tamanho:', error);
		}
	}, []);

	// Salvar preferência quando mudar
	useEffect(() => {
		if (!isMounted || typeof window === 'undefined') return;
		
		try {
			localStorage.setItem(STORAGE_KEY, size);
		} catch (error) {
			console.warn('Erro ao salvar preferência de tamanho:', error);
		}
	}, [size, isMounted]);

	/**
	 * Atualiza o tamanho do livro
	 */
	const changeSize = useCallback((newSize: BookSize) => {
		console.log('✅ useBookSize.changeSize chamado com:', newSize);
		setSize(newSize);
	}, []);

	/**
	 * Retorna a configuração do tamanho atual
	 */
	const currentConfig = BOOK_SIZES[size];

	return {
		size,
		changeSize,
		config: currentConfig,
		sizes: BOOK_SIZES,
	};
}

