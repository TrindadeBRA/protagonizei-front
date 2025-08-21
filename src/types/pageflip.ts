// Tipos para os eventos do PageFlip
export interface PageFlipEventObject {
	data: number | string;
	object: any; // PageFlip object
}

export interface PageFlipInitEvent {
	page: number;
	mode: 'portrait' | 'landscape';
}

// Tipos para métodos do PageFlip (para uso com ref)
export interface PageRect {
	width: number;
	height: number;
	left: number;
	top: number;
}

export interface PageFlipMethods {
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
export interface FlipBookRef {
	pageFlip(): PageFlipMethods;
}

// Interface oficial baseada na documentação do react-pageflip
export interface FlipBookProps {
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
