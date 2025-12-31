'use client';

import dynamic from 'next/dynamic';
import React, { forwardRef, useEffect, useState } from 'react';
import { useAutoFlip } from '../../hooks/useAutoFlip';
import { useInView } from '../../hooks/useInView';
import type { FlipBookProps, FlipBookRef } from '../../types/pageflip';
import Link from 'next/link';
import { Lock, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const FlipBook = dynamic(
	() => import('react-pageflip').then((m) => m.default),
	{ ssr: true }
) as React.ComponentType<any>;

interface TypedFlipBookProps extends Partial<FlipBookProps> {
	width: number;
	height: number;
	children: React.ReactNode;
}

const TypedFlipBook = React.forwardRef<FlipBookRef, TypedFlipBookProps>((props, ref) => {
	return <FlipBook ref={ref} {...props} />;
});
TypedFlipBook.displayName = 'TypedFlipBook';

// Constantes para classes reutilizáveis
const PAGE_CLASSES = {
	left: "w-full h-full object-cover object-left select-none",
	right: "w-full h-full object-cover object-right select-none",
	locked: "cursor-pointer blur-xs",
};

const LOCK_OVERLAY_CLASSES = "absolute inset-0 bg-black/50 flex items-center justify-center flex-col gap-2 p-6 text-center";
const LOCK_ICON_CLASSES = "magical-border border-4 border-transparent text-white font-bold w-16 h-16 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300 font-englebert flex items-center justify-center";

// Componente para páginas normais
const BookPage = forwardRef<HTMLDivElement, { src: string; alt: string; side: 'left' | 'right' }>(
	({ src, alt, side }, ref) => (
		<div ref={ref} className="w-full h-full bg-white rounded-xl shadow-md overflow-hidden">
			<img
				src={src}
				alt={alt}
				className={side === 'left' ? PAGE_CLASSES.left : PAGE_CLASSES.right}
				draggable={false}
				loading="lazy"
			/>
		</div>
	)
);
BookPage.displayName = 'BookPage';

// Componente para páginas bloqueadas
const LockedBookPage = forwardRef<HTMLDivElement, { src: string; alt: string; side: 'left' | 'right' }>(
	({ src, alt, side }, ref) => (
		<div ref={ref} className="w-full h-full bg-white rounded-xl shadow-md overflow-hidden">
			<Link href="/#criar-historia">
				<img
					src={src}
					alt={alt}
					className={cn(
						side === 'left' ? PAGE_CLASSES.left : PAGE_CLASSES.right,
						PAGE_CLASSES.locked
					)}
					draggable={false}
					loading="lazy"
				/>
				<div className={LOCK_OVERLAY_CLASSES}>
					<div className={LOCK_ICON_CLASSES}>
						<Lock className="size-8 text-white" />
					</div>
				</div>
			</Link>
		</div>
	)
);
LockedBookPage.displayName = 'LockedBookPage';

type Book3DExampleProps = {
	className?: string;
	coverImage?: string;
	page1Left?: string;
	page1Right?: string;
	page2Left?: string;
	page2Right?: string;
	page3Left?: string;
	page3Right?: string;
	page4Left?: string;
	page4Right?: string;
	arrowColor?: 'blue' | 'pink';
};

export default function Book3DExample({ 
	className,
	coverImage = "/assets/images/book/cover-1.webp",
	page1Left = "/assets/images/book/page1-1.webp",
	page1Right = "/assets/images/book/page1-1.webp",
	page2Left = "/assets/images/book/page2-1.webp",
	page2Right = "/assets/images/book/page2-1.webp",
	page3Left = "/assets/images/book/page3-1.webp",
	page3Right = "/assets/images/book/page3-1.webp",
	page4Left = "/assets/images/book/page4-1.webp",
	page4Right = "/assets/images/book/page4-1.webp",
	arrowColor = 'pink',
}: Book3DExampleProps) {
	const { ref, isInView } = useInView({
		threshold: 0.1,
		rootMargin: '100px',
		triggerOnce: true, // Só anima uma vez quando ficar visível
	});

	const [currentPage, setCurrentPage] = useState(0);
	// No react-pageflip: Capa (índice 0) + cada par de páginas (left+right) = 1 índice
	// Temos: Capa (0) + Página 1 (1) + Página 2 (2) + Página 3 (3) + Página 4 (4) = 5 páginas
	// Mas o getPageCount() retorna o número correto, então vamos usar dinamicamente
	const [totalPages, setTotalPages] = useState(5);
	
	const isBlue = arrowColor === 'blue';

	// Atualiza o total de páginas quando o livro for inicializado
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
	}, []);

	const {
		flipBookRef,
		handleFlip,
		handleChangeState,
		stopAutoFlip,
	} = useAutoFlip({
		maxFlips: 1, // Apenas a primeira página (capa -> primeira página)
		initialDelay: 1500, // Aumentei o delay para dar tempo do livro estar pronto
		interval: 2500,
		enabled: isInView // Só habilita quando estiver visível
	});

	// Atualiza a página atual quando o livro vira
	const handlePageFlip = (e: any) => {
		handleFlip(e);
		// Usa um pequeno delay para garantir que o flip foi completado
		setTimeout(() => {
			const newPage = flipBookRef.current?.pageFlip()?.getCurrentPageIndex() || 0;
			setCurrentPage(newPage);
		}, 100);
	};

	// Função para ir para a página anterior
	const handlePrevPage = () => {
		if (currentPage > 0) {
			stopAutoFlip();
			flipBookRef.current?.pageFlip()?.flipPrev();
		}
	};

	// Função para ir para a próxima página
	const handleNextPage = () => {
		if (currentPage < totalPages - 1) {
			stopAutoFlip();
			flipBookRef.current?.pageFlip()?.flipNext();
		}
	};

	// Debug temporário - remover depois
	useEffect(() => {
		if (isInView) {
			console.log('📖 Book3DExample está visível, iniciando animação...');
		}
	}, [isInView]);

	return (
		<div ref={ref} className={cn("min-h-[200px] md:min-h-[50px] flex items-center justify-center relative w-full", className)}>
			{/* Seta anterior */}
			<button
				onClick={handlePrevPage}
				disabled={currentPage === 0}
				className={cn(
					"absolute left-0 md:left-[-48px] top-1/2 -translate-y-1/2 z-20",
					"w-10 h-10 md:w-12 md:h-12 rounded-full",
					"bg-white/90 backdrop-blur-sm border-2 flex items-center justify-center",
					"cursor-pointer hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg",
					"disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100",
					isBlue 
						? "border-blue-main/30 text-blue-main hover:text-blue-600 hover:border-blue-main"
						: "border-pink-main/30 text-pink-main hover:text-pink-600 hover:border-pink-main"
				)}
				aria-label="Página anterior"
			>
				<ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
			</button>

			<TypedFlipBook
				ref={flipBookRef}
				width={538}
				height={600}
				size="stretch"
				drawShadow={false}
				showCover={true}
				mobileScrollSupport={true}
				flippingTime={2000}
				autoSize={true}
				onFlip={handlePageFlip}
				onChangeState={handleChangeState}
				className="scale-75 md:scale-100"
			>
				{/* Capa */}
				<BookPage src={coverImage} alt="Capa" side="left" />

				{/* Primeira página (esquerda e direita) */}
				<BookPage src={page1Left} alt="Página 1 esquerda" side="left" />
				<BookPage src={page1Right} alt="Página 1 direita" side="right" />
				
				{/* Segunda página (esquerda e direita) */}
				<BookPage src={page2Left} alt="Página 2 esquerda" side="left" />
				<BookPage src={page2Right} alt="Página 2 direita" side="right" />
				
				{/* Terceira página (esquerda e direita) */}
				<BookPage src={page3Left} alt="Página 3 esquerda" side="left" />
				<BookPage src={page3Right} alt="Página 3 direita" side="right" />
				
				{/* Quarta página bloqueada (esquerda e direita) */}
				<LockedBookPage src={page4Left} alt="Página 4 esquerda" side="left" />
				<LockedBookPage src={page4Right} alt="Página 4 direita" side="right" />
			</TypedFlipBook>

			{/* Seta próxima */}
			<button
				onClick={handleNextPage}
				disabled={currentPage >= totalPages - 1}
				className={cn(
					"absolute right-0 md:right-[-48px] top-1/2 -translate-y-1/2 z-20",
					"w-10 h-10 md:w-12 md:h-12 rounded-full",
					"bg-white/90 backdrop-blur-sm border-2 flex items-center justify-center",
					"cursor-pointer hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg",
					"disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100",
					isBlue 
						? "border-blue-main/30 text-blue-main hover:text-blue-600 hover:border-blue-main"
						: "border-pink-main/30 text-pink-main hover:text-pink-600 hover:border-pink-main"
				)}
				aria-label="Próxima página"
			>
				<ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
			</button>
		</div>
	);
}

