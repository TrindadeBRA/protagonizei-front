import BenefitsSection from "@/src/components/BenefitsSection";
import FormSection from "@/src/components/FormSection";
import ExamplesSection from "@/src/components/ExamplesSection";
import FAQSection from "@/src/components/FAQSection";
import HeroSection from "@/src/components/HeroSection";
import HowItWorksSection from "@/src/components/HowItWorksSection";
import RecentPostsSection from "@/src/components/RecentPostsSection";
import TestimonialsSection from "@/src/components/TestimonialsSection";
import CouponHandler from "@/src/components/CouponHandler";
import { getGetPostSlugsUrl, getPostSlugsResponse } from "@/src/services/api";
import customFetch from "@/src/services/custom-fetch";
import { GetPostSlugs200DataItem } from "@/src/services/model";
import Script from 'next/script';

export const metadata = {
  title: 'Protagonizei: Aqui seu filho é o protagonista da própria história!',
  description: 'Transformamos seu filho no protagonista da narrativa: com nome, rosto e magia em cada página, gerados por nossa IA. É mais que um livro, é uma experiência que encanta e inspira.',
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Protagonizei: Aqui seu filho é o protagonista da própria história!",
  "image": "https://protagonizei.com/og-image.jpg",
  "description": "Transformamos seu filho no protagonista da narrativa: com nome, rosto e magia em cada página, gerados por nossa IA. É mais que um livro, é uma experiência que encanta e inspira.",
  "brand": {
    "@type": "Brand",
    "name": "Protagonizei"
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "BRL",
    "deliveryLeadTime": "P1D",
    "itemCondition": "https://schema.org/NewCondition",
    "url": "https://protagonizei.com"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "150"
  },
  "review": {
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5"
    },
    "author": {
      "@type": "Person",
      "name": "Cliente Satisfeito"
    },
    "reviewBody": "Um presente incrível! Meu filho ficou encantado ao se ver como protagonista da história. A IA transformou a foto em uma narrativa única e mágica."
  }
};

async function getPostsPagination(): Promise<getPostSlugsResponse> {
  try {
    const response = await customFetch<getPostSlugsResponse>(
      getGetPostSlugsUrl({
        page: 1,
        per_page: 3
      })
    );
    return response;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
}

export default async function Home() {

  let recentPostsResponse: getPostSlugsResponse;
  try {
    recentPostsResponse = await getPostsPagination();
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
  const recentPosts = recentPostsResponse.data as GetPostSlugs200DataItem[];


  return (
    <>
      <CouponHandler />
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="afterInteractive"
      />
      <div id="hero">
        <HeroSection />
      </div>
      <div id="beneficios">
        <BenefitsSection />
      </div>
      <div id="como-funciona">
        <HowItWorksSection />
      </div>
      <div id="exemplos">
        <ExamplesSection />
      </div>
      <div id="depoimentos">
        <TestimonialsSection />
      </div>
      {/* <div id="posts-recentes">
        <RecentPostsSection posts={recentPosts} />
      </div> */}
      <div id="faq">
        <FAQSection />
      </div>
      <div id="form">
        <FormSection />
      </div>
    </>
  );
}