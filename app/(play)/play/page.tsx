'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAutoFlip } from '../../../src/hooks/useAutoFlip';
import { useBookDimensions } from '../../../src/hooks/useBookDimensions';
import { useMinimizeControls } from '../../../src/hooks/useMinimizeControls';
import { useBookSize } from '../../../src/hooks/useBookSize';
import { BookPage, BookControls, FlipBookWrapper, NavButton } from '../../../src/components/play';
import {
	BOOK_PAGES,
	PAGE_FLIP_DURATION,
	SWIPE_DISTANCE,
} from '../../../src/components/play/bookConfig';

// =================================================================
// PÁGINA PRINCIPAL DO LIVRO DIGITAL
// =================================================================
/**
 * Página de visualização interativa do livro
 * 
 * Funcionalidades:
 * - Navegação por clique/arrastar nas páginas
 * - Navegação por setas laterais
 * - Swipe no mobile
 * - Zoom com Ctrl+Scroll ou botões
 * - Menu de controles minimizável
 * 
 * @returns Página completa com livro e controles
 */
export default function PlayPage() {
	// =================================================================
	// HOOKS E ESTADOS
	// =================================================================
	const { isMinimized, toggleMinimize } = useMinimizeControls();
	const { zoom, zoomIn, zoomOut, config, canZoomIn, canZoomOut } = useBookSize();
	const dimensions = useBookDimensions({
		viewportUsage: config.viewportUsage,
		padding: config.padding,
	});
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	
	const { flipBookRef, handleFlip, handleChangeState, stopAutoFlip } = useAutoFlip({
		maxFlips: 0,
		initialDelay: 0,
		interval: 0,
		enabled: false,
	});

	// =================================================================
	// EFEITOS
	// =================================================================
	
	/**
	 * Detecta o número total de páginas do livro
	 * Executa uma vez quando o componente monta
	 */
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

	// =================================================================
	// HANDLERS
	// =================================================================
	
	/**
	 * Handler para atualizar página atual após flip
	 * Usa setTimeout para garantir que a animação complete
	 */
	const handlePageFlip = useCallback((e: any) => {
		handleFlip(e);
		setTimeout(() => {
			const newPage = flipBookRef.current?.pageFlip()?.getCurrentPageIndex() || 0;
			setCurrentPage(newPage);
		}, 100);
	}, [handleFlip, flipBookRef]);

	/**
	 * Navega para a página anterior
	 */
	const handlePrevPage = useCallback(() => {
		if (currentPage > 0) {
			stopAutoFlip();
			flipBookRef.current?.pageFlip()?.flipPrev();
		}
	}, [currentPage, stopAutoFlip, flipBookRef]);

	/**
	 * Navega para a próxima página
	 */
	const handleNextPage = useCallback(() => {
		if (currentPage < totalPages - 1) {
			stopAutoFlip();
			flipBookRef.current?.pageFlip()?.flipNext();
		}
	}, [currentPage, totalPages, stopAutoFlip, flipBookRef]);

	// =================================================================
	// RENDERIZAÇÃO DAS PÁGINAS
	// =================================================================
	
	/**
	 * Gera os componentes de página do livro baseado na configuração
	 * Cada imagem é duplicada (left/right) pois contém 2 páginas
	 */
	const bookPages = useMemo(() => {
		const pages = [];
		
		// Capa (apenas uma vez)
		pages.push(
			<BookPage
				key="cover"
				src={BOOK_PAGES[0].src}
				alt="Capa"
				side="left"
				priority={BOOK_PAGES[0].priority}
			/>
		);

		// Páginas internas (cada imagem aparece 2x: left e right)
		for (let i = 1; i < BOOK_PAGES.length; i++) {
			const page = BOOK_PAGES[i];
			pages.push(
				<BookPage
					key={`${page.id}-left`}
					src={page.src}
					alt={`${page.id} esquerda`}
					side="left"
					priority={page.priority}
				/>,
				<BookPage
					key={`${page.id}-right`}
					src={page.src}
					alt={`${page.id} direita`}
					side="right"
					priority={page.priority}
				/>
			);
		}

		// Contracapa
		pages.push(
			<BookPage
				key="backcover"
				src={BOOK_PAGES[0].src}
				alt="Contracapa"
				side="right"
				priority={false}
			/>
		);

		return pages;
	}, []);

	// =================================================================
	// RENDERIZAÇÃO
	// =================================================================
	
	return (
		<div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
			{/* Sistema de Controles de Tamanho */}
			<BookControls 
				isMinimized={isMinimized} 
				onToggleMinimize={toggleMinimize}
				onZoomIn={zoomIn}
				onZoomOut={zoomOut}
				currentZoom={zoom}
				canZoomIn={canZoomIn}
				canZoomOut={canZoomOut}
			>
				<FlipBookWrapper
					key={`flipbook-${zoom}-${dimensions.width}-${dimensions.height}`}
					ref={flipBookRef}
					width={dimensions.width}
					height={dimensions.height}
					size="fixed"
					minWidth={dimensions.width}
					maxWidth={dimensions.width}
					minHeight={dimensions.height}
					maxHeight={dimensions.height}
					drawShadow={false}
					showCover={true}
					usePortrait={false}
					mobileScrollSupport={true}
					flippingTime={PAGE_FLIP_DURATION}
					autoSize={false}
					useMouseEvents={true}
					swipeDistance={SWIPE_DISTANCE}
					clickEventForward={true}
					onFlip={handlePageFlip}
					onChangeState={handleChangeState}
				>
					{bookPages}
				</FlipBookWrapper>
			</BookControls>

			{/* Botões de Navegação Lateral */}
			<NavButton
				onClick={handlePrevPage}
				disabled={currentPage === 0}
				icon={ChevronLeft}
				label="Página anterior"
				position="left"
				isMinimized={isMinimized}
			/>

			<NavButton
				onClick={handleNextPage}
				disabled={currentPage >= totalPages - 1}
				icon={ChevronRight}
				label="Próxima página"
				position="right"
				isMinimized={isMinimized}
			/>
		</div>
	);
}
