import type { Metadata } from "next";
import { Comic_Neue, Englebert, Fredoka, Inter } from "next/font/google";
import "./globals.css";
import "toastify-js/src/toastify.css"

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const englebert = Englebert({
  variable: '--font-englebert',
  subsets: ['latin'],
  weight: ['400'],
});
const fredoka = Fredoka({
  variable: '--font-fredoka',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const comicNeue = Comic_Neue({
  variable: '--font-comic-neue',
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://protagonizei.com/'),
  description: 'Crie um livro infantil digital personalizado onde seu filho é o protagonista com nome, rosto e magia. Este é um presente único, emocional e educativo, com entrega 100% digital (PDF enviado por e-mail). Oferecemos uma experiência simples e de baixo custo, sem a necessidade de login ou e-commerce tradicional. Transforme a leitura em uma aventura inesquecível e veja a criança se reconhecer como protagonista.',
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', sizes: 'any' },
      { url: '/assets/images/icon-64.png', type: 'image/png', sizes: '32x32' },
      { url: '/assets/images/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/assets/images/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/assets/images/icon-192.png', sizes: '180x180' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/assets/images/safari-pinned-tab.svg',
        color: '#000000',
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    images: [
      {
        url: "/assets/images/ogimage.jpg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${fredoka.variable} ${comicNeue.variable} ${englebert.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}