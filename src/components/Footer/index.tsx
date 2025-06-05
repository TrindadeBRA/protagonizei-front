import { getGetConfigsUrl, getGetProductLineSlugsUrl, getProductLineSlugsResponse } from '@/src/services/api';
import customFetch from '@/src/services/custom-fetch';
import { GetProductLineSlugs200DataItem } from '@/src/services/model';
import Image from 'next/image'
import Link from 'next/link'
import { FaEnvelope, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';


async function getProductsLines(): Promise<getProductLineSlugsResponse> {
  try {
    const response = await customFetch<getProductLineSlugsResponse>(getGetProductLineSlugsUrl());
    return response;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
}

async function getConfigs(): Promise<any> {
  try {
    const response = await customFetch<any>(getGetConfigsUrl());
    return response;
  } catch (error) {
    console.error('Erro ao buscar configs:', error);
    throw error;
  }
}

export default async function Footer() {
  const allProductsLinesResponse: getProductLineSlugsResponse = await getProductsLines();
  const allProductsLines: any = allProductsLinesResponse.data;

  const configs = await getConfigs();
  const whatsAppUrl = configs?.data?.whatsapp_url || "";

  const navigation = {
    solutions: [
      { name: 'Produtos', href: '/produtos' },
      { name: 'Mercados', href: '/#mercados' },
    ],
    company: [
      { name: 'Quem Somos', href: '/quem-somos' },
      { name: 'Equipe', href: '/quem-somos#equipe' },
      { name: 'Portal Inove', href: 'https://inove.tiken.com.br' },
      { name: 'Blog', href: '/blog' },
      { name: 'Trabalhe Conosco', href: '/trabalhe-conosco' },
    ],
    contact: [
      { name: 'contato@tiken.com.br', href: 'mailto:contato@tiken.com.br' },
      { name: 'vendas@tiken.com.br', href: 'mailto:vendas@tiken.com.br' },
      { name: 'WhatsApp', href: whatsAppUrl },
      { name: '+55 11 5555-2080', href: whatsAppUrl },
    ],
    legal: [
      { name: 'Política de Privacidade', href: '/politica-de-privacidade' },
    ],
    social: [
      {
        name: 'Instagram',
        href: 'https://www.instagram.com/tiken.eq/',
        icon: () => (
          <FaInstagram className="size-6" />
        ),
      },
      {
        name: 'Linkedin',
        href: 'https://www.linkedin.com/company/tiken-eq/',
        icon: () => (
          <FaLinkedinIn className="size-6" />
        ),
      },
      {
        name: 'Whatsapp',
        href: whatsAppUrl,
        icon: () => (
          <FaWhatsapp className="size-6" />
        ),
      },
      {
        name: 'Email',
        href: 'mailto:contato@tiken.com.br',
        icon: () => (
          <FaEnvelope className="size-6" />
        ),
      },
    ],
  }

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Image
              alt="Company name"
              src="/assets/logo-header.png"
              className="h-14 w-auto"
              width={56}
              height={56}
            />
            <p className="text-sm/6 text-balance text-gray-600">
              Criamos conexões e soluções através da química para inovar o mundo.
            </p>
            <div className="flex gap-x-6">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-600 hover:text-gray-800">
                  <span className="sr-only">{item.name}</span>
                  <item.icon/>
                </a>
              ))}
            </div>
            <p className="text-sm/6 text-balance text-gray-600 mt-8">
              R. Vicente de Paula Souza e Silva, 466<br />
              Assunção, São Bernardo do Campo - SP<br />
              09861-690
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm/6 font-semibold text-gray-900">Soluções</h3>
                <ul role="list" className="mt-2">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </a>
                    </li>
                  ))}
                  {allProductsLines?.map((item: GetProductLineSlugs200DataItem) => (
                    <li key={item.id}>
                      <Link href={`/linha-de-produtos/${item.slug}`} className="text-sm/6 text-gray-600 hover:text-gray-900">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold text-gray-900">Empresa</h3>
                <ul role="list" className="mt-2">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm/6 font-semibold text-gray-900">Contato</h3>
                <ul role="list" className="mt-2">
                  {navigation.contact.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold text-gray-900">Legal</h3>
                <ul role="list" className="mt-2">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 flex flex-col lg:flex-row gap-y-4 justify-between">
          <p className="text-sm/6 text-gray-600 text-center lg:text-left">© {new Date().getFullYear()} TIKEN - Todos os Direitos Reservados.</p>
          <p className="text-sm/6 text-gray-600 text-center lg:text-right">Desenvolvido por <Link href="https://www.thetrinityweb.com.br" className="text-base text-gray-600 hover:text-gray-800 font-bold font-inter" target="_blank">Trinity Web</Link></p>
        </div>
      </div>
    </footer>
  )
}
