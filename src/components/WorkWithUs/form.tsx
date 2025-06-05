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

const workWithUsFormSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(3, 'Telefone inválido'),
  linkedin: z.string().url('URL do Linkedin inválida'),
  resume: typeof window === 'undefined'
    ? z.any()
    : z.instanceof(FileList)
      .refine((files) => files.length > 0, 'Currículo é obrigatório')
      .refine(
        (files) => files[0]?.size <= 10 * 1024 * 1024,
        'Arquivo deve ter no máximo 10MB'
      )
      .refine(
        async (files) => {
          const file = files[0]
          if (!file) return false
          
          // Verifica se é um PDF
          if (file.type === 'application/pdf') {
            try {
              // Lê os primeiros 5 bytes do arquivo para verificar o cabeçalho PDF
              const arrayBuffer = await file.slice(0, 5).arrayBuffer()
              const header = new TextDecoder().decode(arrayBuffer)
              return header === '%PDF-'
            } catch (error) {
              console.error('Erro ao validar PDF:', error)
              return false
            }
          }
          
          // Aceita outros tipos de arquivo permitidos
          const validTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          ]
          return validTypes.includes(file.type)
        },
        'Arquivo inválido ou corrompido. Use PDF, DOC ou DOCX válidos'
      ),
})

type WorkWithUsFormData = z.infer<typeof workWithUsFormSchema>

export function WorkWithUsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WorkWithUsFormData>({
    resolver: zodResolver(workWithUsFormSchema),
  })
  const registerWithMask = useHookFormMask(register)

  const onSubmit = async (data: WorkWithUsFormData) => {
    try {
      setIsSubmitting(true)

      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('linkedin', data.linkedin)
      formData.append('tag', 'Trabalhe Conosco')

      if (data.resume instanceof FileList && data.resume.length > 0) {
        formData.append('attachment', data.resume[0])
      }

      const response: any = await customFetch<postContactFormSubmitResponse>(getPostContactFormSubmitUrl(), {
        method: 'POST',
        body: formData,
        // Não defina Content-Type, o browser faz isso automaticamente
      })

      if (response.success) {
        successToast("Formulário enviado com sucesso! Entraremos em contato em breve.")
        reset()
      } else {
        throw new Error(response.message || "Erro ao enviar formulário")
      }
    } catch (e) {
      console.error("Erro ao enviar o formulário", e)
      errorToast("Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-24 sm:pb-32 lg:px-8">
      <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="block text-sm/6 font-semibold text-gray-900">
              Nome
            </label>
            <div className="mt-2.5">
              <input
                {...register('name')}
                type="text"
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                {...register('email')}
                type="email"
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="phone" className="block text-sm/6 font-semibold text-gray-900">
              Telefone
            </label>
            <div className="mt-2.5">
              <input
                {...registerWithMask("phone", ['(99) 99999-9999'])}
                type="tel"
                autoComplete="tel"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="linkedin" className="block text-sm/6 font-semibold text-gray-900">
              Linkedin
            </label>
            <div className="mt-2.5">
              <input
                {...register('linkedin')}
                type="url"
                autoComplete="url"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
              {errors.linkedin && (
                <p className="mt-1 text-sm text-red-600">{errors.linkedin.message}</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="resume" className="block text-sm/6 font-semibold text-gray-900">
              Currículo
            </label>
            <div className="mt-2.5">
              <input
                {...register('resume')}
                type="file"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
              />
              {errors.resume && (
                <p className="mt-1 text-sm text-red-600">{errors.resume.message as string}</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full leading-3 mt-2">
          <span className="text-[11px] font-medium text-gray-600">Ao enviar, você concorda com nossa <Link href="/politica-de-privacidade" className="text-blue-500 hover:text-blue-700 underline">Política de Privacidade</Link> e autoriza o recebimento de comunicações da TTW.</span>
        </div>
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-x-2 rounded-md bg-indigo-600 text-white px-4 py-2.5 font-bold font-inter w-fit hover:bg-indigo-600/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'enviar'} <ArrowRightIcon className="size-4" />
          </button>
        </div>
      </div>
    </form>
  )
}