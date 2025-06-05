import IntroProductLine from "@/src/components/IntroProductLine";
import { getGetProductLineSlugUrl, getProductLineSlugResponse, getGetProductLineSlugsUrl, getProductLineSlugsResponse } from "@/src/services/api";
import customFetch from "@/src/services/custom-fetch";
import type { GetProductLineSlug200Data, GetProductLineSlug200DataSubcategoriesItem, GetProductLineSlug200DataSubcategoriesItemProductsItem } from '@/src/services/model';
import { ArrowRightIcon } from "lucide-react";
import { Metadata } from 'next';
import Link from "next/link";

interface ProductLineProps {
  slug?: string;
}

async function getProductLineInfo(slug: string): Promise<getProductLineSlugResponse> {
  try {
    const response = await customFetch<getProductLineSlugResponse>(getGetProductLineSlugUrl(slug));
    return response;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<ProductLineProps> }
): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await getProductLineInfo(slug as string);
  const description = (data as GetProductLineSlug200Data)?.parent?.description?.replace(/<[^>]*>?/g, '') || '';

  return {
    title: `Tiken - Linha de produtos: ${(data as GetProductLineSlug200Data)?.parent?.name || ''}`,
    description: description,
  };
}

export default async function Page({ params }: { params: Promise<ProductLineProps> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  if (!slug) {
    return <div>Slug não encontrado</div>;
  }

  const response = await getProductLineInfo(slug);

  if (response.status === 401 || response.status === 404) {
    return <div>Erro ao buscar informações do produto.</div>;
  }

  const data: GetProductLineSlug200Data = response.data as GetProductLineSlug200Data;

  if (!data) {
    return <div>Dados do produto não encontrados.</div>;
  }

  // if (data?.subcategories?.length === 0) {
  //   return <div>Nenhuma subcategoria encontrada.</div>;
  // }
  

  return (
    <div>
      <IntroProductLine
        invert={false}
        title={data.parent?.name || ''}
        description={data.parent?.description || ''}
        imagesUrls={data.parent?.images || []}
      />

      <>
        <div className="flex flex-wrap w-full gap-x-8 gap-y-24 px-8 lg:px-0 container max-w-7xl mx-auto overflow-x-hidden" data-aos="fade-down">
          {data?.subcategories?.map((category: GetProductLineSlug200DataSubcategoriesItem) => {

            const getColumnClass = (length: number) => {
              const baseClasses = "w-full transition-all duration-300"; // classes base para todos os casos

              const columnConfig = {
                1: `${baseClasses}`,
                2: `${baseClasses} md:w-[calc(50%-16px)]`,
                3: `${baseClasses} md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]`,
              };

              return columnConfig[length as keyof typeof columnConfig] || columnConfig[3];
            };

            return (
              <div
                key={category.slug}
                className={getColumnClass(data?.subcategories?.length || 0)}
              >
                <h3 className="text-lg text-left font-light mb-2 text-[#4d4d4d]">{category.name}</h3>
                <div className="h-[3px] w-full bg-gradient-to-r from-[#f8e91f] to-[#6a2771]"></div>
                <table className="w-full table-fixed mt-4">
                  <thead>
                    <tr className="text-sm uppercase mt-2">
                      <th className="py-2 text-left w-1/2">Produto</th>
                      <th className="py-2 text-center w-1/2">CAS Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category?.products?.map((product: GetProductLineSlug200DataSubcategoriesItemProductsItem) => (
                      <tr key={product.id} className="border-y-2 border-gray-300 py-2 text-xs">
                        <td className="text-left py-2 pr-2">
                          <div className="truncate">{product.title}</div>
                        </td>
                        <td className="text-center py-2">
                          <div className="truncate">{product.cas_number}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
        <div className="container flex justify-center mx-auto mt-8" data-aos="fade-down">
          <Link
            href="/produtos"
            className="flex items-center gap-x-2 rounded-md bg-[#f5d22c] text-black px-4 py-2.5 font-bold font-inter text-sm/6"
          >
            clique para solicitar amostra <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </>


    </div>
  );
}

export async function generateStaticParams() {
  try {
    const { data } = await customFetch<getProductLineSlugsResponse>(getGetProductLineSlugsUrl());

    if (!data || !Array.isArray(data)) {
      console.error('Dados de slugs não encontrados ou formato inválido');
      return [];
    }

    return data.map(item => ({
      slug: item.slug
    }));

  } catch (error) {
    console.error('Erro ao buscar slugs das linhas de produtos:', error);
    return [];
  }
}