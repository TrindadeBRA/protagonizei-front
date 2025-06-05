import AboutHero from "@/src/components/AboutHero";
import ContactItems from "@/src/components/ContactItems";
import OurMission from "@/src/components/OurMission";
import OurPeople from "@/src/components/OurPeople";
import PinMap from "@/src/components/PinMap";
import { getAssetsResponse } from "@/src/services/api";
import { getAssetsFiles } from "../page";
import { GetAssets200Data } from "@/src/services/model";

export const metadata = {
  title: 'Tiken - Quem somos',
  description: 'Conheça a Tiken: excelência em especialidades químicas, com foco em inovação, sustentabilidade e compromisso. Inove seu mundo!',
}

export default async function QuemSomos() {

  let assetsFiles: getAssetsResponse;
  try {
    assetsFiles = await getAssetsFiles();
  } catch (error) {
    console.error('Erro ao buscar assets:', error);
    throw error;
  }
  const assetsFilesData = assetsFiles.data as GetAssets200Data;

  return (
    <>
      <AboutHero apresentationUrl={assetsFilesData.company_presentation as string} />
      <OurMission />
      <OurPeople />
      <ContactItems />
      <PinMap />
    </>
  );
}