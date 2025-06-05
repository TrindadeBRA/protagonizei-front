import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function aboutus() {
    return (

        <div className="my-16 overflow-hidden overflow-x-hidden" id="equipe" >
            <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8">
                    <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
                        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl" data-aos="fade-right">Nossa equipe</h2>
                        <p className="mt-6 text-base/7 text-gray-600" data-aos="fade-right">
                            Na Tiken, acreditamos que o sucesso nasce das pessoas. Contamos com um time de profissionais experientes e apaixonados por química e inovação, dedicados a desenvolver soluções personalizadas que atendam às necessidades do mercado, sempre em conformidade com as boas práticas de ESG.
                        </p>
                        <p className="mt-6 text-base/7 text-gray-600" data-aos="fade-right">
                            Com expertise técnica, conhecimento atualizado e um olhar estratégico, trabalhamos em conjunto com nossos clientes, oferecendo suporte especializado e buscando sempre os melhores resultados. Nosso time é movido pelo desafio de criar conexões,
                            impulsionar o avanço tecnológico e garantir o atendimento das solicitações especificadas para cada projeto.
                        </p>
                        <p className="mt-6 text-base/7 text-gray-600" data-aos="fade-right">
                            Mais do que fornecer produtos, entregamos confiança, qualidade e um atendimento personalizado, fortalecendo laços duradouros e construindo um futuro mais inovador.
                        </p>
                        <div className="mt-6 block w-full">
                            <Link
                                href="/trabalhe-conosco"
                                className="flex items-center gap-x-2 rounded-md bg-[#f5d22c] text-black px-4 py-2.5 font-bold font-inter w-fit"
                                data-aos="fade-right"
                            >
                                faça parte <ArrowRightIcon className="size-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Linha 01 */}
                    <div className="hidden lg:contents flex-wrap items-start justify-end gap-6 sm:gap-8">
                        <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                            <Image
                                alt=""
                                src="/assets/images/aboutus-page/about-us1.webp"
                                className="aspect-7/5 w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                                width={1152}
                                height={842}
                                data-aos="fade-left"
                            />
                        </div>
                        <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                            <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                                <Image
                                    alt=""
                                    src="/assets/images/aboutus-page/about-us3.webp"
                                    className="aspect-4/3 w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover object-top"
                                    width={768}
                                    height={604}
                                    data-aos="fade-right"

                                />
                            </div>
                            <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                                <Image
                                    alt=""
                                    src="/assets/images/aboutus-page/about-us4.webp"
                                    className="aspect-7/5 w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                                    width={1152}
                                    height={842}
                                    data-aos="fade-in"
                                />
                            </div>
                            <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                                <Image
                                    alt=""
                                    src="/assets/images/aboutus-page/about-us2.webp"
                                    className="aspect-4/3 w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                                    width={768}
                                    height={604}
                                    data-aos="fade-left"

                                />
                            </div>
                            
                            {/* MAIS IMAGENS AQUI */}
                        </div>
                    </div>
                    
                    {/* Linha 02 */}
                    <div className="hidden lg:contents flex-wrap items-start justify-end gap-6 sm:gap-8">
                        <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">

                            <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                                <Image
                                    alt=""
                                    src="/assets/images/aboutus-page/about-us6.webp"
                                    className="aspect-4/3 w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                                    width={768}
                                    height={604}
                                    data-aos="fade-left"
                                />
                            </div>

                            <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                                <Image
                                    alt=""
                                    src="/assets/images/aboutus-page/about-us5.webp"
                                    className="aspect-7/5 w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover object-top"
                                    width={1152}
                                    height={842}
                                    data-aos="fade-right"
                                />
                            </div>
                            {/* MAIS IMAGENS AQUI */}
                        </div>
                    </div>

                    {/* Mobile Images Column */}
                    <div className="flex flex-col gap-6 lg:hidden mt-8">
                        <Image
                            alt=""
                            src="/assets/images/aboutus-page/about-us1.webp"
                            className="w-full rounded-2xl bg-gray-50 object-cover"
                            width={1152}
                            height={842}
                            data-aos="fade-up"
                        />
                        <Image
                            alt=""
                            src="/assets/images/aboutus-page/about-us3.webp"
                            className="w-full rounded-2xl bg-gray-50 object-cover object-top"
                            width={768}
                            height={604}
                            data-aos="fade-up"
                        />
                        <Image
                            alt=""
                            src="/assets/images/aboutus-page/about-us4.webp"
                            className="w-full rounded-2xl bg-gray-50 object-cover"
                            width={1152}
                            height={842}
                            data-aos="fade-up"
                        />
                        <Image
                            alt=""
                            src="/assets/images/aboutus-page/about-us2.webp"
                            className="w-full rounded-2xl bg-gray-50 object-cover"
                            width={768}
                            height={604}
                            data-aos="fade-up"
                        />
                        <Image
                            alt=""
                            src="/assets/images/aboutus-page/about-us6.webp"
                            className="w-full rounded-2xl bg-gray-50 object-cover"
                            width={768}
                            height={604}
                            data-aos="fade-up"
                        />
                        <Image
                            alt=""
                            src="/assets/images/aboutus-page/about-us5.webp"
                            className="w-full rounded-2xl bg-gray-50 object-cover object-top"
                            width={1152}
                            height={842}
                            data-aos="fade-up"
                        />
                    </div>
                </div>
            </div>
        </div >

    )
}