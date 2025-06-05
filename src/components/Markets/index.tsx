import { GetAssets200Data } from "@/src/services/model"
import { ArrowRightIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Markets({ assetsFiles }: { assetsFiles: GetAssets200Data }) {
  const markets = [
    {
      name: 'Plásticos & Elastômeros ',
      slug: 'plasticos-elastomeros',
      imageSrc: '/assets/images/market-plasticos-elastomeros.webp',
      downloadLink: assetsFiles.plastics_catalog as string,
    },
    {
      name: 'Borrachas',
      slug: 'borrachas',
      imageSrc: '/assets/images/market-borrachas.webp',
      downloadLink: assetsFiles.rubber_catalog as string,
    },
    {
      name: 'Adesivos',
      slug: 'adesivos',
      imageSrc: '/assets/images/market-adesivos.webp',
      downloadLink: assetsFiles.adhesives_catalog as string,
    },
  ]

  return (
    <div className="bg-gray-100 overflow-x-hidden" id="mercados">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 lg:max-w-none">
          <h2 className="mt-2 text-5xl font-semibold tracking-tight text-pretty text-[#515151] text-center" data-aos="fade-in" data-aos-desktop="fade-left">
            Mercados
          </h2>
          <p className="mt-6 text-lg text-[#515151] text-center max-w-4xl mx-auto" data-aos="fade-in" data-aos-desktop="fade-left">Possuímos um portfólio amplo e diversificado para atender com excelência às demandas do mercado.</p>
          <p className="text-lg text-[#515151] text-center max-w-4xl mx-auto" data-aos="fade-in" data-aos-desktop="fade-left">Nossa especialidade é oferecer soluções personalizadas que se adaptam ao seu negócio.</p>

          <div className="mt-12 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 max-w-5xl mx-auto">
            {markets.map((market) => (
              <div key={market.name} className="group relative" data-aos="fade-in" data-aos-desktop="zoom-in">

                <div>
                  <Link href={`/produtos?segment=${market.slug}`}>
                    <h3 className="mt-6 mb-4 text-xl text-gray-500 font-light">
                      {market.name}
                    </h3>
                  </Link>
                </div>


                <div className="relative">
                  <Link href={`/produtos?segment=${market.slug}`}>
                    <Image
                      src={market.imageSrc}
                      className="w-full rounded-lg bg-white object-cover group-hover:opacity-75 transition-all duration-300 max-sm:h-80 sm:aspect-2/1 lg:aspect-square"
                      width={1000}
                      height={1000}
                      alt={market.name}
                    />
                  </Link>
                </div>

                <div className="flex flex-row gap-2 justify-between w-full mt-6">
                  <Link
                    href={`/produtos?segment=${market.slug}`}
                    className="flex items-center gap-x-2 rounded-md bg-[#9061a8] text-white px-4 py-2.5 font-bold font-inter w-fit"
                  >
                    saiba mais <ArrowRightIcon className="size-4" />
                  </Link>

                  <Link
                    href={market.downloadLink}
                    className="flex items-center gap-x-2 text-[#0399c4] font-bold font-inter w-fit"
                    target="_blank"
                  >
                    catálogo <ArrowRightIcon className="size-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
