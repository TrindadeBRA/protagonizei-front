import ContactItems from "@/src/components/ContactItems";
import DiscoverOurProducts from "@/src/components/DIscoverOurProducts";
import ExcellenceRecognition from "@/src/components/ExcellenceRecognition";
import HeroVideoNoOverlay from "@/src/components/HeroVideoNoOverlay";
import Markets from "@/src/components/Markets";
import OurBlog from "@/src/components/OurBlog";
import OurPurpose from "@/src/components/OurPurpose";
import PinMap from "@/src/components/PinMap";
import TalkToUs from "@/src/components/TalkToUs";
import { getAssetsResponse, getGetAssetsUrl, getGetPostSlugsUrl, getPostSlugsResponse } from "@/src/services/api";
import customFetch from "@/src/services/custom-fetch";
import { GetAssets200Data, GetPostSlugs200DataItem } from "@/src/services/model";

export const metadata = {
  title: 'Tiken - Home',
  description: 'Especialidades químicas para Plásticos, Adesivos, Tintas e Cosméticos. Inovação, sustentabilidade e excelência técnica. Inove seu mundo!',
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

export async function getAssetsFiles(): Promise<any> {
  try {
    const response = await customFetch<any>(
      getGetAssetsUrl()
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


  let assetsFiles: getAssetsResponse;
  try {
    assetsFiles = await getAssetsFiles();
  } catch (error) {
    console.error('Erro ao buscar assets:', error);
    throw error;
  }
  const assetsFilesData = assetsFiles.data as GetAssets200Data;

  
  return (
    <>
      <HeroVideoNoOverlay />
      <ExcellenceRecognition />
      <OurPurpose />
      <DiscoverOurProducts />
      <Markets assetsFiles={assetsFilesData} />
      <TalkToUs />
      <OurBlog posts={recentPosts} />
      <ContactItems />
      <PinMap />
    </>
  );
}