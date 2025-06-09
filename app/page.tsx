import BenefitsSection from "@/src/components/BenefitsSection";
import FormSection from "@/src/components/FormSection";
import ExamplesSection from "@/src/components/ExamplesSection";
import FAQSection from "@/src/components/FAQSection";
import HeroSection from "@/src/components/HeroSection";
import HowItWorksSection from "@/src/components/HowItWorksSection";
import RecentPostsSection from "@/src/components/RecentPostsSection";
import TestimonialsSection from "@/src/components/TestimonialsSection";
import { getGetPostSlugsUrl, getPostSlugsResponse } from "@/src/services/api";
import customFetch from "@/src/services/custom-fetch";
import { GetPostSlugs200DataItem } from "@/src/services/model";
import Script from 'next/script';

export const metadata = {
  title: 'Protagonizei: Livros Infantis Personalizados com IA | Seu Filho Vira o Herói da História!',
  description: 'Crie um livro infantil digital personalizado onde seu filho é o protagonista com nome, rosto e magia. Desenvolvido com Inteligência Artificial (IA) para o face swap e adaptação do texto, este é um presente único, emocional e educativo. Desfrute de uma experiência simples e de baixo custo, com entrega 100% digital (PDF enviado por e-mail). Sem a necessidade de login ou e-commerce tradicional, transforme a leitura em uma aventura inesquecível e veja a criança se reconhecer como protagonista.',
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Livro Infantil Personalizado com IA - Protagonizei",
  "image": "https://protagonizei.com/og-image.jpg",
  "description": "Livro infantil digital personalizado onde seu filho é o protagonista, com nome, rosto e magia. Desenvolvido com Inteligência Artificial para face swap e adaptação do texto.",
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
    "reviewBody": "Um presente incrível! Meu filho ficou encantado ao se ver como protagonista da história."
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
      <div id="posts-recentes">
        <RecentPostsSection posts={recentPosts} />
      </div>
      <div id="faq">
        <FAQSection />
      </div>
      <div id="form">
        <FormSection />
      </div>
    </>
  );
}