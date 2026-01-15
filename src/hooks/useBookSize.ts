'use client';

import { useState, useEffect, useCallback } from 'react';

// =================================================================
// CONFIGURAÇÕES DE ZOOM
// =================================================================

const MIN_ZOOM = 10;    // 10%
const MAX_ZOOM = 250;   // 250%
const ZOOM_STEP = 10;   // Incremento de 10%
const DEFAULT_ZOOM = 100; // 100% padrão

const STORAGE_KEY = 'protagonizei_book_zoom';

// Conversão: zoom% → viewportUsage
// 100% = 0.85 da viewport (base)
// 50% = 0.425, 150% = 1.275, etc
const BASE_VIEWPORT_USAGE = 0.85;

/**
 * Converte porcentagem de zoom para viewportUsage
 * @param zoomPercent - Porcentagem (10-250)
 * @returns viewportUsage (0.0-1.0)
 */
function zoomToViewportUsage(zoomPercent: number): number {
	return (zoomPercent / 100) * BASE_VIEWPORT_USAGE;
}

/**
 * Calcula padding baseado no zoom (maior zoom = menor padding)
 */
function zoomToPadding(zoomPercent: number): number {
	if (zoomPercent <= 50) return 80;
	if (zoomPercent <= 80) return 60;
	if (zoomPercent <= 120) return 40;
	return 20;
}

// =================================================================
// HOOK
// =================================================================

interface BookSizeConfig {
	viewportUsage: number;
	padding: number;
}

/**
 * Hook para gerenciar o zoom do livro (10% - 250%)
 * Salva a preferência no localStorage
 */
export function useBookSize() {
	const [zoom, setZoom] = useState<number>(DEFAULT_ZOOM);
	const [isMounted, setIsMounted] = useState(false);

	// Carregar preferência salva
	useEffect(() => {
		setIsMounted(true);
		
		if (typeof window === 'undefined') return;
		
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const parsedZoom = parseInt(saved, 10);
				if (parsedZoom >= MIN_ZOOM && parsedZoom <= MAX_ZOOM) {
					setZoom(parsedZoom);
				}
			}
		} catch (error) {
			console.warn('Erro ao carregar preferência de zoom:', error);
		}
	}, []);

	// Salvar preferência quando mudar
	useEffect(() => {
		if (!isMounted || typeof window === 'undefined') return;
		
		try {
			localStorage.setItem(STORAGE_KEY, zoom.toString());
		} catch (error) {
			console.warn('Erro ao salvar preferência de zoom:', error);
		}
	}, [zoom, isMounted]);

	/**
	 * Aumenta o zoom em 10%
	 */
	const zoomIn = useCallback(() => {
		setZoom(prev => {
			const newZoom = Math.min(prev + ZOOM_STEP, MAX_ZOOM);
			console.log('➕ Zoom In:', prev + '%', '→', newZoom + '%');
			return newZoom;
		});
	}, []);

	/**
	 * Diminui o zoom em 10%
	 */
	const zoomOut = useCallback(() => {
		setZoom(prev => {
			const newZoom = Math.max(prev - ZOOM_STEP, MIN_ZOOM);
			console.log('➖ Zoom Out:', prev + '%', '→', newZoom + '%');
			return newZoom;
		});
	}, []);

	/**
	 * Define um zoom específico
	 */
	const setZoomPercent = useCallback((percent: number) => {
		const clampedZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, percent));
		setZoom(clampedZoom);
	}, []);

	/**
	 * Retorna a configuração do zoom atual
	 */
	const config: BookSizeConfig = {
		viewportUsage: zoomToViewportUsage(zoom),
		padding: zoomToPadding(zoom),
	};

	return {
		zoom,
		zoomIn,
		zoomOut,
		setZoomPercent,
		config,
		canZoomIn: zoom < MAX_ZOOM,
		canZoomOut: zoom > MIN_ZOOM,
		minZoom: MIN_ZOOM,
		maxZoom: MAX_ZOOM,
	};
}
