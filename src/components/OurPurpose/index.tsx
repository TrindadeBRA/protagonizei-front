import Image from 'next/image'

export default function OurPurpose() {
  return (
    <div className="relative bg-white my-20 overflow-x-hidden">
      <div className="mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">
        <div className="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
          <div className="relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
            <Image
              alt=""
              src="/assets/images/our-purpose.webp"
              className="absolute inset-0 size-full bg-gray-50 object-cover rounded-lg"
              width={1000}
              height={1000}
              data-aos="fade-right"
            />
          </div>
        </div>
        <div className="px-6 lg:contents">
          <div className="mx-auto max-w-2xl pt-16 pb-24 sm:pt-20 sm:pb-32 lg:mr-0 lg:ml-8 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
            <h2 className="mt-2 text-5xl font-semibold tracking-tight text-pretty text-[#515151]" data-aos="fade-left">
              Nosso propósito
            </h2>
            <p className="mt-6 text-xl text-[#515151]" data-aos="fade-left">
              Criamos conexões e soluções através da química para inovar o mundo.
            </p>
            <div className="mt-10">
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-pretty text-[#515151]" data-aos="fade-left">
                O que fazemos?
              </h2>
              <ul className="text-xl text-[#515151] list-disc list-inside mt-4 space-y-2">
                <li data-aos="fade-left">
                  Garantimos a satisfação total em todos os aspectos do negócio.
                </li>
                <li data-aos="fade-left">
                  Gestão em distribuição e representação de especialidades químicas.
                </li>
                <li data-aos="fade-left">
                  Criamos conexões através de suporte técnico/comercial.
                </li>
                <li data-aos="fade-left">
                  Capacitação técnica dos nossos clientes e parceiros, visando as exigências do futuro.
                </li>
              </ul>
            </div>
            <div className="mt-10">
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-pretty text-[#515151]" data-aos="fade-left">
                Nossas Atitudes
              </h2>
              <ul className="text-xl text-[#515151] list-disc list-inside mt-4 space-y-2">
                <li data-aos="fade-left">
                  Respeito pelas pessoas em primeiro lugar.
                </li>
                <li data-aos="fade-left">
                  Foco no cliente.
                </li>
                <li data-aos="fade-left">
                  Responsabilidade e ética.
                </li>
                <li data-aos="fade-left">
                  Boas práticas da LGPD.
                </li>
                <li data-aos="fade-left">
                  Paixão pelo que fazemos.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
