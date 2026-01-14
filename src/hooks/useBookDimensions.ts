'use client';

import { useEffect, useState } from 'react';
import {
	BOOK_ASPECT_RATIO,
	DEFAULT_BOOK_WIDTH,
	DEFAULT_BOOK_HEIGHT,
	HORIZONTAL_VIEWPORT_USAGE,
	VERTICAL_VIEWPORT_USAGE,
	VIEWPORT_PADDING,
} from '../components/play/bookConfig';

interface BookDimensions {
	width: number;
	height: number;
}

export const useBookDimensions = (): BookDimensions => {
	const [dimensions, setDimensions] = useState<BookDimensions>({
		width: DEFAULT_BOOK_WIDTH,
		height: DEFAULT_BOOK_HEIGHT,
	});

	useEffect(() => {
		const updateDimensions = () => {
			const viewportWidth = window.innerWidth;
			const viewportHeight = window.innerHeight;

			// Área disponível após remover padding
			const availableWidth = viewportWidth - VIEWPORT_PADDING * 2;
			const availableHeight = viewportHeight - VIEWPORT_PADDING * 2;

			// Calcular dimensões baseado na largura disponível com a porcentagem configurada
			let width = availableWidth * HORIZONTAL_VIEWPORT_USAGE;
			let height = width / BOOK_ASPECT_RATIO;

			// Se a altura calculada exceder o espaço vertical disponível, recalcular pela altura
			if (height > availableHeight * VERTICAL_VIEWPORT_USAGE) {
				height = availableHeight * VERTICAL_VIEWPORT_USAGE;
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
	}, []);

	return dimensions;
};

