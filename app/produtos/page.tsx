import ContactItems from "@/src/components/ContactItems";
import OurProductsHero from "@/src/components/OurProductsHero";
import PinMap from "@/src/components/PinMap";
import ProductsTable from "@/src/components/ProductsTable";
import { getGetProductLineSlugsUrl, getGetProductsUrl, getProductLineSlugsResponse, getProductsResponse } from "@/src/services/api";
import customFetch from "@/src/services/custom-fetch";

export const metadata = {
  title: 'Tiken - Nossos Produtos',
  description: 'Descubra nossa linha de especialidades químicas de alta performance. Se não encontrar seu produto, entre em contato!',
}

async function getProducts(): Promise<getProductsResponse> {
  try {
    const response = await customFetch<getProductsResponse>(getGetProductsUrl());
    return response;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
}

async function getProductsLines(): Promise<getProductLineSlugsResponse> {
  try {
    const response = await customFetch<getProductLineSlugsResponse>(getGetProductLineSlugsUrl());
    return response;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
}

export default async function NossosProdutos() {
  const allProductsResponse: getProductsResponse = await getProducts();
  const allProducts = allProductsResponse.data;

  const allProductsLinesResponse: getProductLineSlugsResponse = await getProductsLines();
  const allProductsLines = allProductsLinesResponse.data;

  if (
    !allProducts || !Array.isArray(allProducts) ||
    !allProductsLines || !Array.isArray(allProductsLines)
  ) {
    return (
      <div className="p-8">
        <div className="bg-gradient-custom p-6 rounded-lg text-white font-bold text-center text-3xl border-2 border-white shadow-2xl">Nenhum produto encontrado</div>
      </div>
    );
  }

  return (
    <>
      <OurProductsHero heroData={allProductsLines} />
      {
        allProducts && (
          <ProductsTable allProducts={allProducts} />
        )
      }
      <ContactItems />
      <PinMap />
    </>
  );
}