'use client'

import { useMobileCheck } from '@/src/hooks/useMobileCheck'
import { TalkToUsForm } from './form'

export default function TalkToUs() {
  const isMobile = useMobileCheck()

  return (
    <div className="relative isolate bg-[#7b61c2] overflow-x-hidden" id="contato">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pt-24 pb-20  lg:static lg:px-8">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-white/5 lg:w-1/2">
              <svg
                aria-hidden="true"
                className="absolute inset-0 size-full stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
              >
                <defs>
                  <pattern
                    x="100%"
                    y={-1}
                    id="54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <svg x="100%" y={-1} className="overflow-visible fill-gray-800/20">
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect fill="url(#54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2)" width="100%" height="100%" strokeWidth={0} />
              </svg>
              <div
                aria-hidden="true"
                className="absolute top-[calc(100%-13rem)] -left-56 transform-gpu blur-3xl lg:top-[calc(50%-7rem)] lg:left-[max(-14rem,calc(100%-59rem))]"
              >
                <div
                  style={{
                    clipPath:
                      'polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)',
                  }}
                  className="aspect-1155/678 w-[72.1875rem] bg-linear-to-br from-[#80caff] to-[#4f46e5] opacity-20"
                />
              </div>
            </div>
            {/* <p className="text-base/7 font-semibold text-white" data-aos={isMobile ? "fade-in" : "fade-right"}>
              Entre em contato
            </p> */}
            <h2 
              className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl" 
              data-aos={isMobile ? "fade-in" : "fade-right"}
            >
              Escreva para nós!
            </h2>
            <p 
              className="mt-6 text-lg/8 text-white" 
              data-aos={isMobile ? "fade-in" : "fade-right"}
            >
              Sua mensagem é muito importante para nós da Tiken. Queremos ouvir você e entender melhor a sua necessidade.
            </p>
          </div>
        </div>
        <div data-aos={isMobile ? "fade-in" : "fade-in"}>
          <TalkToUsForm />
        </div>
      </div>
    </div>
  )
}
