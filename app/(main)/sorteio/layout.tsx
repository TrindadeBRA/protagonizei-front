import type { Metadata } from 'next'
import Script from 'next/script'


const sorteioStructuredData = {
  "@context": "https://schema.org",
  "@type": "Competition",
  "name": "Sorteio Mensal - Livro Personalizado Protagonizei",
  "description": "Participe do sorteio mensal e ganhe um livro infantil personalizado digital onde seu filho é o protagonista da história com nome, rosto e características únicas.",
  "url": "https://protagonizei.com/sorteio",
  "image": "https://protagonizei.com/assets/images/ogimage.jpg",
  "startDate": new Date().toISOString().split('T')[0],
  "competitor": {
    "@type": "Organization",
    "name": "Protagonizei",
    "url": "https://protagonizei.com"
  },
  "prize": {
    "@type": "Offer",
    "name": "Livro Infantil Personalizado Digital",
    "description": "Livro infantil personalizado digital com a criança como protagonista, incluindo nome e rosto de forma única e personalizada",
    "category": "Livro Digital Personalizado",
    "availability": "https://schema.org/InStock"
  },
  "termsOfService": "https://protagonizei.com/politica-de-privacidade",
  "slogan": "Participe e ganhe um livro personalizado gratuito!",
  "audience": {
    "@type": "Audience",
    "audienceType": "Famílias com crianças"
  }
}

export const metadata: Metadata = {
  title: 'Sorteio Livro Personalizado Gratuito | Protagonizei',
  description: '🎁 Participe do sorteio mensal e ganhe um livro personalizado digital! Preencha o formulário e concorra. Sorteio gratuito toda primeira semana do mês.',
  keywords: [
    'sorteio livro personalizado',
    'sorteio livro infantil gratuito',
    'ganhar livro personalizado',
    'sorteio protagonizei',
    'sorteio livro com nome da criança',
    'concurso livro personalizado',
    'sorteio mensal livro infantil',
    'livro personalizado digital gratuito',
    'sorteio grátis livro infantil'
  ],
  authors: [{ name: 'Protagonizei' }],
  creator: 'Protagonizei',
  publisher: 'Protagonizei',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://protagonizei.com'),
  alternates: {
    canonical: '/sorteio',
  },
  openGraph: {
    title: 'Sorteio Livro Personalizado Gratuito | Protagonizei',
    description: '🎁 Participe do sorteio mensal e ganhe um livro personalizado digital onde seu filho é o protagonista! Preencha o formulário e concorra. Totalmente gratuito.',
    url: 'https://protagonizei.com/sorteio',
    siteName: 'Protagonizei',
    images: [
      {
        url: '/assets/images/ogimage.jpg',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sorteio Livro Personalizado Gratuito | Protagonizei',
    description: '🎁 Participe do sorteio mensal e ganhe um livro personalizado digital! Preencha o formulário e concorra.',
    images: ['/assets/images/ogimage.jpg'],
    creator: '.app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function SorteioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Script
        id="sorteio-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sorteioStructuredData) }}
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}

