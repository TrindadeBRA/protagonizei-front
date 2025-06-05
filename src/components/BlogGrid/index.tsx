import { GetPostSlugs200DataItem } from "@/src/services/model"
import Image from "next/image"
import Link from "next/link"
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function BlogGrid(
    {
        posts
    }: {
        posts: GetPostSlugs200DataItem[]
    }
) {


    return (
        <div className="bg-white py-12 relative isolate overflow-hidden overflow-x-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                <div className="mx-auto max-w-2xl lg:max-w-4xl">
                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl" data-aos="fade-right">Fique por dentro</h2>
                    <p className="mt-2 text-lg/8 text-gray-600" data-aos="fade-right">Fique por dentro das tendências e inovações do universo da química.</p>
                    <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
                        {posts.map((post) => {
                            const cleanContent = post.content?.replace(/<[^>]*>?/g, '')?.replace(/&nbsp;/g, ' ');

                            return (
                                <article key={post.slug} className="relative isolate flex flex-col gap-8 lg:flex-row" data-aos="fade-right">
                                    <div className="relative aspect-video sm:aspect-2/1 lg:aspect-square lg:w-64 lg:shrink-0">
                                        <Link href={`/blog/${post.slug}`}>
                                            <Image
                                                alt=""
                                                src={post.featured_image_url || ''}
                                                className="absolute inset-0 size-full rounded-2xl bg-gray-50 object-cover"
                                                width={1000}
                                                height={1000}
                                            />
                                            <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset" />
                                        </Link>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-x-4 text-xs">
                                            <time dateTime={post.created_at || ''} className="text-gray-500">
                                                {format(parseISO(post.created_at || ''), "dd 'de' MMMM',' yyyy", { locale: ptBR })}
                                            </time>
                                        </div>
                                        <div className="group relative max-w-xl">
                                            <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                                                <Link href={`/blog/${post.slug}`}>
                                                    <span className="absolute inset-0" />
                                                    {post.title}
                                                </Link>
                                            </h3>
                                            <p className="mt-5 text-sm/6 text-gray-600 line-clamp-3">{post.excerpt || cleanContent}</p>
                                        </div>


                                    </div>
                                </article>
                            )
                        })}

                    </div>
                </div>
            </div>
        </div>
    )
}
