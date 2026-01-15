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
		let rafId: number | null = null;
		let timeoutId: NodeJS.Timeout | null = null;

		const updateDimensions = () => {
			// Usar requestAnimationFrame para evitar reflow forçado
			if (rafId) {
				cancelAnimationFrame(rafId);
			}

			rafId = requestAnimationFrame(() => {
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
			});
		};

		// Debounce para resize events
		const handleResize = () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			timeoutId = setTimeout(updateDimensions, 16); // ~60fps
		};

		updateDimensions();
		window.addEventListener('resize', handleResize);
		
		return () => {
			window.removeEventListener('resize', handleResize);
			if (rafId) {
				cancelAnimationFrame(rafId);
			}
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [viewportUsage, padding]); // Recalcula quando viewportUsage ou padding mudam

	return dimensions;
};
