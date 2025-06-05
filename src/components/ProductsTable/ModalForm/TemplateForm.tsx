'use client'

import { ProductsTableProps } from "..";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { getPostContactFormSubmitUrl, postContactFormSubmitResponse } from '@/src/services/api';
import customFetch from '@/src/services/custom-fetch';
import { errorToast, successToast } from '@/src/hooks/useToastify';
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

const templateFormSchema = z.object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    email: z.string().email('Email inválido'),
    message: z.string().optional(),
});

type TemplateFormData = z.infer<typeof templateFormSchema>;

interface TemplateFormProps {
    selectedProduct: ProductsTableProps;
    onClose: () => void;
    modalType: string;
}

export default function TemplateForm({ selectedProduct, onClose, modalType }: TemplateFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TemplateFormData>({
        resolver: zodResolver(templateFormSchema),
    });

    const onSubmit = async (data: TemplateFormData) => {
        try {
            setIsSubmitting(true);

            const createdMessage = `
Nome: ${data.name}
Email: ${data.email}
${data.message ? `Mensagem: ${data.message}` : ''}
================================
Tipo de solicitação: ${modalType}
Produto: ${selectedProduct.title}
CAS Number: ${selectedProduct.cas_number || ''}
Segmentos: ${selectedProduct.segments?.map(s => s.name).join(', ') || ''}
Descrição: ${selectedProduct.product_lines?.flatMap(l => l.children?.map(c => c.name) || []).join(', ') || ''}
`.trim()

            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('message', createdMessage);
            formData.append('product', selectedProduct.title || '');
            formData.append('cas_number', selectedProduct.cas_number || '');
            formData.append('tag', modalType);

            const response:any = await customFetch<postContactFormSubmitResponse>(getPostContactFormSubmitUrl(), {
                method: 'POST',
                body: formData,
            });

            if (response.success) {
                successToast("Solicitação enviada com sucesso! Entraremos em contato em breve.");
                reset();
            } else {
                throw new Error("Erro ao enviar formulário")
            }
            onClose();
        } catch (e) {
            console.error("Erro ao enviar o formulário", e);
            errorToast("Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde.");
        } finally {
            setIsSubmitting(false);

        }
    };

    return (
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold text-black mb-2">Detalhes do Produto</h4>
                <p className="text-sm"><span className="font-semibold">Nome do Produto:</span> {selectedProduct.title}</p>
                <p className="text-sm"><span className="font-semibold">CAS Number:</span> {selectedProduct.cas_number || 'N/A'}</p>
                <p className="text-sm"><span className="font-semibold">Segmentos:</span> {selectedProduct.segments?.map(s => s.name).join(', ') || 'N/A'}</p>
                <p className="text-sm"><span className="font-semibold">Descrição:</span> {selectedProduct.product_lines?.flatMap(l => l.children?.map(c => c.name) || []).join(', ') || 'N/A'}</p>
            </div>

            <div className="pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-black mb-2">Formulário de Solicitação</h4>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-2 space-y-3">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium black">Nome*</label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            {...register('name')}
                        />
                        {errors.name && (
                            <p className="mt-1 text-[10px] text-red-600">{errors.name.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium black">Email*</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            {...register('email')}
                        />
                        {errors.email && (
                            <p className="mt-1 text-[10px] text-red-600">{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium black">Mensagem</label>
                        <textarea
                            id="message"
                            rows={3}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            {...register('message')}
                        />
                        {errors.message && (
                            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                        )}
                        <div className="w-full leading-3">
                            <span className="text-[11px] font-medium text-gray-600">Ao enviar, você concorda com nossa <Link href="/politica-de-privacidade" className="text-blue-500 hover:text-blue-700 underline">Política de Privacidade</Link> e autoriza o recebimento de comunicações da Tiken.</span>
                        </div>
                    </div>


                    <div className="pt-3">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-x-2 rounded-md bg-[#9061a8] text-white px-4 py-2.5 font-bold !font-inter text-sm cursor-pointer hover:bg-[#9061a8]/80 transition-colors duration-300"
                        >
                            {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
                            {!isSubmitting && <ArrowRightIcon className="size-4" />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}