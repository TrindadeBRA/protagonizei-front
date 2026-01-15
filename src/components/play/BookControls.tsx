'use client';

import React, { memo, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';
import { useFullscreen } from '../../hooks/useFullscreen';
import { useIsMobile } from '../../hooks/useIsMobile';

// =================================================================
// COMPONENTES AUXILIARES
// =================================================================

interface ZoomButtonProps {
	onClick: () => void;
	disabled: boolean;
	label: string;
	title: string;
	children: React.ReactNode;
}

/**
 * Botão de zoom reutilizável
 */
const ZoomButton = memo<ZoomButtonProps>(({ onClick, disabled, label, title, children }) => (
	<button
		onClick={onClick}
		disabled={disabled}
		className="text-white rounded-full p-4 transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border shadow-lg cursor-pointer"
		style={{
			backgroundColor: 'rgba(147, 51, 234, 0.4)',
			backdropFilter: 'blur(12px)',
			borderColor: 'rgba(196, 181, 253, 0.4)',
		}}
		onMouseEnter={(e) => {
			if (!disabled) {
				e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.5)';
			}
		}}
		onMouseLeave={(e) => {
			e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.4)';
		}}
		aria-label={label}
		title={title}
	>
		{children}
	</button>
));
ZoomButton.displayName = 'ZoomButton';

/**
 * Indicador de zoom
 */
const ZoomIndicator = memo<{ zoom: number }>(({ zoom }) => (
	<div className="px-5 py-2 text-white text-xl font-medium min-w-[90px] text-center bg-purple-600/30 backdrop-blur-md rounded-lg border border-purple-300/40">
		{zoom}%
	</div>
));
ZoomIndicator.displayName = 'ZoomIndicator';

// =================================================================
// COMPONENTE PRINCIPAL
// =================================================================

interface BookControlsProps {
	children: React.ReactNode;
	isMinimized: boolean;
	onToggleMinimize: () => void;
	onZoomIn?: () => void;
	onZoomOut?: () => void;
	currentZoom?: number;
	canZoomIn?: boolean;
	canZoomOut?: boolean;
}

/**
 * Container de controles do livro com zoom
 */
export const BookControls = memo<BookControlsProps>(({ 
	children, 
	isMinimized, 
	onToggleMinimize,
	onZoomIn,
	onZoomOut,
	currentZoom = 100,
	canZoomIn = true,
	canZoomOut = true,
}) => {
	const handleZoomIn = () => {
		if (onZoomIn) onZoomIn();
	};

	const handleZoomOut = () => {
		if (onZoomOut) onZoomOut();
	};

	const { isFullscreen, toggleFullscreen } = useFullscreen();
	const isMobile = useIsMobile();
	const containerRef = useRef<HTMLDivElement>(null);

	/**
	 * Listener nativo para capturar Ctrl+Scroll antes do navegador
	 * Isso previne o zoom do navegador completamente
	 */
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleWheelNative = (e: WheelEvent) => {
			if (e.ctrlKey || e.metaKey) {
				// Previne zoom do navegador
				e.preventDefault();
				e.stopPropagation();
				e.stopImmediatePropagation();
				
				const delta = e.deltaY;
				
				if (delta > 0) {
					// Scroll para baixo = Zoom Out
					if (canZoomOut && onZoomOut) {
						onZoomOut();
					}
				} else {
					// Scroll para cima = Zoom In
					if (canZoomIn && onZoomIn) {
						onZoomIn();
					}
				}
			}
		};

		// Usa capture phase para interceptar antes do navegador
		container.addEventListener('wheel', handleWheelNative, { passive: false, capture: true });

		return () => {
			container.removeEventListener('wheel', handleWheelNative, { capture: true });
		};
	}, [canZoomIn, canZoomOut, onZoomIn, onZoomOut]);

	return (
		<div 
			ref={containerRef}
			className="relative w-full h-screen overflow-hidden"
		>
			{/* Container centralizado do livro */}
			<div className="w-full h-full flex items-center justify-center">
				{children}
			</div>

			{/* Controles de Zoom - Menu inferior */}
			{!isMinimized && (
				<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4 bg-purple-500/20 backdrop-blur-md rounded-full px-8 py-5 shadow-2xl border border-purple-300/30 transition-all duration-300">
					{/* Zoom Out (-) */}
					<ZoomButton
						onClick={handleZoomOut}
						disabled={!canZoomOut}
						label="Diminuir zoom"
						title={`Diminuir zoom (Mín: 10%) - Ou Ctrl + Scroll Down`}
					>
						<ZoomOut className="h-6 w-6" />
					</ZoomButton>

					{/* Indicador de % */}
					<ZoomIndicator zoom={currentZoom} />

					{/* Zoom In (+) */}
					<ZoomButton
						onClick={handleZoomIn}
						disabled={!canZoomIn}
						label="Aumentar zoom"
						title={`Aumentar zoom (Máx: 250%) - Ou Ctrl + Scroll Up`}
					>
						<ZoomIn className="h-6 w-6" />
					</ZoomButton>

					{/* Separador */}
					<div className="h-8 w-px bg-purple-300/40 mx-2" />

					{/* Botão Tela Cheia - Oculto em mobile/tablet */}
					{!isMobile && (
						<>
							<ZoomButton
								onClick={toggleFullscreen}
								disabled={false}
								label={isFullscreen ? "Sair de tela cheia" : "Tela cheia"}
								title={isFullscreen ? "Sair de tela cheia (F11)" : "Entrar em tela cheia (F11)"}
							>
								{isFullscreen ? (
									<Minimize2 className="h-6 w-6" />
								) : (
									<Maximize2 className="h-6 w-6" />
								)}
							</ZoomButton>

							{/* Separador */}
							<div className="h-8 w-px bg-purple-300/40 mx-2" />
						</>
					)}


					{/* Botão Minimizar */}
					<button
						onClick={onToggleMinimize}
						className="text-white rounded-full p-3 transition-all duration-200 hover:scale-110 active:scale-95 border shadow-lg cursor-pointer"
						style={{
							backgroundColor: 'rgba(147, 51, 234, 0.4)',
							backdropFilter: 'blur(12px)',
							borderColor: 'rgba(196, 181, 253, 0.4)',
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.5)';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.4)';
						}}
						aria-label="Minimizar menu"
						title="Minimizar menu"
					>
						<ChevronDown className="h-5 w-5" />
					</button>
				</div>
			)}

			{/* Botão Minimizado - Expandir */}
			{isMinimized && (
				<button
					onClick={onToggleMinimize}
					className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 text-white rounded-full p-2 transition-all duration-300 hover:scale-110 active:scale-95 border shadow-lg flex items-center justify-center cursor-pointer"
					style={{
						backgroundColor: 'rgba(147, 51, 234, 0.4)',
						backdropFilter: 'blur(12px)',
						borderColor: 'rgba(196, 181, 253, 0.4)',
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.5)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.4)';
					}}
					aria-label="Expandir menu"
					title="Expandir menu"
				>
					<ChevronUp className="h-3.5 w-3.5" />
				</button>
			)}
		</div>
	);
});

BookControls.displayName = 'BookControls';
