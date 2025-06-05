import { GetPostSlugs200, GetPostSlugs200DataItem } from "@/src/services/model";
import Image from "next/image";
import Link from "next/link";
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function LatestPostsSidebar({ posts }: { posts: GetPostSlugs200 }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-purple-700 font-heading">Últimos Posts</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-600 mt-2 rounded-full"></div>
            </div>
            <div className="flex flex-col gap-y-6">
                {posts.data?.map((post: GetPostSlugs200DataItem) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                        <div className="flex gap-x-4 items-start hover:bg-purple-50 p-3 rounded-xl transition-all">
                            {post.featured_image_url && (
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    <Image
                                        src={post.featured_image_url}
                                        alt={post.title || ""}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                </div>
                            )}
                            <div className="flex flex-col gap-y-1">
                                <h3 className="font-semibold text-purple-700 group-hover:text-pink-600 transition-colors line-clamp-2 text-sm">
                                    {post.title}
                                </h3>
                                <time className="text-xs text-purple-500">
                                    {post.created_at ? format(parseISO(post.created_at), "dd 'de' MMMM',' yyyy", { locale: ptBR }) : ''}
                                </time>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}