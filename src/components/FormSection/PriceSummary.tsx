import React from "react";

type PriceSummaryProps = {
	originalPrice?: number | null;
	currentPrice?: number | null;
	isLoading?: boolean;
};

const formatPrice = (value?: number | null): string | null => {
	if (typeof value !== "number") return null;
	try {
		return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
	} catch {
		return `R$ ${value.toFixed(2).replace('.', ',')}`;
	}
};

const PriceSummary: React.FC<PriceSummaryProps> = ({ originalPrice, currentPrice, isLoading }) => {
	const hasDiscount = typeof originalPrice === 'number' && typeof currentPrice === 'number' && currentPrice < originalPrice;
	const discountPct = hasDiscount ? Math.round(((originalPrice as number - (currentPrice as number)) / (originalPrice as number)) * 100) : 0;

	return (
		<div className="flex items-baseline gap-3">
			<span className="font-bold text-gray-800">Total:</span>
			{isLoading ? (
				<span className="text-sm text-gray-500 flex items-center">Carregando preço...</span>
			) : (
				<div className="flex items-baseline gap-3">
					{hasDiscount && (
						<span className="text-gray-500 line-through text-lg">{formatPrice(originalPrice)}</span>
					)}
					<span className="text-2xl font-bold text-pink-main">{formatPrice(currentPrice) ?? '-'}</span>
					{hasDiscount && (
						<span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">-{discountPct}%</span>
					)}
				</div>
			)}
		</div>
	);
};

export default PriceSummary;
