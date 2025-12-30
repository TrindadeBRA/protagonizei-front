
import { Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Book3DExample from "./Book3DExample";

const examples = [
  {
    name: "João",
    age: 3,
    excerpt: "Ver o João se ver como protagonista da própria história foi mágico! Ele agora pede para ler 'o livro do João' toda noite e está muito mais confiante.",
    color: "from-pink-light via-purple-light to-blue-light",
    avatar: "/assets/images/examples/social2.jpg",
    pages: {
      coverImage: "/assets/images/examples/book-joao/cover.webp",
      page1Left: "/assets/images/examples/book-joao/page1.webp",
      page1Right: "/assets/images/examples/book-joao/page1.webp",
      page2Left: "/assets/images/examples/book-joao/page2.webp",
      page2Right: "/assets/images/examples/book-joao/page2.webp",
      page3Left: "/assets/images/examples/book-joao/page3.webp",
      page3Right: "/assets/images/examples/book-joao/page3.webp",
      page4Left: "/assets/images/examples/book-joao/page4.webp",
      page4Right: "/assets/images/examples/book-joao/page4.webp",
    }
  },
  {
    name: "Maria",
    age: 4,
    excerpt: "A Maria ficou encantada ao se ver na história! Ela sorriu do início ao fim e agora se sente uma verdadeira super-heroína. Foi o presente mais especial que já demos a ela.",
    color: "from-pink-light via-purple-light to-blue-light",
    avatar: "/assets/images/examples/social1.jpg",
    pages: {
      coverImage: "/assets/images/examples/book-maria/cover.webp",
      page1Left: "/assets/images/examples/book-maria/page1.webp",
      page1Right: "/assets/images/examples/book-maria/page1.webp",
      page2Left: "/assets/images/examples/book-maria/page2.webp",
      page2Right: "/assets/images/examples/book-maria/page2.webp",
      page3Left: "/assets/images/examples/book-maria/page3.webp",
      page3Right: "/assets/images/examples/book-maria/page3.webp",
      page4Left: "/assets/images/examples/book-maria/page4.webp",
      page4Right: "/assets/images/examples/book-maria/page4.webp",
    }
  },
];

const ExamplesSection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-black mb-6" data-aos="fade-up">
            Histórias reais de{" "}
            <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent">
              famílias felizes
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-aos="fade-up">
            Veja como outras famílias estão transformando momentos de leitura em memórias inesquecíveis e fortalecendo a autoestima dos seus pequenos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {examples.map((example, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2 animate-subtle-float" 
              style={{ animationDelay: `${index * 0.3}s` }}
              data-aos="fade-in" 
              data-aos-delay={index * 100}
            >
              <div className={`bg-gradient-to-br ${example.color} p-4 md:p-6 text-black relative`}>
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                  <div className="flex-shrink-0 animate-avatar-pulse" style={{ animationDelay: `${index * 0.2}s` }}>
                    <Image src={example.avatar} alt={example.name} width={120} height={120} className="rounded-full" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-sm md:text-base opacity-90 mb-2"><b>{example.name}</b>, {example.age} anos</p>
                    <p className="text-xs md:text-sm opacity-70 italic flex items-start gap-2">
                      <Quote className="w-4 h-4 text-gray-300 flex-shrink-0 mt-1" />
                      <span>&ldquo;{example.excerpt}&rdquo;</span>
                    </p> 
                  </div>
                </div>
              </div>

              <div className="px-2 md:px-6 py-2 md:py-4 relative overflow-hidden">
                {/* Floating decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                  <div className="absolute top-[8%] left-[12%] float-animation" style={{ animationDelay: `${index * 0.15 + 0}s` }}>
                    <Image src="/assets/images/asset-heart.png" alt="" width={18} height={18} />
                  </div>
                  <div className="absolute top-[5%] right-[18%] float-animation" style={{ animationDelay: `${index * 0.15 + 0.4}s` }}>
                    <Image src="/assets/images/asset-heart-2.png" alt="" width={16} height={16} />
                  </div>
                  <div className="absolute top-[15%] left-[35%] float-animation" style={{ animationDelay: `${index * 0.15 + 0.8}s` }}>
                    <Image src="/assets/images/asset-star.png" alt="" width={20} height={20} />
                  </div>
                  <div className="absolute top-[12%] right-[42%] float-animation" style={{ animationDelay: `${index * 0.15 + 1.2}s` }}>
                    <Image src="/assets/images/asset-star-2.png" alt="" width={14} height={14} />
                  </div>
                  <div className="absolute top-[22%] left-[8%] float-animation" style={{ animationDelay: `${index * 0.15 + 1.6}s` }}>
                    <Image src="/assets/images/asset-heart-2.png" alt="" width={22} height={22} />
                  </div>
                  <div className="absolute top-[25%] right-[25%] float-animation" style={{ animationDelay: `${index * 0.15 + 2}s` }}>
                    <Image src="/assets/images/asset-star.png" alt="" width={18} height={18} />
                  </div>
                  <div className="absolute top-[28%] left-[55%] float-animation" style={{ animationDelay: `${index * 0.15 + 2.4}s` }}>
                    <Image src="/assets/images/asset-heart.png" alt="" width={16} height={16} />
                  </div>
                  <div className="absolute top-[32%] right-[8%] float-animation" style={{ animationDelay: `${index * 0.15 + 2.8}s` }}>
                    <Image src="/assets/images/asset-star-2.png" alt="" width={20} height={20} />
                  </div>
                  <div className="absolute top-[38%] left-[22%] float-animation" style={{ animationDelay: `${index * 0.15 + 3.2}s` }}>
                    <Image src="/assets/images/asset-star.png" alt="" width={14} height={14} />
                  </div>
                  <div className="absolute top-[42%] right-[38%] float-animation" style={{ animationDelay: `${index * 0.15 + 3.6}s` }}>
                    <Image src="/assets/images/asset-heart-2.png" alt="" width={18} height={18} />
                  </div>
                  <div className="absolute top-[48%] left-[45%] float-animation" style={{ animationDelay: `${index * 0.15 + 4}s` }}>
                    <Image src="/assets/images/asset-heart.png" alt="" width={22} height={22} />
                  </div>
                  <div className="absolute top-[52%] right-[15%] float-animation" style={{ animationDelay: `${index * 0.15 + 4.4}s` }}>
                    <Image src="/assets/images/asset-star-2.png" alt="" width={16} height={16} />
                  </div>
                  <div className="absolute top-[58%] left-[18%] float-animation" style={{ animationDelay: `${index * 0.15 + 4.8}s` }}>
                    <Image src="/assets/images/asset-star.png" alt="" width={20} height={20} />
                  </div>
                  <div className="absolute top-[62%] right-[48%] float-animation" style={{ animationDelay: `${index * 0.15 + 5.2}s` }}>
                    <Image src="/assets/images/asset-heart-2.png" alt="" width={14} height={14} />
                  </div>
                  <div className="absolute top-[68%] left-[32%] float-animation" style={{ animationDelay: `${index * 0.15 + 5.6}s` }}>
                    <Image src="/assets/images/asset-heart.png" alt="" width={18} height={18} />
                  </div>
                  <div className="absolute top-[72%] right-[28%] float-animation" style={{ animationDelay: `${index * 0.15 + 6}s` }}>
                    <Image src="/assets/images/asset-star-2.png" alt="" width={16} height={16} />
                  </div>
                  <div className="absolute top-[78%] left-[52%] float-animation" style={{ animationDelay: `${index * 0.15 + 6.4}s` }}>
                    <Image src="/assets/images/asset-star.png" alt="" width={20} height={20} />
                  </div>
                  <div className="absolute top-[82%] right-[12%] float-animation" style={{ animationDelay: `${index * 0.15 + 6.8}s` }}>
                    <Image src="/assets/images/asset-heart-2.png" alt="" width={18} height={18} />
                  </div>
                  <div className="absolute top-[85%] left-[28%] float-animation" style={{ animationDelay: `${index * 0.15 + 7.2}s` }}>
                    <Image src="/assets/images/asset-heart.png" alt="" width={14} height={14} />
                  </div>
                  <div className="absolute top-[88%] right-[35%] float-animation" style={{ animationDelay: `${index * 0.15 + 7.6}s` }}>
                    <Image src="/assets/images/asset-star-2.png" alt="" width={22} height={22} />
                  </div>
                  <div className="absolute top-[35%] left-[68%] float-animation" style={{ animationDelay: `${index * 0.15 + 8}s` }}>
                    <Image src="/assets/images/asset-star.png" alt="" width={16} height={16} />
                  </div>
                  <div className="absolute top-[55%] left-[75%] float-animation" style={{ animationDelay: `${index * 0.15 + 8.4}s` }}>
                    <Image src="/assets/images/asset-heart-2.png" alt="" width={18} height={18} />
                  </div>
                  <div className="absolute top-[18%] left-[78%] float-animation" style={{ animationDelay: `${index * 0.15 + 8.8}s` }}>
                    <Image src="/assets/images/asset-heart.png" alt="" width={20} height={20} />
                  </div>
                  <div className="absolute top-[65%] right-[55%] float-animation" style={{ animationDelay: `${index * 0.15 + 9.2}s` }}>
                    <Image src="/assets/images/asset-star-2.png" alt="" width={14} height={14} />
                  </div>
                </div>
                <div className="max-w-md mx-auto relative z-10">
                  <Book3DExample 
                    coverImage={example.pages.coverImage}
                    page1Left={example.pages.page1Left}
                    page1Right={example.pages.page1Right}
                    page2Left={example.pages.page2Left}
                    page2Right={example.pages.page2Right}
                    page3Left={example.pages.page3Left}
                    page3Right={example.pages.page3Right}
                    page4Left={example.pages.page4Left}
                    page4Right={example.pages.page4Right}
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

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

export default ExamplesSection;
