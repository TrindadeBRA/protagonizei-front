import { ArrowRightIcon, Home } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function NotFoundScreen() {
    return (
        <section className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 overflow-hidden">
            {/* Elementos decorativos flutuantes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 md:opacity-40">
                <div className="absolute top-20 left-10 float-animation">
                    <Image src="/assets/images/asset-star.png" alt="Star" width={32} height={32} sizes="32px" data-aos="fade-in" data-aos-delay={100} />
                </div>
                <div className="absolute top-40 right-20 float-animation" style={{ animationDelay: '1s' }}>
                    <Image src="/assets/images/asset-heart.png" alt="Heart" width={32} height={32} sizes="32px" data-aos="fade-in" data-aos-delay={200} />
                </div>
                <div className="absolute bottom-40 left-20 float-animation" style={{ animationDelay: '2s' }}>
                    <Image src="/assets/images/asset-star.png" alt="Star" width={32} height={32} data-aos="fade-in" data-aos-delay={300} />
                </div>
                <div className="absolute top-60 left-1/3 float-animation" style={{ animationDelay: '0.5s' }}>
                    <Image src="/assets/images/asset-star-2.png" alt="Star" width={32} height={32} sizes="32px" data-aos="fade-in" data-aos-delay={400} />
                </div>
                <div className="absolute bottom-60 right-1/4 float-animation" style={{ animationDelay: '1.5s' }}>
                    <Image src="/assets/images/asset-heart-2.png" alt="Heart" width={32} height={32} sizes="32px" data-aos="fade-in" data-aos-delay={500} />
                </div>
                <div className="absolute top-1/4 right-1/4 float-animation" style={{ animationDelay: '0.8s' }}>
                    <Image src="/assets/images/asset-star.png" alt="Star" width={24} height={24} sizes="24px" data-aos="fade-in" data-aos-delay={600} />
                </div>
                <div className="absolute bottom-1/3 left-1/4 float-animation" style={{ animationDelay: '1.2s' }}>
                    <Image src="/assets/images/asset-heart.png" alt="Heart" width={28} height={28} sizes="28px" data-aos="fade-in" data-aos-delay={700} />
                </div>
                <div className="absolute bottom-1/4 right-1/3 float-animation" style={{ animationDelay: '0.3s' }}>
                    <Image src="/assets/images/asset-star-2.png" alt="Star" width={24} height={24} sizes="24px" data-aos="fade-in" data-aos-delay={800} />
                </div>
                <div className="absolute top-1/2 left-1/2 float-animation" style={{ animationDelay: '1.9s' }}>
                    <Image src="/assets/images/asset-star.png" alt="Star" width={28} height={28} sizes="28px" data-aos="fade-in" data-aos-delay={900} />
                </div>
            </div>

            <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen">
                <div className="text-center z-10 max-w-3xl mx-auto">
                    {/* Badge 404 */}
                    <div className="inline-block mb-6" data-aos="fade-down">
                        <span className="bg-gradient-to-r from-pink-main to-blue-main text-white px-6 py-3 rounded-full text-2xl font-bold shadow-md font-heading">
                            404
                        </span>
                    </div>

                    {/* Título Principal */}
                    <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" data-aos="fade-up">
                        <span className="text-black">
                            Página{' '}
                            <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent">
                                não encontrada
                            </span>
                        </span>
                    </h1>

                    {/* Descrição */}
                    <p className="text-xl md:text-2xl text-gray-700 mb-4 leading-relaxed" data-aos="fade-up" data-aos-delay={100}>
                        Desculpe, não foi possível encontrar a página que você está procurando.
                    </p>

                    <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed" data-aos="fade-up" data-aos-delay={200}>
                        A página pode ter sido movida, removida ou o link pode estar incorreto.
                    </p>

                    {/* Botão Voltar */}
                    <div className="flex items-center justify-center gap-x-6" data-aos="fade-up" data-aos-delay={300}>
                        <Link
                            href="/"
                            className="magical-border border-4 border-transparent text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300 font-englebert flex items-center gap-x-2"
                        >
                            <Home className="size-5" />
                            Voltar para a página inicial
                            <ArrowRightIcon className="size-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
