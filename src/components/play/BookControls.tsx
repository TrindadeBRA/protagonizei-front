'use client';

import React, { memo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { BookSize, useBookSize, BOOK_SIZES } from '../../hooks/useBookSize';

// =================================================================
// COMPONENTES AUXILIARES
// =================================================================

interface SizeButtonProps {
	size: BookSize;
	currentSize: BookSize;
	onClick: () => void;
	label: string;
}

/**
 * Botão de seleção de tamanho
 */
const SizeButton = memo<SizeButtonProps>(({ size, currentSize, onClick, label }) => {
	const isActive = size === currentSize;
	
	return (
		<button
			onClick={onClick}
			className={`
				px-4 py-2 rounded-lg font-medium transition-all duration-200
				${isActive 
					? 'bg-purple-600 text-white scale-105 shadow-lg' 
					: 'bg-purple-600/20 text-white hover:bg-purple-600/40'
				}
			`}
			aria-label={`Tamanho ${label}`}
			title={`Mudar para tamanho ${label}`}
		>
			{label}
		</button>
	);
});
SizeButton.displayName = 'SizeButton';

// =================================================================
// COMPONENTE PRINCIPAL
// =================================================================

interface BookControlsProps {
	children: React.ReactNode;
	isMinimized: boolean;
	onToggleMinimize: () => void;
	onSizeChange?: (size: BookSize) => void;
	currentSize?: BookSize;
}

/**
 * Container de controles do livro com seleção de tamanho
 * 
 * Funcionalidades:
 * - Escolha de tamanho (P, M, G)
 * - Salva preferência do usuário
 * - Minimizar/expandir controles
 */
export const BookControls = memo<BookControlsProps>(({ 
	children, 
	isMinimized, 
	onToggleMinimize,
	onSizeChange,
	currentSize = 'medium'
}) => {
	const sizes = BOOK_SIZES;

	const handleSizeChange = (newSize: BookSize) => {
		console.log('🔄 Mudando tamanho para:', newSize);
		if (onSizeChange) {
			onSizeChange(newSize);
		}
	};

	return (
		<div className="relative w-full h-screen overflow-hidden">
			{/* Container centralizado do livro */}
			<div className="w-full h-full flex items-center justify-center">
				{children}
			</div>

			{/* Controles de Tamanho - Menu inferior */}
			{!isMinimized && (
				<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4 bg-purple-500/20 backdrop-blur-md rounded-full px-8 py-5 shadow-2xl border border-purple-300/30 transition-all duration-300">
					{/* Label */}
					<span className="text-white font-medium text-sm">
						Tamanho:
					</span>

					{/* Botões de Tamanho */}
					<div className="flex gap-2">
						{(Object.keys(sizes) as BookSize[]).map((sizeKey) => (
							<SizeButton
								key={sizeKey}
								size={sizeKey}
								currentSize={currentSize}
								onClick={() => handleSizeChange(sizeKey)}
								label={sizes[sizeKey].label}
							/>
						))}
					</div>

					{/* Separador */}
					<div className="h-8 w-px bg-purple-300/40 mx-2" />

					{/* Botão Minimizar */}
					<button
						onClick={onToggleMinimize}
						className="text-white rounded-full p-3 transition-all duration-200 hover:scale-110 active:scale-95 border shadow-lg cursor-pointer"
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
						<ChevronDown className="h-5 w-5" />
					</button>
				</div>
			)}

			{/* Botão Minimizado - Expandir */}
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
