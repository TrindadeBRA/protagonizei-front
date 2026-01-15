'use client';

import { useEffect, useState } from 'react';
import {
	BOOK_ASPECT_RATIO,
	DEFAULT_BOOK_WIDTH,
	DEFAULT_BOOK_HEIGHT,
} from '../components/play/bookConfig';

interface BookDimensions {
	width: number;
	height: number;
}

interface UseBookDimensionsOptions {
	viewportUsage?: number;
	padding?: number;
}

/**
 * Hook para calcular dimensões responsivas do livro
 * Aceita configuração dinâmica de viewport e padding
 * 
 * @param options - Configurações opcionais
 * @returns Dimensões calculadas do livro
 */
export const useBookDimensions = (options: UseBookDimensionsOptions = {}): BookDimensions => {
	const {
		viewportUsage = 0.85, // Padrão: 85%
		padding = 40,         // Padrão: 40px
	} = options;

	const [dimensions, setDimensions] = useState<BookDimensions>({
		width: DEFAULT_BOOK_WIDTH,
		height: DEFAULT_BOOK_HEIGHT,
	});

	useEffect(() => {
		const updateDimensions = () => {
			const viewportWidth = window.innerWidth;
			const viewportHeight = window.innerHeight;

			// Área disponível após remover padding
			const availableWidth = viewportWidth - padding * 2;
			const availableHeight = viewportHeight - padding * 2;

			// Calcular dimensões baseado na largura disponível com a porcentagem configurada
			let width = availableWidth * viewportUsage;
			let height = width / BOOK_ASPECT_RATIO;

			// Se a altura calculada exceder o espaço vertical disponível, recalcular pela altura
			if (height > availableHeight * viewportUsage) {
				height = availableHeight * viewportUsage;
				width = height * BOOK_ASPECT_RATIO;
			}

			setDimensions({
				width: Math.round(width),
				height: Math.round(height),
			});
		};

		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return () => window.removeEventListener('resize', updateDimensions);
	}, [viewportUsage, padding]); // Recalcula quando viewportUsage ou padding mudam

	return dimensions;
};
