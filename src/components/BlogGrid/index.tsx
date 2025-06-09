import { GetPostSlugs200DataItem } from "@/src/services/model"
import Image from "next/image"
import Link from "next/link"
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar, User, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"

export default function BlogGrid({
    posts
}: {
    posts: GetPostSlugs200DataItem[]
}) {
    return (
        <div className="">
            {/* Header */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-800 mb-6">
                        Conheça nosso{" "}
                        <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent">
                            blog
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Conheça todos os posts do blog e fique por dentro das novidades do Protagonizei!
                    </p>
                    </div>
                </div>
            </section>

            {/* Posts */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => {
                            const cleanContent = post.content?.replace(/<[^>]*>?/g, '')?.replace(/&nbsp;/g, ' ');

                            return (
                                <Card key={post.slug} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
                                    <CardHeader className="p-0">
                                        <div className="relative overflow-hidden rounded-t-lg">
                                            <Link href={`/blog/${post.slug}`}>  
                                                <Image
                                                    src={post.featured_image_url || '/placeholder.svg'}
                                                    alt={post.title || 'Post image'}
                                                    width={400}
                                                    height={300}
                                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </Link>
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-pink-main text-white px-3 py-1 rounded-full text-sm font-medium">
                                                    Blog
                                                </span>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <Link href={`/blog/${post.slug}`}>
                                            <h3 className="text-xl font-bold font-heading text-black mb-3 group-hover:text-pink-main transition-colors">
                                                {post.title}
                                            </h3>
                                        </Link>
                                        <p className="text-black mb-4 leading-relaxed line-clamp-3">
                                            {post.excerpt || cleanContent}
                                        </p>
                                        <div className="flex items-center justify-between text-sm text-black mb-4">
                                            <div className="flex items-center space-x-2">
                                                <User className="h-4 w-4" />
                                                <span>Equipe Protagonizei</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="h-4 w-4" />
                                                <span>{post.created_at ? format(parseISO(post.created_at), "dd 'de' MMMM',' yyyy", { locale: ptBR }) : ''}</span>
                                            </div>
                                        </div>
                                        <Link href={`/blog/${post.slug}`}>
                                            <Button className="w-full bg-gradient-to-r from-pink-main to-blue-main hover:from-pink-main hover:to-purple-700 text-white font-heading">
                                                Ler Mais
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}
