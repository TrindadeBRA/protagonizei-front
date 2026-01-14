'use client';

import { useEffect, useState } from 'react';
import { useBookControls } from '../../hooks/useBookControls';

interface BookControlsProps {
	children: React.ReactNode;
}

export const BookControls: React.FC<BookControlsProps> = ({ children }) => {
	const {
		scale,
		containerRef,
		zoomIn,
		zoomOut,
		reset,
		handleWheel,
	} = useBookControls({
		minScale: 0.25,
		maxScale: 3,
		initialScale: 0.5,
	});

	// Estados para fullscreen
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isStandalone, setIsStandalone] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);

	useEffect(() => {
		// Detectar se está em modo standalone (PWA instalado)
		const checkStandalone = () => {
			// iOS Safari
			if ((window.navigator as any).standalone === true) {
				return true;
			}
			// Android/Chrome PWA
			if (window.matchMedia('(display-mode: standalone)').matches) {
				return true;
			}
			return false;
		};

		// Detectar se é desktop (largura >= 768px)
		const checkDesktop = () => {
			return window.innerWidth >= 768;
		};

		setIsStandalone(checkStandalone());
		setIsDesktop(checkDesktop());

		const handleResize = () => {
			setIsDesktop(checkDesktop());
		};

		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};

		window.addEventListener('resize', handleResize);
		document.addEventListener('fullscreenchange', handleFullscreenChange);
		return () => {
			window.removeEventListener('resize', handleResize);
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
		};
	}, []);

	const toggleFullscreen = async () => {
		try {
			if (!document.fullscreenElement) {
				await document.documentElement.requestFullscreen();
			} else {
				await document.exitFullscreen();
			}
		} catch (error) {
			console.error('Erro ao alternar tela cheia:', error);
		}
	};

	return (
		<div
			ref={containerRef}
			className="relative w-full h-screen"
			onWheel={handleWheel}
			style={{ 
				touchAction: 'pan-x pan-y pinch-zoom',
				overflow: 'hidden',
			}}
		>
			{/* Área do livro com transformações */}
			<div
				style={{
					transform: `scale(${scale})`,
					transformOrigin: 'center center',
					transition: 'transform 0.1s ease-out',
					pointerEvents: 'auto',
					willChange: 'transform',
				}}
				className="select-none"
			>
				{children}
			</div>

			{/* Controles de zoom */}
			<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4 bg-purple-900/90 backdrop-blur-sm rounded-full px-8 py-5 shadow-2xl">
				{/* Botão zoom out */}
				<button
					onClick={zoomOut}
					className="bg-purple-700 hover:bg-purple-600 active:bg-purple-800 text-white rounded-full p-4 transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={scale <= 0.25}
					aria-label="Diminuir zoom"
					title="Diminuir zoom (ou Ctrl + Scroll)"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
					</svg>
				</button>

				{/* Indicador de escala */}
				<div className="px-5 py-2 text-white text-xl font-medium min-w-[80px] text-center">
					{Math.round(scale * 100)}%
				</div>

				{/* Botão zoom in */}
				<button
					onClick={zoomIn}
					className="bg-purple-700 hover:bg-purple-600 active:bg-purple-800 text-white rounded-full p-4 transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={scale >= 3}
					aria-label="Aumentar zoom"
					title="Aumentar zoom (ou Ctrl + Scroll)"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
					</svg>
				</button>

				{/* Separador */}
				<div className="w-px h-10 bg-purple-600 mx-2" />

				{/* Botão reset */}
				<button
					onClick={reset}
					className="bg-purple-700 hover:bg-purple-600 active:bg-purple-800 text-white rounded-full p-4 transition-all duration-200 hover:scale-110 active:scale-95"
					aria-label="Resetar zoom"
					title="Resetar zoom"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
					</svg>
				</button>

				{/* Separador e botão fullscreen - apenas desktop e não standalone */}
				{!isStandalone && isDesktop && (
					<>
						<div className="w-px h-10 bg-purple-600 mx-2" />
						{/* Botão fullscreen */}
						<button
							onClick={toggleFullscreen}
							className="bg-purple-700 hover:bg-purple-600 active:bg-purple-800 text-white rounded-full p-4 transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center"
							title={isFullscreen ? 'Sair da tela cheia' : 'Entrar em tela cheia'}
							aria-label={isFullscreen ? 'Sair da tela cheia' : 'Entrar em tela cheia'}
						>
							{isFullscreen ? (
								<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
								</svg>
							) : (
								<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5.5 5.5M20 8V4m0 0h-4m4 0l-5.5 5.5M4 16v4m0 0h4m-4 0l5.5-5.5M20 16v4m0 0h-4m4 0l-5.5-5.5" />
								</svg>
							)}
						</button>
					</>
				)}
			</div>
		</div>
	);
};
