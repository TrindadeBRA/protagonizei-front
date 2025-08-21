import { Heart, BookOpen, Camera, Gift, PartyPopper, Star } from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    icon: Heart,
    title: "Laços que duram",
    description: "Momentos de leitura emocionantes que unem famílias e criam memórias inesquecíveis para sempre.",
    color: "from-pink-main to-blue-main"
  },
  {
    icon: BookOpen,
    title: "Amor pela Leitura",
    description: "Crianças que se veem como protagonistas desenvolvem naturalmente o prazer pela leitura com alegria.",
    color: "from-pink-main to-blue-main"
  },
  {
    icon: Camera,
    title: "Reconhecimento que encanta",
    description: "Nossa IA transforma a foto do seu filho em ilustrações mágicas, fazendo com que ele se reconheça na história.",
    color: "from-pink-main to-blue-main"
  },
  {
    icon: Gift,
    title: "Presente especialmente mágico",
    description: "Uma história única onde o seu filho é o herói principal, ideal para impressionar avós, tios e padrinhos.",
    color: "from-pink-main to-blue-main"
  },
  {
    icon: Star,
    title: "Autoconfiança e exclusividade",
    description: "Sentir-se protagonista desenvolve autoestima e alegria de ser especial.",
    color: "from-pink-main to-blue-main"
  },
  {
    icon: PartyPopper,
    title: "Diversão educativa",
    description: "Além da magia, cada página incentiva aprendizado, imaginação e criatividade de forma lúdica.",
    color: "from-pink-main to-blue-main"
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 opacity-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-800 mb-6" data-aos="fade-up">
            Por que escolher essa aventura
            <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent"> personalizada</span>?
          </h2>
          <p className="text-lg text-black max-w-2xl mx-auto" data-aos="fade-up">
            Mais do que um livro, é uma experiência mágica que transforma a infância do seu filho para sempre.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
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
            data-aos="fade-up"
          >
            Crie sua história!
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
