import { getGetPostSlugsUrl, getGetPostSlugUrl, getPostSlugResponse, getPostSlugsResponse } from "@/src/services/api";
import customFetch from "@/src/services/custom-fetch";
import { GetPostSlug200Data, GetPostSlugs200 } from "@/src/services/model";
import { Metadata } from "next";
import { PostViewTemplate } from "@/src/components/PostViewTemplate";

interface BlogPostProps {
  slug?: string;
}

async function getPostSlug(slug: string): Promise<getPostSlugResponse> {
  try {
    const response = await customFetch<getPostSlugResponse>(
      getGetPostSlugUrl(slug)
    );
    return response;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
}

async function getRelatedPosts(): Promise<getPostSlugsResponse> {
  try {
    const response = await customFetch<getPostSlugsResponse>(
      getGetPostSlugsUrl({
        page: 1,
        per_page: 12
      })
    );
    return response;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
}

export async function generateMetadata({ params }: { params: Promise<BlogPostProps> }): Promise<Metadata> {
  const { slug } = await params
  if (!slug) {
    throw new Error("Slug não encontrado");
  }
  const response = await getPostSlug(slug);
  const data = response.data as GetPostSlug200Data;
  const { title, excerpt, content } = data;
  const cleanContent = content?.replace(/<[^>]*>?/g, '')?.replace(/&nbsp;/g, ' ')?.substring(0, 155);

  if (!title) {
    throw new Error("Título ou resumo não encontrado");
  }

  return {
    title: `TTW - ${title}`,
    description: excerpt || cleanContent,
  }
}

export default async function Page({ params }: { params: Promise<BlogPostProps> }) {
  const { slug } = await params;
  if (!slug) {
    throw new Error("Slug não encontrado");
  }
  let postData: any;
  let relatedPosts: any;
  try {
    postData = await getPostSlug(slug);
    relatedPosts = await getRelatedPosts();
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }

  return (
    <PostViewTemplate postData={postData} relatedPosts={relatedPosts} isPreview={false} />
  )
}

export async function generateStaticParams() {
  try {
    const { data }: GetPostSlugs200 = await customFetch(getGetPostSlugsUrl());

    if (!data) {
      throw new Error("Não foi possível obter os posts");
    }

    const posts = data.map((post) => ({
      slug: post.slug
    }));

    return posts;
  } catch (error) {
    console.error('Erro ao buscar meta informações dos posts:', error);
    return [];
  }
}
