"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { CheckCircle, XCircle, Loader2, Tag } from "lucide-react";
import { GetOrdersCheckCouponParams } from "@/src/services/model";
import customFetch from "@/src/services/custom-fetch";
import { getGetOrdersCheckCouponUrl } from "@/src/services/api";
import { useFormColors } from "../useFormColors";
import { twMerge } from "tailwind-merge";

interface CouponDiscountProps {
    orderId: string | null;
    bookId?: number | null;
    currentPrice: number | null;
    originalPrice?: number | null;
    onPriceUpdate: (newPrice: number) => void;
    couponValue: string;
    onCouponChange: (value: string) => void;
    disabled?: boolean;
    childGender?: string;
    isCouponFromUrl?: boolean;
    setIsCouponFromUrl?: (value: boolean) => void;
}

type CouponStatus = "idle" | "loading" | "success" | "error";

interface CouponState {
    status: CouponStatus;
    message: string;
    appliedCoupon: string | null;
}

const CouponDiscount = ({
    orderId,
    bookId,
    currentPrice,
    originalPrice,
    onPriceUpdate,
    couponValue,
    onCouponChange,
    disabled = false,
    childGender = "",
    isCouponFromUrl = false,
    setIsCouponFromUrl,
}: CouponDiscountProps) => {
    const colors = useFormColors(childGender);
    const [couponState, setCouponState] = useState<CouponState>({
        status: "idle",
        message: "",
        appliedCoupon: null,
    });

    // Usaremos o bookId para o novo endpoint `/orders/check-coupon`
    const hasBookId = bookId !== null && bookId !== undefined;
    const originalPriceRef = useRef<number | null>(null);
    const autoApplyAttemptedRef = useRef<boolean>(false);

    const handleCouponCheck = async () => {
        if (!couponValue.trim()) {
            setCouponState({
                status: "error",
                message: "Por favor, insira um código de cupom",
                appliedCoupon: null,
            });
            return;
        }

        if (!hasBookId) {
            setCouponState({
                status: "error",
                message: "Carregando detalhes do livro para aplicar o cupom",
                appliedCoupon: null,
            });
            return;
        }

        setCouponState({
            status: "loading",
            message: "Verificando cupom...",
            appliedCoupon: null,
        });

        try {
            const params: GetOrdersCheckCouponParams = {
                coupon: couponValue.trim(),
                book_id: Number(bookId),
            };

            const url = getGetOrdersCheckCouponUrl(params);
            const response: any = await customFetch(url, { method: "GET" });

            if (response.price !== undefined && response.price !== null) {
                const newPrice = Number(response.price);
                if (originalPriceRef.current === null && typeof currentPrice === "number") {
                    originalPriceRef.current = currentPrice;
                }
                onPriceUpdate(newPrice);

                setCouponState({
                    status: "success",
                    message: "",
                    appliedCoupon: couponValue.trim(),
                });
            } else {
                throw new Error(response?.message || "Resposta inválida da API");
            }
        } catch (error: any) {
            let errorMessage = "Erro ao verificar cupom";
            if (error?.message) {
                if (error.message.includes("404")) errorMessage = "Cupom não encontrado ou inválido";
                else if (error.message.includes("400")) errorMessage = "Cupom inválido ou expirado";
                else errorMessage = error.message;
            }
            setCouponState({ status: "error", message: errorMessage, appliedCoupon: null });
        }
    };

    const handleRemoveCoupon = () => {
        if (couponState.appliedCoupon) {
            setCouponState({ status: "idle", message: "", appliedCoupon: null });
            onCouponChange("");
            // Reverter o preço original, se tivermos guardado
            const basePrice = originalPriceRef.current ?? (typeof originalPrice === 'number' ? originalPrice : null);
            if (basePrice !== null) {
                onPriceUpdate(basePrice);
            }
            originalPriceRef.current = null;
        }
    };

    // Aplicar automaticamente o cupom da URL quando o bookId estiver disponível
    useEffect(() => {
        if (
            isCouponFromUrl && 
            !autoApplyAttemptedRef.current && 
            hasBookId && 
            couponValue.trim() && 
            couponState.status === 'idle'
        ) {
            autoApplyAttemptedRef.current = true;
            handleCouponCheck();
            // Marcar como não vindo mais da URL para não tentar novamente
            if (setIsCouponFromUrl) {
                setIsCouponFromUrl(false);
            }
        }
    }, [isCouponFromUrl, hasBookId, couponValue, couponState.status]);

    // Desabilita input se cupom já estiver aplicado (estado local) ou se detectarmos desconto via preços
    const isAppliedByPrice = typeof originalPrice === 'number' && typeof currentPrice === 'number' && currentPrice < originalPrice;
    useEffect(() => {
        if (isAppliedByPrice && couponValue && couponState.status !== 'success') {
            setCouponState({ status: 'success', message: '', appliedCoupon: couponValue });
        }
    }, [isAppliedByPrice, couponValue]);

    const isInputDisabled = disabled || couponState.status === "success" || isAppliedByPrice || !hasBookId;
    const showRemoveButton = couponState.status === "success" && couponState.appliedCoupon;

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <Tag className={twMerge("w-4 h-4", colors.couponIconColorClass)} />
                <span className="text-sm font-medium text-gray-700">Cupom de desconto</span>
            </div>

            {!hasBookId && (
                <p className="text-xs text-gray-500 bg-gray-100 p-2 rounded-lg">
                    💡 Informe seus dados para aplicarmos o cupom
                </p>
            )}

            <div className="flex gap-2">
                <div className="flex-1 relative">
                    <Input
                        type="text"
                        placeholder="Digite o código do cupom"
                        value={couponValue}
                        onChange={(e) => onCouponChange(e.target.value.toUpperCase())}
                        disabled={isInputDisabled}
                        className={twMerge(
                            "pr-10 rounded-xl bg-white transition-colors h-11 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200",
                            couponState.status === "success"
                                ? "border-2 border-green-300 bg-green-50 text-green-700 focus:border-green-400"
                                : couponState.status === "error"
                                    ? "border-2 border-red-300 bg-red-50 text-red-700 focus:border-red-400"
                                    : twMerge(colors.inputBorderClass, colors.inputFocusBorderClass)
                        )}
                        style={(couponState.status === "idle" || couponState.status === "loading") && colors.inputBorderStyle ? colors.inputBorderStyle : undefined}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !isInputDisabled) {
                                handleCouponCheck();
                            }
                        }}
                    />

                    {couponState.status === "success" && (
                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-600" />
                    )}

                    {couponState.status === "error" && (
                        <XCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-600" />
                    )}
                </div>

                {!showRemoveButton ? (
                    <Button
                        onClick={handleCouponCheck}
                        disabled={isInputDisabled || !couponValue.trim()}
                        variant="outline"
                        className={`px-4 py-2 border-2 h-full transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed disabled:pointer-events-auto ${!hasBookId
                                ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-100 hover:border-purple-400"
                            }
                        `}
                        title={!hasBookId ? "Aguarde carregar os detalhes do livro" : ""}
                    >
                        {couponState.status === "loading" ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            "Aplicar"
                        )}
                    </Button>
                ) : (
                    <Button
                        onClick={handleRemoveCoupon}
                        variant="outline"
                        className="h-full px-4 py-2 border-2 border-red-300 bg-red-50 text-red-700 hover:bg-red-100 hover:border-red-400 transition-colors"
                    >
                        Remover
                    </Button>
                )}
            </div>

            {couponState.message && couponState.status !== "success" && (
                <div
                    className={`text-sm p-3 rounded-lg border ${couponState.status === "error"
                            ? "bg-red-50 border-red-200 text-red-700"
                            : "bg-blue-50 border-blue-200 text-blue-700"
                        }`}
                >
                    {couponState.message}
                </div>
            )}

            {showRemoveButton && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700">
                        Cupom <strong>{couponState.appliedCoupon}</strong> aplicado com sucesso!
                    </span>
                </div>
            )}
        </div>
    );
};

export default CouponDiscount;
