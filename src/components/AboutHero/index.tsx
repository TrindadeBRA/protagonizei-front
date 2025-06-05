import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from 'lucide-react';

interface AboutHeroProps {
    apresentationUrl: string;
    downloadLabel?: string;
}

export default function AboutHero({
    apresentationUrl,
    downloadLabel = 'baixar apresentação',
}: AboutHeroProps) {

    return (
        <div className="relative overflow-hidden bg-linear-to-b from-indigo-100/20 pt-14 overflow-x-hidden">
            <div
                aria-hidden="true"
                className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white ring-1 shadow-xl shadow-indigo-600/10 ring-indigo-50 sm:-mr-80 lg:-mr-96"
            />
            <div className="mx-auto max-w-7xl px-6 py-8 sm:py-40 lg:px-8 relative">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                    <div>
                        <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-balance text-black sm:text-7xl lg:col-span-2 xl:col-auto" data-aos="fade-right">
                            Nós somos a Tiken!
                        </h1>
                        <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-balance text-black sm:text-4xl lg:col-span-2 xl:col-auto mt-4" data-aos="fade-right">
                            Criamos conexões e soluções através da química para inovar o mundo
                        </h2>
                    </div>
                    <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1 border-gradient-left" data-aos="fade-right">
                        <p className="text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                            Somos uma empresa referência em aditivos para os mercados de Plásticos & Elastômeros, Borrachas e Adesivos, atuando por meio de parcerias internacionais consolidadas globalmente. Com uma equipe que adquiriu conhecimento técnico e know-how ao longo dos anos, temos como objetivo proporcionar de forma eficiente e rápida, soluções que atendam as demandas dos mercados.
                        </p>
                    </div>
                    <div className="relative mt-4 lg:mt-0">
                        <Link
                            href={apresentationUrl}
                            className="flex items-center rounded-md bg-[#f5d22c] text-black px-4 py-2.5 font-bold cursor-pointer w-fit"
                            aria-label={downloadLabel}
                            data-aos="fade-right"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {downloadLabel} <ArrowRightIcon className="w-4 h-4 ml-2" />
                        </Link>
                    </div>

                    <Image
                        alt=""
                        src="/assets/images/aboutus-page/we-are-tiken.webp"
                        className="mt-10 aspect-6/5 w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2"
                        width={1280}
                        height={800}
                        data-aos="fade-left"
                    />
                </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-white sm:h-32" />
        </div>
    )
}