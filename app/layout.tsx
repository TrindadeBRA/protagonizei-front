import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "toastify-js/src/toastify.css"
import Navigation from "@/src/components/Navigation";
import Script from "next/script";
import { WhatsAppFloat } from "../src/components/WhatsAppFloat";
import Footer from "@/src/components/Footer";
import AOS_Init from "@/src/components/AOS_Init";
import { CookieConsentComponent } from "@/src/components/CookieConsentComponent";
import { GoogleAnalytics } from "@next/third-parties/google";
import customFetch from "@/src/services/custom-fetch";
import { getGetConfigsUrl } from "@/src/services/api";

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tiken.com.br'),
  description: 'Tiken é uma empresa que cria soluções para o mundo através da química',
  openGraph: {
    images: [
      {
        url: "/assets/images/ogimage.webp",
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
        className={`${inter.variable} antialiased !bg-white !text-black pt-[96px] !top-0`}
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