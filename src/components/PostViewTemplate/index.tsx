"use client";

import { Calendar, User, ArrowLeft, Share2, Heart } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import BlogContent from "@/src/components/BlogContent";
import LatestPostsSidebar from "@/src/components/LatestPostsSidebar";

interface PostViewTemplateProps {
  postData: any;
  relatedPosts: any;
  isPreview: boolean;
}

export function PostViewTemplate({ postData, relatedPosts, isPreview }: PostViewTemplateProps) {
  const post = postData.data;
  const formattedDate = post.created_at ? format(parseISO(post.created_at), "dd 'de' MMMM',' yyyy", { locale: ptBR }) : '';

  return (
    <div className="min-h-screen">
      {isPreview && (
        <div className="bg-red-500 text-white text-center font-bold py-2 border-y border-white">
          Você está visualizando uma versão de preview do post.
        </div>
      )}
      
      {/* Header do Post */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/">
              <Button variant="ghost" className="mb-6 text-purple-700 hover:text-pink-600">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Home
              </Button>
            </Link>
            
            <div className="mb-6">
              <span className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                Blog
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-heading text-purple-700 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-purple-600 mb-8">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span className="font-medium">Equipe Protagonizei</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>{formattedDate}</span>
              </div>
              <span className="text-sm bg-purple-100 px-3 py-1 rounded-full">
                5 min de leitura
              </span>
            </div>

            <div className="flex gap-4 mb-8">
              <Button size="sm" className="bg-pink-500 hover:bg-pink-600 text-white">
                <Heart className="mr-2 h-4 w-4" />
                Curtir
              </Button>
              <Button size="sm" variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-white">
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Imagem do Post */}
      {post.featured_image_url && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Image 
                src={post.featured_image_url} 
                alt={post.title || ""}
                width={1000}
                height={600}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </section>
      )}

      {/* Conteúdo do Post e Sidebar */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Conteúdo Principal */}
            <div className="w-full lg:w-3/4">
              <div className="max-w-3xl mx-auto">
                <BlogContent content={postData} />
                
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex justify-center">
                    <Link href="/">
                      <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-heading"
                      >
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Voltar para Home
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-1/4">
              <div className="sticky top-20">
                <LatestPostsSidebar posts={relatedPosts} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 