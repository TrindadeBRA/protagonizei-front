'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { twMerge } from "tailwind-merge"
import { useState } from 'react'
import { getPostContactFormSubmitUrl, postContactFormSubmitResponse } from '@/src/services/api'
import { errorToast, successToast } from '@/src/hooks/useToastify'
import customFetch from '@/src/services/custom-fetch'
import Link from 'next/link'

const whatsAppFormSchema = z.object({
    email: z
        .string()
        .min(1, 'Email é obrigatório')
        .email('Email inválido')
})

type WhatsAppFormData = z.infer<typeof whatsAppFormSchema>

interface WhatsAppFormProps {
    setIsOpen: (isOpen: boolean) => void
    whatsAppUrl: string
}

export function WhatsAppForm({ setIsOpen, whatsAppUrl }: WhatsAppFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<WhatsAppFormData>({
        resolver: zodResolver(whatsAppFormSchema)
    })

    const onSubmit = async (data: WhatsAppFormData) => {
        try {
            setIsSubmitting(true)

            const formData = new FormData()
            formData.append('email', data.email)
            formData.append('tag', 'WhatsApp Widget')
            formData.append('message',
                `
                Página origem: ${window.location.href}
                Email: ${data.email}
                `
            )

            const response: any = await customFetch<postContactFormSubmitResponse>(getPostContactFormSubmitUrl(), {
                method: 'POST',
                body: formData,
            })

            if (response.success) {
                successToast("Entraremos em contato em breve!")
            } else {
                throw new Error("Erro ao enviar formulário")
            }

            setTimeout(() => {
                window.open(whatsAppUrl, "_blank")
            }, 1000)

        } catch (e) {
            console.error("Erro ao enviar.", e)
            errorToast("Ocorreu um erro ao enviar.")
        } finally {
            setIsSubmitting(false)
            reset()
            setIsOpen(false)

        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
                <div>
                    <label htmlFor="email" className="text-xs text-muted-foreground">
                        Seu email para contato:
                    </label>
                    <input
                        id="email"
                        {...register('email')}
                        type="email"
                        autoComplete="email"
                        placeholder="seu@email.com"
                        className="mt-1 w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white bg-white! placeholder:text-gray-500 text-black! text-sm"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className={twMerge(
                        "w-full px-4 py-2 rounded-md font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors",
                    )}
                    aria-label={isSubmitting ? "Enviando formulário..." : "Chamar no WhatsApp"}
                >
                    {isSubmitting ? "Enviando..." : "Chamar no WhatsApp!"}
                </button>
                <div className="w-full leading-3">
                    <span className="text-[11px] font-medium text-gray-600">Ao enviar, você concorda com nossa <Link href="/politica-de-privacidade" className="text-blue-main hover:text-blue-700 underline">Política de Privacidade</Link> e autoriza o recebimento de comunicações da TTW.</span>
                </div>
            </div>
        </form>
    )
}