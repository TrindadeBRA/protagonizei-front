import BenefitsSection from "@/src/components/BenefitsSection";
import CTASection from "@/src/components/CTASection";
import ExamplesSection from "@/src/components/ExamplesSection";
import FAQSection from "@/src/components/FAQSection";
import HeroSection from "@/src/components/HeroSection";
import HowItWorksSection from "@/src/components/HowItWorksSection";
import RecentPostsSection from "@/src/components/RecentPostsSection";
import TestimonialsSection from "@/src/components/TestimonialsSection";
import { getGetPostSlugsUrl, getPostSlugsResponse } from "@/src/services/api";
import customFetch from "@/src/services/custom-fetch";
import { GetPostSlugs200DataItem } from "@/src/services/model";

export const metadata = {
  title: 'TTW - Home',
  description: 'TTW - Home',
}

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
      <div id="hero">
        <HeroSection />
      </div>
      <div id="benefits">
        <BenefitsSection />
      </div>
      <div id="how-it-works">
        <HowItWorksSection />
      </div>
      <div id="examples">
        <ExamplesSection />
      </div>
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <div id="recent-posts">
        <RecentPostsSection posts={recentPosts} />
      </div>
      <div id="faq">
        <FAQSection />
      </div>
      <CTASection />
    </>
  );
}