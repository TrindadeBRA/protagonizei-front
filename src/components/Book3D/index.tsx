'use client';

import dynamic from 'next/dynamic';
import React, { forwardRef } from 'react';
import { useAutoFlip } from '../../hooks/useAutoFlip';
import type { FlipBookProps, FlipBookRef } from '../../types/pageflip';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/src/lib/utils';

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
		initialDelay: 1000,
		interval: 2500,
		enabled: true
	});

	return (
		<div className={className}>
			<Image
				src="/assets/images/book/avatar.png"
				alt="Protagonizei"
				width={284}
				height={355}
				className={cn(
					"absolute -top-[0px] left-[0] w-[100px] rotate-[20deg] animate-avatar-move",
					"min-md:w-[150px] min-md:h-[187px] min-md:rotate-[20deg] min-md:animate-avatar-move"
				)}
			/>

			<TypedFlipBook
				ref={flipBookRef}
				width={500}
				height={500}
				size="stretch"
				drawShadow={false}
				showCover={true}
				mobileScrollSupport={true}
				flippingTime={2000}
				autoSize={true}
				onFlip={handleFlip}
				onChangeState={handleChangeState}
				className={cn(
					"mt-[135px]",
					"min-md:mt-[200px]"
				)}
			>
				<Page>
					<div className="w-full h-full bg-white flex items-center justify-center">
						<img
							src="/assets/images/book/cover01.webp"
							alt="Capa"
							className="w-full h-full select-none"
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
						src="/assets/images/book/page02-1.webp"
						alt="Página interna esquerda"
						className="w-full h-full object-cover object-left select-none"
						draggable={false}
						loading="lazy"
					/>
				</Page>
				<Page>
					<img
						src="/assets/images/book/page02-1.webp"
						alt="Página interna direita"
						className="w-full h-full object-cover object-right select-none"
						draggable={false}
						loading="lazy"
					/>
				</Page>
				<Page>
					<Link href="/#criar-historia">
						<img
							src="/assets/images/book/page03-1.webp"
							alt="Página interna esquerda"
							className="w-full h-full object-cover object-left select-none cursor-pointer blur-xs"
							draggable={false}
							loading="lazy"
						/>
						<div className="absolute inset-0 bg-black/50 flex items-center justify-center flex-col gap-2 p-6 text-center">
							<div
								className="magical-border border-4 border-transparent text-white font-bold w-16 h-16 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300 font-englebert flex items-center justify-center"
							>
								<Lock className="size-8 text-white" />
							</div>
						</div>
					</Link>
				</Page>
				<Page>
					<Link href="/#criar-historia">
						<img
							src="/assets/images/book/page03-1.webp"
							alt="Página interna direita"
							className="w-full h-full object-cover object-right select-none cursor-pointer blur-xs"
							draggable={false}
							loading="lazy"
						/>
						<div className="absolute inset-0 bg-black/50 flex items-center justify-center flex-col gap-2 p-6 text-center">
							<div
								className="magical-border border-4 border-transparent text-white font-bold w-16 h-16 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300 font-englebert flex items-center justify-center"
							>
								<Lock className="size-8 text-white" />
							</div>
						</div>
					</Link>
				</Page>
			</TypedFlipBook>
		</div>
	);
}