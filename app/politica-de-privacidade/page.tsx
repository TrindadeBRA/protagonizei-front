import ContactItems from "@/src/components/ContactItems";
import PinMap from "@/src/components/PinMap";
import PoliticalContent from "@/src/components/PoliticalContent";

export const metadata = {
  title: 'Tiken - Politica e Privacidade',
  description: 'Saiba como protegemos seus dados pessoais conforme a LGPD em nossa política de privacidade.',
}

export default function PoliticaPrivacidade() {
  return (
    <>
      <PoliticalContent />
      <ContactItems />
      <PinMap />
    </>
  );
}