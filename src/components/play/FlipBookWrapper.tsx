'use client';

import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import type { FlipBookProps, FlipBookRef } from '../../types/pageflip';

const FlipBook = dynamic(
	() => import('react-pageflip').then((m) => m.default),
	{ ssr: true }
) as React.ComponentType<any>;

interface TypedFlipBookProps extends Partial<FlipBookProps> {
	width: number;
	height: number;
	children: React.ReactNode;
}

export const FlipBookWrapper = React.forwardRef<FlipBookRef, TypedFlipBookProps>((props, ref) => {
	useEffect(() => {
		console.log('🔄 FlipBook montado com dimensões:', props.width, 'x', props.height);
		return () => console.log('❌ FlipBook desmontado');
	}, []);
	
	console.log('🎨 FlipBook renderizando com:', props.width, 'x', props.height);
	return <FlipBook ref={ref} {...props} />;
});

FlipBookWrapper.displayName = 'FlipBookWrapper';

