import Image from "next/image";
import BannerHome from "./components/page/BannerHome";
import HowItWorks from "./components/page/HowItWorks";

export default function Home() {
  return (
    <>
      <BannerHome />
      <HowItWorks />

      {/* Componente de vídeo */}
      <div className="bg-container py-35 mt-15">
        <h1 className="max-w-200 text-center mx-auto">
          <span className="font-bold">Cuide da sua saúde</span> de forma simples
          e conectada.
        </h1>
        <Image
          className="mx-auto mt-12"
          src="/play-video.svg"
          alt="Video"
          width={92}
          height={92}
        />
      </div>
    </>
  );
}
