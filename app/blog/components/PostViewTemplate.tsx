"use client";

import BlogContent from "@/src/components/BlogContent";
import ContactItems from "@/src/components/ContactItems";
import PinMap from "@/src/components/PinMap";
import HeroBlogPost from "@/src/components/HeroBlogPost";
import LatestPostsSidebar from "@/src/components/LatestPostsSidebar";

interface PostViewTemplateProps {
  postData: any;
  relatedPosts: any;
  isPreview: boolean;
}

export function PostViewTemplate({ postData, relatedPosts, isPreview }: PostViewTemplateProps) {
  return (
    <>
      {isPreview && (
        <div className="bg-red-500 text-white text-center font-bold py-2 border-y border-white">
          Você está visualizando uma versão de preview do post.
        </div>
      )}
      <HeroBlogPost response={postData} />
      <div className="mx-auto flex flex-col lg:flex-row container gap-x-8">
        <div className="w-full lg:w-3/4 py-16">
          <BlogContent content={postData} />
        </div>
        <div className="w-full lg:w-1/4 py-16">
          <div className="sticky top-20">
            <LatestPostsSidebar posts={relatedPosts} />
          </div>
        </div>
      </div>
      <ContactItems />
      <PinMap />
    </>
  );
} 