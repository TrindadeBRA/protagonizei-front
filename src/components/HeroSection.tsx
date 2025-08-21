import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none md:opacity-100 opacity-45">
        <div className="absolute top-20 left-10 float-animation">
          <Image src="/assets/images/asset-star.png" alt="Protagonizei" width={32} height={32} data-aos="fade-in" data-aos-delay={100} />
        </div>
        <div className="absolute top-40 right-20 float-animation" style={{ animationDelay: '1s' }}>
          <Image src="/assets/images/asset-heart.png" alt="Protagonizei" width={32} height={32} data-aos="fade-in" data-aos-delay={200} />
        </div>
        <div className="absolute bottom-40 left-20 float-animation" style={{ animationDelay: '2s' }}>
          <Image src="/assets/images/asset-star.png" alt="Protagonizei" width={32} height={32} data-aos="fade-in" data-aos-delay={300} />
        </div>
        <div className="absolute top-60 left-1/3 float-animation" style={{ animationDelay: '0.5s' }}>
          <Image src="/assets/images/asset-star-2.png" alt="Protagonizei" width={32} height={32} data-aos="fade-in" data-aos-delay={400} />
        </div>
        <div className="absolute bottom-60 right-1/4 float-animation" style={{ animationDelay: '1.5s' }}>
          <Image src="/assets/images/asset-heart-2.png" alt="Protagonizei" width={32} height={32} data-aos="fade-in" data-aos-delay={500} />
        </div>
        {/* New floating elements */}
        <div className="absolute top-1/4 right-1/4 float-animation" style={{ animationDelay: '0.8s' }}>
          <Image src="/assets/images/asset-star.png" alt="Protagonizei" width={24} height={24} data-aos="fade-in" data-aos-delay={600} />
        </div>
        <div className="absolute bottom-1/3 left-1/4 float-animation" style={{ animationDelay: '1.2s' }}>
          <Image src="/assets/images/asset-heart.png" alt="Protagonizei" width={28} height={28} data-aos="fade-in" data-aos-delay={700} />
        </div>
        <div className="absolute bottom-1/4 right-1/3 float-animation" style={{ animationDelay: '0.3s' }}>
          <Image src="/assets/images/asset-star-2.png" alt="Protagonizei" width={24} height={24} data-aos="fade-in" data-aos-delay={800} />
        </div>
        <div className="absolute top-1/2 left-1/2 float-animation" style={{ animationDelay: '1.9s' }}>
          <Image src="/assets/images/asset-star.png" alt="Protagonizei" width={28} height={28} data-aos="fade-in" data-aos-delay={900} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between min-h-screen">
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0 z-[10]">
          {/* <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-pink-main to-blue-main text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
              ✨ Presente único e mágico ✨
            </span>
          </div> */}

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-none" data-aos="fade-up">
            <p className="text-black leading-tight">
              Aqui seu filho é o{' '}
              <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent">protagonista{' '}</span>
              da própria história!
            </p>

          </h1>

          <p className="text-lg md:text-xl text-black mb-8 leading-relaxed max-w-xl" data-aos="fade-up">
            Uma história personalizada onde seu pequeno se vê como herói.
            <strong className="text-pink-600"> Com nome, rosto e magia</strong> em cada página.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" data-aos="fade-up">
            <Link
              href="/#criar-historia"
              key="/#criar-historia"
              className="magical-border border-4 border-transparent text-white font-bold py-2 px-6 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300 font-englebert"
            >
              {/* <Sparkles className="w-5 h-5 mr-2" /> */}
              Crie sua história!
            </Link>
            {/* <Button 
              variant="outline" 
              size="lg"
              className="bg-white border-2 border-pink-300 text-pink-600 hover:bg-pink-50 py-4 px-8 rounded-full text-lg font-semibold"
            >
              Ver Exemplos
            </Button> */}
          </div>

          <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500" data-aos="fade-right">
            <div className="flex items-center">
              <Heart className="w-4 h-4 text-pink-main mr-1 fill-current" />
              <span className="text-gray-700">Mais de 1000 famílias encantadas</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-blue-main mr-1 fill-current" />
              <span className="text-gray-700">5/5 estrelas</span>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 relative">
          <div className="relative max-w-md mx-auto" data-aos="fade-left">
            {/* <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-all duration-500">
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-6 mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👧</span>
                </div>
                <h3 className="font-heading text-xl text-center font-bold text-gray-800 mb-2">
                  A Aventura de Luna
                </h3>
                <p className="text-black text-center text-sm">
                  Era uma vez uma menina corajosa chamada <strong className="text-pink-600">Luna</strong> que se tornou a heroína de sua própria história...
                </p>
              </div>
              <div className="text-center">
                <span className="text-xs text-gray-400 uppercase tracking-wide">Livro Personalizado</span>
              </div>
            </div> */}

            <div className="bg-white rounded-3xl shadow-2xl p-4 transform rotate-3 hover:rotate-0 transition-all duration-500 animate-float">
              <Image src="/assets/images/mockup.jpg" alt="Protagonizei" width={500} height={500} />
            </div>

            <div className="absolute -top-6 -right-6 bounce-slow">
              <div className="bg-yellow-300 rounded-full p-2 shadow-lg">
                {/* <Sparkles className="w-6 h-6 text-yellow-600" /> */}
                <Image src="/assets/images/gold-icon.png" alt="Protagonizei" width={40} height={40} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
