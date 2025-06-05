import OurBlog from "@/src/components/OurBlog";
import TalkToUs from "@/src/components/TalkToUs";
import { getGetPostSlugsUrl, getPostSlugsResponse } from "@/src/services/api";
import customFetch from "@/src/services/custom-fetch";
import { GetPostSlugs200DataItem } from "@/src/services/model";

export const metadata = {
  title: 'Protagonizei - Home',
  description: 'Protagonizei - Home',
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
      HOME
      <OurBlog posts={recentPosts} />
      <TalkToUs />
    </>
  );
}