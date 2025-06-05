import { GetPostSlugs200DataItem } from "@/src/services/model"
import Image from "next/image"
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function OurBlog({ posts }: { posts: GetPostSlugs200DataItem[] }) {
    return (
        <div className="bg-white py-16 overflow-x-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-5xl text-center">
                    <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl mb-2" data-aos="zoom-in">
                        Nosso Blog
                    </h2>
                    <p className="mt-2 text-lg/8 text-gray-600 text-center" data-aos="zoom-in">Fique por dentro das tendências e inovações do universo da química. Acesse nosso blog e confira os conteúdos que preparamos especialmente para você!</p>
                </div>
                <div className="mx-auto mt-8 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post) => (
                        <article
                            key={post.slug}
                            className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80"
                            data-aos="zoom-in"
                        >
                            <Image alt="" src={post.featured_image_url || ''} className="absolute inset-0 -z-10 size-full object-cover" width={1000} height={1000} />
                            <div className="absolute inset-0 -z-10 bg-linear-to-t from-gray-900 via-gray-900/40" />
                            <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />

                            <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
                                <time dateTime={post.created_at} className="mr-8">
                                {format(parseISO(post.created_at || ''), "dd 'de' MMMM',' yyyy", { locale: ptBR })}
                                </time>
                            </div>
                            <h3 className="mt-3 text-lg/6 font-semibold text-white">
                                <a href={`/blog/${post.slug}`} className="line-clamp-2">
                                    <span className="absolute inset-0" />
                                    {post.title}
                                </a>
                            </h3>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}
