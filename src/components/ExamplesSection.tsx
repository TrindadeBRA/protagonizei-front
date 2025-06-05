
import { Quote, Star } from "lucide-react";

const examples = [
  {
    name: "Lucas",
    age: 5,
    story: "A Grande Aventura de Lucas",
    excerpt: "Era uma vez um menino corajoso chamado **Lucas** que vivia em uma casa azul com seu cachorro Rex. Um dia, **ele** descobriu um mapa misterioso no sótão...",
    image: "👦",
    color: "from-blue-400 to-cyan-400"
  },
  {
    name: "Maria",
    age: 4,
    story: "Maria e o Reino Encantado",
    excerpt: "**Maria** era uma princesa muito especial que morava em um castelo colorido. **Ela** tinha o poder de conversar com os animais da floresta...",
    image: "👸",
    color: "from-pink-400 to-rose-400"
  },
  {
    name: "Pedro",
    age: 6,
    story: "Pedro, o Super-Herói",
    excerpt: "Na cidade de Aventura vivia **Pedro**, um menino que descobriu ter poderes especiais. **Ele** podia voar mais alto que as nuvens...",
    image: "🦸‍♂️",
    color: "from-green-400 to-emerald-400"
  }
];

const ExamplesSection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            Veja como fica
            <span className="block bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              a história personalizada
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cada história é única, com o nome, pronomes e características da sua criança em cada página.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <div 
              key={index}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2"
            >
              {/* Header */}
              <div className={`bg-gradient-to-br ${example.color} p-6 text-white relative`}>
                <div className="absolute top-4 right-4 opacity-20">
                  <Star className="w-8 h-8 fill-current" />
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">{example.image}</div>
                  <h3 className="font-heading text-xl font-bold">{example.story}</h3>
                  <p className="text-sm opacity-90">Protagonista: {example.name}, {example.age} anos</p>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <Quote className="w-6 h-6 text-gray-300 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 leading-relaxed italic">
                    {example.excerpt.split('**').map((part, i) => 
                      i % 2 === 1 ? (
                        <strong key={i} className="text-pink-600 not-italic font-bold">
                          {part}
                        </strong>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Personalização:</span>
                    <div className="flex space-x-2">
                      <span className="bg-pink-200 text-pink-700 px-2 py-1 rounded-full text-xs font-semibold">Nome</span>
                      <span className="bg-purple-200 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">Rosto</span>
                      <span className="bg-blue-200 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">Pronomes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 max-w-md mx-auto border-2 border-yellow-200">
            <div className="text-2xl mb-3">🎨</div>
            <h4 className="font-heading font-bold text-gray-800 mb-2">Ilustrações Únicas</h4>
            <p className="text-gray-600 text-sm">
              Cada história tem ilustrações feitas especialmente para seu filho, com o rostinho dele nas páginas!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamplesSection;
