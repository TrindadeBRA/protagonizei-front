'use client';

import { useAutoFlip } from '../../../src/hooks/useAutoFlip';
import { useBookDimensions } from '../../../src/hooks/useBookDimensions';
import { BookPage, BookControls, FlipBookWrapper, FullscreenWidget } from '../../../src/components/play';

/**
 * Página de visualização interativa do livro
 * Componente refatorado e componentizado para melhor manutenção
 */
export default function PlayPage() {
	// Hooks personalizados
	const dimensions = useBookDimensions();
	const { flipBookRef, handleFlip, handleChangeState } = useAutoFlip({
		maxFlips: 0,
		initialDelay: 0,
		interval: 0,
		enabled: false,
	});

	return (
		<div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
			<FullscreenWidget />

			<BookControls>
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
						onFlip={handleFlip}
						onChangeState={handleChangeState}
					>
						{/* Capa */}
						<BookPage src="/assets/images/book/cover-1.webp" alt="Capa" side="left" priority />

						{/* Páginas 1-3 (com prioridade de carregamento) */}
						<BookPage src="/assets/images/book/page1-1.webp" alt="Página 1 esquerda" side="left" priority />
						<BookPage src="/assets/images/book/page1-1.webp" alt="Página 1 direita" side="right" priority />

						<BookPage src="/assets/images/book/page2-1.webp" alt="Página 2 esquerda" side="left" priority />
						<BookPage src="/assets/images/book/page2-1.webp" alt="Página 2 direita" side="right" priority />

						<BookPage src="/assets/images/book/page3-1.webp" alt="Página 3 esquerda" side="left" priority />
						<BookPage src="/assets/images/book/page3-1.webp" alt="Página 3 direita" side="right" priority />

						{/* Páginas 4-6 (carregamento lazy) */}
						<BookPage src="/assets/images/book/page4-1.webp" alt="Página 4 esquerda" side="left" priority={false} />
						<BookPage src="/assets/images/book/page4-1.webp" alt="Página 4 direita" side="right" priority={false} />

						<BookPage src="/assets/images/book/page5-1.webp" alt="Página 5 esquerda" side="left" priority={false} />
						<BookPage src="/assets/images/book/page5-1.webp" alt="Página 5 direita" side="right" priority={false} />

						<BookPage src="/assets/images/book/page6-1.webp" alt="Página 6 esquerda" side="left" priority={false} />
						<BookPage src="/assets/images/book/page6-1.webp" alt="Página 6 direita" side="right" priority={false} />

						{/* Contracapa */}
						<BookPage src="/assets/images/book/cover-1.webp" alt="Contracapa" side="right" priority={false} />
					</FlipBookWrapper>
				</div>
			</BookControls>
		</div>
	);
}

