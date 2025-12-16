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
        wrapperClassName: "w-90 h-83",
        className: "object-contain object-left",
        sizes: "(min-width: 1024px) 360px, 70vw",
        align: "start",
      },
      overlayImage: {
        src: "/how-it-works/coleta-inteligente-dados-relative.png",
        alt: "Detalhe coleta",
        width: 245,
        height: 120,
        className: "absolute bottom-0 left-32",
      },
      detailImage: {
        src: "/how-it-works/coleta-inteligente-dados-relative-detail.png",
        alt: "Detalhe",
        width: 53,
        height: 53,
        className: "absolute bottom-25 left-68",
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
        wrapperClassName: "w-90 h-83",
        className: "object-contain object-left",
        sizes: "(min-width: 1024px) 360px, 70vw",
        align: "start",
      },
      overlayImage: {
        src: "/how-it-works/transmissao-segura-relative.png",
        alt: "Detalhe transmissão",
        width: 142,
        height: 104,
        className: "absolute bottom-0 left-7",
      },
      detailImage: {
        src: "/how-it-works/transmissao-segura-relative-detail.png",
        alt: "Detalhe",
        width: 53,
        height: 53,
        className: "absolute bottom-23 left-35",
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
        wrapperClassName: "w-90 h-83",
        className: "object-contain object-left",
        sizes: "(min-width: 1024px) 360px, 70vw",
        align: "end",
      },
      overlayImage: {
        src: "/how-it-works/analise-ia-relative.png",
        alt: "Detalhe alertas",
        width: 152,
        height: 119,
        className: "absolute top-0 left-[-15px]",
      },
      detailImage: {
        src: "/how-it-works/analise-ia-relative-detail.png",
        alt: "Detalhe",
        width: 53,
        height: 53,
        className: "absolute top-8 left-28",
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
        wrapperClassName: "w-90 h-83",
        className: "object-contain object-left",
        sizes: "(min-width: 1024px) 360px, 70vw",
        align: "end",
      },
      overlayImage: {
        src: "/how-it-works/alerta-e-suporte-relative.png",
        alt: "Análise e suporte gráficos",
        width: 184,
        height: 119,
        className: "absolute top-0 left-47",
      },
      detailImage: {
        src: "/how-it-works/alerta-e-suporte-relative-detail.png",
        alt: "Símbolo de alerta",
        width: 53,
        height: 53,
        className: "absolute top-25 left-83",
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
        wrapperClassName: "w-90 h-83",
        className: "object-contain object-left",
        sizes: "(min-width: 1024px) 360px, 70vw",
        align: "start",
      },
      overlayImage: {
        src: "/how-it-works/monitoramento-relative.png",
        alt: "Detalhe monitoramento",
        width: 245,
        height: 120,
        className: "absolute bottom-0 left-32",
      },
      detailImage: {
        src: "/how-it-works/monitoramento-relative-detail.png",
        alt: "Detalhe",
        width: 53,
        height: 53,
        className: "absolute bottom-29 left-78",
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
          className="w-[65%] flex items-start gap-12 relative"
        >
          <div
            className={[
              "relative shrink-0",
              alignClass,
              active.mainImage.wrapperClassName ?? "w-90 h-83",
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
              sizes={
                active.mainImage.sizes ?? "(min-width: 1024px) 363px, 80vw"
              }
              className={[
                "object-contain",
                active.mainImage.className ?? "",
              ].join(" ")}
            />
          </div>

          <div className="text-primary space-y-3">
            <h6 className="font-bold">{active.panelTitle}</h6>
            <p className="text-20 font-light">{active.panelDescription}</p>

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
    </div>
  );
}
