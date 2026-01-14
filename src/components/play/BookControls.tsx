'use client';

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
		handleWheel,
	} = useBookControls({
		minScale: 0.25,
		maxScale: 3,
		initialScale: 0.5,
	});

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
			<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4 bg-purple-500/20 backdrop-blur-md rounded-full px-8 py-5 shadow-2xl border border-purple-300/30">
				{/* Botão zoom out */}
				<button
					onClick={zoomOut}
					className="bg-purple-600/40 hover:bg-purple-500/50 active:bg-purple-700/40 text-white rounded-full p-4 transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md border border-purple-300/40 shadow-lg"
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
					className="bg-purple-600/40 hover:bg-purple-500/50 active:bg-purple-700/40 text-white rounded-full p-4 transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md border border-purple-300/40 shadow-lg"
					disabled={scale >= 3}
					aria-label="Aumentar zoom"
					title="Aumentar zoom (ou Ctrl + Scroll)"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
					</svg>
				</button>
			</div>
		</div>
	);
};
