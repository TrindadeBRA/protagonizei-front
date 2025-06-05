import { GetPostSlugs200, GetPostSlugs200DataItem } from "@/src/services/model";
import Image from "next/image";
import Link from "next/link";

export default function LatestPostsSidebar({ posts }: { posts: GetPostSlugs200 }) {
    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="flex flex-col gap-y-6 p-4">
            <div>
                <h2 className="text-2xl font-semibold text-gray-800 font-inter">Últimos Posts</h2>
            </div>
            <div className="flex flex-col gap-y-4">
                {posts.data?.map((post: GetPostSlugs200DataItem) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                        <div className="flex gap-x-4 items-start hover:bg-gray-100 p-2 rounded-lg transition-all">
                            {post.featured_image_url && (
                                <div className="relative w-24 h-24 flex-shrink-0">
                                    <Image
                                        src={post.featured_image_url}
                                        alt={post.title || ""}
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                </div>
                            )}
                            <div className="flex flex-col gap-y-2">
                                <h3 className="font-semibold text-gray-900 group-hover:text-[#672873] transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <time className="text-sm text-gray-500">
                                    {formatDate(post.created_at)}
                                </time>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}