import { Heart, BookOpen, Camera, Gift, Users, Star } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Vínculos Afetivos",
    description: "Momentos mágicos de leitura que unem famílias e criam memórias inesquecíveis para toda a vida.",
    color: "from-pink-400 to-red-400"
  },
  {
    icon: BookOpen,
    title: "Amor pela Leitura",
    description: "Quando a criança se vê como protagonista, o interesse pelos livros cresce naturalmente e com alegria.",
    color: "from-purple-400 to-indigo-400"
  },
  {
    icon: Camera,
    title: "Rosto na História",
    description: "Nossa IA transforma a foto do seu filho em ilustrações mágicas, fazendo-o se reconhecer na aventura.",
    color: "from-blue-400 to-cyan-400"
  },
  {
    icon: Gift,
    title: "Presente Especial",
    description: "O presente mais mágico que existe: uma história onde seu filho é o herói principal da aventura.",
    color: "from-green-400 to-emerald-400"
  },
  {
    icon: Users,
    title: "Para Quem Ama",
    description: "Avós, tios e padrinhos se emocionam ao ver a criança protagonista de uma história única e especial.",
    color: "from-yellow-400 to-orange-400"
  },
  {
    icon: Star,
    title: "Confiança e Magia",
    description: "Ver-se como protagonista desenvolve autoconfiança e faz a criança se sentir especial e importante.",
    color: "from-rose-400 to-pink-400"
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            Por que escolher
            <span className="bg-gradient-to-r from-pink-main to-purple-500 bg-clip-text text-transparent"> Histórias Mágicas?</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mais do que um livro, é uma experiência mágica que transforma a infância do seu filho para sempre.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="font-heading text-xl font-bold text-gray-800 mb-4">
                {benefit.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-gradient-to-r from-pink-100 to-purple-100 rounded-full px-8 py-4">
            <Star className="w-5 h-5 text-yellow-500 fill-current mr-2" />
            <span className="text-gray-700 font-semibold">Aprovado por mais de 1000 famílias encantadas</span>
            <Star className="w-5 h-5 text-yellow-500 fill-current ml-2" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
