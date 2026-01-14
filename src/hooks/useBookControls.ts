'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseBookControlsOptions {
	minScale?: number;
	maxScale?: number;
	initialScale?: number;
	storageKey?: string;
}

const STORAGE_KEY = 'protagonizei_book_zoom_scale';

export const useBookControls = (options: UseBookControlsOptions = {}) => {
	const {
		minScale = 0.5,
		maxScale = 3,
		initialScale = 1,
		storageKey = STORAGE_KEY,
	} = options;

	// Sempre inicializar com initialScale para evitar problemas de hidratação
	const [scale, setScale] = useState(initialScale);
	const containerRef = useRef<HTMLDivElement>(null);
	const [isMounted, setIsMounted] = useState(false);

	// Carregar do localStorage apenas após o mount (no cliente)
	useEffect(() => {
		setIsMounted(true);
		
		if (typeof window === 'undefined') return;
		
		try {
			const stored = localStorage.getItem(storageKey);
			if (stored) {
				const parsed = parseFloat(stored);
				// Validar se o valor está dentro dos limites
				if (!isNaN(parsed) && parsed >= minScale && parsed <= maxScale) {
					setScale(parsed);
				}
			}
		} catch (error) {
			console.warn('Erro ao ler preferência de zoom do localStorage:', error);
		}
	}, [storageKey, minScale, maxScale]);

	// Salvar no localStorage sempre que o scale mudar (apenas após mount)
	useEffect(() => {
		if (!isMounted || typeof window === 'undefined') return;
		
		try {
			localStorage.setItem(storageKey, scale.toString());
		} catch (error) {
			console.warn('Erro ao salvar preferência de zoom no localStorage:', error);
		}
	}, [scale, storageKey, isMounted]);

	// Zoom in
	const zoomIn = useCallback(() => {
		setScale((prev) => Math.min(prev + 0.1, maxScale));
	}, [maxScale]);

	// Zoom out
	const zoomOut = useCallback(() => {
		setScale((prev) => Math.max(prev - 0.1, minScale));
	}, [minScale]);

	// Reset zoom
	const reset = useCallback(() => {
		setScale(initialScale);
	}, [initialScale]);

	// Wheel zoom
	const handleWheel = useCallback((e: React.WheelEvent) => {
		if (e.ctrlKey || e.metaKey) {
			e.preventDefault();
			const delta = e.deltaY > 0 ? -0.1 : 0.1;
			setScale((prev) => {
				const newScale = Math.max(minScale, Math.min(maxScale, prev + delta));
				return newScale;
			});
		}
	}, [minScale, maxScale]);

	return {
		scale,
		containerRef,
		zoomIn,
		zoomOut,
		reset,
		handleWheel,
	};
};

