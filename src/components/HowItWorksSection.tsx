import { FileText, Wand2, Mail, ArrowRight, ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Crie a Magia",
    description: "Nome, idade, gênero e uma foto do seu pequeno. Em apenas 2 minutos, a magia começa!",
    color: "from-pink-400 to-rose-400"
  },
  {
    number: "02",
    icon: Wand2,
    title: "A Magia Acontece",
    description: "Nossa IA cria uma história única e transforma a foto do seu filho em ilustrações mágicas.",
    color: "from-purple-400 to-indigo-400"
  },
  {
    number: "03",
    icon: Mail,
    title: "Receba a Magia",
    description: "Em até 24h, o PDF mágico chega no seu e-mail, pronto para baixar e criar memórias.",
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
      <div className="absolute top-10 right-10 opacity-15">
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
            Como a{" "}
            <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent">
            magia{" "}
            </span>
            acontece?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto" data-aos="fade-up">
            Em apenas 3 passos simples, você cria uma história mágica e inesquecível para seu filho.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4">
          {steps.map((step, index) => (
            <div key={index}>
              <div key={index} className="text-center group relative" data-aos="fade-in" data-aos-delay={index * 100}>
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
                <div className="flex items-center justify-center">
                  <ArrowRight className={twMerge("hidden lg:block w-8 h-8 text-pink-main", index == 1 && "text-blue-main")} />
                  <ArrowDown className={twMerge("block lg:hidden w-8 h-8 text-pink-main", index == 1 && "text-blue-main")} />
                </div>
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
