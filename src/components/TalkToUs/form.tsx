'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRightIcon } from 'lucide-react'
import { useState } from 'react'
import { getPostContactFormSubmitUrl, postContactFormSubmitResponse } from '@/src/services/api'
import customFetch from '@/src/services/custom-fetch'
import { errorToast, successToast } from '@/src/hooks/useToastify'
import { useHookFormMask } from 'use-mask-input'
import Link from 'next/link'

const talkToUsFormSchema = z.object({
  name: z.string().min(1, 'Campo obrigatório').min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().min(1, 'Campo obrigatório').email('Email inválido'),
  phone: z.string().min(1, 'Campo obrigatório'),
  message: z.string().optional(),
})

type TalkToUsFormData = z.infer<typeof talkToUsFormSchema>

export function TalkToUsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TalkToUsFormData>({
    resolver: zodResolver(talkToUsFormSchema),
  })
  const registerWithMask = useHookFormMask(register);

  const onSubmit = async (data: TalkToUsFormData) => {
    try {
      setIsSubmitting(true)

      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('message', data.message || '')
      formData.append('tag', 'Fale Conosco')

      const response:any = await customFetch<postContactFormSubmitResponse>(getPostContactFormSubmitUrl(), {
        method: 'POST',
        body: formData,
      })
        
      if (response.success) {
        successToast("Mensagem enviada com sucesso! Entraremos em contato em breve.")
        reset()
      } else {
        throw new Error("Erro ao enviar formulário")
      }

    } catch (e) {
      console.error("Erro ao enviar o formulário", e)
      errorToast("Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde.")
    } finally {
      setIsSubmitting(false)

    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-6 pt-16 pb-16 lg:px-8">
      <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block text-sm/6 font-semibold text-white">
              Nome*
            </label>
            <div className="mt-2.5">
              <input
                {...register('name')}
                type="text"
                autoComplete="name"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
              {errors.name && (
                <p className="mt-1 text-[10px] text-red-300">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm/6 font-semibold text-white">
              Email*
            </label>
            <div className="mt-2.5">
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-white focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
              {errors.email && (
                <p className="mt-1 text-[10px] text-red-300">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="phone" className="block text-sm/6 font-semibold text-white">
              Telefone*
            </label>
            <div className="mt-2.5">
              <input
                type="tel"
                autoComplete="tel"
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-white focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                {...registerWithMask("phone", ['(99) 99999-9999'])}
              />
              {errors.phone && (
                <p className="mt-1 text-[10px] text-red-300">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm/6 font-semibold text-white">
              Mensagem
            </label>
            <div className="mt-2.5">
              <textarea
                {...register('message')}
                rows={4}
                className="block w-full rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
              {errors.message && (
                <p className="mt-1 text-[10px] text-red-300">{errors.message.message}</p>
              )}
            </div>

            <div className="w-full leading-3">
              <span className="text-[11px] font-semibold text-white">Ao enviar, você concorda com nossa <Link href="/politica-de-privacidade" className="text-blue-300 hover:text-blue-400 underline">Política de Privacidade</Link> e autoriza o recebimento de comunicações da TTW.</span>
            </div>
          </div>


        </div>



        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-x-2 rounded-md bg-[#f5d22c] text-black px-4 py-2.5 font-bold font-inter text-sm hover:bg-[#f5d22c]/80 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={isSubmitting ? 'Enviando mensagem...' : 'Enviar mensagem'}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
            <ArrowRightIcon className="size-4" />
          </button>
        </div>
      </div>
    </form>
  )
}