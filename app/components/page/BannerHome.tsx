import Image from "next/image";
import { ExpandablePill } from "../ExpandablePill";

export default function BannerHome() {
  return (
    <section className="bg-span pt-5">
      <div className="relative w-full">
        <div className="relative w-full h-150 md:h-auto aspect-1920/820 2xl:aspect-1920/820">
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="/banner-home/banner-home-mobile.png"
            />
            <source
              media="(min-width: 768px)"
              srcSet="/banner-home/banner-home.png"
            />
            <Image
              src="/banner-home/banner-home.png"
              alt="Banner Vital Signs"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 100vw"
              className="md:object-cover object-contain object-center"
            />
          </picture>

          <div
            className="
              absolute z-10 hidden md:block
              left-[70%] top-[47%] -translate-x-1/2 -translate-y-1/2
              max-w-35 space-y-3 rounded-2xl p-4
              bg-[rgba(255,255,255,0.22)] border border-light
              shadow-[0_3px_6px_#00000029]
              backdrop-blur-[17px] backdrop-brightness-[1.24]
            "
          >
            <div className="grid grid-cols-12 gap-3">
              <span className="font-bold text-primary col-span-4">SYS</span>
              <span className="col-span-8">140</span>
            </div>
            <div className="grid grid-cols-12 gap-3">
              <span className="font-bold text-primary col-span-4">DIA</span>
              <span className="col-span-8">82</span>
            </div>
            <div className="grid grid-cols-12 gap-3">
              <span className="col-span-4">
                <Image
                  src="/banner-home/heart.png"
                  width={20}
                  height={20}
                  alt="coração"
                />
              </span>
              <span className="col-span-8">100bpm</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="max-w-240 mx-auto text-center xs:py-12 py-5 px-5"
        id="quem-somos"
      >
        {" "}
        <h5 className="font-light mx-auto text-primary">
          {" "}
          Plataforma de saúde digital que{" "}
          <span className="font-bold">
            conecta pacientes e profissionais de saúde
          </span>{" "}
          por meio de monitoramento remoto inteligente, combinando wearables, IA
          e cuidado humano.
        </h5>
      </div>

      <div className="bg-primary py-8 px-5">
        <div className="max-w-160 mx-auto text-center">
          <h2 className="text-span font-light">
            {/* Linha 1 */}
            <span className="block">
              <span className="inline-flex items-center justify-center gap-3 whitespace-nowrap">
                <span>Feito</span>

                <ExpandablePill
                  collapsedSrc="/banner-home/homem-raquete.png"
                  expandedSrc="/banner-home/homem-raquete-expandida.png"
                  alt="pessoa praticando esporte"
                  height={48}
                  collapsedWidth={70}
                  expandedWidth={181}
                />

                <span>pra quem</span>
              </span>
            </span>

            {/* Linha 2 */}
            <span className="block mt-2">
              <span className="inline-flex items-center justify-center gap-3 whitespace-nowrap">
                <span className="font-bold">vive</span>

                <ExpandablePill
                  collapsedSrc="/banner-home/mulher-natureza.png"
                  expandedSrc="/banner-home/mulher-natureza-expandida.png"
                  alt="pessoa na natureza"
                  height={48}
                  collapsedWidth={70}
                  expandedWidth={181}
                />

                <span>e para</span>
              </span>
            </span>

            {/* Linha 3 */}
            <span className="block mt-2">
              <span className="inline-flex items-center justify-center gap-3 whitespace-nowrap">
                <span>quem</span>

                <ExpandablePill
                  collapsedSrc="/banner-home/medico.png"
                  expandedSrc="/banner-home/medico-expandida.png"
                  alt="profissional de saúde"
                  height={48}
                  collapsedWidth={70}
                  expandedWidth={181}
                />

                <span className="font-bold">cuida.</span>
              </span>
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}
