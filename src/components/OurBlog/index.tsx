import { GetPostSlugs200DataItem } from "@/src/services/model"
import Image from "next/image"
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function OurBlog({ posts }: { posts: GetPostSlugs200DataItem[] }) {
    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <article key={post.slug} className="flex flex-col">
                        <Image 
                            alt={post.title || "Blog post image"} 
                            src={post.featured_image_url || ''} 
                            width={1000} 
                            height={1000} 
                            className="w-full h-[200px] object-cover rounded-lg"
                        />
                        <div className="mt-4">
                            <time dateTime={post.created_at} className="text-sm text-gray-600">
                                {format(parseISO(post.created_at || ''), "dd 'de' MMMM',' yyyy", { locale: ptBR })}
                            </time>
                        </div>
                        <h3 className="mt-2 text-lg font-semibold">
                            <a href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                                {post.title}
                            </a>
                        </h3>
                    </article>
                ))}
            </div>
        </div>
    )
}
