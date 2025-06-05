import { GetPostSlug200 } from "@/src/services/model";
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function HeroBlogPost({ response }: { response: GetPostSlug200 }) {
    return (
        <div
        className="img-overlay-gradient w-full h-96 relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${response?.data?.featured_image_url ?? "/assets/images/home-hero.webp"})` }}
        data-aos="fade-right"
      >
        <div className="container mx-auto h-full flex flex-col items-center justify-center">
          <h1 className="text-2xl lg:text-4xl font-bold text-white text-center px-4 z-10 font-inter">
            {response?.data?.title}
          </h1>
          <p className="text-base lg:text-lg text-white text-center px-4 z-10 font-inter font-bold mt-4">
            {format(parseISO(response?.data?.created_at || new Date().toISOString()), "dd 'de' MMMM',' yyyy", { locale: ptBR })}
          </p>
        </div>
      </div>
    )
}