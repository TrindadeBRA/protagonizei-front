import { Heart, BookOpen, Camera, Gift, Users, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const benefits = [
  {
    icon: Heart,
    title: "Vínculos Afetivos",
    description: "Momentos mágicos de leitura que unem famílias e criam memórias inesquecíveis para toda a vida.",
    color: "from-pink-main to-blue-main"
  },
  {
    icon: BookOpen,
    title: "Amor pela Leitura",
    description: "Quando a criança se vê como protagonista, o interesse pelos livros cresce naturalmente e com alegria.",
    color: "from-pink-main to-blue-main"
  },
  {
    icon: Camera,
    title: "Rosto na História",
    description: "Nossa IA transforma a foto do seu filho em ilustrações mágicas, fazendo-o se reconhecer na aventura.",
    color: "from-pink-main to-blue-main"
  },
  {
    icon: Gift,
    title: "Presente Especial",
    description: "O presente mais mágico que existe: uma história onde seu filho é o herói principal da aventura.",
    color: "from-pink-main to-blue-main"
  },
  {
    icon: Users,
    title: "Para Quem Ama",
    description: "Avós, tios e padrinhos se emocionam ao ver a criança protagonista de uma história única e especial.",
    color: "from-pink-main to-blue-main"
  },
  {
    icon: Star,
    title: "Confiança e Magia",
    description: "Ver-se como protagonista desenvolve autoconfiança e faz a criança se sentir especial e importante.",
    color: "from-pink-main to-blue-main"
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
            <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent"> Protagonizei</span> ?
          </h2>
          <p className="text-lg text-black max-w-2xl mx-auto">
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

              <p className="text-blocack leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>


        <div className="flex justify-center mt-16">
          <Link
            href="/#criar-historia"
            key="/#criar-historia"
            className="magical-border border-4 border-transparent text-white font-bold py-2 px-6 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300 font-englebert"
          >
            Crie sua história!
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
