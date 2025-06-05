import ContactItems from "@/src/components/ContactItems";
import PinMap from "@/src/components/PinMap";
import WorkWithUs from "@/src/components/WorkWithUs";

export const metadata = {
  title: 'Tiken - Trabalhe Conosco',
  description: 'Junte-se à Tiken, uma das melhores empresas para se trabalhar, reconhecida pelo GPTW. Inove seu mundo!',
}

export default function TrabalheConosco() {
  return (
    <>
      <WorkWithUs />
      <ContactItems />
      <PinMap />
    </>
  );
}