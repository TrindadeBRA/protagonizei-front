"use client";

import { useEffect, useState, Suspense } from "react";
import { getGetPostSlugsUrl, getGetPostSlugUrl } from "@/src/services/api";
import customFetch from "@/src/services/custom-fetch";
import { useSearchParams } from "next/navigation";
import { PostViewTemplate } from "../components/PostViewTemplate";
import NotFoundScreen from "@/src/components/404Screen";

function PreviewContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const [postData, setPostData] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      setIsLoading(true);
      try {
        const post = await customFetch(getGetPostSlugUrl(slug));
        const related = await customFetch(getGetPostSlugsUrl({ page: 1, per_page: 12 }));
        setPostData(post);
        setRelatedPosts(related);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  if (isLoading) return <LoadingScreen />;

  if (!slug || !postData?.success || !relatedPosts?.success) return (
    <NotFoundScreen />
  );

  return <PostViewTemplate postData={postData} relatedPosts={relatedPosts} isPreview={true} />;
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <PreviewContent />
    </Suspense>
  );
}

function LoadingScreen() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-500"></div>
    </div>
  );
}