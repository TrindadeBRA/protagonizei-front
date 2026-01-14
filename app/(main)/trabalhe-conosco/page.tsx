import WorkWithUs from "@/src/components/WorkWithUs";

export const metadata = {
  title: 'Protagonizei - Trabalhe Conosco',
  description: 'Junte-se à Protagonizei!',
}

export default function TrabalheConosco() {
  return (
    <>
      <div className="container mx-auto my-10 px-4">
        <h1 className="text-4xl font-bold">TRABALHE CONOSCO</h1>
      </div>
      <WorkWithUs />
    </>
  );
}