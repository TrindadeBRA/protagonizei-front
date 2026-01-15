'use client';

import { useBookControls } from '../../hooks/useBookControls';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

interface BookControlsProps {
	children: React.ReactNode;
	isMinimized: boolean;
	onToggleMinimize: () => void;
	onScaleChange?: (scale: number) => void;
}

export const BookControls: React.FC<BookControlsProps> = ({ 
	children, 
	isMinimized, 
	onToggleMinimize,
	onScaleChange 
}) => {
	const {
		scale,
		containerRef,
		zoomIn,
		zoomOut,
		handleWheel,
	} = useBookControls({
		minScale: 0.25,
		maxScale: 3,
		initialScale: 0.5,
	});

	// Estados para pan/drag quando há zoom
	const [isDragging, setIsDragging] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const bookContentRef = useRef<HTMLDivElement>(null);

	// Notificar mudança de scale para o componente pai
	useEffect(() => {
		if (onScaleChange) {
			onScaleChange(scale);
		}
	}, [scale, onScaleChange]);

	// Reset position quando scale volta para <= 1
	useEffect(() => {
		if (scale <= 1) {
			setPosition({ x: 0, y: 0 });
		}
	}, [scale]);

	// Handlers para pan/drag quando há zoom ativo
	const handleMouseDown = useCallback((e: React.MouseEvent) => {
		if (scale > 1) {
			setIsDragging(true);
			setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
			e.preventDefault();
		}
	}, [scale, position]);

	const handleMouseMove = useCallback((e: React.MouseEvent) => {
		if (isDragging && scale > 1) {
			setPosition({
				x: e.clientX - dragStart.x,
				y: e.clientY - dragStart.y,
			});
		}
	}, [isDragging, scale, dragStart]);

	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
	}, []);

	// Touch handlers para mobile
	const handleTouchStart = useCallback((e: React.TouchEvent) => {
		if (scale > 1 && e.touches.length === 1) {
			setIsDragging(true);
			setDragStart({ 
				x: e.touches[0].clientX - position.x, 
				y: e.touches[0].clientY - position.y 
			});
		}
	}, [scale, position]);

	const handleTouchMove = useCallback((e: React.TouchEvent) => {
		if (isDragging && scale > 1 && e.touches.length === 1) {
			setPosition({
				x: e.touches[0].clientX - dragStart.x,
				y: e.touches[0].clientY - dragStart.y,
			});
		}
	}, [isDragging, scale, dragStart]);

	const handleTouchEnd = useCallback(() => {
		setIsDragging(false);
	}, []);

	return (
		<div
			ref={containerRef}
			className="relative w-full h-screen"
			onWheel={handleWheel}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
			style={{ 
				touchAction: scale > 1 ? 'none' : 'pan-x pan-y pinch-zoom',
				overflow: 'hidden',
				cursor: isDragging ? 'grabbing' : 'default',
			}}
		>
			{/* Área do livro com transformações */}
			<div
				ref={bookContentRef}
				onMouseDown={handleMouseDown}
				onTouchStart={handleTouchStart}
				style={{
					transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
					transformOrigin: 'center center',
					transition: isDragging ? 'none' : 'transform 0.1s ease-out',
					pointerEvents: 'auto',
					willChange: 'transform',
					cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
				}}
				className="select-none"
			>
				{children}
			</div>

			{/* Controles de zoom - visível quando não minimizado */}
			{!isMinimized && (
				<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4 bg-purple-500/20 backdrop-blur-md rounded-full px-8 py-5 shadow-2xl border border-purple-300/30 transition-all duration-300">
					{/* Botão zoom out */}
					<button
						onClick={zoomOut}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.5)'; // purple-500/50
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.4)'; // purple-600/40
						}}
						onMouseDown={(e) => {
							e.currentTarget.style.backgroundColor = 'rgba(126, 34, 206, 0.4)'; // purple-700/40
						}}
						onMouseUp={(e) => {
							e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.5)'; // purple-500/50
						}}
						style={{
							backgroundColor: 'rgba(147, 51, 234, 0.4)', // purple-600/40
							backdropFilter: 'blur(12px)',
							borderColor: 'rgba(196, 181, 253, 0.4)', // purple-300/40
						}}
						className="text-white rounded-full p-4 transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border shadow-lg cursor-pointer"
						disabled={scale <= 0.25}
						aria-label="Diminuir zoom"
						title="Diminuir zoom (ou Ctrl + Scroll)"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
						</svg>
					</button>

					{/* Indicador de escala */}
					<div className="px-5 py-2 text-white text-xl font-medium min-w-[80px] text-center bg-purple-600/30 backdrop-blur-md rounded-lg border border-purple-300/40">
						{Math.round(scale * 100)}%
					</div>

					{/* Botão zoom in */}
					<button
						onClick={zoomIn}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.5)'; // purple-500/50
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.4)'; // purple-600/40
						}}
						onMouseDown={(e) => {
							e.currentTarget.style.backgroundColor = 'rgba(126, 34, 206, 0.4)'; // purple-700/40
						}}
						onMouseUp={(e) => {
							e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.5)'; // purple-500/50
						}}
						style={{
							backgroundColor: 'rgba(147, 51, 234, 0.4)', // purple-600/40
							backdropFilter: 'blur(12px)',
							borderColor: 'rgba(196, 181, 253, 0.4)', // purple-300/40
						}}
						className="text-white rounded-full p-4 transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border shadow-lg cursor-pointer"
						disabled={scale >= 3}
						aria-label="Aumentar zoom"
						title="Aumentar zoom (ou Ctrl + Scroll)"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
						</svg>
					</button>

					{/* Separador */}
					<div className="h-8 w-px bg-purple-300/40 mx-2" />

					{/* Botão minimizar */}
					<button
						onClick={onToggleMinimize}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.5)'; // purple-500/50
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.4)'; // purple-600/40
						}}
						onMouseDown={(e) => {
							e.currentTarget.style.backgroundColor = 'rgba(126, 34, 206, 0.4)'; // purple-700/40
						}}
						onMouseUp={(e) => {
							e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.5)'; // purple-500/50
						}}
						style={{
							backgroundColor: 'rgba(147, 51, 234, 0.4)', // purple-600/40
							backdropFilter: 'blur(12px)',
							borderColor: 'rgba(196, 181, 253, 0.4)', // purple-300/40
						}}
						className="text-white rounded-full p-4 transition-all duration-200 hover:scale-110 active:scale-95 border shadow-lg cursor-pointer"
						aria-label="Minimizar controles"
						title="Minimizar controles"
					>
						<ChevronDown className="h-7 w-7" />
					</button>
				</div>
			)}

			{/* Ícone minimizado - aparece quando está minimizado */}
			{isMinimized && (
				<button
					onClick={onToggleMinimize}
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.5)'; // purple-500/50
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.4)'; // purple-600/40
					}}
					onMouseDown={(e) => {
						e.currentTarget.style.backgroundColor = 'rgba(126, 34, 206, 0.4)'; // purple-700/40
					}}
					onMouseUp={(e) => {
						e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.5)'; // purple-500/50
					}}
					style={{
						backgroundColor: 'rgba(147, 51, 234, 0.4)', // purple-600/40
						backdropFilter: 'blur(12px)',
						borderColor: 'rgba(196, 181, 253, 0.4)', // purple-300/40
					}}
					className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 text-white rounded-full p-2 transition-all duration-300 hover:scale-110 active:scale-95 border shadow-lg flex items-center justify-center cursor-pointer"
					aria-label="Restaurar controles"
					title="Restaurar controles"
				>
					<ChevronUp className="h-3.5 w-3.5" />
				</button>
			)}
		</div>
	);
};
