import BannerHome from "./components/home/BannerHome";
import HowItWorks from "./components/how-it-works/HowItWorks";

export default function Home() {
  return (
    <>
      <BannerHome />
      <HowItWorks />

      {/* Componente de vídeo */}
      <div className="bg-container py-35 mt-15">
        <h1 className="max-w-200 text-center mx-auto">
          Cuide da sua saúde de forma simples e conectada.
        </h1>
      </div>
    </>
  );
}
