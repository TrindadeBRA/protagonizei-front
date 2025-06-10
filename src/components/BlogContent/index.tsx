import { GetPostSlug200 } from "@/src/services/model";
import './index.css'; 

interface BlogContentProps {
    content: GetPostSlug200;
}

export default function BlogContent({ content }: BlogContentProps) {
    const sanitizedContent = content?.data?.content ?? '';

    console.log(sanitizedContent);
    console.log(content?.data?.content);

    return (
        <div className="prose prose-lg max-w-none">
            <div 
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
            />
        </div>
    )
}