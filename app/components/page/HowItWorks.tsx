"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Step = {
  id: string;
  number: string;
  menuTitle: string;

  panelTitle: string;
  panelDescription: string;

  mainImage: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    wrapperClassName?: string;
    className?: string;
    sizes?: string;
    align?: "start" | "center" | "end";
  };

  overlayImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className: string;
  };
  detailImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className: string;
  };
};

function FadeIn({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={[
        className,
        "transition-opacity duration-2000 ease-out",
        "motion-reduce:transition-none",
        show ? "opacity-100" : "opacity-0",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default function HowItWorks() {
  const steps: Step[] = [
    {
      id: "coleta",
      number: "01.",
      menuTitle: "Coleta inteligente de dados",
      panelTitle: "Coleta inteligente de dados",
      panelDescription:
        "O usuário utiliza um wearable compatível que registra continuamente sinais vitais como frequência cardíaca, pressão arterial e oxigenação.",
      mainImage: {
        src: "/how-it-works/coleta-inteligente-dados.png",
        alt: "Coleta inteligente de dados",
        className: "object-center sm:object-left",
        align: "start",
      },
      overlayImage: {
        src: "/how-it-works/coleta-inteligente-dados-relative.png",
        alt: "Detalhe coleta",
        width: 245,
        height: 120,
        className:
          "absolute top-58 left-18 xl:bottom-0 sm:bottom-[-20px] sm:top-auto sm:left-32",
      },
      detailImage: {
        src: "/how-it-works/coleta-inteligente-dados-relative-detail.png",
        alt: "Detalhe",
        width: 53,
        height: 53,
        className:
          "absolute xl:bottom-25 sm:bottom-20 sm:top-auto top-50 left-48 sm:left-68",
      },
    },
    {
      id: "transmissao",
      number: "02.",
      menuTitle: "Transmissão segura",
      panelTitle: "Transmissão segura",
      panelDescription:
        "Os dados são enviados para a plataforma da Vital Signs por conexão criptografada, em total conformidade com a LGPD.",
      mainImage: {
        src: "/how-it-works/transmissao-segura.png",
        alt: "Transmissão segura",
        className: "object-contain object-left",
        align: "start",
      },
      overlayImage: {
        src: "/how-it-works/transmissao-segura-relative.png",
        alt: "Detalhe transmissão",
        width: 142,
        height: 104,
        className:
          "absolute xl:bottom-0 sm:bottom-[-20px] sm:top-auto top-58 left-18",
      },
      detailImage: {
        src: "/how-it-works/transmissao-segura-relative-detail.png",
        alt: "Detalhe",
        width: 53,
        height: 53,
        className:
          "absolute xl:bottom-23 sm:bottom-18 sm:top-auto top-50 left-48",
      },
    },
    {
      id: "alertas",
      number: "03.",
      menuTitle: "Análise por inteligência artificial",
      panelTitle: "Análise por inteligência artificial",
      panelDescription:
        "Nossa IA proprietária interpreta padrões, detecta alterações e antecipa riscos clínicos antes que os sintomas apareçam.",
      mainImage: {
        src: "/how-it-works/analise-ia.png",
        alt: "Alertas e suporte ao diagnóstico",
        className: "object-contain object-left",
        align: "end",
      },
      overlayImage: {
        src: "/how-it-works/analise-ia-relative.png",
        alt: "Detalhe alertas",
        width: 152,
        height: 119,
        className:
          "absolute top-58 left-10 sm:top-[-40px] xl:top-0 xl:left-[-15px]",
      },
      detailImage: {
        src: "/how-it-works/analise-ia-relative-detail.png",
        alt: "Detalhe",
        width: 53,
        height: 53,
        className: "absolute top-50 left-40 xl:top-8 xl:left-28 sm:top-13",
      },
    },
    {
      id: "ia",
      number: "04.",
      menuTitle: "Alertas e suporte ao diagnóstico",
      panelTitle: "Alertas e suporte ao diagnóstico",
      panelDescription:
        "Em caso de risco, o sistema gera alertas automáticos para o usuário e o médico responsável, auxiliando decisões clínicas rápidas e assertivas.",
      mainImage: {
        src: "/how-it-works/alerta-e-suporte.png",
        alt: "Alertas e suporte ao diagnóstico",
        className: "object-contain object-left",
        align: "end",
      },
      overlayImage: {
        src: "/how-it-works/alerta-e-suporte-relative.png",
        alt: "Análise e suporte gráficos",
        width: 184,
        height: 119,
        className: "absolute top-58 left-18 xl:top-0 sm:top-[-40px] sm:left-47",
      },
      detailImage: {
        src: "/how-it-works/alerta-e-suporte-relative-detail.png",
        alt: "Símbolo de alerta",
        width: 53,
        height: 53,
        className: "absolute top-50 left-48 xl:top-25 sm:left-83 sm:top-15",
      },
    },
    {
      id: "monitoramento",
      number: "05.",
      menuTitle: "Monitoramento contínuo",
      panelTitle: "Monitoramento contínuo",
      panelDescription:
        "A plataforma atualiza o histórico de saúde em tempo real, permitindo uma visão longitudinal da vida e não apenas de um momento.",
      mainImage: {
        src: "/how-it-works/monitoramento.png",
        alt: "Monitoramento contínuo",
        className: "object-contain object-left",
        align: "start",
      },
      overlayImage: {
        src: "/how-it-works/monitoramento-relative.png",
        alt: "Detalhe monitoramento",
        width: 245,
        height: 120,
        className:
          "absolute top-58 left-18 xl:bottom-0 sm:top-auto sm:left-32 sm:bottom-[-20px]",
      },
      detailImage: {
        src: "/how-it-works/monitoramento-relative-detail.png",
        alt: "Detalhe",
        width: 53,
        height: 53,
        className:
          "absolute top-47 left-60 xl:bottom-29 sm:top-auto sm:bottom-23 sm:left-78",
      },
    },
  ];

  const [activeId, setActiveId] = useState(steps[0].id);
  const active = steps.find((s) => s.id === activeId) ?? steps[0];

  const alignClass =
    active.mainImage.align === "start"
      ? "self-start"
      : active.mainImage.align === "end"
      ? "self-end"
      : "self-center";

  return (
    <section className="pt-12 max-w-290 px-5 mx-auto sm:pb-10">
      <h4 className="text-secondary text-center">
        Confira como a Vital Signs
        <br />
        <span className="text-primary font-bold">
          transforma tecnologia em cuidado.
        </span>
      </h4>

      <div className="flex-row space-y-20 mt-14 xl:flex xl:space-y-0 xl:gap-12">
        <div className="xl:w-[35%] md:w-1/2 mx-auto text-secondary figtree font-medium space-y-8">
          {steps.map((item) => {
            const isActive = item.id === activeId;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className="w-full text-left"
                aria-current={isActive ? "true" : undefined}
              >
                <div>{item.number}</div>

                <div className="flex items-center justify-between gap-4 font-bold">
                  <h6 className={isActive ? "text-primary" : "text-secondary"}>
                    {item.menuTitle}
                  </h6>

                  <Image
                    src="/how-it-works/arrow-down.png"
                    alt="seta"
                    width={36}
                    height={22}
                    className={[
                      "shrink-0 transition-transform duration-1000",
                      "hover:cursor-pointer",
                      isActive ? "rotate-180" : "rotate-0",
                    ].join(" ")}
                  />
                </div>
              </button>
            );
          })}
        </div>

        <FadeIn
          key={active.id}
          className="xl:w-[65%] md:w-[80%] mx-auto space-y-10 text-center sm:text-left sm:space-y-0 sm:flex items-start gap-12 relative"
        >
          <div
            className={[
              "relative shrink-0 w-full max-w-85 h-83 mx-auto sm:mx-0 sm:w-90 sm:max-w-none",
              alignClass,
            ].join(" ")}
            style={
              active.mainImage.width && active.mainImage.height
                ? {
                    width: active.mainImage.width,
                    height: active.mainImage.height,
                  }
                : undefined
            }
          >
            <Image
              src={active.mainImage.src}
              alt={active.mainImage.alt}
              fill
              className={[
                "object-contain",
                active.mainImage.className ?? "",
              ].join(" ")}
            />
          </div>

          <div className="text-primary space-y-3">
            <h6 className="font-bold">{active.panelTitle}</h6>
            <p className="sm:text-20 text-14 font-light">
              {active.panelDescription}
            </p>
            <p className="text-black mt-5 hover:cursor-pointer hover:text-primary hover:underline">
              Baixe o App
            </p>
          </div>

          <Image
            src={active.overlayImage.src}
            alt={active.overlayImage.alt}
            width={active.overlayImage.width}
            height={active.overlayImage.height}
            className={active.overlayImage.className}
          />

          <Image
            src={active.detailImage.src}
            alt={active.detailImage.alt}
            width={active.detailImage.width}
            height={active.detailImage.height}
            className={active.detailImage.className}
          />
        </FadeIn>
      </div>
    </section>
  );
}
