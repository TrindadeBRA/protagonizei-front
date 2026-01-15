import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Book3D from "./Book3D";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 md:opacity-40">
        <div className="absolute top-20 left-10 float-animation">
          <Image src="/assets/images/asset-star.png" alt="Protagonizei" width={32} height={32} sizes="32px" data-aos="fade-in" data-aos-delay={100} />
        </div>
        <div className="absolute top-40 right-20 float-animation" style={{ animationDelay: '1s' }}>
          <Image src="/assets/images/asset-heart.png" alt="Protagonizei" width={32} height={32} sizes="32px" data-aos="fade-in" data-aos-delay={200} />
        </div>
        <div className="absolute bottom-40 left-20 float-animation" style={{ animationDelay: '2s' }}>
          <Image src="/assets/images/asset-star.png" alt="Protagonizei" width={32} height={32} data-aos="fade-in" data-aos-delay={300} />
        </div>
        <div className="absolute top-60 left-1/3 float-animation" style={{ animationDelay: '0.5s' }}>
          <Image src="/assets/images/asset-star-2.png" alt="Protagonizei" width={32} height={32} sizes="32px" data-aos="fade-in" data-aos-delay={400} />
        </div>
        <div className="absolute bottom-60 right-1/4 float-animation" style={{ animationDelay: '1.5s' }}>
          <Image src="/assets/images/asset-heart-2.png" alt="Protagonizei" width={32} height={32} sizes="32px" data-aos="fade-in" data-aos-delay={500} />
        </div>
        {/* New floating elements */}
        <div className="absolute top-1/4 right-1/4 float-animation" style={{ animationDelay: '0.8s' }}>
          <Image src="/assets/images/asset-star.png" alt="Protagonizei" width={24} height={24} sizes="24px" data-aos="fade-in" data-aos-delay={600} />
        </div>
        <div className="absolute bottom-1/3 left-1/4 float-animation" style={{ animationDelay: '1.2s' }}>
          <Image src="/assets/images/asset-heart.png" alt="Protagonizei" width={28} height={28} sizes="28px" data-aos="fade-in" data-aos-delay={700} />
        </div>
        <div className="absolute bottom-1/4 right-1/3 float-animation" style={{ animationDelay: '0.3s' }}>
          <Image src="/assets/images/asset-star-2.png" alt="Protagonizei" width={24} height={24} sizes="24px" data-aos="fade-in" data-aos-delay={800} />
        </div>
        <div className="absolute top-1/2 left-1/2 float-animation" style={{ animationDelay: '1.9s' }}>
          <Image src="/assets/images/asset-star.png" alt="Protagonizei" width={28} height={28} sizes="28px" data-aos="fade-in" data-aos-delay={900} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center lg:justify-between min-h-screen">
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 z-[10]">

          <div className="inline-block mb-4" data-aos="fade-down">
            <span className="bg-gradient-to-r from-pink-main to-blue-main text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-md">
              📖 Livro Digital • Receba Ainda Hoje
            </span>
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight" data-aos="fade-up" id="hero-title">
            <p className="text-black leading-tight">
              Seu filho como{' '}
              <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent">herói da própria história</span>
            </p>
          </h1>

          <p className="text-xl md:text-2xl text-gray-800 font-semibold mb-3 leading-relaxed" data-aos="fade-up">
            Livro digital personalizado com <strong className="text-pink-600">nome, rosto e aventuras</strong> únicas
          </p>

          <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed" data-aos="fade-up">
            Crie agora e <strong className="text-blue-600">receba ainda hoje</strong> o livro digital do seu pequeno protagonista. <strong className="text-pink-600">Sem frete, sem espera</strong>. leia em qualquer dispositivo ou imprima quando quiser.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6" data-aos="fade-up">
            <Link
              href="/#criar-historia"
              key="/#criar-historia"
              className="magical-border border-4 border-transparent text-white font-bold py-3 px-8 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300 font-englebert text-center"
            >
              Crie sua história
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm mb-4" data-aos="fade-right">
            <div className="flex items-center bg-white/60 px-3 py-1.5 rounded-full shadow-sm">
              <Heart className="w-4 h-4 text-pink-main mr-1.5 fill-current" />
              <span className="text-gray-800 font-semibold">+1000 famílias</span>
            </div>
            <div className="flex items-center bg-white/60 px-3 py-1.5 rounded-full shadow-sm">
              <Star className="w-4 h-4 text-blue-main mr-1.5 fill-current" />
              <span className="text-gray-800 font-semibold">5/5 estrelas</span>
            </div>
            <div className="flex items-center bg-white/60 px-3 py-1.5 rounded-full shadow-sm">
              <span className="text-gray-800 font-semibold">⚡ Receba Ainda Hoje</span>
            </div>
          </div>

          {/* <p className="text-xs text-gray-600 italic text-center lg:text-left" data-aos="fade-up">
            ✨ Entrega de 1h a 24h • Acesso ilimitado • Pode imprimir quando quiser
          </p> */}
        </div>

        <div className="w-full lg:w-1/2 float-animation" data-aos="fade-left" data-aos-anchor="#hero-title">
          <Book3D
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
