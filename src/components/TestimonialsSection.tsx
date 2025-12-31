
import { Star, Heart, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const testimonials = [
  {
    name: "Ricardo Ohara",
    gender_child: "female",
    location: "Rio de Janeiro, RJ",
    child: "Pai do Fernanda (5 anos)",
    rating: 3,
    text: "É nosso ritual de dormir favorito. Ter algo tão especial só fortalece nossa conexão.",
    avatar: "/assets/images/testimonials/ricardo.jpeg"
  },
  {
    name: "Ana Beatriz",
    gender_child: "male",
    location: "São Paulo, SP",
    child: "Mãe do João (3 anos)",
    rating: 5,
    text: "Meu filho não desgruda do livro! Agora ele mesmo conta a história pros amiguinhos. É leitura divertida garantida.",
    avatar: "/assets/images/testimonials/ana-beatriz.jpeg"
  },
  {
    name: "Juliana Silva",
    gender_child: "female",
    location: "Curitiba, PR",
    child: "Mãe da Sofia (5 anos)",
    rating: 5,
    text: "A Sofia ficou encantada ao ver seu rostinho nas páginas! Agora ela sempre pede para ler 'sua história' antes de dormir. Valeu cada centavo!",
    avatar: "/assets/images/testimonials/juliana.jpeg"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-800 mb-6" data-aos="fade-up">
            Confira nossos{" "}
            <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent">
              depoimentos
            </span>!
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-aos="fade-up">
            Mais de 1000 famílias já criaram momentos mágicos com nossos livros personalizados.
          </p>

          <div className="flex items-center justify-center mt-6 space-x-1" data-aos="fade-up">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
            <span className="ml-3 text-gray-600 font-semibold">4.9/5 (1.247 avaliações)</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
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
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center text-xl mr-4">
                  <Image src={testimonial.avatar} alt={testimonial.name} width={48} height={48} className="rounded-full" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-gray-800">{testimonial.name}</h4>
                  <p className={`text-sm font-semibold ${testimonial.gender_child === "male" ? "text-blue-main" : "text-pink-main"}`}>{testimonial.child}</p>
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
            data-aos="fade-up"
          >
            Crie sua história!
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
