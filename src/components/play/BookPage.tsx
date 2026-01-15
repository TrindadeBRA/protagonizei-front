'use client';

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { cn } from '@/src/lib/utils';

// Constantes para classes reutilizáveis
const PAGE_CLASSES = {
	base: "w-full h-full select-none",
	left: "w-full h-full object-cover object-left select-none",
	right: "w-full h-full object-cover object-right select-none",
	locked: "cursor-pointer blur-sm",
};

const LOCK_OVERLAY_CLASSES = "absolute inset-0 bg-black/50 flex items-center justify-center flex-col gap-2 p-6 text-center";
const LOCK_ICON_CLASSES = "magical-border border-4 border-transparent text-white font-bold w-16 h-16 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300 font-englebert flex items-center justify-center";

interface BookPageProps {
	src: string;
	alt: string;
	side: 'left' | 'right';
	priority?: boolean;
}

export const BookPage = React.forwardRef<HTMLDivElement, BookPageProps>(
	({ src, alt, side, priority = true }, ref) => (
		<div ref={ref} className="w-full h-full bg-white rounded-xl shadow-md overflow-hidden">
			<Image
				src={src}
				alt={alt}
				className={side === 'left' ? PAGE_CLASSES.left : PAGE_CLASSES.right}
				draggable={false}
				priority={priority}
				width={538}
				height={600}
			/>
		</div>
	)
);

BookPage.displayName = 'BookPage';

// Componente para páginas bloqueadas
export const LockedBookPage = React.forwardRef<HTMLDivElement, BookPageProps>(
	({ src, alt, side }, ref) => (
		<div ref={ref} className="w-full h-full bg-white rounded-xl shadow-md overflow-hidden relative">
			<Link href="/#criar-historia">
				<Image
					src={src}
					alt={alt}
					className={cn(
						side === 'left' ? PAGE_CLASSES.left : PAGE_CLASSES.right,
						PAGE_CLASSES.locked
					)}
					draggable={false}
					priority={true}
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

