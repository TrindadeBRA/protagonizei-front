import { InformationCircleIcon } from '@heroicons/react/20/solid'

export default function PrivacyPolicy() {
    return (
        <div className="bg-white px-6 py-24 lg:px-8 overflow-x-hidden">
            <div className="mx-auto max-w-7xl text-base/7 text-gray-700">
                <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl" data-aos="fade-in">
                    Tiken: Compromisso com sua Privacidade
                </h1>
                <p className="mt-6 text-xl/8" data-aos="fade-in">
                    Esta Política de Privacidade descreve como a Tiken coleta, utiliza, armazena e protege seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                </p>

                <div className="mt-10">
                    <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900" data-aos="fade-in">
                        Dados Coletados e Finalidade
                    </h2>
                    <ul role="list" className="mt-8 space-y-8 text-gray-600" data-aos="fade-in">
                        <li className="flex gap-x-3">
                            <span className="mt-1 size-5 flex-none text-[#0399c4]">📄</span>
                            <span>
                                <strong className="font-semibold text-gray-900">Formulários de Contato, Orçamento e Trabalhe Conosco:</strong> Coletamos nome, e-mail, telefone, mensagem e, quando aplicável, arquivos anexados. Utilizamos essas informações para responder suas solicitações, prestar atendimento, enviar propostas ou avaliar currículos.
                            </span>
                        </li>
                        <li className="flex gap-x-3">
                            <span className="mt-1 size-5 flex-none text-[#0399c4]">✅</span>
                            <span>
                                <strong className="font-semibold text-gray-900">Base Legal:</strong> Os dados são tratados com base no consentimento do titular, legítimo interesse e cumprimento de obrigação pré-contratual, conforme os artigos 7º, I, V e IX da LGPD.
                            </span>
                        </li>
                    </ul>

                    <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900">
                        Armazenamento e Segurança
                    </h2>
                    <p className="mt-6" data-aos="fade-in">
                        Seus dados são armazenados com segurança em nossa infraestrutura, com medidas técnicas e organizacionais para prevenir acessos não autorizados, perda ou uso indevido.
                    </p>

                    <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900">
                        Compartilhamento
                    </h2>
                    <p className="mt-6" data-aos="fade-in">
                        Não compartilhamos seus dados com terceiros, salvo por obrigação legal ou para execução de atividades específicas com parceiros contratualmente obrigados à confidencialidade e segurança da informação.
                    </p>

                    <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900">
                        Seus Direitos
                    </h2>
                    <ul role="list" className="mt-8 space-y-6 text-gray-600" data-aos="fade-in">
                        <li>✔️ Acesso, correção e exclusão de dados;</li>
                        <li>✔️ Revogação do consentimento;</li>
                        <li>✔️ Solicitação de portabilidade;</li>
                        <li>✔️ Informações sobre o uso e compartilhamento de seus dados.</li>
                    </ul>

                    <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900">
                        Consentimento e Atualizações
                    </h2>
                    <p className="mt-6" data-aos="fade-in">
                        Ao preencher nossos formulários, você consente com esta Política. Poderemos atualizá-la a qualquer momento. Recomendamos a leitura periódica.
                    </p>

                    <p className="mt-6" data-aos="fade-in">
                        Para exercer seus direitos ou tirar dúvidas, entre em contato com nosso Encarregado de Proteção de Dados (DPO): <strong>privacidade@tiken.com.br</strong>
                    </p>

                    <figure className="mt-16 border-l border-[#0399c4] pl-9" data-aos="fade-in">
                        <blockquote className="font-semibold text-gray-900">
                            <p>
                                &quot;Na Tiken, sua privacidade é uma prioridade. Tratamos seus dados com respeito, segurança e transparência.&quot;
                            </p>
                        </blockquote>
                        <figcaption className="mt-4 flex gap-x-2 text-sm/6 text-gray-500">
                            <InformationCircleIcon aria-hidden="true" className="mt-0.5 size-5 flex-none text-gray-300" />
                            Proteção de dados: nosso compromisso com você
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    )
}
