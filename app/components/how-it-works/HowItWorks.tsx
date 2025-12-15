import Image from "next/image";

type StepItem = {
  number: string;
  title: string;
};

export default function HowItWorks() {
  const items: StepItem[] = [
    { number: "01.", title: "Coleta inteligente de dados" },
    { number: "02.", title: "Transmissão segura" },
    { number: "03.", title: "Análise por inteligência artificial" },
    { number: "04.", title: "Alertas e suporte ao diagnóstico" },
    { number: "05.", title: "Monitoramento contínuo" },
  ];
  return (
    <div className="pt-12 max-w-290 px-5 mx-auto pb-10">
      <h4 className="text-secondary text-center">
        Confira como a Vital Signs
        <br />
        <span className="text-primary font-bold">
          transforma tecnologia em cuidado.
        </span>
      </h4>

      <div className="flex gap-12 mt-14">
        <div className="w-[35%] text-secondary figtree font-medium space-y-8">
          {items.map((item) => (
            <div key={item.number}>
              <div>{item.number}</div>

              <div className="flex items-center justify-between gap-4">
                <h6 className="text-primary font-bold">{item.title}</h6>

                <Image
                  src="/how-it-works/arrow-down.png"
                  alt="seta"
                  width={36}
                  height={22}
                  className="shrink-0 hover:cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="w-[65%] flex items-start gap-7 relative">
          <div className="relative w-90 h-83 shrink-0 self-center">
            <Image
              src="/how-it-works/coleta-inteligente-dados.png"
              alt="Coleta inteligente de dados"
              fill
              sizes="(min-width: 1024px) 363px, 80vw"
              className="object-contain"
            />
          </div>

          <div className="text-primary space-y-3">
            <h6 className="font-bold">Coleta inteligente de dados </h6>
            <p className="text-20 font-light">
              O usuário utiliza um wearable compatível que registra
              continuamente sinais vitais como frequência cardíaca, pressão
              arterial e oxigenação.
            </p>
            <p className="text-black mt-5 hover:cursor-pointer hover:text-primary hover:underline">
              Baixe o App
            </p>
          </div>

          <Image
            src="/how-it-works/coleta-inteligente-dados-relative.png"
            alt="detalhe"
            width={245}
            height={120}
            className="absolute bottom-0 left-32"
          />
          <Image
            src="/how-it-works/coleta-inteligente-dados-relative-detail.png"
            alt="detalhe"
            width={53}
            height={53}
            className="absolute bottom-25 left-68"
          />
        </div>
      </div>
    </div>
  );
}
