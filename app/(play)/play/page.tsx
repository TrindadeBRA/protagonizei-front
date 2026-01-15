'use client';

import { useEffect, useState, useCallback, useMemo, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Smartphone } from 'lucide-react';
import { useAutoFlip } from '../../../src/hooks/useAutoFlip';
import { useBookDimensions } from '../../../src/hooks/useBookDimensions';
import { useMinimizeControls } from '../../../src/hooks/useMinimizeControls';
import { useBookSize } from '../../../src/hooks/useBookSize';
import { BookPage, LockedBookPage, BookControls, FlipBookWrapper, NavButton } from '../../../src/components/play';
import {
	BOOK_PAGES,
	PAGE_FLIP_DURATION,
	SWIPE_DISTANCE,
} from '../../../src/components/play/bookConfig';
import customFetch from '../../../src/services/custom-fetch';
import {
	Dialog,
	DialogFooter,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
} from '../../../src/components/ui/dialog';
import { AlertBox } from '../../../src/components/ui/alert-box';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from '../../../src/lib/utils';

// =================================================================
// TIPOS
// =================================================================

interface BookPageData {
	id: string;
	src: string;
	priority: boolean;
}

// =================================================================
// COMPONENTE INTERNO QUE USA SEARCH PARAMS
// =================================================================
function PlayPageContent() {
	// =================================================================
	// HOOKS E ESTADOS
	// =================================================================
	const searchParams = useSearchParams();
	const orderId = searchParams.get('id');

	const { isMinimized, toggleMinimize } = useMinimizeControls();
	const { zoom, zoomIn, zoomOut, config, canZoomIn, canZoomOut } = useBookSize();
	const dimensions = useBookDimensions({
		viewportUsage: config.viewportUsage,
		padding: config.padding,
	});
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [pages, setPages] = useState<BookPageData[]>([]);
	const [isLoading, setIsLoading] = useState(!!orderId); // Inicia carregando se houver orderId
	const [error, setError] = useState<string | null>(null);
	const [showModal, setShowModal] = useState(true); // Modal sempre aparece ao entrar na rota
	const fetchPagesRef = useRef(false); // Ref para evitar requisições duplicadas

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
	 * Carrega as páginas do livro da API quando há orderId
	 * A requisição inicia imediatamente quando a tela abre
	 * Usa ref para evitar requisições duplicadas (React Strict Mode)
	 */
	useEffect(() => {
		if (!orderId) {
			setIsLoading(false);
			// Mantém o modal aberto quando não há orderId (modo demo)
			fetchPagesRef.current = false;
			return;
		}

		// Evita requisições duplicadas
		if (fetchPagesRef.current) {
			return;
		}

		// Marca que a requisição já foi iniciada
		fetchPagesRef.current = true;

		// Abre modal imediatamente
		setShowModal(true);
		setIsLoading(true);
		setError(null);

		const fetchPages = async () => {
			try {
				const data = await customFetch<BookPageData[]>(
					`/orders/${orderId}/pages`
				);

				if (Array.isArray(data) && data.length > 0) {
					setPages(data);
				} else {
					setError('Nenhuma página encontrada para este pedido');
				}
			} catch (err: any) {
				console.error('Erro ao carregar páginas:', err);
				setError(
					err?.message ||
						err?.code === 'order_not_found'
						? 'Pedido não encontrado'
						: err?.code === 'invalid_order_status'
							? 'Pedido não está disponível para visualização'
							: 'Erro ao carregar páginas do livro'
				);
				// Permite tentar novamente em caso de erro
				fetchPagesRef.current = false;
			} finally {
				setIsLoading(false);
			}
		};

		// Inicia requisição imediatamente
		fetchPages();
	}, [orderId]);

	/**
	 * Detecta o número total de páginas do livro
	 * Executa quando as páginas são carregadas ou quando usa BOOK_PAGES
	 */
	useEffect(() => {
		const pagesToCheck = orderId ? pages : BOOK_PAGES;
		if (orderId && pages.length === 0) return;

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
	}, [flipBookRef, pages, orderId]);

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

	/**
	 * Handler para fechar o modal
	 * Permite fechar se não estiver carregando ou se não houver orderId (modo demo)
	 */
	const handleCloseModal = useCallback(() => {
		if (!isLoading) {
			if (!orderId) {
				// Se não tiver orderId, pode fechar imediatamente (é um modelo)
				setShowModal(false);
			} else if (pages.length > 0) {
				// Se tiver orderId, só fecha quando as páginas estiverem carregadas
				setShowModal(false);
			}
		}
	}, [isLoading, pages.length, orderId]);

	// =================================================================
	// RENDERIZAÇÃO DAS PÁGINAS
	// =================================================================

	/**
	 * Gera os componentes de página do livro
	 * Se houver orderId, usa as páginas da API, senão usa BOOK_PAGES
	 */
	const bookPages = useMemo(() => {
		const pagesToUse = orderId ? pages : BOOK_PAGES;

		if (orderId && pages.length === 0) {
			return [];
		}

		const renderedPages = [];

		// Capa (apenas uma vez)
		if (pagesToUse[0]) {
			renderedPages.push(
				<BookPage
					key="cover"
					src={pagesToUse[0].src}
					alt="Capa"
					side="left"
					priority={pagesToUse[0].priority}
				/>
			);
		}

		// Páginas internas (cada imagem aparece 2x: left e right)
		// No modo demo (sem orderId), mostra todas as páginas, mas bloqueia visualmente a partir do índice 6 (após página 5)
		for (let i = 1; i < pagesToUse.length; i++) {
			const page = pagesToUse[i];
			// A partir do índice 6 (depois da página 5), usa páginas bloqueadas no modo demo
			const isLocked = !orderId && i >= 6;
			const PageComponent = isLocked ? LockedBookPage : BookPage;

			renderedPages.push(
				<PageComponent
					key={`${page.id}-left`}
					src={page.src}
					alt={`${page.id} esquerda`}
					side="left"
					priority={isLocked ? false : page.priority}
				/>,
				<PageComponent
					key={`${page.id}-right`}
					src={page.src}
					alt={`${page.id} direita`}
					side="right"
					priority={isLocked ? false : page.priority}
				/>
			);
		}

		// Contracapa (usa a capa novamente)
		if (pagesToUse[0]) {
			renderedPages.push(
				<BookPage
					key="backcover"
					src={pagesToUse[0].src}
					alt="Contracapa"
					side="right"
					priority={false}
				/>
			);
		}

		return renderedPages;
	}, [pages, orderId]);

	// =================================================================
	// RENDERIZAÇÃO
	// =================================================================

	// Estado de erro (mostra mesmo com modal aberto)
	if (orderId && error && !isLoading) {
		return (
			<div className="min-h-screen w-full flex items-center justify-center">
				<div className="text-center max-w-md mx-auto px-4">
					<div className="text-6xl mb-4">📚</div>
					<h1 className="text-2xl font-bold mb-2 text-gray-800">
						Livro não encontrado
					</h1>
					<p className="text-lg text-gray-600">
						{error || 'Nenhuma página disponível para este pedido'}
					</p>
				</div>
			</div>
		);
	}

	return (
		<>
			{/* Modal de Instruções - sempre aparece ao entrar na rota */}
			<Dialog
				open={showModal}
				onOpenChange={() => {
					// Modal não pode ser fechado
				}}
			>
				<DialogPortal>
					<DialogOverlay className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 transition-colors duration-500" />
					<DialogPrimitive.Content
						className={cn(
							"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg sm:max-w-md",
							"bg-white/95 border-gray-200 text-gray-900"
						)}
						onEscapeKeyDown={(e) => {
							e.preventDefault();
						}}
						onPointerDownOutside={(e) => {
							e.preventDefault();
						}}
						onInteractOutside={(e) => {
							e.preventDefault();
						}}
					>
						{/* Logo acima do modal */}
						<div className="flex justify-center">
							<Image
								src="/assets/images/logo black.svg"
								alt="Protagonizei"
								width={200}
								height={80}
								className="object-contain"
								priority
							/>
						</div>


						<div className="w-full px-4">
							<DialogTitle className="text-xl font-bold text-center text-gray-900">
								{orderId ? 'Bem-vindo ao seu livro!' : 'Explore nosso livro modelo!'}
							</DialogTitle>
							<h3 className="text-sm text-center text-gray-600 mt-2">
								{orderId
									? 'Leia as instruções para melhor experiência'
									: 'Conheça como será a experiência do seu livro personalizado'}
							</h3>
						</div>


						<div className="space-y-4 pb-4">
							{/* Recomendação de modo paisagem */}
							<AlertBox>
								<div className="flex items-center gap-3">
									<div className="flex-shrink-0 rounded-full bg-pink-500 p-2 flex items-center justify-center">
										<Smartphone className="size-8 text-white animate-rotate-landscape" />
									</div>
									<div className="flex-1">
										<p className="text-sm font-semibold mb-1 text-black">
											Recomendamos o modo paisagem
										</p>
										<p className="text-xs text-gray-600">
											Para uma melhor visualização, gire seu dispositivo para o modo horizontal (paisagem).
										</p>
									</div>
								</div>
							</AlertBox>

							{/* Instruções de uso */}
							<div className="space-y-2">
								<h4 className="font-semibold text-sm text-gray-900">
									Como usar:
								</h4>
								<ul className="space-y-1.5 text-sm text-gray-600">
									<li className="flex items-start gap-2">
										<span className="text-purple-600">•</span>
										<span>Clique ou arraste nas páginas para virar</span>
									</li>
									<li className="flex items-start gap-2">
										<span className="text-purple-600">•</span>
										<span>Use as setas laterais ou do teclado para navegar</span>
									</li>
									<li className="flex items-start gap-2">
										<span className="text-purple-600">•</span>
										<span>No mobile, deslize para os lados</span>
									</li>
									<li className="flex items-start gap-2">
										<span className="text-purple-600">•</span>
										<span>Use os controles para ajustar zoom</span>
									</li>
								</ul>
							</div>
						</div>

						<DialogFooter>
							<button
								onClick={handleCloseModal}
								disabled={isLoading}
								className={`w-full magical-border border-4 border-transparent text-white font-bold py-3 px-8 rounded-full text-lg shadow-xl transition-all duration-300 font-englebert text-center ${isLoading
									? 'opacity-50 cursor-not-allowed hover:scale-100'
									: 'hover:scale-105 cursor-pointer'
									}`}
							>
								{isLoading ? (
									<span className="flex items-center justify-center gap-2">
										<div className={`h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-white`}></div>
										Carregando...
									</span>
								) : orderId && pages.length > 0 ? (
									'Começar a ler'
								) : !orderId ? (
									'Ver modelo'
								) : (
									'Aguardando...'
								)}
							</button>
						</DialogFooter>
					</DialogPrimitive.Content>
				</DialogPortal>
			</Dialog>

			{/* Conteúdo do livro - mostra quando modal está fechado */}
			{!showModal && (
				<div className="min-h-screen w-full">
					{/* Sistema de Controles de Tamanho */}
					<BookControls
						isMinimized={isMinimized}
						onToggleMinimize={toggleMinimize}
						onZoomIn={zoomIn}
						onZoomOut={zoomOut}
						currentZoom={zoom}
						canZoomIn={canZoomIn}
						canZoomOut={canZoomOut}
						onPrevPage={handlePrevPage}
						onNextPage={handleNextPage}
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
			)}
		</>
	);
}

// =================================================================
// COMPONENTE DE LOADING
// =================================================================
function LoadingScreen() {
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="animate-spin rounded-full h-32 w-32 border-4 border-t-transparent border-purple-500"></div>
		</div>
	);
}

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
 * - Suporte para query parameter ?id=XXX para carregar livro do pedido
 * 
 * @returns Página completa com livro e controles
 */
export default function PlayPage() {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<PlayPageContent />
		</Suspense>
	);
}
