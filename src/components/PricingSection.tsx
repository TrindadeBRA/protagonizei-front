"use client";

import { Check, Star, Shield, Zap, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";

const PricingSection = () => {
    return (
        <section className="py-20 relative overflow-hidden bg-gradient-to-b from-white via-pink-50 to-pink-50">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-800 mb-4" data-aos="fade-up">
                        O <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent">investimento</span> para criar memórias inesquecíveis!
                    </h2>
                    <p className="text-base text-gray-600 flex items-center justify-center gap-2" data-aos="fade-up">
                        <TrendingUp className="w-4 h-4 text-pink-main" />
                        <span><strong className="text-pink-main">212 livros</strong> criados nos últimos 7 dias com a gente!</span>
                    </p>
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden" data-aos="fade-up">

                        <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-8 py-6 border-b border-gray-200">
                            <div className="flex flex-col items-center justify-center gap-4">
                                <div className="text-center">
                                    <div className="flex items-baseline gap-2 mb-2 justify-center">
                                        <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent font-heading">
                                            R$ 49,99
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 font-medium">
                                        Investimento único • <strong>Zero mensalidade</strong>
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 flex-wrap justify-center">
                                    <div className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm border border-gray-200">
                                        <Shield className="w-4 h-4 text-green-600" />
                                        <span className="text-xs font-semibold text-gray-700">Pagamento 100% Seguro</span>
                                    </div>
                                    <div className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm border border-gray-200">
                                        <Zap className="w-4 h-4 text-blue-600" />
                                        <span className="text-xs font-semibold text-gray-700">Entrega em até 2h</span>
                                    </div>
                                    <div className="inline-flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm border border-gray-200">
                                        <Clock className="w-4 h-4 text-pink-600" />
                                        <span className="text-xs font-semibold text-gray-700">Acesso Vitalício</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 md:px-12 py-6">
                            <h3 className="font-heading text-lg font-bold text-gray-800 mb-5 text-center">
                                O que está incluído no seu investimento:
                            </h3>

                            <div className="grid md:grid-cols-3 gap-3 mb-6">
                                {[
                                    { text: "Livro 100% personalizado", highlight: "IA avançada" },
                                    { text: "Nome e foto do seu filho em toda história", highlight: "foto do seu filho" },
                                    { text: "Entrega instantânea no e-mail", highlight: "instantânea" },
                                    { text: "Compatível com celular, tablet e PC", highlight: "todos dispositivos" },
                                    { text: "Direito de impressão ilimitada", highlight: "ilimitada" },
                                    { text: "Armazenamento permanente na nuvem", highlight: "permanente" }
                                ].map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-pink-200 hover:shadow-sm transition-all"
                                    >
                                        <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-br from-pink-main to-blue-main rounded-full flex items-center justify-center mt-0.5">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <p className="text-xs md:text-base text-gray-700 font-medium leading-relaxed">
                                            {benefit.text}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center mt-10">
                                <Link
                                    href="/#criar-historia"
                                    key="/#criar-historia"
                                    className="magical-border border-4 border-transparent text-white font-bold py-2 px-6 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300 font-englebert"
                                    data-aos="fade-up"
                                >
                                    Crie sua história!
                                </Link>
                                <p className="text-xs text-gray-500 mt-8">
                                    🎁 Bônus: Suporte prioritário via WhatsApp para pedidos de hoje
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;

