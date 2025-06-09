import BlogGrid from "@/src/components/BlogGrid";
import Pagination from "@/src/components/Pagination";
import { getGetPostSlugsUrl, getPostSlugsResponse } from "@/src/services/api";
import customFetch from "@/src/services/custom-fetch";
import { GetPostSlugs200, GetPostSlugs200DataItem } from "@/src/services/model";
import { Metadata } from "next";

const postsPerPage = 12;

async function getPostsPagination(page: string): Promise<getPostSlugsResponse> {
  try {
    const response = await customFetch<getPostSlugsResponse>(
      getGetPostSlugsUrl({
        page: parseInt(page),
        per_page: postsPerPage
      })
    );
    return response;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ page: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { page } = resolvedParams;
  
  return {
    title: `Protagonizei - Blog: Página ${page}`,
    description: 'No Blog Protagonizei, descubra dicas, estratégias e insights para ajudar seu filho a se tornar o protagonista da própria história. Explore artigos sobre como estimular o amor pela leitura, desenvolver a autoconfiança e criar momentos mágicos e emocionais com nossos livros infantis personalizados. Um presente único e educativo para pais e responsáveis que buscam uma experiência inesquecível. Conteúdo produzido pela Equipe Protagonizei.',
  }
}

export default async function Page({ 
  params, 
}: { 
  params: Promise<{ page: string }>;
}) {
  const resolvedParams = await params;
  const { page } = resolvedParams;
  
  let response: getPostSlugsResponse;
  try {
    response = await getPostsPagination(page);
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
  
  const data = response.data as GetPostSlugs200DataItem[];
  const paginationData: GetPostSlugs200 = response as any;

  return (
    <>
      <div className="overflow-x-hidden bg-pink-50">
        <BlogGrid posts={data} />
        <div className="mx-auto max-w-2xl lg:max-w-4xl ">
          <Pagination
            currentPage={paginationData.current_page || 1}
            totalPages={paginationData.total_pages || 1}
            basePath="/blog/page"
          />
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  try {
    const { total_pages }: GetPostSlugs200 = await customFetch(getGetPostSlugsUrl(
      {
        page: 1,
        per_page: postsPerPage
      }
    ));
    
    if (!total_pages) {
      throw new Error("Não foi possível obter o total de páginas");
    }
    
    const pages = Array.from({ length: Math.max(1, total_pages) }, (_, i) => ({
      page: (i + 1).toString()
    }));
    
    return pages;
  } catch (error) {
    console.error('Erro ao buscar meta informações dos posts:', error);
    return [];
  }
}