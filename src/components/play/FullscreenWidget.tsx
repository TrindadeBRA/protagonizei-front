'use client';

import { useEffect, useState } from 'react';

export const FullscreenWidget = () => {
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [showMobileToast, setShowMobileToast] = useState(false);

	useEffect(() => {
		// Detectar se é mobile
		const checkMobile = () => {
			const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
			setIsMobile(mobile);
		};
		
		checkMobile();

		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};

		document.addEventListener('fullscreenchange', handleFullscreenChange);
		return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
	}, []);

	const toggleFullscreen = async () => {
		// Para dispositivos móveis
		if (isMobile) {
			try {
				// Tentar diferentes APIs de fullscreen para mobile
				const elem = document.documentElement as any;
				
				if (elem.requestFullscreen) {
					await elem.requestFullscreen();
				} else if (elem.webkitRequestFullscreen) { // iOS Safari
					await elem.webkitRequestFullscreen();
				} else if (elem.mozRequestFullScreen) { // Firefox
					await elem.mozRequestFullScreen();
				} else if (elem.msRequestFullscreen) { // IE/Edge
					await elem.msRequestFullscreen();
				} else {
					// Se nenhuma API funcionar, mostrar toast com instruções
					setShowMobileToast(true);
					setTimeout(() => setShowMobileToast(false), 4000);
					return;
				}
			} catch (error) {
				console.error('Erro ao entrar em tela cheia no mobile:', error);
				// Mostrar toast com instruções
				setShowMobileToast(true);
				setTimeout(() => setShowMobileToast(false), 4000);
			}
		} else {
			// Para desktop
			try {
				if (!document.fullscreenElement) {
					await document.documentElement.requestFullscreen();
				} else {
					await document.exitFullscreen();
				}
			} catch (error) {
				console.error('Erro ao alternar tela cheia:', error);
			}
		}
	};

	return (
		<>
			{/* Toast para instruções mobile */}
			{showMobileToast && (
				<div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[70] bg-purple-900 text-white px-6 py-4 rounded-lg shadow-2xl max-w-sm mx-4 animate-slide-down">
					<p className="text-sm text-center">
						💡 <strong>Dica:</strong> Para tela cheia, toque no menu do navegador (⋮) e selecione "Tela cheia" ou "Adicionar à tela inicial"
					</p>
				</div>
			)}

			<button
				onClick={toggleFullscreen}
				className="fixed bottom-6 right-6 z-[60] bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
				title={isFullscreen ? 'Sair da tela cheia' : 'Entrar em tela cheia'}
				aria-label={isFullscreen ? 'Sair da tela cheia' : 'Entrar em tela cheia'}
			>
				{isFullscreen ? (
					// Ícone de sair de tela cheia
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
					</svg>
				) : (
					// Ícone de entrar em tela cheia
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5.5 5.5M20 8V4m0 0h-4m4 0l-5.5 5.5M4 16v4m0 0h4m-4 0l5.5-5.5M20 16v4m0 0h-4m4 0l-5.5-5.5" />
					</svg>
				)}
				<span className="sr-only">{isFullscreen ? 'Sair da tela cheia' : 'Entrar em tela cheia'}</span>
			</button>
		</>
	);
};

