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
                            Seja Tiken!
                        </h2>
                        <p className="mt-6 text-lg/8 text-gray-600 font-semibold">
                        Preencha o formulário abaixo com suas informações pessoais e envie seu currículo para se candidatar a oportunidades de emprego conosco.
                        </p>
                        <p className="mt-6 text-lg/8 text-gray-600 font-normal">
                        Ao enviar seu nome, e-mail e currículo através deste formulário, você concorda com a coleta, armazenamento e processamento desses dados para fins de recrutamento e seleção. Seus dados serão mantidos em sigilo e não serão compartilhados sem seu consentimento. Após avaliação, seus dados serão excluídos, a menos que você seja selecionado para uma oportunidade de emprego. Você tem direito de solicitar acesso, retificação, exclusão ou portabilidade de seus dados. Entre em contato para mais informações.
                        </p>
                    </div>
                </div>
                <WorkWithUsForm />
            </div>
        </div>
    )
}
