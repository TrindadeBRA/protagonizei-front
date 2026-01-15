'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAutoFlip } from '../../../src/hooks/useAutoFlip';
import { useBookDimensions } from '../../../src/hooks/useBookDimensions';
import { useMinimizeControls } from '../../../src/hooks/useMinimizeControls';
import { BookPage, BookControls, FlipBookWrapper } from '../../../src/components/play';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../../src/lib/utils';

/**
 * Página de visualização interativa do livro
 * Componente refatorado e componentizado para melhor manutenção
 */
export default function PlayPage() {
	// Hooks personalizados
	const dimensions = useBookDimensions();
	const { isMinimized, toggleMinimize } = useMinimizeControls();
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	
	const { flipBookRef, handleFlip, handleChangeState, stopAutoFlip } = useAutoFlip({
		maxFlips: 0,
		initialDelay: 0,
		interval: 0,
		enabled: false,
	});

	// Detectar total de páginas
	useEffect(() => {
		const checkPages = setInterval(() => {
			if (flipBookRef.current?.pageFlip()) {
				const count = flipBookRef.current.pageFlip().getPageCount();
				if (count > 0) {
					setTotalPages(count);
					clearInterval(checkPages);
				}
			}
		}, 100);

		return () => clearInterval(checkPages);
	}, [flipBookRef]);

	// Handler para atualizar página atual após flip
	const handlePageFlip = (e: any) => {
		handleFlip(e);
		setTimeout(() => {
			const newPage = flipBookRef.current?.pageFlip()?.getCurrentPageIndex() || 0;
			setCurrentPage(newPage);
		}, 100);
	};

	// Navegação para página anterior
	const handlePrevPage = () => {
		if (currentPage > 0) {
			stopAutoFlip();
			flipBookRef.current?.pageFlip()?.flipPrev();
		}
	};

	// Navegação para próxima página
	const handleNextPage = () => {
		if (currentPage < totalPages - 1) {
			stopAutoFlip();
			flipBookRef.current?.pageFlip()?.flipNext();
		}
	};

	// Não precisamos mais do currentScale para desabilitar eventos
	// O livro deve sempre responder aos cliques/arrastar

	return (
		<div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
			<BookControls 
				isMinimized={isMinimized} 
				onToggleMinimize={toggleMinimize}
			>
				<div className="flex items-center justify-center h-screen">
					<FlipBookWrapper
						ref={flipBookRef}
						width={dimensions.width}
						height={dimensions.height}
						size="stretch"
						drawShadow={false}
						showCover={true}
						mobileScrollSupport={true}
						flippingTime={800}
						autoSize={true}
						useMouseEvents={true}
						swipeDistance={50}
						clickEventForward={true}
						onFlip={handlePageFlip}
						onChangeState={handleChangeState}
					>
						{/* Capa */}
						<BookPage src="/assets/images/book/cover-1.webp" alt="Capa" side="left" priority />

						{/* IMPORTANTE: Cada imagem contém 2 páginas completas do livro físico */}
						{/* Por isso duplicamos cada imagem para left e right */}
						
						{/* Páginas 1-2 (imagem page1-1.webp contém ambas) */}
						<BookPage src="/assets/images/book/page1-1.webp" alt="Página 1 esquerda" side="left" priority />
						<BookPage src="/assets/images/book/page1-1.webp" alt="Página 1 direita" side="right" priority />

						{/* Páginas 3-4 (imagem page2-1.webp contém ambas) */}
						<BookPage src="/assets/images/book/page2-1.webp" alt="Página 2 esquerda" side="left" priority />
						<BookPage src="/assets/images/book/page2-1.webp" alt="Página 2 direita" side="right" priority />

						{/* Páginas 5-6 (imagem page3-1.webp contém ambas) */}
						<BookPage src="/assets/images/book/page3-1.webp" alt="Página 3 esquerda" side="left" priority />
						<BookPage src="/assets/images/book/page3-1.webp" alt="Página 3 direita" side="right" priority />

						{/* Páginas 7-8 (imagem page4-1.webp contém ambas) */}
						<BookPage src="/assets/images/book/page4-1.webp" alt="Página 4 esquerda" side="left" priority={false} />
						<BookPage src="/assets/images/book/page4-1.webp" alt="Página 4 direita" side="right" priority={false} />

						{/* Páginas 9-10 (imagem page5-1.webp contém ambas) */}
						<BookPage src="/assets/images/book/page5-1.webp" alt="Página 5 esquerda" side="left" priority={false} />
						<BookPage src="/assets/images/book/page5-1.webp" alt="Página 5 direita" side="right" priority={false} />

						{/* Páginas 11-12 (imagem page6-1.webp contém ambas) */}
						<BookPage src="/assets/images/book/page6-1.webp" alt="Página 6 esquerda" side="left" priority={false} />
						<BookPage src="/assets/images/book/page6-1.webp" alt="Página 6 direita" side="right" priority={false} />

						{/* Contracapa */}
						<BookPage src="/assets/images/book/cover-1.webp" alt="Contracapa" side="right" priority={false} />
					</FlipBookWrapper>
				</div>
			</BookControls>

			{/* Setas de navegação - fora do BookControls para não serem afetadas pelo zoom */}
			{/* Sempre visíveis, mas com opacidade reduzida quando minimizado */}
			{/* Seta esquerda - Página anterior */}
			<button
				onClick={handlePrevPage}
				disabled={currentPage === 0}
				onMouseEnter={(e) => {
					e.currentTarget.style.backgroundColor = isMinimized 
						? 'rgba(168, 85, 247, 0.25)' // purple-500/25 quando minimizado
						: 'rgba(168, 85, 247, 0.5)'; // purple-500/50 quando expandido
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.backgroundColor = isMinimized 
						? 'rgba(147, 51, 234, 0.15)' // purple-600/15 quando minimizado
						: 'rgba(147, 51, 234, 0.4)'; // purple-600/40 quando expandido
				}}
				onMouseDown={(e) => {
					e.currentTarget.style.backgroundColor = isMinimized 
						? 'rgba(126, 34, 206, 0.2)' // purple-700/20 quando minimizado
						: 'rgba(126, 34, 206, 0.4)'; // purple-700/40 quando expandido
				}}
				onMouseUp={(e) => {
					e.currentTarget.style.backgroundColor = isMinimized 
						? 'rgba(168, 85, 247, 0.25)' // purple-500/25 quando minimizado
						: 'rgba(168, 85, 247, 0.5)'; // purple-500/50 quando expandido
				}}
				style={{
					backgroundColor: isMinimized 
						? 'rgba(147, 51, 234, 0.15)' // purple-600/15 quando minimizado
						: 'rgba(147, 51, 234, 0.4)', // purple-600/40 quando expandido
					backdropFilter: 'blur(12px)',
					borderColor: isMinimized 
						? 'rgba(196, 181, 253, 0.2)' // purple-300/20 quando minimizado
						: 'rgba(196, 181, 253, 0.4)', // purple-300/40 quando expandido
					transition: 'all 0.3s ease',
				}}
				className="fixed left-[10%] top-1/2 -translate-y-1/2 z-50 text-white rounded-full p-4 transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border shadow-lg flex items-center justify-center cursor-pointer"
				aria-label="Página anterior"
			>
				<ChevronLeft className="h-7 w-7" />
			</button>

			{/* Seta direita - Próxima página */}
			<button
				onClick={handleNextPage}
				disabled={currentPage >= totalPages - 1}
				onMouseEnter={(e) => {
					e.currentTarget.style.backgroundColor = isMinimized 
						? 'rgba(168, 85, 247, 0.25)' // purple-500/25 quando minimizado
						: 'rgba(168, 85, 247, 0.5)'; // purple-500/50 quando expandido
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.backgroundColor = isMinimized 
						? 'rgba(147, 51, 234, 0.15)' // purple-600/15 quando minimizado
						: 'rgba(147, 51, 234, 0.4)'; // purple-600/40 quando expandido
				}}
				onMouseDown={(e) => {
					e.currentTarget.style.backgroundColor = isMinimized 
						? 'rgba(126, 34, 206, 0.2)' // purple-700/20 quando minimizado
						: 'rgba(126, 34, 206, 0.4)'; // purple-700/40 quando expandido
				}}
				onMouseUp={(e) => {
					e.currentTarget.style.backgroundColor = isMinimized 
						? 'rgba(168, 85, 247, 0.25)' // purple-500/25 quando minimizado
						: 'rgba(168, 85, 247, 0.5)'; // purple-500/50 quando expandido
				}}
				style={{
					backgroundColor: isMinimized 
						? 'rgba(147, 51, 234, 0.15)' // purple-600/15 quando minimizado
						: 'rgba(147, 51, 234, 0.4)', // purple-600/40 quando expandido
					backdropFilter: 'blur(12px)',
					borderColor: isMinimized 
						? 'rgba(196, 181, 253, 0.2)' // purple-300/20 quando minimizado
						: 'rgba(196, 181, 253, 0.4)', // purple-300/40 quando expandido
					transition: 'all 0.3s ease',
				}}
				className="fixed right-[10%] top-1/2 -translate-y-1/2 z-50 text-white rounded-full p-4 transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border shadow-lg flex items-center justify-center cursor-pointer"
				aria-label="Próxima página"
			>
				<ChevronRight className="h-7 w-7" />
			</button>
		</div>
	);
}

