
import { Button } from "@/src/components/ui/button";
import { Heart, Sparkles, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 float-animation">
          <Star className="w-8 h-8 text-yellow-400 fill-current" />
        </div>
        <div className="absolute top-40 right-20 float-animation" style={{ animationDelay: '1s' }}>
          <Heart className="w-6 h-6 text-pink-400 fill-current" />
        </div>
        <div className="absolute bottom-40 left-20 float-animation" style={{ animationDelay: '2s' }}>
          <Sparkles className="w-10 h-10 text-purple-400 fill-current" />
        </div>
        <div className="absolute top-60 left-1/3 float-animation" style={{ animationDelay: '0.5s' }}>
          <Star className="w-5 h-5 text-blue-400 fill-current" />
        </div>
        <div className="absolute bottom-60 right-1/4 float-animation" style={{ animationDelay: '1.5s' }}>
          <Heart className="w-7 h-7 text-red-300 fill-current" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between min-h-screen">
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
              ✨ Crie memórias mágicas ✨
            </span>
          </div>
          
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Seu filho é o
            </span>
            <br />
            <span className="text-gray-800">herói da história!</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
            Livros infantis personalizados onde seu pequeno se torna o protagonista. 
            <strong className="text-pink-600"> Nome, rosto e aventuras únicas</strong> em cada página.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button 
              size="lg" 
              className="magical-border border-4 border-transparent text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Criar História Agora
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white border-2 border-pink-300 text-pink-600 hover:bg-pink-50 py-4 px-8 rounded-full text-lg font-semibold"
            >
              Ver Exemplos
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Heart className="w-4 h-4 text-red-400 mr-1 fill-current" />
              <span>Mais de 1000 famílias felizes</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
              <span>5/5 estrelas</span>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 relative">
          <div className="relative max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-all duration-500">
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-6 mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👧</span>
                </div>
                <h3 className="font-heading text-xl text-center font-bold text-gray-800 mb-2">
                  "A Aventura de Sofia"
                </h3>
                <p className="text-gray-600 text-center text-sm">
                  Era uma vez uma menina corajosa chamada <strong className="text-pink-600">Sofia</strong> que descobriu um mundo mágico...
                </p>
              </div>
              <div className="text-center">
                <span className="text-xs text-gray-400 uppercase tracking-wide">Livro Personalizado</span>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bounce-slow">
              <div className="bg-yellow-300 rounded-full p-3 shadow-lg">
                <Sparkles className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
