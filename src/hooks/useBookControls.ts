'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface BookPosition {
	x: number;
	y: number;
}

interface UseBookControlsOptions {
	minScale?: number;
	maxScale?: number;
	initialScale?: number;
}

export const useBookControls = (options: UseBookControlsOptions = {}) => {
	const {
		minScale = 0.5,
		maxScale = 3,
		initialScale = 1,
	} = options;

	const [scale, setScale] = useState(initialScale);
	const [position, setPosition] = useState<BookPosition>({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState<BookPosition>({ x: 0, y: 0 });
	const [dragStartPosition, setDragStartPosition] = useState<BookPosition>({ x: 0, y: 0 });

	// Estados para pinch-to-zoom
	const [isPinching, setIsPinching] = useState(false);
	const [pinchStartDistance, setPinchStartDistance] = useState(0);
	const [pinchStartScale, setPinchStartScale] = useState(initialScale);
	const [pinchStartCenter, setPinchStartCenter] = useState<BookPosition>({ x: 0, y: 0 });
	const [pinchStartPosition, setPinchStartPosition] = useState<BookPosition>({ x: 0, y: 0 });

	const containerRef = useRef<HTMLDivElement>(null);

	// Zoom in
	const zoomIn = useCallback(() => {
		setScale((prev) => Math.min(prev + 0.25, maxScale));
	}, [maxScale]);

	// Zoom out
	const zoomOut = useCallback(() => {
		setScale((prev) => Math.max(prev - 0.25, minScale));
	}, [minScale]);

	// Reset zoom e posição
	const reset = useCallback(() => {
		setScale(initialScale);
		setPosition({ x: 0, y: 0 });
	}, [initialScale]);

	// Handlers para mouse
	const handleMouseDown = useCallback((e: React.MouseEvent) => {
		if (e.button !== 0) return; // Apenas botão esquerdo
		setIsDragging(true);
		setDragStart({ x: e.clientX, y: e.clientY });
		setDragStartPosition(position);
		e.preventDefault();
	}, [position]);

	const handleMouseMove = useCallback((e: MouseEvent) => {
		if (!isDragging) return;
		const deltaX = e.clientX - dragStart.x;
		const deltaY = e.clientY - dragStart.y;
		setPosition({
			x: dragStartPosition.x + deltaX,
			y: dragStartPosition.y + deltaY,
		});
	}, [isDragging, dragStart, dragStartPosition]);

	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
	}, []);

	// Função auxiliar para calcular distância entre dois pontos
	const getDistance = (touch1: Touch, touch2: Touch): number => {
		const dx = touch2.clientX - touch1.clientX;
		const dy = touch2.clientY - touch1.clientY;
		return Math.sqrt(dx * dx + dy * dy);
	};

	// Função auxiliar para calcular o centro entre dois pontos
	const getCenter = (touch1: Touch, touch2: Touch): BookPosition => {
		return {
			x: (touch1.clientX + touch2.clientX) / 2,
			y: (touch1.clientY + touch2.clientY) / 2,
		};
	};

	// Handlers para touch
	const handleTouchStart = useCallback((e: React.TouchEvent) => {
		if (e.touches.length === 2) {
			// Pinch-to-zoom: dois dedos
			const touch1 = e.touches[0];
			const touch2 = e.touches[1];
			const distance = getDistance(touch1, touch2);
			const center = getCenter(touch1, touch2);

			setIsPinching(true);
			setIsDragging(false);
			setPinchStartDistance(distance);
			setPinchStartScale(scale);
			setPinchStartCenter(center);
			setPinchStartPosition(position);

			e.preventDefault();
		} else if (e.touches.length === 1) {
			// Arrastar: um dedo
			const touch = e.touches[0];
			setIsDragging(true);
			setIsPinching(false);
			setDragStart({ x: touch.clientX, y: touch.clientY });
			setDragStartPosition(position);
			e.preventDefault();
		}
	}, [position, scale]);

	const handleTouchMove = useCallback((e: TouchEvent) => {
		if (e.touches.length === 2) {
			// Pinch-to-zoom
			const touch1 = e.touches[0];
			const touch2 = e.touches[1];
			const distance = getDistance(touch1, touch2);
			const center = getCenter(touch1, touch2);

			// Calcular novo scale baseado na razão de distâncias
			const scaleRatio = distance / pinchStartDistance;
			const newScale = Math.max(minScale, Math.min(maxScale, pinchStartScale * scaleRatio));
			setScale(newScale);

			// Ajustar posição para manter o centro do pinch fixo
			const container = containerRef.current;
			if (container) {
				const containerRect = container.getBoundingClientRect();
				
				// Calcular a posição do centro inicial do pinch relativo ao container
				const startCenterX = pinchStartCenter.x - containerRect.left;
				const startCenterY = pinchStartCenter.y - containerRect.top;
				
				// Calcular a posição do centro atual relativo ao container
				const currentCenterX = center.x - containerRect.left;
				const currentCenterY = center.y - containerRect.top;

				// Calcular quanto o centro se moveu desde o início do pinch
				const deltaX = center.x - pinchStartCenter.x;
				const deltaY = center.y - pinchStartCenter.y;

				// Ajustar posição considerando o zoom
				// Quando o zoom aumenta, o conteúdo cresce a partir do centro, então precisamos compensar
				const scaleChange = newScale / pinchStartScale;
				const offsetX = (startCenterX - containerRect.width / 2) * (1 - scaleChange);
				const offsetY = (startCenterY - containerRect.height / 2) * (1 - scaleChange);

				setPosition({
					x: pinchStartPosition.x + deltaX + offsetX,
					y: pinchStartPosition.y + deltaY + offsetY,
				});
			}

			e.preventDefault();
		} else if (e.touches.length === 1) {
			// Arrastar
			const touch = e.touches[0];
			const deltaX = touch.clientX - dragStart.x;
			const deltaY = touch.clientY - dragStart.y;
			setPosition({
				x: dragStartPosition.x + deltaX,
				y: dragStartPosition.y + deltaY,
			});
			e.preventDefault();
		}
	}, [dragStart, dragStartPosition, pinchStartDistance, pinchStartScale, pinchStartCenter, pinchStartPosition, minScale, maxScale]);

	const handleTouchEnd = useCallback((e: TouchEvent) => {
		if (e.touches.length === 0) {
			// Todos os dedos saíram
			setIsDragging(false);
			setIsPinching(false);
		} else if (e.touches.length === 1) {
			// Um dedo ainda na tela - mudar para modo arrastar
			const touch = e.touches[0];
			setIsPinching(false);
			setIsDragging(true);
			setDragStart({ x: touch.clientX, y: touch.clientY });
			setDragStartPosition(position);
		}
	}, [position]);

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

	// Event listeners globais para mouse
	useEffect(() => {
		if (isDragging) {
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', handleMouseUp);
			return () => {
				window.removeEventListener('mousemove', handleMouseMove);
				window.removeEventListener('mouseup', handleMouseUp);
			};
		}
	}, [isDragging, handleMouseMove, handleMouseUp]);

	// Event listeners globais para touch
	useEffect(() => {
		if (isDragging || isPinching) {
			window.addEventListener('touchmove', handleTouchMove, { passive: false });
			window.addEventListener('touchend', handleTouchEnd);
			return () => {
				window.removeEventListener('touchmove', handleTouchMove);
				window.removeEventListener('touchend', handleTouchEnd);
			};
		}
	}, [isDragging, isPinching, handleTouchMove, handleTouchEnd]);

	return {
		scale,
		position,
		isDragging,
		isPinching,
		containerRef,
		zoomIn,
		zoomOut,
		reset,
		handleMouseDown,
		handleTouchStart,
		handleWheel,
	};
};

