'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook para gerenciar fullscreen de forma robusta
 * Suporta múltiplas APIs para compatibilidade cross-browser
 */
export function useFullscreen() {
	const [isFullscreen, setIsFullscreen] = useState(false);

	// Verificar se está em fullscreen (múltiplas APIs)
	const checkFullscreen = useCallback(() => {
		const doc = document as any;
		return !!(
			document.fullscreenElement ||
			doc.webkitFullscreenElement ||
			doc.mozFullScreenElement ||
			doc.msFullscreenElement
		);
	}, []);

	// Atualizar estado baseado no estado real do navegador
	const updateFullscreenState = useCallback(() => {
		const isFull = checkFullscreen();
		setIsFullscreen(isFull);
	}, [checkFullscreen]);

	// Entrar em fullscreen
	const enterFullscreen = useCallback(async () => {
		const element = document.documentElement;
		const elem = element as any;

		console.log('🔍 Tentando entrar em fullscreen...');
		console.log('📋 APIs disponíveis:', {
			requestFullscreen: !!elem.requestFullscreen,
			webkitRequestFullscreen: !!elem.webkitRequestFullscreen,
			mozRequestFullScreen: !!elem.mozRequestFullScreen,
			msRequestFullscreen: !!elem.msRequestFullscreen,
		});

		try {
			if (elem.requestFullscreen) {
				console.log('✅ Usando requestFullscreen()');
				await elem.requestFullscreen();
				return true;
			} else if (elem.webkitRequestFullscreen) {
				console.log('✅ Usando webkitRequestFullscreen()');
				await elem.webkitRequestFullscreen();
				return true;
			} else if (elem.mozRequestFullScreen) {
				console.log('✅ Usando mozRequestFullScreen()');
				await elem.mozRequestFullScreen();
				return true;
			} else if (elem.msRequestFullscreen) {
				console.log('✅ Usando msRequestFullscreen()');
				await elem.msRequestFullscreen();
				return true;
			} else {
				console.warn('❌ Fullscreen não suportado neste navegador');
				return false;
			}
		} catch (error: any) {
			console.error('❌ Erro ao entrar em fullscreen:', error);
			console.error('📝 Detalhes:', {
				name: error?.name,
				message: error?.message,
				stack: error?.stack,
			});
			return false;
		}
	}, []);

	// Sair de fullscreen
	const exitFullscreen = useCallback(async () => {
		const doc = document as any;

		try {
			if (document.exitFullscreen) {
				await document.exitFullscreen();
			} else if (doc.webkitExitFullscreen) {
				await doc.webkitExitFullscreen();
			} else if (doc.mozCancelFullScreen) {
				await doc.mozCancelFullScreen();
			} else if (doc.msExitFullscreen) {
				await doc.msExitFullscreen();
			}
			return true;
		} catch (error: any) {
			// Ignora erros quando não está em fullscreen (comum e esperado)
			if (error?.name === 'InvalidStateError' || error?.name === 'TypeError') {
				return false; // Não estava em fullscreen, tudo bem
			}
			console.error('Erro ao sair de fullscreen:', error);
			return false;
		}
	}, []);

	// Toggle fullscreen - usa estado atual
	const toggleFullscreen = useCallback(async () => {
		const currentlyFullscreen = checkFullscreen();
		console.log('🔄 Toggle fullscreen - Estado atual:', currentlyFullscreen);
		
		if (currentlyFullscreen) {
			console.log('⬇️ Saindo de fullscreen...');
			const result = await exitFullscreen();
			console.log('✅ Sair de fullscreen:', result ? 'sucesso' : 'falhou ou já estava fora');
		} else {
			console.log('⬆️ Entrando em fullscreen...');
			const result = await enterFullscreen();
			console.log('✅ Entrar em fullscreen:', result ? 'sucesso' : 'falhou');
		}
		// O listener vai atualizar o estado automaticamente
	}, [checkFullscreen, enterFullscreen, exitFullscreen]);

	// Listener para mudanças de fullscreen (todas as APIs)
	useEffect(() => {
		const handleFullscreenChange = () => {
			console.log('📺 Evento fullscreen detectado');
			// Pequeno delay para garantir que o navegador atualizou o estado
			setTimeout(() => {
				const newState = checkFullscreen();
				console.log('📊 Novo estado fullscreen:', newState);
				setIsFullscreen(newState);
			}, 100);
		};

		// Adiciona listeners para todas as APIs
		document.addEventListener('fullscreenchange', handleFullscreenChange);
		document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
		document.addEventListener('mozfullscreenchange', handleFullscreenChange);
		document.addEventListener('MSFullscreenChange', handleFullscreenChange);

		// Verificar estado inicial
		updateFullscreenState();

		// Cleanup
		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreenChange);
			document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
			document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
			document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
		};
	}, [updateFullscreenState]);

	return {
		isFullscreen,
		enterFullscreen,
		exitFullscreen,
		toggleFullscreen,
	};
}
