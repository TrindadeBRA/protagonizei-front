import { useRef, useEffect, useState } from 'react';
import type { PageFlipEventObject, FlipBookRef } from '../types/pageflip';

interface UseAutoFlipOptions {
	maxFlips?: number;
	initialDelay?: number;
	interval?: number;
	enabled?: boolean;
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

	useEffect(() => {
		if (enabled) {
			setAutoFlipActive(true);
			setFlipCount(0);
		} else {
			setAutoFlipActive(false);
			if (timerRef.current) {
				clearTimeout(timerRef.current);
				timerRef.current = null;
			}
		}
	}, [enabled]);

	const stopAutoFlip = () => {
		setAutoFlipActive(false);
		isAutoFlippingRef.current = false;
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	};

	const restartAutoFlip = () => {
		setAutoFlipActive(true);
		setFlipCount(0);
		isAutoFlippingRef.current = false;
	};

	const handleFlip = (e: PageFlipEventObject) => {
	};

	const handleChangeState = (e: PageFlipEventObject) => {
		if (e.data === 'user_fold' || e.data === 'fold_corner') {
			// console.warn('🤚 Usuário interrompeu o auto-flip - navegação manual detectada');
			stopAutoFlip();
		}
	};

	useEffect(() => {
		if (!autoFlipActive || flipCount >= maxFlips || !enabled) {
			return;
		}

		const checkPageFlip = () => {
			return flipBookRef.current?.pageFlip() !== null && flipBookRef.current?.pageFlip() !== undefined;
		};

		const currentDelay = flipCount === 0 ? initialDelay : interval;

		timerRef.current = setTimeout(() => {
			try {
				if (!checkPageFlip()) {
					setTimeout(() => {
						if (checkPageFlip()) {
							isAutoFlippingRef.current = true;
							flipBookRef.current?.pageFlip()?.flipNext();
							setFlipCount(prev => prev + 1);
							setTimeout(() => {
								isAutoFlippingRef.current = false;
							}, 100);
						}
					}, 200);
					return;
				}

				isAutoFlippingRef.current = true;
				flipBookRef.current?.pageFlip()?.flipNext();
				setFlipCount(prev => prev + 1);
				
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
		isComplete: flipCount >= maxFlips,
		remainingFlips: Math.max(0, maxFlips - flipCount)
	};
};
