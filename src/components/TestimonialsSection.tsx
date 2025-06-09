
import { Star, Heart, Quote } from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    name: "Ana Carolina",
    location: "São Paulo, SP",
    child: "Mãe da Sofia (4 anos)",
    rating: 5,
    text: "Minha filha ficou encantada! Ela se reconheceu nas ilustrações e agora pede para ler 'o livro da Sofia' toda noite. Foi o presente mais especial que já dei para ela.",
    avatar: "👩‍💼"
  },
  {
    name: "Ricardo Santos",
    location: "Rio de Janeiro, RJ",
    child: "Pai do Gabriel (6 anos)",
    rating: 5,
    text: "O Gabriel não largava mais o tablet, mas depois que recebeu o livro personalizado, virou um pequeno leitor! Agora ele mesmo conta a história para os amiguinhos.",
    avatar: "👨‍💻"
  },
  {
    name: "Mariana Lima",
    location: "Belo Horizonte, MG",
    child: "Mãe dos gêmeos João e Pedro (5 anos)",
    rating: 5,
    text: "Encomendei para os dois gêmeos e cada um ganhou sua própria aventura. Eles adoraram ver que eram heróis diferentes em histórias únicas. Recomendo muito!",
    avatar: "👩‍🎓"
  },
  {
    name: "Carlos Mendes",
    location: "Porto Alegre, RS",
    child: "Pai da Laura (3 anos)",
    rating: 5,
    text: "A Laura ainda é pequena, mas já adora ver as figuras dela no livro. É emocionante ver o rostinho dela iluminando quando reconhece que é ela na história.",
    avatar: "👨‍🔧"
  },
  {
    name: "Fernanda Costa",
    location: "Fortaleza, CE",
    child: "Mãe do Theo (7 anos)",
    rating: 5,
    text: "Presente de aniversário perfeito! O Theo se sentiu especial demais. Já encomendei para dar de presente para os primos também. Qualidade excepcional!",
    avatar: "👩‍⚕️"
  },
  {
    name: "Bruno Oliveira",
    location: "Salvador, BA",
    child: "Pai da Helena (4 anos)",
    rating: 5,
    text: "Como pai solteiro, sempre busco maneiras de criar momentos especiais com minha filha. Esse livro virou nosso ritual de dormir favorito!",
    avatar: "👨‍🍳"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            O que dizem os{" "}
            <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent">
              pais dos protagonistas
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mais de 1000 famílias já criaram momentos mágicos com nossos livros personalizados.
          </p>

          <div className="flex items-center justify-center mt-6 space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
            <span className="ml-3 text-gray-600 font-semibold">4.9/5 (1.247 avaliações)</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative group hover:-translate-y-1"
            >
              {/* Quote icon */}
              <div className="absolute -top-3 -left-3 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full p-2">
                <Quote className="w-4 h-4 text-white" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                `&ldquo;`{testimonial.text}`&ldquo;`
              </p>

              {/* Author info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center text-xl mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-pink-600 font-semibold">{testimonial.child}</p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>

              {/* Heart decoration */}
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                <Heart className="w-6 h-6 text-pink-300 fill-current" />
              </div>
            </div>
          ))}
        </div>

        {/* <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg inline-block max-w-md border-l-4 border-pink-400">
            <div className="flex items-center justify-center mb-3">
              <Heart className="w-5 h-5 text-red-400 fill-current mr-2" />
              <span className="font-heading font-bold text-gray-800">Garantia de Amor</span>
              <Heart className="w-5 h-5 text-red-400 fill-current ml-2" />
            </div>
            <p className="text-gray-600 text-sm">
              Se seu filho não se apaixonar pela história, devolvemos seu dinheiro!
            </p>
          </div>
        </div> */}


        <div className="flex justify-center mt-12">
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

export default TestimonialsSection;
