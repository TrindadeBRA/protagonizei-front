'use client';

import dynamic from 'next/dynamic';
import React, { forwardRef } from 'react';

// Carrega o componente somente no cliente e faz cast para evitar conflitos de tipos da lib
const FlipBook = dynamic(() => import('react-pageflip'), { ssr: false }) as unknown as React.ComponentType<any>;

const Page = forwardRef<HTMLDivElement, { children?: React.ReactNode }>(
    ({ children }, ref) => (
        <div ref={ref} className="w-full h-full bg-white rounded-xl shadow-md overflow-hidden">
            {children}
        </div>
    )
);
Page.displayName = 'Page';

type Book3DProps = {
    className?: string;
};

export default function Book3D({ className }: Book3DProps) {
    const COVER_URL = 'https://cms.protagonizei.com/wp-content/uploads/2025/08/merged-pedido-372-Felipe-pagina-1-2025-08-14_05-05-05.jpg'; // 1:1
    const INTERNAL_URL = 'https://cms.protagonizei.com/wp-content/uploads/2025/08/merged-pedido-306-Luna-Trindade-pagina-1-2025-08-17_08-55-38.jpg'; // 2:1 (duas páginas)

    return (
        <div className={className}>
            {/* Configurado para se ajustar ao container mantendo limites responsivos */}
            <FlipBook
                /* Páginas 1:1 (cada página quadrada). Em landscape, o livro aparenta 2:1 */
                width={360}
                height={360}
                size="stretch"
                minWidth={260}
                maxWidth={640}
                minHeight={260}
                maxHeight={640}
                drawShadow
                flippingTime={900}
                usePortrait
                startZIndex={0}
                autoSize
                maxShadowOpacity={0.35}
                showCover
                mobileScrollSupport
                clickEventForward
                useMouseEvents
            >
                {/* Capa 1:1 */}
                <Page>
                    <div className="w-full h-full bg-white flex items-center justify-center">
                        <img src={COVER_URL} alt="Capa" className="max-w-full max-h-full object-contain select-none" draggable={false} />
                    </div>
                </Page>

                {/* Miolo 1:1: mesma imagem 2:1, exibida em metades com Tailwind */}
                <Page>
                    <img
                        src={INTERNAL_URL}
                        alt="Página interna esquerda"
                        className="w-full h-full object-cover object-left select-none"
                        draggable={false}
                    />
                </Page>
                <Page>
                    <img
                        src={INTERNAL_URL}
                        alt="Página interna direita"
                        className="w-full h-full object-cover object-right select-none"
                        draggable={false}
                    />
                </Page>
                <Page>
                    <img
                        src={INTERNAL_URL}
                        alt="Página interna esquerda"
                        className="w-full h-full object-cover object-left select-none"
                        draggable={false}
                    />
                </Page>
                <Page>
                    <img
                        src={INTERNAL_URL}
                        alt="Página interna direita"
                        className="w-full h-full object-cover object-right select-none"
                        draggable={false}
                    />
                </Page>
                <Page>
                    <img
                        src={INTERNAL_URL}
                        alt="Página interna esquerda"
                        className="w-full h-full object-cover object-left select-none"
                        draggable={false}
                    />
                </Page>
                <Page>
                    <img
                        src={INTERNAL_URL}
                        alt="Página interna direita"
                        className="w-full h-full object-cover object-right select-none"
                        draggable={false}
                    />
                </Page>
                {/* Contracapa (opcional): branca */}
                <Page>
                    <div className="w-full h-full bg-white flex items-center justify-center">
                        <img src={COVER_URL} alt="Capa" className="max-w-full max-h-full object-contain select-none" draggable={false} />
                    </div>
                </Page>
            </FlipBook>
        </div>
    );
}


