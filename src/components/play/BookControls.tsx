'use client';

import { useBookControls } from '../../hooks/useBookControls';

interface BookControlsProps {
	children: React.ReactNode;
}

export const BookControls: React.FC<BookControlsProps> = ({ children }) => {
	const {
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
	} = useBookControls({
		minScale: 0.25,
		maxScale: 3,
		initialScale: 1,
	});

	return (
		<div
			ref={containerRef}
			className="relative w-full h-screen overflow-hidden"
			onWheel={handleWheel}
		>
			{/* Área do livro com transformações */}
			<div
				style={{
					transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
					transformOrigin: 'center center',
					cursor: isDragging ? 'grabbing' : 'grab',
					transition: (isDragging || isPinching) ? 'none' : 'transform 0.1s ease-out',
				}}
				onMouseDown={handleMouseDown}
				onTouchStart={handleTouchStart}
				className="touch-none select-none"
			>
				{children}
			</div>

			{/* Controles de zoom */}
			<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 bg-purple-900/90 backdrop-blur-sm rounded-full px-4 py-3 shadow-2xl">
				{/* Botão zoom out */}
				<button
					onClick={zoomOut}
					className="bg-purple-700 hover:bg-purple-600 active:bg-purple-800 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={scale <= 0.25}
					aria-label="Diminuir zoom"
					title="Diminuir zoom (ou Ctrl + Scroll)"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
					</svg>
				</button>

				{/* Indicador de escala */}
				<div className="px-3 py-1 text-white text-sm font-medium min-w-[60px] text-center">
					{Math.round(scale * 100)}%
				</div>

				{/* Botão zoom in */}
				<button
					onClick={zoomIn}
					className="bg-purple-700 hover:bg-purple-600 active:bg-purple-800 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
					disabled={scale >= 3}
					aria-label="Aumentar zoom"
					title="Aumentar zoom (ou Ctrl + Scroll)"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
					</svg>
				</button>

				{/* Separador */}
				<div className="w-px h-6 bg-purple-600 mx-1" />

				{/* Botão reset */}
				<button
					onClick={reset}
					className="bg-purple-700 hover:bg-purple-600 active:bg-purple-800 text-white rounded-full p-2 transition-all duration-200 hover:scale-110 active:scale-95"
					aria-label="Resetar zoom e posição"
					title="Resetar zoom e posição"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
					</svg>
				</button>
			</div>

			{/* Dica flutuante */}
			<div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 bg-purple-900/80 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full shadow-lg">
				💡 Arraste para mover • Pinça para zoom • Ctrl + Scroll (desktop)
			</div>
		</div>
	);
};
