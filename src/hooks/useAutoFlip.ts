import { useRef, useEffect, useState } from 'react';
import type { PageFlipEventObject, FlipBookRef } from '../types/pageflip';

interface UseAutoFlipOptions {
	maxFlips?: number; // Número máximo de flips automáticos (default: 3)
	initialDelay?: number; // Delay antes do primeiro flip em ms (default: 2000)
	interval?: number; // Intervalo entre flips subsequentes em ms (default: 1500)
	enabled?: boolean; // Se o auto-flip está habilitado (default: true)
}

export const useAutoFlip = (options: UseAutoFlipOptions = {}) => {
	const {
		maxFlips = 3,
		initialDelay = 2000,
		interval = 1500,
		enabled = true
	} = options;

	const flipBookRef = useRef<FlipBookRef>(null);
	const [autoFlipActive, setAutoFlipActive] = useState(enabled);
	const [flipCount, setFlipCount] = useState(0);
	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const isAutoFlippingRef = useRef<boolean>(false);

	// Função para parar o auto-flip quando há interação manual
	const stopAutoFlip = () => {
		setAutoFlipActive(false);
		isAutoFlippingRef.current = false;
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	};

	// Função para reiniciar o auto-flip
	const restartAutoFlip = () => {
		setAutoFlipActive(true);
		setFlipCount(0);
		isAutoFlippingRef.current = false;
	};

	// Event handlers para detectar interação manual
	const handleFlip = (e: PageFlipEventObject) => {
		// Event handler sem logs - apenas para compatibilidade
	};

	const handleChangeState = (e: PageFlipEventObject) => {
		// Para o auto-flip se detectar interação manual (arrastar, clicar, etc.)
		if (e.data === 'user_fold' || e.data === 'fold_corner') {
			console.log('🤚 Usuário interrompeu o auto-flip - navegação manual detectada');
			stopAutoFlip();
		}
	};

	// Effect principal do auto-flip
	useEffect(() => {
		if (!autoFlipActive || flipCount >= maxFlips || !enabled) {
			return;
		}

		// Usa initialDelay para o primeiro flip, interval para os subsequentes
		const currentDelay = flipCount === 0 ? initialDelay : interval;

		timerRef.current = setTimeout(() => {
			try {
				// Marca que está fazendo um flip automático
				isAutoFlippingRef.current = true;
				flipBookRef.current?.pageFlip()?.flipNext();
				setFlipCount(prev => prev + 1);
				
				// Reset após um pequeno delay para permitir que o evento seja processado
				setTimeout(() => {
					isAutoFlippingRef.current = false;
				}, 100);
			} catch (error) {
				isAutoFlippingRef.current = false;
				stopAutoFlip();
			}
		}, currentDelay);

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [autoFlipActive, flipCount, maxFlips, initialDelay, interval, enabled]);

	// Cleanup ao desmontar
	useEffect(() => {
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, []);

	return {
		flipBookRef,
		autoFlipActive,
		flipCount,
		stopAutoFlip,
		restartAutoFlip,
		handleFlip,
		handleChangeState,
		// Estados para debug/controle
		isComplete: flipCount >= maxFlips,
		remainingFlips: Math.max(0, maxFlips - flipCount)
	};
};
