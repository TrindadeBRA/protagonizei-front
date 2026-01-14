import Script from "next/script";
import { WhatsAppFloat } from "../../src/components/WhatsAppFloat";
import Footer from "@/src/components/Footer";
import AOS_Init from "@/src/components/AOS_Init";
import { CookieConsentComponent } from "@/src/components/CookieConsentComponent";
import { GoogleAnalytics } from "@next/third-parties/google";
import customFetch from "@/src/services/custom-fetch";
import { getGetConfigsUrl } from "@/src/services/api";
import Navigation from "@/src/components/Navigation";
import Image from "next/image";

export async function getSiteConfig() {
  const { data } = await customFetch<any>(getGetConfigsUrl());
  return {
    gaId: data?.google_analytics_id || "",
    whatsAppUrl: data?.whatsapp_url || "",
    gtmId: data?.google_tag_manager_id || "",
    metaPixelId: data?.meta_pixel_id || ""
  };
}

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { gaId, whatsAppUrl, gtmId, metaPixelId } = await getSiteConfig();

  return (
    <>
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

      {/* Meta Pixel Code */}
      {metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${metaPixelId}');
fbq('track', 'PageView');`}
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

      {/* Google Tag Manager noscript */}
      {gtmId && (
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
        </noscript>
      )}

      {/* Meta Pixel noscript */}
      {metaPixelId && (
        <noscript>
          <Image height="1" width="1" className="hidden" alt="Meta Pixel"
            src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
          />
        </noscript>
      )}

      <div className="!bg-white !text-black !top-0 !pt-16 overflow-x-hidden">
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
      </div>
    </>
  );
}

