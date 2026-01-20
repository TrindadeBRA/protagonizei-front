import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Obrigado pela sua inscrição! | Protagonizei',
  description: '🎉 Obrigado por participar do nosso sorteio! Sua inscrição foi realizada com sucesso. Interaja com nossos posts no Instagram e aumente suas chances de ganhar um livro personalizado!',
  keywords: [
    'sorteio livro personalizado',
    'inscrição sorteio',
    'obrigado protagonizei',
    'sorteio mensal'
  ],
  authors: [{ name: 'Protagonizei' }],
  creator: 'Protagonizei',
  publisher: 'Protagonizei',
  metadataBase: new URL('https://protagonizei.com'),
  alternates: {
    canonical: '/sorteio/obrigado',
  },
  openGraph: {
    title: 'Obrigado pela sua inscrição! | Protagonizei',
    description: '🎉 Obrigado por participar do nosso sorteio! Sua inscrição foi realizada com sucesso. Interaja com nossos posts e aumente suas chances de ganhar!',
    url: 'https://protagonizei.com/sorteio/obrigado',
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
    title: 'Obrigado pela sua inscrição! | Protagonizei',
    description: '🎉 Obrigado por participar do nosso sorteio! Sua inscrição foi realizada com sucesso.',
    images: ['/assets/images/ogimage.jpg'],
    creator: '@protagonizei',
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function ObrigadoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
