'use client';

import React, { memo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// =================================================================
// COMPONENTE SIMPLIFICADO - SEM ZOOM
// =================================================================
// Decisão: Removido zoom para garantir que TODOS os comandos
// funcionem perfeitamente. O livro já ocupa 85% da tela (bom tamanho)

interface BookControlsProps {
	children: React.ReactNode;
	isMinimized: boolean;
	onToggleMinimize: () => void;
}

/**
 * Container de controles do livro
 * Mantém apenas o essencial: minimizar/expandir controles
 * 
 * Filosofia: Simplicidade e funcionalidade perfeita
 * Todos os comandos (clique, arrastar, swipe, setas) funcionam 100%
 */
export const BookControls = memo<BookControlsProps>(({ 
	children, 
	isMinimized, 
	onToggleMinimize 
}) => {
	return (
		<div className="relative w-full h-screen overflow-hidden">
			{/* Container centralizado do livro */}
			<div className="w-full h-full flex items-center justify-center">
				{children}
			</div>

			{/* Botão para minimizar/expandir (se precisar no futuro) */}
			{!isMinimized && (
				<button
					onClick={onToggleMinimize}
					className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 text-white rounded-full p-4 transition-all duration-300 hover:scale-110 active:scale-95 border shadow-lg flex items-center justify-center cursor-pointer"
					style={{
						backgroundColor: 'rgba(147, 51, 234, 0.4)',
						backdropFilter: 'blur(12px)',
						borderColor: 'rgba(196, 181, 253, 0.4)',
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.5)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.4)';
					}}
					aria-label="Minimizar menu"
					title="Minimizar menu"
				>
					<ChevronDown className="h-7 w-7" />
				</button>
			)}

			{isMinimized && (
				<button
					onClick={onToggleMinimize}
					className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 text-white rounded-full p-2 transition-all duration-300 hover:scale-110 active:scale-95 border shadow-lg flex items-center justify-center cursor-pointer"
					style={{
						backgroundColor: 'rgba(147, 51, 234, 0.4)',
						backdropFilter: 'blur(12px)',
						borderColor: 'rgba(196, 181, 253, 0.4)',
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor = 'rgba(168, 85, 247, 0.5)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = 'rgba(147, 51, 234, 0.4)';
					}}
					aria-label="Expandir menu"
					title="Expandir menu"
				>
					<ChevronUp className="h-3.5 w-3.5" />
				</button>
			)}
		</div>
	);
});

BookControls.displayName = 'BookControls';
