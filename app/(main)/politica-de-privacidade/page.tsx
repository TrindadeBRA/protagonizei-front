import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { AlertBox } from "@/src/components/ui/alert-box";
import { Shield, Database, Target, Mail, Cookie, Scale, Share2, Clock, UserCheck, Baby, Lock, FileEdit, Phone, ArrowRightIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidade - Protagonizei",
  description: "Política de Privacidade e Proteção de Dados Pessoais do Protagonizei em conformidade com a LGPD",
};

export default function PoliticaPrivacidadePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 overflow-hidden">
      {/* Elementos decorativos flutuantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 md:opacity-40">
        <div className="absolute top-20 left-10 float-animation">
          <Image src="/assets/images/asset-star.png" alt="Star" width={32} height={32} sizes="32px" />
        </div>
        <div className="absolute top-40 right-20 float-animation" style={{ animationDelay: '1s' }}>
          <Image src="/assets/images/asset-heart.png" alt="Heart" width={32} height={32} sizes="32px" />
        </div>
        <div className="absolute bottom-40 left-20 float-animation" style={{ animationDelay: '2s' }}>
          <Image src="/assets/images/asset-star.png" alt="Star" width={32} height={32} />
        </div>
        <div className="absolute top-60 left-1/3 float-animation" style={{ animationDelay: '0.5s' }}>
          <Image src="/assets/images/asset-star-2.png" alt="Star" width={32} height={32} sizes="32px" />
        </div>
        <div className="absolute bottom-60 right-1/4 float-animation" style={{ animationDelay: '1.5s' }}>
          <Image src="/assets/images/asset-heart-2.png" alt="Heart" width={32} height={32} sizes="32px" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center">
            <Link 
              href="/" 
              className="text-pink-main hover:text-pink-700 font-semibold mb-6 inline-flex items-center gap-2 transition-colors"
            >
              ← Voltar para o site
            </Link>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-10 h-10 md:w-12 md:h-12 text-pink-main" />
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
                <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent">
                  Política de Privacidade
                </span>
              </h1>
            </div>
            <p className="text-gray-600 text-lg md:text-xl">
              Última atualização: 13 de janeiro de 2026
            </p>
          </div>

          {/* Introdução */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 mb-8 border-l-4 border-pink-main">
            <p className="text-lg md:text-xl mb-4 text-gray-800 leading-relaxed">
              A <strong className="text-pink-main">Protagonizei</strong> respeita sua privacidade e trata seus dados pessoais em conformidade com a <strong className="text-blue-main">Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018)</strong>.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Ao utilizar nosso site, você concorda com esta Política.
            </p>
          </div>

          {/* Seções organizadas em cards */}
          <div className="space-y-6">
            {/* Seção 1 */}
            <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl p-6 md:p-8 border-l-4 border-pink-main shadow-lg">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <Database className="w-6 h-6 md:w-7 md:h-7 text-pink-main flex-shrink-0" />
                <span>1. Quais dados coletamos</span>
              </h2>
              <p className="text-gray-700 mb-4 text-base md:text-lg leading-relaxed">
                Coletamos apenas os dados necessários para prestar nossos serviços e melhorar sua experiência, incluindo:
              </p>
              <ul className="space-y-2 ml-4 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-pink-main font-bold mt-1">•</span>
                  <span><strong>Dados de cadastro e contato:</strong> nome, e-mail, telefone</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-main font-bold mt-1">•</span>
                  <span><strong>Dados do pedido:</strong> nome da criança, idade, gênero, tom de pele e foto enviada</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-main font-bold mt-1">•</span>
                  <span><strong>Dados de navegação:</strong> IP, navegador, páginas acessadas, cookies e tecnologias similares</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-main font-bold mt-1">•</span>
                  <span><strong>Currículos e dados profissionais,</strong> quando enviados via &quot;Trabalhe Conosco&quot;</span>
                </li>
              </ul>
            </div>

            {/* Seção 2 */}
            <div className="bg-gradient-to-r from-blue-50 to-pink-50 rounded-xl p-6 md:p-8 border-l-4 border-blue-main shadow-lg">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <Target className="w-6 h-6 md:w-7 md:h-7 text-blue-main flex-shrink-0" />
                <span>2. Como usamos seus dados</span>
              </h2>
              <p className="text-gray-700 mb-4 text-base md:text-lg leading-relaxed">
                Utilizamos seus dados para:
              </p>
              <ul className="space-y-2 ml-4 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-main font-bold mt-1">•</span>
                  <span>Criar e entregar o livro infantil personalizado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-main font-bold mt-1">•</span>
                  <span>Enviar comunicações sobre pedidos e suporte</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-main font-bold mt-1">•</span>
                  <span>Processar pagamentos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-main font-bold mt-1">•</span>
                  <span>Enviar comunicações de marketing, ofertas e conteúdos relacionados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-main font-bold mt-1">•</span>
                  <span>Realizar análises, métricas e melhorias do site</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-main font-bold mt-1">•</span>
                  <span>Exibir publicidade personalizada (Google e Meta)</span>
                </li>
              </ul>
            </div>

            {/* Seção 3 */}
            <div className="bg-gradient-to-r from-blue-50 to-pink-50 rounded-xl p-6 md:p-8 border-l-4 border-blue-main shadow-lg">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <Mail className="w-6 h-6 md:w-7 md:h-7 text-blue-main flex-shrink-0" />
                <span>3. Marketing e publicidade</span>
              </h2>
              <p className="text-gray-700 mb-4 text-base md:text-lg leading-relaxed">
                Ao preencher qualquer formulário em nosso site, seus dados poderão ser utilizados para:
              </p>
              <ul className="space-y-2 ml-4 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-main font-bold mt-1">•</span>
                  <span>E-mail marketing e automações</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-main font-bold mt-1">•</span>
                  <span>Contato comercial via e-mail, WhatsApp ou telefone</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-main font-bold mt-1">•</span>
                  <span>Publicidade direcionada (Google e Meta)</span>
                </li>
              </ul>
              <AlertBox>
                Você pode cancelar comunicações ou solicitar exclusão a qualquer momento.
              </AlertBox>
            </div>

            {/* Seção 4 */}
            <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl p-6 md:p-8 border-l-4 border-pink-main shadow-lg">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <Cookie className="w-6 h-6 md:w-7 md:h-7 text-pink-main flex-shrink-0" />
                <span>4. Cookies e tecnologias de rastreamento</span>
              </h2>
              <p className="text-gray-700 mb-4 text-base md:text-lg leading-relaxed">
                Utilizamos ferramentas como:
              </p>
              <ul className="space-y-2 ml-4 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-pink-main font-bold mt-1">•</span>
                  <span><strong>Google Analytics</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-main font-bold mt-1">•</span>
                  <span><strong>Google Tag Manager</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-main font-bold mt-1">•</span>
                  <span><strong>Meta Pixel (Facebook/Instagram)</strong></span>
                </li>
              </ul>
              <p className="text-gray-700 mb-4 text-base leading-relaxed">
                Essas ferramentas auxiliam na análise de uso e em campanhas publicitárias.
              </p>
              <AlertBox>
                O consentimento é gerenciado pelo banner de cookies do site.
              </AlertBox>
            </div>

            {/* Seção 5 */}
            <div className="bg-gradient-to-r from-blue-50 to-pink-50 rounded-xl p-6 md:p-8 border-l-4 border-blue-main shadow-lg">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <Scale className="w-6 h-6 md:w-7 md:h-7 text-blue-main flex-shrink-0" />
                <span>5. Base legal do tratamento</span>
              </h2>
              <p className="text-gray-700 mb-4 text-base md:text-lg leading-relaxed">
                O tratamento dos dados ocorre com base em:
              </p>
              <ul className="space-y-2 ml-4 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-main font-bold mt-1">•</span>
                  <span><strong>Consentimento</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-main font-bold mt-1">•</span>
                  <span><strong>Execução de contrato</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-main font-bold mt-1">•</span>
                  <span><strong>Legítimo interesse,</strong> sempre respeitando seus direitos</span>
                </li>
              </ul>
            </div>

            {/* Seção 6 */}
            <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl p-6 md:p-8 border-l-4 border-pink-main shadow-lg">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <Share2 className="w-6 h-6 md:w-7 md:h-7 text-pink-main flex-shrink-0" />
                <span>6. Compartilhamento de dados</span>
              </h2>
              <p className="text-gray-700 mb-4 text-base md:text-lg leading-relaxed">
                Seus dados podem ser compartilhados com:
              </p>
              <ul className="space-y-2 ml-4 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-pink-main font-bold mt-1">•</span>
                  <span>Plataformas de anúncios (Google e Meta)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-main font-bold mt-1">•</span>
                  <span>Prestadores de serviços essenciais (pagamento, hospedagem, e-mails)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-main font-bold mt-1">•</span>
                  <span>Autoridades legais, quando exigido</span>
                </li>
              </ul>
              <AlertBox>
                <p className="font-semibold text-gray-800 text-base">
                  ✓ Não vendemos seus dados pessoais.
                </p>
              </AlertBox>
            </div>

            {/* Seção 7 */}
            <div className="bg-gradient-to-r from-blue-50 to-pink-50 rounded-xl p-6 md:p-8 border-l-4 border-blue-main shadow-lg">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <Clock className="w-6 h-6 md:w-7 md:h-7 text-blue-main flex-shrink-0" />
                <span>7. Retenção dos dados</span>
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Os dados são mantidos apenas pelo tempo necessário para cumprir suas finalidades legais, contratuais ou comerciais, ou até solicitação de exclusão.
              </p>
            </div>

            {/* Seção 8 */}
            <div className="bg-gradient-to-r from-blue-50 to-pink-50 rounded-xl p-6 md:p-8 border-l-4 border-blue-main shadow-lg">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <UserCheck className="w-6 h-6 md:w-7 md:h-7 text-blue-main flex-shrink-0" />
                <span>8. Direitos do titular (LGPD)</span>
              </h2>
              <p className="text-gray-700 mb-4 text-base md:text-lg leading-relaxed">
                Você pode, a qualquer momento:
              </p>
              <ul className="space-y-2 ml-4 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-blue-main font-bold mt-1">•</span>
                  <span>Acessar, corrigir ou excluir seus dados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-main font-bold mt-1">•</span>
                  <span>Revogar consentimentos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-main font-bold mt-1">•</span>
                  <span>Solicitar portabilidade ou oposição ao tratamento</span>
                </li>
              </ul>
              <AlertBox>
                <p className="mb-2">
                  <strong className="text-pink-main">contato@thetrinityweb.com.br</strong>
                </p>
                <p>
                  Responderemos em até 15 dias.
                </p>
              </AlertBox>
            </div>

            {/* Seção 9 */}
            <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl p-6 md:p-8 border-l-4 border-pink-main shadow-lg">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <Baby className="w-6 h-6 md:w-7 md:h-7 text-pink-main flex-shrink-0" />
                <span>9. Dados de crianças</span>
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Os dados de crianças são fornecidos exclusivamente por seus responsáveis legais, apenas para a criação do livro personalizado.
              </p>
            </div>

            {/* Seção 10 */}
            <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl p-6 md:p-8 border-l-4 border-pink-main shadow-lg">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <Lock className="w-6 h-6 md:w-7 md:h-7 text-pink-main flex-shrink-0" />
                <span>10. Segurança</span>
              </h2>
              <p className="text-gray-700 mb-3 text-base md:text-lg leading-relaxed">
                Adotamos medidas técnicas e organizacionais para proteger seus dados.
              </p>
              <p className="text-gray-700 text-base leading-relaxed">
                Nenhum sistema é totalmente seguro, mas seguimos boas práticas de mercado.
              </p>
            </div>

            {/* Seção 11 */}
            <div className="bg-gradient-to-r from-blue-50 to-pink-50 rounded-xl p-6 md:p-8 border-l-4 border-blue-main shadow-lg">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <FileEdit className="w-6 h-6 md:w-7 md:h-7 text-blue-main flex-shrink-0" />
                <span>11. Alterações</span>
              </h2>
              <p className="text-gray-700 mb-3 text-base md:text-lg leading-relaxed">
                Esta Política pode ser atualizada a qualquer momento.
              </p>
              <p className="text-gray-700 text-base leading-relaxed">
                A versão vigente estará sempre disponível no site.
              </p>
            </div>

            {/* Seção 12 */}
            <div className="bg-gradient-to-r from-blue-50 to-pink-50 rounded-xl p-6 md:p-8 border-l-4 border-blue-main shadow-lg">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <Phone className="w-6 h-6 md:w-7 md:h-7 text-blue-main flex-shrink-0" />
                <span>12. Contato / Encarregado de Dados (DPO)</span>
              </h2>
              <AlertBox className="rounded-xl">
                <div className="mb-4 flex items-center gap-4">
                  <Link 
                    href="https://thetrinityweb.com.br" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <Image 
                      src="https://thetrinityweb.com.br/assets/img/root/logo-black.webp" 
                      alt="Trinity Web Logo" 
                      width={150} 
                      height={50}
                      className="h-10 w-auto"
                    />
                  </Link>
                </div>
                <p className="mb-3 text-gray-700 leading-relaxed">
                  A <strong className="font-semibold text-gray-900">TrinityWeb</strong> é a agência responsável pelo desenvolvimento e manutenção deste site, especializada em transformar ideias em negócios através de soluções web modernas, incluindo desenvolvimento de sites, otimização, branding, marketing digital e segurança.
                </p>
                <div className="space-y-2 mt-4">
                  <p className="mb-2">
                    <a href="mailto:contato@thetrinityweb.com.br" className="text-blue-main hover:text-blue-700 font-semibold underline transition-colors">contato@thetrinityweb.com.br</a>
                  </p>
                  <p className="mb-2">
                    <a href="https://thetrinityweb.com.br" className="text-blue-main hover:text-blue-700 font-semibold underline transition-colors" target="_blank" rel="noopener noreferrer">thetrinityweb.com.br</a>
                  </p>
                </div>
              </AlertBox>
            </div>
          </div>

          {/* Botão de voltar */}
          <div className="mt-12 pt-8 border-t-2 border-pink-200 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 magical-border border-4 border-transparent text-white font-bold py-3 px-8 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300 font-englebert"
            >
              Voltar para o site
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
