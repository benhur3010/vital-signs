import Image from "next/image";
import BannerHome from "./components/page/BannerHome";
import HowItWorks from "./components/page/HowItWorks";

export default function Home() {
  return (
    <>
      <BannerHome />
      <HowItWorks />

      {/* Componente de vídeo */}
      <div className="bg-container md:py-35 py-20 mt-15 px-5">
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
