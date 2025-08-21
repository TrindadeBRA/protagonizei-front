'use client';

import dynamic from 'next/dynamic';
import React, { forwardRef } from 'react';
import { useAutoFlip } from '../../hooks/useAutoFlip';
import type { FlipBookProps, FlipBookRef } from '../../types/pageflip';
import Link from 'next/link';

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
							src="/assets/images/book/cover.webp"
							alt="Capa"
							className="max-w-full max-h-full object-contain select-none"
							draggable={false}
							loading="eager"
						/>
					</div>
				</Page>

				<Page>
					<img
						src="/assets/images/book/page01.webp"
						alt="Página interna esquerda"
						className="w-full h-full object-cover object-left select-none"
						draggable={false}
						loading="lazy"
					/>
				</Page>
				<Page>
					<img
						src="/assets/images/book/page01.webp"
						alt="Página interna direita"
						className="w-full h-full object-cover object-right select-none"
						draggable={false}
						loading="lazy"
					/>
				</Page>
				<Page>
					<img
						src="/assets/images/book/page02.webp"
						alt="Página interna esquerda"
						className="w-full h-full object-cover object-left select-none"
						draggable={false}
						loading="lazy"
					/>
				</Page>
				<Page>
					<img
						src="/assets/images/book/page02.webp"
						alt="Página interna direita"
						className="w-full h-full object-cover object-right select-none"
						draggable={false}
						loading="lazy"
					/>
				</Page>
				<Page>
					<Link href="/#criar-historia">
						<img
							src="/assets/images/book/page03.webp"
							alt="Página interna esquerda"
							className="w-full h-full object-cover object-left select-none"
							draggable={false}
							loading="lazy"
						/>
					</Link>

				</Page>
				<Page>
					<Link href="/#criar-historia">
						<img
							src="/assets/images/book/page03.webp"
							alt="Página interna direita"
							className="w-full h-full object-cover object-right select-none"
							draggable={false}
							loading="lazy"
						/>
					</Link>
				</Page>
			</TypedFlipBook>
		</div>
	);
}