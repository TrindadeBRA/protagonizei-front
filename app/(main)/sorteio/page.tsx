'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRightIcon, Gift, CheckCircle2, Calendar, Trophy, AlertTriangle, Instagram } from 'lucide-react'
import { useState } from 'react'
import { getPostContactFormSubmitUrl, postContactFormSubmitResponse } from '@/src/services/api'
import customFetch from '@/src/services/custom-fetch'
import { errorToast, successToast } from '@/src/hooks/useToastify'
import { useHookFormMask } from 'use-mask-input'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { AlertBox } from '@/src/components/ui/alert-box'
import { twMerge } from 'tailwind-merge'

const sorteioFormSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório').min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().min(1, 'Campo obrigatório').email('Email inválido'),
  phone: z.string().min(1, 'Campo obrigatório'),
})

type SorteioFormData = z.infer<typeof sorteioFormSchema>

export default function SorteioPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SorteioFormData>({
    resolver: zodResolver(sorteioFormSchema),
  })
  const registerWithMask = useHookFormMask(register)

  // Cores do formulário no estilo FormSection (gradiente padrão)
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
      <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-start lg:justify-between gap-8">
        {/* Coluna da esquerda - Regras escritas */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="text-center lg:text-left space-y-4 text-base text-gray-800">
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent">
                Regras do Sorteio
              </span>
            </h3>

            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900 mb-2 text-lg flex items-center gap-2">
                  <Gift className="w-5 h-5 text-pink-main" />
                  Prêmio:
                </p>
                <p className="text-gray-700 text-base leading-relaxed">01 livro infantil personalizado digital, com a criança como protagonista (nome e aparência), entregue por e-mail.</p>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="w-5 h-5 text-blue-main" />
                  Como participar:
                </p>
                <ol className="space-y-2 text-gray-700 text-base list-decimal list-inside ml-2 leading-relaxed">
                  <li>Siga o perfil <a href="https://instagram.com/protagonizei" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold">@protagonizei</a> no Instagram</li>
                  <li>Envie a palavra &ldquo;SORTEIO&rdquo; na DM do Instagram</li>
                  <li>Acesse o link enviado e preencha o formulário com: Nome completo, E-mail válido e Telefone (WhatsApp)</li>
                </ol>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-2 text-lg flex items-center gap-2 justify-center lg:justify-start">
                  <Calendar className="w-5 h-5 text-blue-main" />
                  Período:
                </p>
                <p className="text-gray-700 text-base leading-relaxed">O sorteio acontece mensalmente. As inscrições são válidas até o último dia de cada mês, às 23h59.</p>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-2 text-lg flex items-center gap-2 justify-center lg:justify-start">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  Resultado:
                </p>
                <p className="text-gray-700 text-base leading-relaxed">O vencedor será escolhido de forma aleatória. O anúncio será feito por DM no Instagram e/ou pelos Stories da <a href="https://instagram.com/protagonizei" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold">@protagonizei</a>.</p>
              </div>

              <div className="pt-2">
                <p className="text-orange-700 text-base flex items-start gap-2 justify-center lg:justify-start leading-relaxed">
                  <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Atenção:</strong> Caso o vencedor não responda em até 48 horas, um novo sorteio poderá ser realizado.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna da direita - Formulário */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="mb-6">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span className="text-black leading-tight">
                Participe do{' '}
                <span className="bg-gradient-to-r from-pink-main to-blue-main bg-clip-text text-transparent">Sorteio</span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-4 leading-relaxed">
              Transforme seu pequeno em protagonista de uma história única e mágica! Preencha o formulário e concorra a um livro infantil personalizado com o nome e a aparência da criança.
            </p>
          </div>

          {/* Imagem fora do box, abaixo do texto */}
          <div className="flex items-center justify-center mb-6">
            <Image
              src="/assets/images/open-book.png"
              alt="Livro aberto"
              width={600}
              height={800}
              className="w-full h-auto max-w-md object-contain float-animation"
              priority
            />
          </div>

          {/* Card do Formulário no estilo FormSection */}
          <div className="bg-white rounded-3xl overflow-hidden animate-shadow-pulse-gradient">
            <div className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-semibold mb-2 block">
                      Nome Completo *
                    </Label>
                    <Input
                      id="name"
                      {...register('name')}
                      type="text"
                      autoComplete="name"
                      placeholder="Digite seu nome completo"
                      className={twMerge(formColors.inputBorderClass, formColors.inputFocusBorderClass)}
                      style={formColors.inputBorderStyle}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-semibold mb-2 block">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      {...register('email')}
                      type="email"
                      autoComplete="email"
                      placeholder="seuemail@exemplo.com"
                      className={twMerge(formColors.inputBorderClass, formColors.inputFocusBorderClass)}
                      style={formColors.inputBorderStyle}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-semibold mb-2 block">
                      Telefone *
                    </Label>
                    <Input
                      id="phone"
                      {...registerWithMask("phone", ['(99) 99999-9999'])}
                      type="tel"
                      autoComplete="tel"
                      placeholder="(00) 00000-0000"
                      className={twMerge(formColors.inputBorderClass, formColors.inputFocusBorderClass)}
                      style={formColors.inputBorderStyle}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-1">📱 Para contato em caso de dúvidas</p>
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

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="magical-border border-4 border-transparent text-white font-bold py-3 px-8 rounded-full text-lg shadow-xl hover:scale-105 transition-all duration-300 font-englebert cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-x-2"
                    aria-label={isSubmitting ? 'Enviando inscrição...' : 'Enviar inscrição'}
                  >
                    {isSubmitting ? 'Enviando...' : 'Participar do Sorteio'}
                    {!isSubmitting && <ArrowRightIcon className="size-4" />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

