'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavButtonProps {
	onClick: () => void;
	disabled?: boolean;
	icon: LucideIcon;
	label: string;
	position: 'left' | 'right';
	isMinimized?: boolean;
}

/**
 * Botão de navegação reutilizável com estados visuais otimizados
 * Usado para navegação entre páginas do livro
 */
export const NavButton: React.FC<NavButtonProps> = ({
	onClick,
	disabled = false,
	icon: Icon,
	label,
	position,
	isMinimized = false,
}) => {
	const baseOpacity = isMinimized ? 0.15 : 0.4;
	const hoverOpacity = isMinimized ? 0.25 : 0.5;
	const activeOpacity = isMinimized ? 0.2 : 0.4;

	const positionClass = position === 'left' ? 'left-[10%]' : 'right-[10%]';

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`
				fixed ${positionClass} top-1/2 -translate-y-1/2 z-50
				text-white rounded-full p-4
				transition-all duration-300
				hover:scale-110 active:scale-95
				disabled:opacity-50 disabled:cursor-not-allowed
				border shadow-lg
				flex items-center justify-center cursor-pointer
			`}
			style={{
				backgroundColor: `rgba(147, 51, 234, ${baseOpacity})`,
				backdropFilter: 'blur(12px)',
				borderColor: `rgba(196, 181, 253, ${baseOpacity})`,
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.backgroundColor = `rgba(168, 85, 247, ${hoverOpacity})`;
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.backgroundColor = `rgba(147, 51, 234, ${baseOpacity})`;
			}}
			onMouseDown={(e) => {
				e.currentTarget.style.backgroundColor = `rgba(126, 34, 206, ${activeOpacity})`;
			}}
			onMouseUp={(e) => {
				e.currentTarget.style.backgroundColor = `rgba(168, 85, 247, ${hoverOpacity})`;
			}}
			aria-label={label}
		>
			<Icon className="h-7 w-7" />
		</button>
	);
};


