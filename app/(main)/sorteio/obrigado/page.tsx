'use client'

import { useEffect, useState } from 'react'
import { CheckCircle2, Heart, Sparkles, ThumbsUp, Instagram, Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getGetPostSlugsUrl } from '@/src/services/api'
import customFetch from '@/src/services/custom-fetch'
import RecentPostsSection from '@/src/components/RecentPostsSection'
import { GetPostSlugs200DataItem, GetPostSlugs200 } from '@/src/services/model'

export default function ObrigadoPage() {
  const [posts, setPosts] = useState<GetPostSlugs200DataItem[]>([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoadingPosts(true)
        const response = await customFetch<GetPostSlugs200>(
          getGetPostSlugsUrl({ quantity: 3 })
        )
        
        if (response && response.data && Array.isArray(response.data)) {
          setPosts(response.data)
        }
      } catch (error) {
        console.error('Erro ao buscar posts:', error)
      } finally {
        setIsLoadingPosts(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 md:opacity-40">
        <div className="absolute top-20 left-10 float-animation">
          <Image src="/assets/images/asset-star.png" alt="Star" width={32} height={32} sizes="32px" data-aos="fade-in" data-aos-delay={100} />
        </div>
        <div className="absolute top-40 right-20 float-animation" style={{ animationDelay: '1s' }}>
          <Image src="/assets/images/asset-heart.png" alt="Heart" width={32} height={32} sizes="32px" data-aos="fade-in" data-aos-delay={200} />
        </div>
        <div className="absolute bottom-40 left-20 float-animation" style={{ animationDelay: '2s' }}>
          <Image src="/assets/images/asset-star.png" alt="Star" width={32} height={32} data-aos="fade-in" data-aos-delay={300} />
        </div>
        <div className="absolute top-60 left-1/3 float-animation" style={{ animationDelay: '0.5s' }}>
          <Image src="/assets/images/asset-star-2.png" alt="Star" width={32} height={32} sizes="32px" data-aos="fade-in" data-aos-delay={400} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl text-center" data-aos="fade-up">
            <div className="mb-6 flex justify-center" data-aos="fade-up" data-aos-delay={100}>
              <div className="bg-gradient-to-r from-pink-main to-blue-main rounded-full p-4 shadow-lg">
                <CheckCircle2 className="w-16 h-16 text-white" />
              </div>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight" data-aos="fade-up" data-aos-delay={200}>
              <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent">
                Obrigado pela sua inscrição!
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed" data-aos="fade-up" data-aos-delay={300}>
              Sua inscrição no sorteio foi realizada com <strong className="text-pink-600">sucesso</strong>!
            </p>

            <div className="inline-block mb-8" data-aos="fade-up" data-aos-delay={400}>
              <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl p-6 border-l-4 border-pink-main max-w-2xl mx-auto">
                <div className="flex items-start gap-4">
                  <Sparkles className="w-6 h-6 text-pink-main flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 mb-2 text-lg">
                      Aumente suas chances de ganhar!
                    </p>
                    <p className="text-gray-700 text-base leading-relaxed">
                      Quanto mais você <strong className="text-pink-600">interagir</strong> com nossos posts no Instagram (curtir, comentar, compartilhar), maiores serão suas chances de ganhar o livro personalizado!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6" data-aos="fade-up" data-aos-delay={500}>
              <a
                href="https://instagram.com/protagonizei"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-main to-blue-main text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300 font-englebert"
              >
                <Instagram className="w-5 h-5" />
                Seguir no Instagram
              </a>
            </div>

            <div className="mb-8" data-aos="fade-up" data-aos-delay={550}>
              <Link
                href="/"
                className="inline-flex items-center gap-3 bg-white border-2 border-gray-300 text-gray-700 font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:scale-105 hover:border-pink-main hover:text-pink-main transition-all duration-300 font-englebert"
              >
                <Home className="w-5 h-5" />
                Voltar para a Home
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-gray-600" data-aos="fade-up" data-aos-delay={600}>
              <Heart className="w-5 h-5 text-pink-main fill-current" />
              <p className="text-base">
                Boa sorte! O resultado será anunciado em breve.
              </p>
              <ThumbsUp className="w-5 h-5 text-blue-main fill-current" />
            </div>
          </div>
        </div>
      </div>

      {!isLoadingPosts && posts.length > 0 && (
        <RecentPostsSection posts={posts} />
      )}
    </section>
  )
}
