'use client';

import dynamic from 'next/dynamic';
import React, { forwardRef } from 'react';
import { useAutoFlip } from '../../hooks/useAutoFlip';
import type { FlipBookProps, FlipBookRef } from '../../types/pageflip';

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
	const {
		flipBookRef,
		handleFlip,
		handleChangeState,
	} = useAutoFlip({
		maxFlips: 3,
		interval: 1500,
		enabled: true
	});

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
				onFlip={handleFlip}
				onChangeState={handleChangeState}
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
			</TypedFlipBook>
		</div>
	);
}