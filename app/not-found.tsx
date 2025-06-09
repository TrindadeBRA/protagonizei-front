import NotFoundScreen from "@/src/components/404Screen";

export const metadata = {
    title: 'Protagonizei - Página não encontrada',
    description: 'Desculpe, não foi possível encontrar a página que você está procurando.',
  }

export default function Page() {
    return (
        <>
            <NotFoundScreen />
        </>
    )
}