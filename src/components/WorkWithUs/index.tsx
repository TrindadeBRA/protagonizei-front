import { WorkWithUsForm } from './form'

export default function WorkWithUs() {
    return (
        <div className="relative isolate bg-white overflow-x-hidden">
            <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                <div className="relative px-6 py-24 lg:static lg:px-8">
                    <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                        <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
                            <svg
                                aria-hidden="true"
                                className="absolute inset-0 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                            >
                                <defs>
                                    <pattern
                                        x="100%"
                                        y={-1}
                                        id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                                        width={200}
                                        height={200}
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <path d="M130 200V.5M.5 .5H200" fill="none" />
                                    </pattern>
                                </defs>
                                <rect fill="white" width="100%" height="100%" strokeWidth={0} />
                                <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                                    <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                                </svg>
                                <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                            Faça parte do nosso time!
                        </h2>
                        <p className="mt-6 text-lg/8 text-gray-600 font-semibold">
                            Junte-se a uma equipe inovadora e dinâmica que está transformando o futuro do marketing digital.
                        </p>
                        <p className="mt-6 text-lg/8 text-gray-600 font-normal">
                            Estamos sempre em busca de talentos apaixonados por tecnologia e criatividade. Ao se candidatar, você concorda com o processamento dos seus dados para fins de recrutamento. Suas informações serão tratadas com total confidencialidade e segurança, em conformidade com a LGPD. Caso não seja selecionado, seus dados serão excluídos após 6 meses. Você pode solicitar a exclusão ou atualização dos seus dados a qualquer momento.
                        </p>
                    </div>
                </div>
                <WorkWithUsForm />
            </div>
        </div>
    )
}
