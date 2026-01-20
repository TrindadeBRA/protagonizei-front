'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRightIcon, Gift, CheckCircle2, Calendar, Trophy, AlertTriangle, Heart, Star, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getPostContactFormSubmitUrl, postContactFormSubmitResponse, getGetPostSlugsUrl } from '@/src/services/api'
import customFetch from '@/src/services/custom-fetch'
import { errorToast, successToast } from '@/src/hooks/useToastify'
import { useHookFormMask } from 'use-mask-input'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { AlertBox } from '@/src/components/ui/alert-box'
import { twMerge } from 'tailwind-merge'
import RecentPostsSection from '@/src/components/RecentPostsSection'
import { GetPostSlugs200DataItem, GetPostSlugs200 } from '@/src/services/model'

const sorteioFormSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório').min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().min(1, 'Campo obrigatório').email('Email inválido'),
  phone: z.string().min(1, 'Campo obrigatório'),
})

type SorteioFormData = z.infer<typeof sorteioFormSchema>

export default function SorteioPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [posts, setPosts] = useState<GetPostSlugs200DataItem[]>([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SorteioFormData>({
    resolver: zodResolver(sorteioFormSchema),
  })
  const registerWithMask = useHookFormMask(register)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoadingPosts(true)
        const response = await customFetch<GetPostSlugs200>(
          getGetPostSlugsUrl({ quantity: 3 })
        )
        
        if (response && response.data && Array.isArray(response.data)) {
          setPosts(response.data)
        }
      } catch (error) {
        console.error('Erro ao buscar posts:', error)
      } finally {
        setIsLoadingPosts(false)
      }
    }

    fetchPosts()
  }, [])

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]
  const mesAtual = meses[new Date().getMonth()]

  const formColors = {
    inputBorderClass: "border-2 rounded-xl bg-white transition-colors",
    inputBorderStyle: {
      background: "linear-gradient(white, white) padding-box, linear-gradient(to right, rgba(245, 52, 155, 0.4), rgba(53, 126, 255, 0.4)) border-box",
      border: "2px solid transparent",
    } as React.CSSProperties,
    inputFocusBorderClass: "focus:border-pink-300 focus:ring-2 focus:ring-pink-200",
  }

  const onSubmit = async (data: SorteioFormData) => {
    try {
      setIsSubmitting(true)

      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('message', 'Inscrição no sorteio')
      formData.append('tag', 'Sorteio')

      const response: any = await customFetch<postContactFormSubmitResponse>(getPostContactFormSubmitUrl(), {
        method: 'POST',
        body: formData,
      })
        
      if (response.success) {
        successToast("Inscrição realizada com sucesso! Boa sorte no sorteio!")
        reset()
        router.push('/sorteio/obrigado')
      } else {
        throw new Error("Erro ao enviar formulário")
      }

    } catch (e) {
      console.error("Erro ao enviar o formulário", e)
      errorToast("Ocorreu um erro ao enviar a inscrição. Tente novamente mais tarde.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 md:opacity-40">
        <div className="absolute top-20 left-10 float-animation">
          <Image src="/assets/images/asset-star.png" alt="Star" width={32} height={32} sizes="32px" data-aos="fade-in" data-aos-delay={100} />
        </div>
        <div className="absolute top-40 right-20 float-animation" style={{ animationDelay: '1s' }}>
          <Image src="/assets/images/asset-heart.png" alt="Heart" width={32} height={32} sizes="32px" data-aos="fade-in" data-aos-delay={200} />
        </div>
        <div className="absolute bottom-40 left-20 float-animation" style={{ animationDelay: '2s' }}>
          <Image src="/assets/images/asset-star.png" alt="Star" width={32} height={32} data-aos="fade-in" data-aos-delay={300} />
        </div>
        <div className="absolute top-60 left-1/3 float-animation" style={{ animationDelay: '0.5s' }}>
          <Image src="/assets/images/asset-star-2.png" alt="Star" width={32} height={32} sizes="32px" data-aos="fade-in" data-aos-delay={400} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12">
            
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
              <div className="inline-block mb-4" data-aos="fade-down">
                <span className="bg-gradient-to-r from-pink-main to-blue-main text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-md flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Sorteio Mensal • Grátis
                </span>
              </div>

              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 leading-tight" data-aos="fade-up">
                <span className="text-black">
                  Participe e ganhe um livro{' '}
                  <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent">
                    personalizado
                  </span>
                  !
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-700 font-medium mb-3 leading-relaxed" data-aos="fade-up" data-aos-delay={100}>
                Livro digital com <strong className="text-pink-600">nome e rosto</strong> da criança como protagonista
              </p>

              <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed" data-aos="fade-up" data-aos-delay={200}>
                Preencha o formulário e concorra! O sorteio acontece <strong className="text-blue-600">mensalmente</strong>.
              </p>

              <div className="w-full flex flex-wrap items-center justify-center gap-3 mb-8" data-aos="fade-up" data-aos-delay={300}>
                <div className="flex items-center bg-white/80 px-3 py-1.5 rounded-full shadow-sm">
                  <Heart className="w-4 h-4 text-pink-main mr-1.5 fill-current" />
                  <span className="text-gray-800 font-semibold text-sm">+1000 famílias</span>
                </div>
                <div className="flex items-center bg-white/80 px-3 py-1.5 rounded-full shadow-sm">
                  <Star className="w-4 h-4 text-blue-main mr-1.5 fill-current" />
                  <span className="text-gray-800 font-semibold text-sm">5/5 estrelas</span>
                </div>
                <div className="flex items-center bg-white/80 px-3 py-1.5 rounded-full shadow-sm">
                  <Gift className="w-4 h-4 text-pink-main mr-1.5" />
                  <span className="text-gray-800 font-semibold text-sm">Entrega Digital</span>
                </div>
              </div>

              <div className="w-full max-w-lg mx-auto mb-6 lg:mb-0" data-aos="fade-up" data-aos-delay={400}>
                <Image
                  src="/assets/images/open-book.png"
                  alt="Livro personalizado"
                  width={600}
                  height={800}
                  className="w-full h-auto object-contain float-animation"
                  priority
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col z-10" data-aos="fade-left" data-aos-delay={200}>
              <div className="bg-white rounded-3xl overflow-hidden animate-shadow-pulse-gradient shadow-2xl">
                <div className="p-6 md:p-8">
                  <div className="mb-6 text-center">
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                      Participe agora do sorteio do mês de {mesAtual}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Preencha seus dados e concorra ao sorteio
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="text-gray-700 font-semibold mb-2 block text-sm">
                          Nome Completo *
                        </Label>
                        <Input
                          id="name"
                          {...register('name')}
                          type="text"
                          autoComplete="name"
                          placeholder="Digite seu nome completo"
                          className={twMerge(formColors.inputBorderClass, formColors.inputFocusBorderClass, "h-12")}
                          style={formColors.inputBorderStyle}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-gray-700 font-semibold mb-2 block text-sm">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          {...register('email')}
                          type="email"
                          autoComplete="email"
                          placeholder="seuemail@exemplo.com"
                          className={twMerge(formColors.inputBorderClass, formColors.inputFocusBorderClass, "h-12")}
                          style={formColors.inputBorderStyle}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-gray-700 font-semibold mb-2 block text-sm">
                          Telefone (WhatsApp) *
                        </Label>
                        <Input
                          id="phone"
                          {...registerWithMask("phone", ['(99) 99999-9999'])}
                          type="tel"
                          autoComplete="tel"
                          placeholder="(00) 00000-0000"
                          className={twMerge(formColors.inputBorderClass, formColors.inputFocusBorderClass, "h-12")}
                          style={formColors.inputBorderStyle}
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <AlertBox className="rounded-lg">
                      <p className="text-xs text-gray-700 leading-relaxed">
                        Ao enviar, você concorda com nossa{' '}
                        <Link 
                          href="/politica-de-privacidade" 
                          target="_blank"
                          className="text-pink-main hover:text-pink-700 underline font-semibold"
                        >
                          Política de Privacidade
                        </Link>
                        {' '}e autoriza o recebimento de comunicações da Protagonizei.
                      </p>
                    </AlertBox>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full magical-border border-4 border-transparent text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300 font-englebert cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-x-2"
                      aria-label={isSubmitting ? 'Enviando inscrição...' : 'Participar do sorteio'}
                    >
                      {isSubmitting ? 'Enviando...' : 'Participar do Sorteio'}
                      {!isSubmitting && <ArrowRightIcon className="size-5" />}
                    </button>

                    <p className="text-center text-xs text-gray-500 mt-4">
                      ✓ Inscrição gratuita • ✓ Sem compromisso • ✓ Dados protegidos
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16 border-t border-pink-200/50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg">
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-center" data-aos="fade-up">
              <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent">
                Regras do Sorteio
              </span>
            </h3>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl p-5 border-l-4 border-pink-main" data-aos="fade-up" data-aos-delay={100}>
                <p className="font-semibold text-gray-900 mb-2 text-lg flex items-center gap-2">
                  <Gift className="w-5 h-5 text-pink-main flex-shrink-0" />
                  Prêmio:
                </p>
                <p className="text-gray-700 text-base leading-relaxed ml-7">
                  01 livro infantil personalizado digital, com a criança como protagonista (nome e aparência), entregue por e-mail.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-pink-50 rounded-xl p-5 border-l-4 border-blue-main" data-aos="fade-up" data-aos-delay={200}>
                <p className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-main flex-shrink-0" />
                  Como participar:
                </p>
                <ol className="space-y-2 text-gray-700 text-base leading-relaxed ml-7">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-black">1.</span>
                    <span>Siga o perfil <a href="https://instagram.com/protagonizei.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold underline">@protagonizei</a> no Instagram</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-black">2.</span>
                    <span>Envie a palavra &ldquo;SORTEIO&rdquo; na DM do Instagram</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-black">3.</span>
                    <span>Acesse o link enviado e preencha o formulário acima com: Nome completo, E-mail válido e Telefone (WhatsApp)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-black">4.</span>
                    <span>Quanto mais posts você interagir (curtir, comentar, compartilhar), maiores serão suas chances de ganhar!</span>
                  </li>
                </ol>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl p-5 border-l-4 border-pink-main" data-aos="fade-up" data-aos-delay={300}>
                <p className="font-semibold text-gray-900 mb-2 text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-pink-main flex-shrink-0" />
                  Período:
                </p>
                <p className="text-gray-700 text-base leading-relaxed ml-7">
                  O sorteio acontece mensalmente. As inscrições são válidas até o último dia de cada mês, às 23h59.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-pink-50 rounded-xl p-5 border-l-4 border-blue-main" data-aos="fade-up" data-aos-delay={400}>
                <p className="font-semibold text-gray-900 mb-2 text-lg flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-blue-main flex-shrink-0" />
                  Resultado:
                </p>
                <p className="text-gray-700 text-base leading-relaxed ml-7">
                  O vencedor será escolhido de forma aleatória. O anúncio será feito por DM no Instagram e/ou pelos Stories da <a href="https://instagram.com/protagonizei.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold underline">@protagonizei</a>.
                </p>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-xl p-5 border-l-4 border-pink-main" data-aos="fade-up" data-aos-delay={500}>
                <p className="text-gray-800 text-base flex items-start gap-2 leading-relaxed">
                  <AlertTriangle className="w-5 h-5 text-pink-main flex-shrink-0 mt-0.5" />
                  <span><strong>Atenção:</strong> Caso o vencedor não responda em até 48 horas, um novo sorteio poderá ser realizado.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isLoadingPosts && posts.length > 0 && (
        <RecentPostsSection posts={posts} />
      )}
    </section>
  )
}

