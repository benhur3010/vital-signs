import Image from "next/image";

export default function BannerHome() {
  return (
    <div className=" bg-span pt-5">
      <div className="relative min-h-205 bg-[url('/banner-home/banner-home.png')] bg-cover bg-no-repeat">
        <div className="absolute space-y-3 max-w-35 -translate-y-1/2 top-[47%] rounded-2xl p-4 left-[66%] z-10 bg-[rgba(255,255,255,0.22)] border border-light shadow-[0_3px_6px_#00000029] backdrop-blur-[17px] backdrop-brightness-[1.24]">
          <div className="grid grid-cols-12 gap-3">
            <span className="font-bold text-primary col-span-4">SYS</span>{" "}
            <span className="col-span-8">140</span>
          </div>
          <div className="grid grid-cols-12 gap-3">
            <span className="font-bold text-primary col-span-4">DIA</span>{" "}
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
            </span>{" "}
            <span className="col-span-8">100bpm</span>
          </div>
        </div>
      </div>

      <div className="container text-center py-12">
        {" "}
        <h5 className="max-w-240 font-light mx-auto text-primary">
          {" "}
          Plataforma de saúde digital que{" "}
          <span className="font-bold">
            conecta pacientes e profissionais de saúde
          </span>{" "}
          por meio de monitoramento remoto inteligente, combinando wearables, IA
          e cuidado humano.
        </h5>
      </div>

      <div className="bg-primary py-8">
        <div className="max-w-160 mx-auto text-center">
          <h2 className="text-span font-light leading-tight">
            Feito {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/banner-home/homem-raquete.png"
              alt="pessoa praticando esporte"
              className="inline-block align-middle h-12 w-17"
            />{" "}
            para quem <span className="font-bold">vive</span>{" "}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/banner-home/mulher-natureza.png"
              alt="coração"
              className="inline-block align-middle h-12 w-17"
            />{" "}
            e para quem{" "}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/banner-home/medico.png"
              alt="coração"
              className="inline-block align-middle h-12 w-17"
            />{" "}
            <span className="font-bold">cuida.</span>
          </h2>
        </div>
      </div>
    </div>
  );
}
