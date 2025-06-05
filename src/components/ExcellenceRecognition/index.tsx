import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from 'lucide-react'


export default function ExcellenceRecognition() {
  return (
    <div className="bg-[#f4f4f4] py-20 overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Lado esquerdo - Texto */}
        <div className="lg:w-2/3">
          <h2 className="text-3xl font-bold tracking-tight text-[#515151]" data-aos="fade-right">
            Excelência e Reconhecimento
          </h2>
          <p className="mt-8 text-base font-medium text-pretty text-[#515151]" data-aos="fade-right">
            Reconhecidos pelo Great Place to Work (GPTW) e agraciados com o selo Prata do ECOVADIS, destacamo-nos como uma das melhores empresas para se trabalhar. Além disso, estamos comprometidos com a excelência e a conformidade ESG, demonstrando uma forte atuação em inovação e sustentabilidade.
          </p>
          <Link
            href="/trabalhe-conosco"
            className="flex items-center gap-x-2 text-black font-bold font-inter mt-4"
            data-aos="fade-right"
          >
            trabalhe conosco <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        {/* Lado direito - Imagens */}
        <div className="lg:w-1/3 grid grid-cols-3 gap-8 items-center justify-center">
          <Image
            src="/assets/images/tiken-gptw-1.webp"
            alt="GPTW"
            title="GPTW"
            width={100}
            height={100}
            className="w-full h-auto"
            data-aos="fade-left"
          />
          <Image
            src="/assets/images/tiken-ecovadis.webp"
            alt="ECOVADIS"
            title="ECOVADIS"
            width={100}
            height={100}
            className="w-full h-auto"
            data-aos="fade-left"
          />
          <Image
            src="/assets/images/tiken-iso9001.webp"
            alt="ISO 9001"
            title="ISO 9001"
            width={100}
            height={100}
            className="w-full h-auto"
            data-aos="fade-left"
          />
        </div>
      </div>
    </div>
  )
}
