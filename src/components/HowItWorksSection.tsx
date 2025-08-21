import { FileText, Wand2, Mail, ArrowRight, ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Conte sobre seu pequeno",
    description: "Informe nome, idade, gênero e envie uma foto. Em 2 minutos, a magia começa!",
    color: "from-pink-400 to-rose-400"
  },
  {
    number: "02",
    icon: Wand2,
    title: "Nossa IA transforma tudo",
    description: "Receba um PDF encantado com ilustrações únicas e história sob medida.",
    color: "from-purple-400 to-indigo-400"
  },
  {
    number: "03",
    icon: Mail,
    title: "A magia é entregue",
    description: "Em até 24h, o livro chega por e-mail, pronto para baixar e criar memórias para sempre.",
    color: "from-blue-400 to-cyan-400"
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-15">
        <Image src="/assets/images/asset-star-2.png" alt="Protagonizei" width={80} height={80} />
      </div>
      <div className="hidden lg:block absolute top-10 right-10 opacity-15">
        <Image src="/assets/images/asset-heart-2.png" alt="Protagonizei" width={80} height={80} />
      </div>
      {/* <div className="absolute bottom-10 right-10 opacity-20">
        <Image src="/assets/images/asset-star.png" alt="Protagonizei" width={80} height={80} />
      </div>
      <div className="absolute bottom-10 left-10 opacity-15">
        <Image src="/assets/images/asset-heart.png" alt="Protagonizei" width={80} height={80} />
      </div> */}



      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-800 mb-6" data-aos="fade-up">
            Simples como{" "}
            <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent">
              mágica
            </span>
            !
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto" data-aos="fade-up">
            Crie em 3 cliques e receba em{" "}
            <b>até 24h</b>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col lg:flex-row items-center">
              <div className="text-center group relative" data-aos="fade-in" data-aos-delay={index * 100}>
                <div className="relative mb-8">
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 bg-white border-4 border-gray-100 rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-20">
                    <span className="font-heading text-sm font-bold text-gray-600">
                      {step.number}
                    </span>
                  </div>

                  {/* Icon container */}
                  <div
                    className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300 relative z-10`}
                    data-aos="fade-in"
                    data-aos-delay={index * 100}
                  >
                    <step.icon className="w-12 h-12 text-white" />
                  </div>
                </div>

                <h3 className="font-heading text-xl font-bold text-gray-800 mb-4">
                  {step.title}
                </h3>

                <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <>
                  <div className="hidden lg:flex items-center px-4">
                    <ArrowRight className={twMerge("w-8 h-8 text-pink-main", index == 1 && "text-blue-main")} />
                  </div>
                  <div className="flex lg:hidden items-center justify-center w-full my-6">
                    <ArrowDown className={twMerge("w-8 h-8 text-pink-main", index == 1 && "text-blue-main")} />
                  </div>
                </>
              )}
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

export default HowItWorksSection;
