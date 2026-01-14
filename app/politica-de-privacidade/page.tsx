import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { AlertBox } from "@/src/components/ui/alert-box";

export const metadata: Metadata = {
  title: "Política de Privacidade - Protagonizei",
  description: "Política de Privacidade e Proteção de Dados Pessoais do Protagonizei em conformidade com a LGPD",
};

export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <div className="mb-8">
          <Link 
            href="/" 
            className="text-pink-main hover:text-pink-700 font-semibold mb-4 inline-block"
          >
            ← Voltar para o site
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Política de Privacidade
          </h1>
          <p className="text-gray-600 text-lg">
            Última atualização: 13 de janeiro de 2026
          </p>
        </div>

        <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
          <section>
            <p className="text-lg mb-4">
              A <strong>Protagonizei</strong> respeita sua privacidade e trata seus dados pessoais em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018)</strong>.
            </p>
            <p className="text-lg">
              Ao utilizar nosso site, você concorda com esta Política.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">1. Quais dados coletamos</h2>
            <p>
              Coletamos apenas os dados necessários para prestar nossos serviços e melhorar sua experiência, incluindo:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li><strong>Dados de cadastro e contato:</strong> nome, e-mail, telefone</li>
              <li><strong>Dados do pedido:</strong> nome da criança, idade, gênero, tom de pele e foto enviada</li>
              <li><strong>Dados de navegação:</strong> IP, navegador, páginas acessadas, cookies e tecnologias similares</li>
              <li><strong>Currículos e dados profissionais,</strong> quando enviados via "Trabalhe Conosco"</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">2. Como usamos seus dados</h2>
            <p>
              Utilizamos seus dados para:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>Criar e entregar o livro infantil personalizado</li>
              <li>Enviar comunicações sobre pedidos e suporte</li>
              <li>Processar pagamentos</li>
              <li>Enviar comunicações de marketing, ofertas e conteúdos relacionados</li>
              <li>Realizar análises, métricas e melhorias do site</li>
              <li>Exibir publicidade personalizada (Google e Meta)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">3. Marketing e publicidade</h2>
            <p>
              Ao preencher qualquer formulário em nosso site, seus dados poderão ser utilizados para:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>E-mail marketing e automações</li>
              <li>Contato comercial via e-mail, WhatsApp ou telefone</li>
              <li>Publicidade direcionada (Google e Meta)</li>
            </ul>
            <AlertBox>
              Você pode cancelar comunicações ou solicitar exclusão a qualquer momento.
            </AlertBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">4. Cookies e tecnologias de rastreamento</h2>
            <p>
              Utilizamos ferramentas como:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li><strong>Google Analytics</strong></li>
              <li><strong>Google Tag Manager</strong></li>
              <li><strong>Meta Pixel (Facebook/Instagram)</strong></li>
            </ul>
            <p>
              Essas ferramentas auxiliam na análise de uso e em campanhas publicitárias.
            </p>
            <AlertBox>
              O consentimento é gerenciado pelo banner de cookies do site.
            </AlertBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">5. Base legal do tratamento</h2>
            <p>
              O tratamento dos dados ocorre com base em:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li><strong>Consentimento</strong></li>
              <li><strong>Execução de contrato</strong></li>
              <li><strong>Legítimo interesse,</strong> sempre respeitando seus direitos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">6. Compartilhamento de dados</h2>
            <p>
              Seus dados podem ser compartilhados com:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>Plataformas de anúncios (Google e Meta)</li>
              <li>Prestadores de serviços essenciais (pagamento, hospedagem, e-mails)</li>
              <li>Autoridades legais, quando exigido</li>
            </ul>
            <p className="font-semibold text-gray-800 mt-4">
              Não vendemos seus dados pessoais.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">7. Retenção dos dados</h2>
            <p>
              Os dados são mantidos apenas pelo tempo necessário para cumprir suas finalidades legais, contratuais ou comerciais, ou até solicitação de exclusão.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">8. Direitos do titular (LGPD)</h2>
            <p>
              Você pode, a qualquer momento:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>Acessar, corrigir ou excluir seus dados</li>
              <li>Revogar consentimentos</li>
              <li>Solicitar portabilidade ou oposição ao tratamento</li>
            </ul>
            <AlertBox>
              <p className="mb-2">
                <strong>contato@thetrinityweb.com.br</strong>
              </p>
              <p>
                Responderemos em até 15 dias.
              </p>
            </AlertBox>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">9. Dados de crianças</h2>
            <p>
              Os dados de crianças são fornecidos exclusivamente por seus responsáveis legais, apenas para a criação do livro personalizado.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">10. Segurança</h2>
            <p>
              Adotamos medidas técnicas e organizacionais para proteger seus dados.
            </p>
            <p>
              Nenhum sistema é totalmente seguro, mas seguimos boas práticas de mercado.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">11. Alterações</h2>
            <p>
              Esta Política pode ser atualizada a qualquer momento.
            </p>
            <p>
              A versão vigente estará sempre disponível no site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">12. Contato / Encarregado de Dados (DPO)</h2>
            <div className="bg-gray-50 rounded-lg p-6 my-4 border border-gray-400 shadow-md">
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
              <p className="mb-3 text-gray-700">
                A <strong className="font-semibold text-black">TrinityWeb</strong> é a agência responsável pelo desenvolvimento e manutenção deste site, especializada em transformar ideias em negócios através de soluções web modernas, incluindo desenvolvimento de sites, otimização, branding, marketing digital e segurança.
              </p>
              <div className="space-y-2 mt-4 font-semibold">
                <p className="mb-2">
                  <a href="mailto:contato@thetrinityweb.com.br" className="text-black hover:underline">contato@thetrinityweb.com.br</a>
                </p>
                <p className="mb-2">
                  <a href="https://thetrinityweb.com.br" className="text-black hover:underline" target="_blank" rel="noopener noreferrer">thetrinityweb.com.br</a>
                </p>
              </div>
            </div>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <Link 
            href="/" 
            className="inline-block bg-gradient-to-r from-pink-main to-blue-main text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Voltar para o site
          </Link>
        </div>
      </div>
    </div>
  );
}
