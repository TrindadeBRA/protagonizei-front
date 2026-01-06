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

// Constantes para classes reutilizáveis
const PAGE_CLASSES = {
	base: "w-full h-full select-none",
	left: "w-full h-full object-cover object-left select-none",
	right: "w-full h-full object-cover object-right select-none",
	locked: "cursor-pointer blur-xs",
};

const LOCK_OVERLAY_CLASSES = "absolute inset-0 bg-black/50 flex items-center justify-center flex-col gap-2 p-6 text-center";
const LOCK_ICON_CLASSES = "magical-border border-4 border-transparent text-white font-bold w-16 h-16 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300 font-englebert flex items-center justify-center";

// Componente para páginas normais
const BookPage = forwardRef<HTMLDivElement, { src: string; alt: string; side: 'left' | 'right'; priority?: boolean }>(
        ({ src, alt, side, priority = false }, ref) => (
                <div ref={ref} className="w-full h-full bg-white rounded-xl shadow-md overflow-hidden">
                        <Image
                                src={src}
                                alt={alt}
                                className={side === 'left' ? PAGE_CLASSES.left : PAGE_CLASSES.right}
                                draggable={false}
                                priority={priority}
                                loading={priority ? undefined : "lazy"}
                                width={538}
                                height={600}
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
				<Image
                                        src={src}
                                        alt={alt}
                                        className={cn(
                                                side === 'left' ? PAGE_CLASSES.left : PAGE_CLASSES.right,
                                                PAGE_CLASSES.locked
                                        )}
                                        draggable={false}
                                        loading="lazy"
                                        width={538}
                                        height={600}
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

type Book3DProps = {
	className?: string;
};

export default function Book3D({ className }: Book3DProps) {
	const {
		flipBookRef,
		handleFlip,
		handleChangeState,
	} = useAutoFlip({
		maxFlips:7,
		initialDelay: 1000,
		interval: 2500,
		enabled: true
	});

	return (
		<div className={className}>
                        <Image
                                src="/assets/images/book/avatar.webp"
                                alt="Protagonizei"
                                width={284}
                                height={355}
                                className={cn(
                                        "absolute -top-[20px] left-[0] h-[150px] w-auto animate-avatar-move z-10",
                                        "min-md:h-[250px] min-md:-top-[35px] min-md:animate-avatar-move"
                                )}
				style={{ width: "auto" }}
			/>

                        <Image
                                src="/assets/images/book/arrow.png"
                                alt="Protagonizei"
                                width={200}
                                height={200}
                                className={cn(
                                        "absolute top-[20px] left-[180px] w-[130px] z-10 animate-arrow-appear",
                                        "min-md:top-[0px] min-md:left-[250px] min-md:w-[300px]"
                                )}
			/>


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
				onFlip={handleFlip}
				onChangeState={handleChangeState}
                                className={cn(
                                        "mt-[150px] float-animation",
                                        "min-md:mt-[230px]"
                                )}
                        >
                                {/* Capa */}
                                <BookPage src="/assets/images/book/cover-1.webp" alt="Capa" side="left" priority />


				{/* Páginas 0-3 (sem blur) */}
                                <BookPage src="/assets/images/book/page1-1.webp" alt="Página 0 esquerda" side="left" priority />
                                <BookPage src="/assets/images/book/page1-1.webp" alt="Página 0 direita" side="right" priority />
								
                                <BookPage src="/assets/images/book/page2-1.webp" alt="Página 2 esquerda" side="left" />
                                <BookPage src="/assets/images/book/page2-1.webp" alt="Página 2 direita" side="right" />
				
                                <BookPage src="/assets/images/book/page3-1.webp" alt="Página 3 esquerda" side="left" />
                                <BookPage src="/assets/images/book/page3-1.webp" alt="Página 3 direita" side="right" />

				{/* Páginas 4-9 (com blur e cadeado) */}
				<LockedBookPage src="/assets/images/book/page4-1.webp" alt="Página 4 esquerda" side="left" />
				<LockedBookPage src="/assets/images/book/page4-1.webp" alt="Página 4 direita" side="right" />
				
				<LockedBookPage src="/assets/images/book/page5-1.webp" alt="Página 5 esquerda" side="left" />
				<LockedBookPage src="/assets/images/book/page5-1.webp" alt="Página 5 direita" side="right" />	

				<LockedBookPage src="/assets/images/book/page6-1.webp" alt="Página 6 esquerda" side="left" />
				<LockedBookPage src="/assets/images/book/page6-1.webp" alt="Página 6 direita" side="right" />
							
			</TypedFlipBook>
		</div>
	);
}