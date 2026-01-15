'use client';

import dynamic from 'next/dynamic';
import React from 'react';
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
	return <FlipBook ref={ref} {...props} />;
});

FlipBookWrapper.displayName = 'FlipBookWrapper';

