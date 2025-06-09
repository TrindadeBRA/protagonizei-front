import type { Metadata } from "next";
import { Comic_Neue, Englebert, Fredoka, Inter } from "next/font/google";
import "./globals.css";
import "toastify-js/src/toastify.css"
import Script from "next/script";
import { WhatsAppFloat } from "../src/components/WhatsAppFloat";
import Footer from "@/src/components/Footer";
import AOS_Init from "@/src/components/AOS_Init";
import { CookieConsentComponent } from "@/src/components/CookieConsentComponent";
import { GoogleAnalytics } from "@next/third-parties/google";
import customFetch from "@/src/services/custom-fetch";
import { getGetConfigsUrl } from "@/src/services/api";
import Navigation from "@/src/components/Navigation";

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
  metadataBase: new URL('https://protagonizei.thetrinityweb.com.br/'),// Mudar para protagonistaizei.com
  description: 'Crie um livro infantil digital personalizado onde seu filho é o protagonista com nome, rosto e magia. Este é um presente único, emocional e educativo, com entrega 100% digital (PDF enviado por e-mail). Oferecemos uma experiência simples e de baixo custo, sem a necessidade de login ou e-commerce tradicional. Transforme a leitura em uma aventura inesquecível e veja a criança se reconhecer como protagonista.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/icon-192.png', sizes: '180x180' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { gaId, whatsAppUrl, gtmId } = await getSiteConfig();

  return (
    <html lang="pt-BR">


      <head>
        {/* Google Tag Manager */}
        {gtmId && (
          <Script id="google-tag-manager" strategy="beforeInteractive">
            {`(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        )}


        {/* Google Translate scripts */}
        <Script
          id="google-translate-init"
          src="/assets/scripts/translation.js"
          strategy="beforeInteractive"
        />
        <Script
          id="google-translate-api"
          src="//translate.google.com/translate_a/element.js?cb=TranslateInit"
          strategy="afterInteractive"
        />

      </head>

      <body
        className={`${inter.variable} ${fredoka.variable} ${comicNeue.variable} ${englebert.variable} antialiased !bg-white !text-black !top-0 !pt-16`}
      >

        {/* Google Tag Manager */}
        {gtmId && (
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
          </noscript>
        )}

        <WhatsAppFloat whatsAppUrl={whatsAppUrl} />
        <AOS_Init />
        <Navigation />
        {children}
        <Footer />
        {
          gaId && (
            <GoogleAnalytics gaId={gaId} />
          )
        }
        <CookieConsentComponent />
      </body>
    </html>
  );
}

export async function getSiteConfig() {
  const { data } = await customFetch<any>(getGetConfigsUrl());
  return {
    gaId: data?.google_analytics_id || "",
    whatsAppUrl: data?.whatsapp_url || "",
    gtmId: data?.google_tag_manager_id || ""
  };
}