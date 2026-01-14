'use client';

import Image from 'next/image';
import React from 'react';

// Constantes para classes reutilizáveis
const PAGE_CLASSES = {
	base: "w-full h-full select-none",
	left: "w-full h-full object-cover object-left select-none",
	right: "w-full h-full object-cover object-right select-none",
};

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

