'use client';

import dynamic from 'next/dynamic';
import React, { forwardRef, useRef, useEffect } from 'react';

// Tipos para os eventos do PageFlip
interface PageFlipEventObject {
	data: number | string;
	object: any; // PageFlip object
}

interface PageFlipInitEvent {
	page: number;
	mode: 'portrait' | 'landscape';
}

// Tipos para métodos do PageFlip (para uso com ref)
interface PageRect {
	width: number;
	height: number;
	left: number;
	top: number;
}

interface PageFlipMethods {
	getPageCount(): number;
	getCurrentPageIndex(): number;
	getOrientation(): 'portrait' | 'landscape';
	getBoundsRect(): PageRect;
	turnToPage(pageNum: number): void;
	turnToNextPage(): void;
	turnToPrevPage(): void;
	flipNext(corner?: 'top' | 'bottom'): void;
	flipPrev(corner?: 'top' | 'bottom'): void;
	flip(pageNum: number, corner?: 'top' | 'bottom'): void;
	loadFromImages(images: string[]): void;
	loadFromHtml(items: NodeListOf<Element> | HTMLElement[]): void;
	updateFromHtml(items: NodeListOf<Element> | HTMLElement[]): void;
	updateFromImages(images: string[]): void;
	destroy(): void;
}

// Interface para o ref do FlipBook
interface FlipBookRef {
	pageFlip(): PageFlipMethods;
}

// Interface oficial baseada na documentação do react-pageflip
interface FlipBookProps {
	// Props obrigatórias
	width: number;
	height: number;
	
	// Props opcionais com seus valores padrão conforme documentação
	size?: 'fixed' | 'stretch'; // default: "fixed"
	minWidth?: number; // Para usar com size: "stretch"
	maxWidth?: number; // Para usar com size: "stretch"
	minHeight?: number; // Para usar com size: "stretch"
	maxHeight?: number; // Para usar com size: "stretch"
	drawShadow?: boolean; // default: true
	flippingTime?: number; // default: 1000 (milliseconds)
	usePortrait?: boolean; // default: true
	startZIndex?: number; // default: 0
	autoSize?: boolean; // default: true
	maxShadowOpacity?: number; // default: 1 [0..1]
	showCover?: boolean; // default: false
	mobileScrollSupport?: boolean; // default: true
	swipeDistance?: number; // default: 30 (px)
	clickEventForward?: boolean; // default: true
	useMouseEvents?: boolean; // default: true
	renderOnlyPageLengthChange?: boolean; // default: false
	
	// Props do React
	className?: string;
	style?: React.CSSProperties;
	children: React.ReactNode;
	
	// Event handlers conforme documentação
	onFlip?: (e: PageFlipEventObject) => void;
	onChangeOrientation?: (e: PageFlipEventObject) => void;
	onChangeState?: (e: PageFlipEventObject) => void;
	onInit?: (e: PageFlipInitEvent) => void;
	onUpdate?: (e: PageFlipInitEvent) => void;
}

// Import direto do pacote para manter compatibilidade
const FlipBook = dynamic(
	() => import('react-pageflip').then((m) => m.default),
	{ ssr: false }
) as React.ComponentType<any>;

const Page = forwardRef<HTMLDivElement, { children?: React.ReactNode }>(
	({ children }, ref) => (
		<div ref={ref} className="w-full h-full bg-white rounded-xl shadow-md overflow-hidden">
			{children}
		</div>
	)
);
Page.displayName = 'Page';

// Componente tipado que wrappea o FlipBook
interface TypedFlipBookProps extends Partial<FlipBookProps> {
	width: number;
	height: number;
	children: React.ReactNode;
}

const TypedFlipBook = React.forwardRef<FlipBookRef, TypedFlipBookProps>((props, ref) => {
	return <FlipBook ref={ref} {...props} />;
});
TypedFlipBook.displayName = 'TypedFlipBook';

type Book3DProps = {
	className?: string;
};

export default function Book3D({ className }: Book3DProps) {
	const flipBookRef = useRef<FlipBookRef>(null);

	useEffect(() => {
		// Abre automaticamente a primeira página após 2 segundos
		const timer = setTimeout(() => {
			try {
				flipBookRef.current?.pageFlip()?.flipNext();
			} catch (error) {
				console.log('Erro ao abrir página automaticamente:', error);
			}
		}, 800);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className={className}>
			<TypedFlipBook
				ref={flipBookRef}
				width={500}
				height={500}
				size="stretch"
                drawShadow={false}
				showCover={true}
				mobileScrollSupport={true}
                flippingTime={1200}
                autoSize={true}
			>
				<Page>
					<div className="w-full h-full bg-white flex items-center justify-center">
						<img
							src="https://cms.protagonizei.com/wp-content/uploads/2025/08/merged-pedido-372-Felipe-pagina-1-2025-08-14_05-05-05.jpg"
							alt="Capa"
							className="max-w-full max-h-full object-contain select-none"
							draggable={false}
							loading="eager"
						/>
					</div>
				</Page>

				<Page>
					<img
						src="https://cms.protagonizei.com/wp-content/uploads/2025/08/merged-pedido-306-Luna-Trindade-pagina-1-2025-08-17_08-55-38.jpg"
						alt="Página interna esquerda"
						className="w-full h-full object-cover object-left select-none"
						draggable={false}
						loading="lazy"
					/>
				</Page>
				<Page>
					<img
						src="https://cms.protagonizei.com/wp-content/uploads/2025/08/merged-pedido-306-Luna-Trindade-pagina-1-2025-08-17_08-55-38.jpg"
						alt="Página interna direita"
						className="w-full h-full object-cover object-right select-none"
						draggable={false}
						loading="lazy"
					/>
				</Page>
				<Page>
					<img
						src="https://cms.protagonizei.com/wp-content/uploads/2025/08/merged-pedido-372-Felipe-pagina-3-2025-08-14_05-05-13.jpg"
						alt="Página interna esquerda"
						className="w-full h-full object-cover object-left select-none"
						draggable={false}
						loading="lazy"
					/>
				</Page>
				<Page>
					<img
						src="https://cms.protagonizei.com/wp-content/uploads/2025/08/merged-pedido-372-Felipe-pagina-3-2025-08-14_05-05-13.jpg"
						alt="Página interna direita"
						className="w-full h-full object-cover object-right select-none"
						draggable={false}
						loading="lazy"
					/>
				</Page>
				<Page>
					<img
						src="https://placehold.co/5976x2024?text=Quer+saber+mais%3F"
						alt="Página interna esquerda"
						className="w-full h-full object-cover object-left select-none"
						draggable={false}
						loading="lazy"
					/>
				</Page>
				<Page>
					<img
						src="https://placehold.co/5976x2024?text=Quer+saber+mais%3F"
						alt="Página interna direita"
						className="w-full h-full object-cover object-right select-none"
						draggable={false}
						loading="lazy"
					/>
				</Page>

				<Page>
					<div className="w-full h-full bg-white flex items-center justify-center">
						<img
							src="https://cms.protagonizei.com/wp-content/uploads/2025/08/merged-pedido-372-Felipe-pagina-1-2025-08-14_05-05-05.jpg"
							alt="Contracapa"
							className="max-w-full max-h-full object-contain select-none"
							draggable={false}
							loading="lazy"
						/>
					</div>
				</Page>
			</TypedFlipBook>
		</div>
	);
}