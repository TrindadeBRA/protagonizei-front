import NotFoundScreen from "@/src/components/404Screen";
import ContactItems from "@/src/components/ContactItems";
import PinMap from "@/src/components/PinMap";

export const metadata = {
    title: 'Tiken - Página não encontrada',
    description: 'Desculpe, não foi possível encontrar a página que você está procurando.',
  }

export default function Page() {
    return (
        <>
            <NotFoundScreen />
            <ContactItems />
            <PinMap />
        </>
    )
}