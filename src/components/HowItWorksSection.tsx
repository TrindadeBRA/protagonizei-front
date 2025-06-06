import { FileText, Wand2, Mail, Sparkles } from "lucide-react";

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
      <div className="absolute top-10 left-10 opacity-20">
        <Sparkles className="w-20 h-20 text-purple-300" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20">
        <Sparkles className="w-16 h-16 text-pink-300" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            Como a magia
            <span className="block bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              acontece?
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Em apenas 3 passos simples, você cria uma história mágica e inesquecível para seu filho.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-1/2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-full transform -translate-y-1/2 z-0"></div>
          
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 bg-white border-4 border-gray-100 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                    <span className="font-heading text-sm font-bold text-gray-600">
                      {step.number}
                    </span>
                  </div>
                  
                  {/* Icon container */}
                  <div className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300`}>
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
            ))}
          </div>
        </div>
        
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-6 shadow-lg inline-block border-2 border-dashed border-pink-200">
            <div className="flex items-center justify-center space-x-2 text-pink-600 mb-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-heading font-bold">Garantia de Magia</span>
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="text-gray-600 text-sm">
              Se a magia não acontecer, devolvemos 100% do seu investimento
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
