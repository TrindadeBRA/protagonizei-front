import React from "react";
import { twMerge } from "tailwind-merge";

type PriceSummaryProps = {
	originalPrice?: number | null;
	currentPrice?: number | null;
	isLoading?: boolean;
	priceColorClass?: string;
};

const formatPrice = (value?: number | null): string | null => {
	if (typeof value !== "number") return null;
	try {
		return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
	} catch {
		return `R$ ${value.toFixed(2).replace('.', ',')}`;
	}
};

const PriceSummary: React.FC<PriceSummaryProps> = ({ originalPrice, currentPrice, isLoading, priceColorClass = "text-pink-main" }) => {
	const hasDiscount = typeof originalPrice === 'number' && typeof currentPrice === 'number' && currentPrice < originalPrice;
	const discountPct = hasDiscount ? Math.round(((originalPrice as number - (currentPrice as number)) / (originalPrice as number)) * 100) : 0;

	return (
		<div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3 w-full">
			<span className="font-bold text-gray-800 mb-1 sm:mb-0">Total:</span>
			{isLoading ? (
				<span className="text-sm text-gray-500 flex items-center">Carregando preço...</span>
			) : (
				<div className="flex flex-wrap items-center gap-x-2 gap-y-1">
					{hasDiscount && (
						<span className="text-gray-500 line-through text-base sm:text-lg">{formatPrice(originalPrice)}</span>
					)}
					<span className={twMerge("text-xl sm:text-2xl font-bold", priceColorClass)}>{formatPrice(currentPrice) ?? '-'}</span>
					{hasDiscount && (
						<span className="text-[10px] sm:text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 sm:py-1 rounded-full">-{discountPct}%</span>
					)}
				</div>
			)}
		</div>
	);
};

export default PriceSummary;
