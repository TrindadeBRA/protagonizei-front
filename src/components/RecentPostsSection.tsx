import { GetPostSlugs200DataItem } from "@/src/services/model"
import Image from "next/image"
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar, User, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader } from "../components/ui/card"
import { Button } from "../components/ui/button"
import Link from "next/link"

export default function RecentPostsSection({ posts }: { posts: GetPostSlugs200DataItem[] }) {
    return (
        <section className="py-16 bg-gradient-to-b from-white via-purple-50 to-blue-50" id="blog">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
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

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Card key={post.slug} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
                            <CardHeader className="p-0">
                                <div className="relative overflow-hidden rounded-t-lg">
                                    <Link href={`/blog/${post.slug}`}>
                                        <Image
                                            alt={post.title || "Blog post image"}
                                            src={post.featured_image_url || ''}
                                            width={1000}
                                            height={1000}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-bold font-heading text-black mb-3 group-hover:text-pink-main transition-colors">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h3>
                                {post.excerpt && (
                                    <p className="text-blue-main mb-4 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                )}
                                <div className="flex items-center justify-between text-sm text-black mb-4">
                                    <div className="flex items-center space-x-2">
                                        <User className="h-4 w-4" />
                                        <span>Equipe Protagonizei</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="h-4 w-4" />
                                        <time dateTime={post.created_at}>
                                            {format(parseISO(post.created_at || ''), "dd 'de' MMMM',' yyyy", { locale: ptBR })}
                                        </time>
                                    </div>
                                </div>
                                <Link href={`/blog/${post.slug}`}>
                                    <Button className="w-full bg-gradient-to-r from-pink-main to-blue-main hover:from-pink-main hover:to-purple-700 text-white font-heading">
                                        Leia mais
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
{/* 
                <div className="text-center">
                    <Link href="/blog">
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-2 border-pink-300 text-purple-700 hover:bg-pink-50 font-heading bg-white"
                        >
                            Ver todos os posts
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div> */}
            </div>
        </section>
    )
}
